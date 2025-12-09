import React from "react";

// Decipher mapping for the scrambled font
const decipher: Record<string, string> = {
  "0": "8",
  "1": "5",
  "2": "9",
  "3": "7",
  "4": "4",
  "5": "0",
  "6": "6",
  "7": "2",
  "8": "3",
  "9": "1",
  a: "w",
  b: "k",
  c: "b",
  d: "y",
  e: "u",
  f: "m",
  g: "q",
  h: "c",
  i: "i",
  j: "z",
  k: "p",
  l: "o",
  m: "v",
  n: "g",
  o: "n",
  p: "t",
  q: "r",
  r: "s",
  s: "h",
  t: "f",
  u: "e",
  v: "d",
  w: "x",
  x: "l",
  y: "j",
  z: "a",
  A: "U",
  B: "B",
  C: "V",
  D: "N",
  E: "M",
  F: "J",
  G: "X",
  H: "D",
  I: "S",
  J: "K",
  K: "T",
  L: "C",
  M: "Y",
  N: "A",
  O: "G",
  P: "W",
  Q: "R",
  R: "E",
  S: "H",
  T: "Q",
  U: "L",
  V: "Z",
  W: "F",
  X: "P",
  Y: "O",
  Z: "I",
};
function encode(text: string): string {
  return text
    .split("")
    .map((char) => decipher[char] || char)
    .join("");
}

interface ScrambledTextProps {
  children: string;
  className?: string;
}

export function ScrambledText({
  children,
  className = "",
}: ScrambledTextProps) {
  const encoded = encode(children);

  return (
    <span
      className={`scrambled-font ${className}`}
      style={{ fontFamily: "Geist-Regular-scrambled, sans-serif" }}
    >
      {encoded}
    </span>
  );
}
