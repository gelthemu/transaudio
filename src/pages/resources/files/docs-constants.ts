import {
  Upload,
  Settings,
  Star,
  MessageSquare,
  AlertTriangle,
  Phone,
  BookOpen,
  Lightbulb,
  Users,
  Clock,
  Download,
  FileText,
  Mic,
} from "lucide-react";

export const sections = [
  { id: "getting-started", label: "Getting Started", icon: BookOpen },
  { id: "how-to-use", label: "How to Use TransAUDIO", icon: Settings },
  { id: "features", label: "Features & Capabilities", icon: Star },
  { id: "faqs", label: "FAQs", icon: MessageSquare },
  { id: "troubleshooting", label: "Troubleshooting", icon: AlertTriangle },
  { id: "contact", label: "Contact Support", icon: Phone },
];

export const gettingStartedArticles = [
  {
    title: "How to upload your first audio file",
    content:
      "Click the 'Upload Audio File' button on the homepage. You can either click to browse your files or drag and drop an audio file directly onto the upload area. Supported formats include MP3, M4A, WAV, FLAC, and OGG.",
  },
  {
    title: "Understanding the upload interface",
    content:
      "The upload interface shows your file name, size, and format after selection. You'll see a progress bar during upload, followed by processing steps including validation, cloud upload, transcription, timestamp generation, and speaker identification.",
  },
  {
    title: "Supported audio formats explained",
    content:
      "TransAUDIO supports MP3 (most common, great compression), M4A (Apple's format, high quality), WAV (uncompressed, large files), FLAC (lossless compression), and OGG (open-source format). All formats are processed with the same high accuracy.",
  },
  {
    title: "File size and duration limits",
    content:
      "Audio files must be under 80 MB in size and no longer than 90 minutes. For longer recordings, consider splitting them into multiple files. We're working on supporting larger files for enterprise users.",
  },
  {
    title: "What to expect during processing",
    content:
      "Processing typically takes 1-3 minutes depending on audio length. You'll see real-time updates as your file progresses through validation, upload, transcription, timestamp generation, and speaker identification stages.",
  },
];

export const howToUseSteps = [
  {
    step: 1,
    title: "Uploading Audio Files",
    icon: Upload,
    content:
      "Navigate to the homepage and click 'Upload Audio File'. Select your audio file (MP3, M4A, WAV, FLAC, or OGG under 80MB). The file will automatically begin uploading and processing.",
    tips: [
      "Ensure stable internet connection for large files",
      "Clear audio produces better results",
      "Test with a short clip first",
    ],
  },
  {
    step: 2,
    title: "Providing Audio URLs",
    icon: Lightbulb,
    content:
      "Click 'Or Paste Audio URL' to transcribe audio from a direct link. Enter the URL to an audio file (must be a direct link ending in .mp3, .wav, etc., not a webpage). The audio will be fetched and processed automatically.",
    tips: [
      "Use direct download links, not streaming URLs",
      "Ensure the URL is publicly accessible",
      "YouTube and Spotify links require our browser extension (coming soon)",
    ],
  },
  {
    step: 3,
    title: "Understanding Your Transcript",
    icon: FileText,
    content:
      "Once processing completes, you'll be taken to the transcript viewer. Speaker labels (Speaker A, Speaker B, etc.) identify different voices. Timestamps show when each segment was spoken. Words with lower confidence may be underlined.",
    tips: [
      "Click timestamps to copy them",
      "Use search to find specific content",
      "Check underlined words for potential errors",
    ],
  },
  {
    step: 4,
    title: "Downloading Transcripts",
    icon: Download,
    content:
      "Export your transcript in DOCX (Microsoft Word) or TXT format. DOCX includes formatting, speaker labels, and timestamps. TXT provides plain text for easy copying. Both options are available from the transcript viewer.",
    tips: [
      "DOCX is best for editing and sharing",
      "TXT works well for coding or plain text needs",
      "JSON and SRT formats coming soon",
    ],
  },
  {
    step: 5,
    title: "Managing Your Transcripts",
    icon: Settings,
    content:
      "Visit 'My Transcripts' to view all your processed audio. Search, sort, and filter your transcripts. Download or delete transcripts as needed. Remember: transcripts expire after 5 days for privacy.",
    tips: [
      "Download important transcripts before expiration",
      "Use search to quickly find specific transcripts",
      "Sort by date, duration, or confidence",
    ],
  },
];

