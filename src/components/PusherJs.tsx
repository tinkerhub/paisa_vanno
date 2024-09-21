import React from "react";
import Script from "next/script";

export default function PusherJs() {
  return (
    <>
      <Script
        src="https://js.pusher.com/8.0.1/pusher.min.js"
        strategy="lazyOnload" // Loads the script lazily when the browser is idle
        onLoad={() => {
          // Initialize Pusher here if needed
          console.log("Pusher script loaded");
        }}
      />
      {/* Your component code here */}
    </>
  );
}
