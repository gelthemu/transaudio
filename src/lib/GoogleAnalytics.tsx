import React from "react";
import Script from "next/script";

const GoogleAnalytics = ({ ga_id }: { ga_id: string }) => {
  return (
    <Script
      strategy="afterInteractive"
      src={`https://www.googletagmanager.com/gtag/js?id=${ga_id}`}
    />
  );
};

export default GoogleAnalytics;