export const features = [
  {
    title: "Speaker Diarization",
    icon: Users,
    description:
      "Our AI automatically detects when different people are speaking and labels each speaker consistently throughout the transcript.",
    details: [
      "Identifies up to 10+ distinct speakers",
      "Works best when speakers take turns (minimal cross-talk)",
      "Labels are consistent: Speaker A remains Speaker A throughout",
      "Accuracy improves with clear audio and distinct voices",
    ],
  },
  {
    title: "Word-Level Timestamps",
    icon: Clock,
    description:
      "Every word in your transcript includes precise timing information, perfect for creating subtitles or syncing with video.",
    details: [
      "Timestamps accurate to the second",
      "Click any timestamp to copy it",
      "Useful for video editing and subtitle creation",
      "Navigate long transcripts quickly",
    ],
  },
  {
    title: "Confidence Scoring",
    icon: Star,
    description:
      "Each word receives a confidence score indicating how certain the AI is about its accuracy. Low-confidence words are highlighted for review.",
    details: [
      "Scores range from 0% to 100%",
      "Words below 70% are marked for review",
      "Average confidence shown in transcript metadata",
      "Helps identify sections that may need manual review",
    ],
  },
  {
    title: "Export Formats",
    icon: Download,
    description:
      "Download your transcripts in multiple formats to suit your workflow.",
    details: [
      "DOCX: Formatted Word document with speaker labels",
      "TXT: Plain text for simple use cases",
      "JSON: Coming soon for developers",
      "SRT: Coming soon for subtitles",
    ],
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
          "No account is required! Simply upload your audio and get your transcript. Your data is stored locally in your browser for privacy.",
      },
      {
        title: "Is TransAUDIO free to use?",
        content:
          "We're currently in beta with generous free usage limits. Pricing details will be announced at launch.",
      },
      {
        title: "What languages are supported?",
        content:
          "Currently we support English only. Multi-language support is coming soon, starting with Spanish, French, and German.",
      },
    ],
  },
  {
    title: "Technical Questions",
    faqs: [
      {
        title: "What audio formats do you support?",
        content:
          "We support MP3, M4A, WAV, FLAC, and OGG formats. Maximum file size is 80 MB and maximum duration is 90 minutes.",
      },
      {
        title: "How accurate is the transcription?",
        content:
          "Accuracy varies with audio quality but typically ranges from 85-95%. Clear audio with minimal background noise produces the best results. Each word includes a confidence score to help you identify potential errors.",
      },
      {
        title: "How long does processing take?",
        content:
          "Processing typically takes 1-3 minutes depending on audio length and quality. You'll see real-time progress updates during processing.",
      },
      {
        title: "Can I transcribe audio from YouTube or podcasts?",
        content:
          "Currently, you need to provide a direct download link to an audio file. Our browser extension for YouTube and Spotify is coming soon.",
      },
    ],
  },
  {
    title: "Privacy & Security",
    faqs: [
      {
        title: "How is my data stored?",
        content:
          "Transcripts are stored locally in your browser using IndexedDB. Audio files are temporarily stored in the cloud during processing and deleted within 24 hours.",
      },
      {
        title: "Who can access my transcripts?",
        content:
          "Only you can access your transcripts. They're stored locally in your browser and never shared with anyone without your explicit permission.",
      },
      {
        title: "How long are transcripts kept?",
        content:
          "Transcripts expire after 5 days for privacy reasons. Download important transcripts before they expire. We're working on optional longer retention periods.",
      },
      {
        title: "Is my audio data encrypted?",
        content:
          "Yes, all audio files are encrypted during upload and processing. We use industry-standard encryption (AES-256) for data at rest and TLS for data in transit.",
      },
    ],
  },
  {
    title: "Features & Capabilities",
    faqs: [
      {
        title: "How does speaker identification work?",
        content:
          "Our AI analyzes voice characteristics like pitch, tone, and rhythm to identify when different speakers are talking. It works best with clear audio where speakers take turns (minimal cross-talk).",
      },
      {
        title: "Can I edit transcripts?",
        content:
          "Currently, editing within the app is not available. Download as DOCX to edit in Microsoft Word or another word processor. In-app editing is planned for a future update.",
      },
      {
        title: "What export formats are available?",
        content:
          "You can download transcripts as DOCX (Word document with formatting) or TXT (plain text). JSON and SRT subtitle formats are coming soon.",
      },
      {
        title: "Can I search within transcripts?",
        content:
          "Yes! Use the search function in the transcript viewer to find specific words or phrases. This works across all your transcripts in 'My Transcripts'.",
      },
    ],
  },
];

