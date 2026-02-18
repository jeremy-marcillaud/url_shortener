import { useEffect, useState } from "react";

interface Ad {
  id: string;
  imageUrl: string;
  link: string;
  width: number;
  height: number;
}

interface AddProps {
  width: number;
  height: number;
}

export const Ad = ({ width, height }: AddProps) => {
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    async function fetchAd() {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/ads/img?width=${width}&height=${height}`
      );
      if (!response.ok) return;
      const data = (await response.json()) as Ad;
      setAd(data);
    }
    fetchAd();
  }, [width, height]);

  if (!ad) return null;

  return (
    <a href={ad.link} target="_blank" rel="noopener noreferrer">
      <img
        src={ad.imageUrl}
        width={width}
        height={height}
        alt="Advertisement"
        style={{
          display: "block",
          width: `${width}px`,
          height: `${height}px`,
          objectFit: "cover",
        }}
      />
    </a>
  );
};
