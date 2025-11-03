# Speech-to-Text Transcription App

A modern web application for transcribing audio files using AssemblyAI's powerful speech-to-text API. Features include speaker diarization, profanity filtering, and downloadable transcripts.

## Features

- **File Upload**: Support for MP3 and M4A files of any length
- **Real-time Progress**: Upload and transcription progress indicators  
- **Speaker Diarization**: Automatic speaker identification and labeling
- **Audio Playback**: Sticky audio player for transcript review
- **Download Transcripts**: Export transcripts as formatted .txt files
- **Dark Mode UI**: Beautiful interface using custom color palette
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Setup Instructions

1. **Get AssemblyAI API Key**:
   - Sign up at [AssemblyAI](https://www.assemblyai.com/)
   - Get your API key from the dashboard
   - Add it to the `.env.local` file:
     ```
     VITE_ASSEMBLYAI_API_KEY=your_actual_api_key_here
     ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Development Server**:
   ```bash
   npm run dev
   ```

## Technologies Used

- **React** with TypeScript for the frontend
- **Tailwind CSS** for styling with custom color palette
- **AssemblyAI SDK** for speech-to-text transcription
- **Vite** for fast development and building
- **Lucide React** for beautiful icons

## Color Palette

- Primary: `#75e8e7` (cyan)
- Secondary: `#ddacf5` (light purple)  
- Accent: `#9854cb` (purple)
- Dark Purple: `#64379f`
- Background: `#27104e` (dark indigo)

## Usage

1. **Upload Audio**: Select an MP3 or M4A file using the upload interface
2. **Start Transcription**: Click "Start Transcribing" after upload completes
3. **Review Results**: View the transcript with speaker labels and timestamps
4. **Play Audio**: Use the sticky audio player to review specific sections
5. **Download**: Export the transcript as a formatted .txt file

## API Integration

The app uses AssemblyAI's JavaScript SDK with the following features enabled:
- Universal speech model for best accuracy
- Speaker labels for diarization
- Content safety and profanity filtering
- Real-time status updates during processing

## File Structure

```
src/
├── components/          # React components
│   ├── FileUpload.tsx   # File upload interface
│   ├── TranscriptionProgress.tsx # Progress indicators
│   ├── TranscriptDisplay.tsx # Transcript viewing
│   ├── AudioPlayer.tsx  # Sticky audio controls
│   └── ErrorMessage.tsx # Error handling
├── types/               # TypeScript interfaces
├── utils/               # AssemblyAI integration
└── App.tsx             # Main application component
```

## Environment Variables

Required environment variables in `.env.local`:
- `VITE_ASSEMBLYAI_API_KEY` - Your AssemblyAI API key

## Deployment

The app can be deployed to any static hosting service:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

Make sure to set the `VITE_ASSEMBLYAI_API_KEY` environment variable in your deployment environment...