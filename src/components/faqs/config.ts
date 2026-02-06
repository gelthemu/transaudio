export const faqs = [
  {
    title: "What audio formats do you support?",
    content:
      "We support MP3 and M4A formats. Files must be under 80 MB and up to 90 minutes in length. For best results, use high-quality recordings with minimal background noise.",
  },
  {
    title: "How accurate is the transcription?",
    content:
      "TransAUDIO achieves 90-95% accuracy on clear audio recordings. Accuracy may vary based on audio quality, accents, background noise, and technical terminology. Clear speech with good audio quality yields the best results.",
  },
  {
    title: "How long does transcription take?",
    content:
      "Processing time varies by file size: 10-min audio takes 1-2 minutes, 30-min audio takes 3-5 minutes, and 60-min audio takes about 5-8 minutes. Complex audio with multiple speakers may take slightly longer.",
  },
  {
    title: "What happens to my audio files after processing?",
    content:
      "Your privacy is our priority. Audio files are processed securely and automatically deleted after transcription. Transcripts are stored locally in your browser for 5 days and can be deleted anytime.",
  },
  {
    title: "Can I edit the script after it's generated?",
    content:
      "Currently, scripts are read-only in the browser, but you can download as DOCX or TXT and edit in your preferred word processor. We're working on an in-browser editor for future updates.",
  },
  {
    title: "Do you offer bulk transcription or business plans?",
    content:
      "We're working on enterprise plans with higher file limits, API access, and team features. Submit your details in the 'Get More Help' section below to be notified when these are available.",
  },
];

export const faqCategories = [
  {
    title: "General Questions",
    faqs: [
      {
        title: "What is TransAUDIO?",
        content:
          "TransAUDIO is an AI-powered transcription service that converts audio files into accurate text with speaker identification and timestamps.",
      },
      {
        title: "Do I need to create an account?",
        content:
          "No account is required! Simply upload your audio and get your script. Your data is stored locally in your browser for privacy.",
      },
      {
        title: "Is TransAUDIO free to use?",
        content:
          "We're currently in beta with generous free usage limits. Pricing details will be announced at launch.",
      },
      {
        title: "What makes TransAUDIO different?",
        content:
          "We combine high accuracy, speaker identification, word-level timestamps, and privacy-first design—all without requiring an account or software installation.",
      },
      {
        title: "Can I use TransAUDIO on mobile?",
        content:
          "Yes! TransAUDIO works in any modern browser, including mobile browsers on iOS and Android.",
      },
      {
        title: "What languages are supported?",
        content:
          "Currently, TransAUDIO is optimized for English. We're working on adding support for additional languages.",
      },
    ],
  },
  {
    title: "Technical Questions",
    faqs: [
      {
        title: "What audio formats are supported?",
        content:
          "We support MP3, M4A, WAV, FLAC, and OGG formats. Files must be under 80 MB and no longer than 90 minutes.",
      },
      {
        title: "How long does transcription take?",
        content:
          "Processing time varies by file size. Typically, a 60-minute audio file takes 2-4 minutes to transcribe.",
      },
      {
        title: "Why is my upload failing?",
        content:
          "Common reasons include file too large (>80MB), unsupported format, or network issues. Try a smaller file or check your connection.",
      },
      {
        title: "Can I transcribe video files?",
        content:
          "Not directly. Extract the audio from your video file first (using free tools like VLC), then upload the audio file.",
      },
      {
        title: "Is there an API available?",
        content:
          "We're developing an API for developers. Submit a request in the 'Get More Help' section to join the waitlist.",
      },
      {
        title: "What browsers are supported?",
        content:
          "TransAUDIO works in all modern browsers: Chrome, Firefox, Safari, and Edge. We recommend the latest versions for best performance.",
      },
      {
        title: "Can I transcribe from YouTube or Spotify?",
        content:
          "Our upcoming browser extension will support direct transcription from streaming platforms. Sign up for notifications to be the first to know when it launches.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    faqs: [
      {
        title: "Is my audio data secure?",
        content:
          "Yes! Audio files are encrypted during upload and processing. They are automatically deleted after transcription is complete.",
      },
      {
        title: "Where are my scripts stored?",
        content:
          "Transcripts are stored locally in your browser using IndexedDB. They never leave your device except when downloading.",
      },
      {
        title: "How long is my data retained?",
        content:
          "Transcripts are automatically deleted after 5 days. Audio files are deleted immediately after processing.",
      },
      {
        title: "Do you use my audio to train AI models?",
        content:
          "Absolutely not. Your audio is processed for transcription only and never used for any other purpose, including AI training.",
      },
      {
        title: "Can I delete my scripts early?",
        content:
          "Yes! You can delete any script at any time from the 'My Transcripts' page.",
      },
    ],
  },
  {
    title: "Accuracy & Quality",
    faqs: [
      {
        title: "How accurate is the transcription?",
        content:
          "TransAUDIO typically achieves 90-95% accuracy on clear audio. Accuracy depends on audio quality, background noise, and speaker clarity.",
      },
      {
        title: "Why are some words underlined?",
        content:
          "Underlined words have lower confidence scores (below 70%). Review these words as they may need correction.",
      },
      {
        title: "How can I improve transcription accuracy?",
        content:
          "Use high-quality recordings, minimize background noise, ensure speakers talk clearly and don't overlap, and use a good microphone.",
      },
      {
        title: "Can TransAUDIO handle accents?",
        content:
          "Yes! Our AI is trained on diverse speech patterns. However, very heavy accents or non-native speakers may result in lower accuracy.",
      },
    ],
  },
  {
    title: "Features & Functionality",
    faqs: [
      {
        title: "Can I edit scripts in the browser?",
        content:
          "Currently, scripts are read-only in the browser. Download in DOCX format to edit in Microsoft Word or Google Docs.",
      },
      {
        title: "How does speaker identification work?",
        content:
          "Our AI analyzes voice characteristics to distinguish between speakers. It works best when speakers have distinct voices and take turns talking.",
      },
      {
        title: "Can I search within a script?",
        content:
          "Yes! Use the search bar in the script viewer to find specific words or phrases. Matches are highlighted in yellow.",
      },
      {
        title: "What export options are available?",
        content:
          "Currently, you can export to DOCX (Word) and TXT. JSON and SRT (subtitles) formats are coming soon.",
      },
      {
        title: "Can I bulk process multiple files?",
        content:
          "Not yet, but bulk processing is on our roadmap. Submit a request in 'Get More Help' to express interest in this feature.",
      },
    ],
  },
];

// {
//   title: "How does speaker diarization work?",
//   content:
//     "Our AI automatically detects when different people are speaking and labels them as Speaker A, Speaker B, etc. It can identify up to 10+ unique speakers in a single recording.",
// },
//   {
//   title: "Can I transcribe YouTube videos?",
//   content:
//     "Yes! Paste a direct URL to an audio file. Our upcoming browser extension will allow one-click transcription directly from YouTube and other platforms.",
// },
// {
//   title: "What's the difference between DOCX and TXT exports?",
//   content:
//     "DOCX includes formatted text with speaker labels, timestamps, and proper styling for Word. TXT is plain text, smaller in size, and compatible with any text editor.",
// },
// {
//   title: "Is there a free tier?",
//   content:
//     "Pricing details will be announced at launch. Currently, the service is available for free during our beta period. Sign up for our newsletter to get notified about pricing and special launch offers.",
// },
