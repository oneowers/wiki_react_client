// Returns a safe <img src="..."> value for both:
// - public image URLs
// - private Vercel Blob URLs (requires our backend proxy endpoint)
export const getImgSrc = (img) => {
  if (!img || typeof img !== 'string') return '';

  // Preview blob/object URLs (from file input) should be used as-is
  if (img.startsWith('data:') || img.startsWith('blob:')) return img;

  // External URL
  if (img.startsWith('http')) {
    // Private Vercel Blob URLs look like: https://<store>.private.blob.vercel-storage.com/<pathname>
    if (img.includes('.private.blob.vercel-storage.com/')) {
      const url = new URL(img);
      const pathname = url.pathname.replace(/^\/+/, '');
      return `${process.env.REACT_APP_API_URL}/api/blob?pathname=${encodeURIComponent(pathname)}`;
    }
    return img;
  }

  // Relative path stored in DB (local storage case)
  return `${process.env.REACT_APP_API_URL}${img}`;
};

