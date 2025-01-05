export function generateDescription(
  text: string,
  maxLength: number = 150
): string {
  const finalText = text.replace(/<\/?[^>]+(>|$)/g, ""); // حذف تگ‌های HTML

  if (finalText.length <= maxLength) {
    return finalText;
  }
  return finalText.slice(0, maxLength).trim() + "...";
}
