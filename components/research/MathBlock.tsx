"use client";

import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";

interface MathBlockProps {
  children: string;
  display?: boolean;
}

export function Math({ children, display = false }: MathBlockProps) {
  if (display) {
    return (
      <div className="my-4 overflow-x-auto">
        <BlockMath math={children} />
      </div>
    );
  }
  return <InlineMath math={children} />;
}

export function BlockMathDisplay({ children }: { children: string }) {
  return (
    <div className="my-4 overflow-x-auto">
      <BlockMath math={children} />
    </div>
  );
}
