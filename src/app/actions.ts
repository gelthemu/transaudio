"use server";

import { put } from "@vercel/blob";
import { AssemblyAI } from "assemblyai";

let aai: AssemblyAI | null = null;
function getAai() {
    if (aai === null) {
        aai = new AssemblyAI({
            apiKey: process.env.TRANSAUDIO_API_KEY!,
        });
    }
    return aai;
}

export async function transcribeAudio(formAudio: FormData) {
    try {
        const audioUrl = formAudio.get("audioUrl") as string;
        if (!audioUrl) {
            throw new Error("No audio URL provided");
        }

        console.log("\x1b[1;32m%s\x1b[0m", `API STARTS`);

        try {
            const transcript = await getAai().transcripts.transcribe({
                audio_url: audioUrl,
                speech_model: "best",
                speaker_labels: true,
                filter_profanity: true,
                disfluencies: true,
                language_detection: true,
            });

            const completedTranscript = await getAai().transcripts.get(transcript.id);

            const utterances = completedTranscript.utterances;
            if (!utterances) {
                throw new Error("No utterances found in transcript");
            }

            let extractTranscript = "";
            for (const utterance of utterances) {
                const start = utterance.start / 1000;

                const startMins = String(Math.floor((start % 3600) / 60)).padStart(2, "0");
                const startSeconds = String(Math.floor(start % 60)).padStart(2, "0");

                const startTime = `${startMins}:${startSeconds}`;

                extractTranscript += `<span class="text-sm">[${startTime}]</span><br /><strong>VOICE ${utterance.speaker}:</strong><br /><span>${utterance.text}</span><br /><br />`;
            }

            const exportText = extractTranscript;
            const confidence = `${((completedTranscript.confidence ?? 0) * 100).toFixed(2)}%`;

            console.log("\x1b[1;32m%s\x1b[0m", `API ENDS`);

            console.log("\x1b[1;32m%s\x1b[0m", `SAVING TRANSCRIPT JSON`);

            const transcriptJson = {
                id: audioUrl,
                created_at: new Date().toISOString(),
                speech_model: completedTranscript.speech_model,
                language_code: completedTranscript.language_code,
                status: completedTranscript.status,
                text: completedTranscript.text,
                utterances: completedTranscript.utterances,
                confidence: completedTranscript.confidence,
                audio_duration: completedTranscript.audio_duration,
                punctuate: completedTranscript.punctuate,
                format_text: completedTranscript.format_text,
                filter_profanity: completedTranscript.filter_profanity,
            };

            await put(`audio/${new Date().toISOString().replace(/[:.]/g, '-')}.json`, JSON.stringify(transcriptJson), {
                access: "public",
                contentType: "application/json",
            });

            console.log("\x1b[1;32m%s\x1b[0m", `SUCCESS!`);

            return { status: completedTranscript.status, text: exportText, confidence: confidence };
        } catch (error) {
            console.error("Error transcribing audio:", error);
            return "Server Error";
        }
    } catch (error) {
        console.error("Error transcribing audio:", error);
        return "Server Error";
    }
}
