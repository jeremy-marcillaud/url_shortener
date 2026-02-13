import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setShortUrl("");
    setCopied(false);

    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL (e.g. https://example.com)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/links/shorten`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: "Failed to shorten URL" }));
        throw new Error(errorData.message || `Error: ${response.statusText}`);
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to shorten URL. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setUrl("");
    setShortUrl("");
    setCopied(false);
    setError("");
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
    } catch {
      setError("Failed to copy to clipboard");
    }
  }

  return (
    <Card className="w-full max-w-xl text-lg">
      <CardHeader className="pb-6 pt-8 px-8">
        <CardTitle className="text-3xl">URL Shortener</CardTitle>
        <CardDescription className="text-base mt-1">
          Paste a long URL to get a short link.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url" className="text-base">
              Long URL
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="h-12 text-base"
            />
            {error && <p className="text-base text-destructive">{error}</p>}
          </div>

          {shortUrl ? (
            <Button
              type="button"
              className="w-full h-12 text-base"
              onClick={handleReset}
            >
              Shorten another URL
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={loading || !url.trim()}
            >
              {loading ? "Shortening..." : "Shorten"}
            </Button>
          )}
        </form>

        {shortUrl && (
          <div className="rounded-md border bg-muted/50 p-4 space-y-3">
            <p className="text-base text-muted-foreground">Your short link</p>
            <div className="flex items-center gap-2">
              <Input
                readOnly
                value={shortUrl}
                className="flex-1 text-base h-12"
              />
              <Button variant="outline" size="lg" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
