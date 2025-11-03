import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ScrollToTop } from "./components/scroll-to-top";
import { NavBar } from "./components/navbar";
import { Footer } from "./components/footer";
import { Progress } from "./components/progress";
import { Separator } from "./components/separator";
import { Home } from "./pages/home";
import { Transcripts } from "./pages/transcripts";
import { TranscriptContent } from "./pages/transcript-content";
import { Statement } from "./components/statement";
import { NotFound } from "./pages/404";

function App() {
  return (
    <HelmetProvider>
      <NavBar />
      <Separator />
      <div
        className="w-full max-w-3xl"
        style={{ minHeight: "calc(-500px + 100vh)" }}
      >
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/transcripts" element={<Transcripts />} />
            <Route path="/transcript" element={<TranscriptContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
      <div className="h-24 w-fit flex items-center justify-center opacity-40">
        {"⋯"}
      </div>
      <Progress />
      <Separator margin="my-4" />
      <Statement />
      <Separator />
      <Footer />
    </HelmetProvider>
  );
}

export default App;
