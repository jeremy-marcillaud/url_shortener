import { UrlShortener } from "@/components/url-shortener";

export function App() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-200 via-purple-100 to-cyan-200 px-4">
      <UrlShortener />
    </div>
  );
}
