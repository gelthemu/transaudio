import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

// Analytics event types
export type AnalyticsEvent = 
  | "page_view"
  | "file_upload"
  | "url_submit"
  | "transcript_download"
  | "transcript_delete"
  | "transcript_view"
  | "search"
  | "faq_expand"
  | "newsletter_signup"
  | "social_share"
  | "error"
  | "cookie_consent";

interface EventData {
  [key: string]: string | number | boolean | undefined;
}

// Analytics hook for tracking events
export const useAnalytics = () => {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackEvent("page_view", {
      path: location.pathname,
      search: location.search,
      title: document.title,
    });
  }, [location]);

  return { trackEvent };
};

// Standalone tracking function
export const trackEvent = (event: AnalyticsEvent, data?: EventData) => {
  // Console log in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics] ${event}`, data);
  }

  // Dispatch custom event for analytics integrations
  window.dispatchEvent(
    new CustomEvent("app:analytics", {
      detail: {
        event,
        data,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    })
  );

  // Placeholder for actual analytics integration
  // Example: Google Analytics, Mixpanel, PostHog, etc.
  // 
  // if (typeof gtag !== 'undefined') {
  //   gtag('event', event, data);
  // }
  //
  // if (typeof mixpanel !== 'undefined') {
  //   mixpanel.track(event, data);
  // }
};

// Hook for tracking conversion funnel
export const useConversionFunnel = () => {
  const trackStep = useCallback((step: string, metadata?: EventData) => {
    trackEvent("page_view", {
      funnel_step: step,
      ...metadata,
    });
  }, []);

  return { trackStep };
};

// Hook for tracking user interactions
export const useInteractionTracking = () => {
  const trackClick = useCallback((element: string, metadata?: EventData) => {
    trackEvent("page_view", {
      interaction: "click",
      element,
      ...metadata,
    });
  }, []);

  const trackHover = useCallback((element: string, metadata?: EventData) => {
    trackEvent("page_view", {
      interaction: "hover",
      element,
      ...metadata,
    });
  }, []);

  return { trackClick, trackHover };
};

// Global analytics listener setup
export const initializeAnalytics = () => {
  // Listen for custom analytics events
  window.addEventListener("app:analytics", ((event: CustomEvent) => {
    const { detail } = event;
    
    // Store in session for debugging
    const events = JSON.parse(sessionStorage.getItem("analytics_events") || "[]");
    events.push(detail);
    // Keep only last 100 events
    if (events.length > 100) events.shift();
    sessionStorage.setItem("analytics_events", JSON.stringify(events));
  }) as EventListener);

  // Track errors
  window.addEventListener("error", (event) => {
    trackEvent("error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    });
  });

  // Track unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    trackEvent("error", {
      type: "unhandled_rejection",
      message: String(event.reason),
    });
  });
};
