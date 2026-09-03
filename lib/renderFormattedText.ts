/**
 * Converts raw text with line breaks (\n) and HTML span tags (<span style="color: ...">)
 * into formatted HTML string suitable for dangerouslySetInnerHTML.
 */
export function formatHtmlContent(text?: string | null): string {
  if (!text) return '';

  // If text already contains HTML tags (like <span or <p or <br), preserve them
  // and convert plain newlines to <br /> if not wrapped in tags.
  let formatted = text;

  // Replace double newlines with paragraphs/breaks
  formatted = formatted.replace(/\r\n/g, '\n');

  // Convert newlines to <br /> if there are no block level tags
  if (!/<p\b|<div\b|<br\s*\/?>/i.test(formatted)) {
    formatted = formatted.replace(/\n/g, '<br />');
  }

  return formatted;
}
