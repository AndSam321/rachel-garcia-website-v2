const SHIFT = 7;
const LOW = 33;
const HIGH = 126;
const RANGE = HIGH - LOW + 1;

function shiftChar(code: number, by: number): number {
  if (code < LOW || code > HIGH) return code;
  return ((code - LOW + by + RANGE) % RANGE) + LOW;
}

export function encodeEmail(plain: string): string {
  return Array.from(plain, (ch) =>
    String.fromCharCode(shiftChar(ch.charCodeAt(0), SHIFT)),
  ).join("");
}

export function decodeEmail(encoded: string): string {
  return Array.from(encoded, (ch) =>
    String.fromCharCode(shiftChar(ch.charCodeAt(0), -SHIFT)),
  ).join("");
}
