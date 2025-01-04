export function generateUniqueId(): string {
  return `deck-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
} 