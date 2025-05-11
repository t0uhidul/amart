export function slugify(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9]/g, "") // Remove special characters
    .replace(/\s+/g, "") // Remove spaces
    .toLowerCase();
}
