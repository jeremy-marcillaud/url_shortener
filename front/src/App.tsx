import { Ad } from "./components/link/add/add";
import { UrlShortener } from "./components/link/url-shortener";

export function App() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8 bg-gradient-to-br from-violet-200 via-purple-100 to-cyan-200 px-4 py-8">
      <Ad width={800} height={250} />
      <div className="flex w-full max-w-5xl items-start justify-center gap-8">
        <UrlShortener />
        <Ad width={400} height={400} />
      </div>
    </div>
  );
}
