/* File for env related operations */

// Assign environment variables to a constant for easier access and type safety
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

if (!apiUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined in environment variables");
}

if (!turnstileSiteKey) {
  throw new Error("NEXT_PUBLIC_TURNSTILE_SITE_KEY is not defined in environment variables");
}

export const env = {
  apiUrl,
  turnstileSiteKey,
};
