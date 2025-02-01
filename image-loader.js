export default function imageLoader({ src, width, quality }) {
  // Handle absolute URLs (e.g., external images)
  if (src.startsWith('http')) {
    return src;
  }

  // For local images in static export
  const relativeSrc = src.startsWith('/') ? src.slice(1) : src;
  return `/${relativeSrc}?w=${width}&q=${quality || 75}`;
}