export const troubleshooting = [
  {
    title: "Upload Issues",
    icon: Upload,
    problems: [
      {
        issue: "File upload fails or gets stuck",
        solution:
          "Check your internet connection and try again. Ensure your file is under 80 MB and in a supported format (MP3, M4A, WAV, FLAC, OGG). Clear your browser cache if the issue persists.",
      },
      {
        issue: "Unsupported format error",
        solution:
          "Convert your audio to MP3, M4A, WAV, FLAC, or OGG format. Free converters like Audacity or online tools can help with this.",
      },
      {
        issue: "File too large error",
        solution:
          "Compress your audio file or split it into smaller segments. Most audio editing software can help reduce file size while maintaining quality.",
      },
    ],
  },
  {
    title: "Transcription Quality",
    icon: Mic,
    problems: [
      {
        issue: "Poor transcription accuracy",
        solution:
          "Ensure audio is clear with minimal background noise. Check that speakers are speaking clearly and at a moderate pace. Re-record in a quieter environment if possible.",
      },
      {
        issue: "Speakers not identified correctly",
        solution:
          "Speaker identification works best when speakers take clear turns talking. Reduce cross-talk and ensure distinct voices. Very similar voices may be harder to distinguish.",
      },
      {
        issue: "Missing timestamps or incorrect timing",
        solution:
          "This can happen with very poor audio quality or extreme background noise. Try enhancing your audio with noise reduction before uploading.",
      },
    ],
  },
  {
    title: "Download & Export Problems",
    icon: Download,
    problems: [
      {
        issue: "Download button doesn't work",
        solution:
          "Ensure your browser allows downloads from our site. Check your pop-up blocker settings. Try a different browser if the issue persists.",
      },
      {
        issue: "Downloaded file is corrupted or won't open",
        solution:
          "Try downloading again. Ensure you have the appropriate software (Microsoft Word for DOCX, any text editor for TXT). Contact support if the issue continues.",
      },
      {
        issue: "Can't find downloaded file",
        solution:
          "Check your browser's default download folder (usually 'Downloads'). Look for files named 'transcript_[date].[format]'.",
      },
    ],
  },
  {
    title: "Browser & Performance",
    icon: Settings,
    problems: [
      {
        issue: "Page loads slowly or freezes",
        solution:
          "Close unused browser tabs and applications. Clear your browser cache. Ensure you're using the latest version of Chrome, Firefox, Safari, or Edge.",
      },
      {
        issue: "Transcripts not saving or disappearing",
        solution:
          "Check that your browser allows local storage and IndexedDB. Don't use incognito/private mode as data won't persist. Remember transcripts expire after 5 days.",
      },
      {
        issue: "Features not working properly",
        solution:
          "Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R). Disable browser extensions that might interfere. Try a different browser to isolate the issue.",
      },
    ],
  },
];
