"use client";

import { useEffect, useState } from "react";

export default function TestAPIPage() {
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
    const url = `${process.env.NEXT_PUBLIC_API_URL}/artist/featuredArtists`;

    fetch(url, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        return res.json();
      })
      .then((data) => setResult(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>API Test</h1>
      <p>
        API URL: <code>{process.env.NEXT_PUBLIC_API_URL}</code>
      </p>
      <p>
        Request: <code>/artist/featuredArtists</code>
      </p>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}
      {result && (
        <pre style={{ whiteSpace: "pre-wrap" }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
      {!error && !result && <div>Loading...</div>}
    </div>
  );
}
