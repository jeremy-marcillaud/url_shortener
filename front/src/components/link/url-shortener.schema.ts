import { z } from "zod/v4";

export const formSchema = z.object({
  url: z
    .url("Please enter a valid URL (e.g. https://example.com)")
    .refine((url) => url.startsWith("http://") || url.startsWith("https://"), {
      message: "Only HTTP and HTTPS URLs are allowed",
    }),
});

export const shortenResponseSchema = z.object({
  shortUrl: z.string(),
});
