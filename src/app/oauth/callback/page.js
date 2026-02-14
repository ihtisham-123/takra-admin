"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white">
          <div className="w-16 h-16 border-4 border-red-800/20 border-t-red-800 rounded-full animate-spin"></div>
        </div>
      }
    >
      <OAuthCallbackContent />
    </Suspense>
  );
}

function OAuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Processing authentication...");

  useEffect(() => {
    const handleCallback = async () => {
      const accessToken = searchParams.get("accessToken");
      const refreshToken = searchParams.get("refreshToken");
      const error = searchParams.get("error");

      if (error) {
        setStatus("error");
        setMessage("Authentication failed. Please try again.");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      if (!accessToken || !refreshToken) {
        setStatus("error");
        setMessage("Invalid authentication response.");
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      try {
        // Send tokens to our API to set cookies
        const res = await fetch("/api/auth/oauth/callback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, refreshToken }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to authenticate");
        }

        setStatus("success");
        setMessage("Authentication successful! Redirecting...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1000);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Authentication failed");
        setTimeout(() => router.push("/login"), 2000);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Top Banner */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-900 via-red-800 to-red-900"></div>
      <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center p-8">
        {/* Status Icon */}
        <div className="mb-6">
          {status === "processing" && (
            <div className="w-16 h-16 mx-auto border-4 border-red-800/20 border-t-red-800 rounded-full animate-spin"></div>
          )}
          {status === "success" && (
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
        </div>

        {/* Status Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {status === "processing" && "Authenticating..."}
          {status === "success" && "Success!"}
          {status === "error" && "Authentication Failed"}
        </h1>

        {/* Message */}
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
