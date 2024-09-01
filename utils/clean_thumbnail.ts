export const cleanThumbnailUrl = (url: string | null): string | null => {
  if (url) {
    const prefix = "image/upload/";
    // Check if the URL starts with the prefix and remove it
    if (url.startsWith(prefix)) {
      return url.substring(prefix.length); // Remove the prefix
    }
    // If not, handle cases where the URL might already be properly formatted
    return url;
  }
  return null;
};
