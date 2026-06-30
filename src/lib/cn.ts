// ponytail: dependency-free class joiner. No tailwind-merge; we are disciplined
// about not piling conflicting utilities on the same element.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
