import { lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/layout/layout";
import { getOrCreateSession } from "@/utils/session-manager";

const Home = lazy(() => import("@/pages/home"));
const Prompt = lazy(() => import("@/pages/i/prompt"));
const Scripts = lazy(() => import("@/pages/scripts"));
const Script = lazy(() => import("@/pages/i/script"));
const About = lazy(() => import("@/pages/i/about"));
const Docs = lazy(() => import("@/pages/resources/docs"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime:
        import.meta.env.NODE_ENV !== "production" ? 0 : 2.5 * 60 * 1000,
      retry: 1,
    },
  },
});

const SessionInitializer = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    getOrCreateSession();
  }, []);

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <div className="w-full h-full">
          <Router>
            <SessionInitializer>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/home" replace />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/i/prompt" element={<Prompt />} />
                  <Route path="/scripts" element={<Scripts />} />
                  <Route path="/i/script" element={<Script />} />
                  <Route path="/i/about" element={<About />} />
                  <Route path="/resources/docs" element={<Docs />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </Layout>
            </SessionInitializer>
          </Router>
        </div>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
