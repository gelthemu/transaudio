import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ errorInfo });

    // Analytics placeholder for error tracking
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("app:error", {
          detail: { error: error.message, stack: error.stack },
        }),
      );
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleGoHome = () => {
    window.location.href = "/home";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="w-full h-full min-h-dvh flex items-center justify-center p-4">
          <div className="max-w-md w-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="flex flex-col items-center justify-center space-y-2">
              <div>
                <AlertTriangle className="h-5 w-5 text-error" />
              </div>
              <h1 className="text-2xl font-bold text-error">
                Something went wrong
              </h1>
              <p className="text-muted text-sm">
                Please try again or return to the home page.
              </p>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="w-full p-4 bg-muted/20 text-left overflow-auto">
                <p className="text-sm font-mono text-error whitespace-pre-wrap">
                  {"Error Details: " + this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={this.handleReset} variant="outline">
                Try Again
              </Button>
              <Button onClick={this.handleGoHome}>Go to Home</Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
