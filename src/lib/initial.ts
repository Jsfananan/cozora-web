/** First letter of a name, skipping emoji and symbols so server and client render the same character. */
export function initialOf(name: string): string {
  const m = name.match(/\p{L}/u);
  return (m ? m[0] : name.charAt(0)).toUpperCase();
}
