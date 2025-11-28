"use client";

import { useCallback, useEffect } from "react";

interface GlobalErrorProps {
  error: globalThis.Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  const handleGoHome = useCallback(() => {
    window.location.href = "/";
  }, []);

  return (
    <html lang="ja">
      <body>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            fontFamily: "sans-serif",
            padding: "1rem",
          }}
        >
          <div
            style={{
              maxWidth: "400px",
              textAlign: "center",
              padding: "2rem",
              border: "1px solid #e5e5e5",
              borderRadius: "8px",
            }}
          >
            <h2
              style={{
                color: "#ef4444",
                marginBottom: "1rem",
              }}
            >
              重大なエラーが発生しました
            </h2>
            <p
              style={{
                color: "#666",
                marginBottom: "1rem",
              }}
            >
              申し訳ございません。アプリケーションで予期しないエラーが発生しました。
            </p>
            {error.digest && (
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#999",
                  marginBottom: "1rem",
                }}
              >
                エラーID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              type="button"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#18181b",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "0.5rem",
              }}
            >
              もう一度試す
            </button>
            <button
              onClick={handleGoHome}
              type="button"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#fff",
                color: "#18181b",
                border: "1px solid #e5e5e5",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ホームに戻る
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
