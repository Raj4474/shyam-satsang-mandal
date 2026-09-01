export function generateSlug(text: string, fallbackPrefix: string = 'item'): string {
  if (!text || text.trim() === '') {
    return `${fallbackPrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }

  // Sanitize text for slug
  const cleanText = text
    .trim()
    .toLowerCase()
    .replace(/[^\w\u0A80-\u0AFF\s-]/g, '') // Keep alphanumeric & Gujarati characters
    .replace(/[\s_]+/g, '-')               // Replace spaces with hyphens
    .replace(/^-+|-+$/g, '');             // Trim leading/trailing hyphens

  if (!cleanText || cleanText.length === 0) {
    return `${fallbackPrefix}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  }

  // To guarantee uniqueness in database tables with 1000+ items
  return `${cleanText}-${Date.now().toString(36)}`;
}
