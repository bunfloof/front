"use client";

import { ReactNode } from "react";

interface AlgorithmProps {
  title: string;
  children: ReactNode;
}

export function Algorithm({ title, children }: AlgorithmProps) {
  return (
    <figure className="my-8">
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          borderColor: "var(--themed-border)",
          backgroundColor: "var(--themed-bg-secondary)",
        }}
      >
        <div
          className="px-4 py-2 border-b font-mono text-sm"
          style={{
            borderColor: "var(--themed-border)",
            color: "var(--themed-heading)",
            backgroundColor: "var(--themed-bg)",
          }}
        >
          <span className="font-bold">Algorithm:</span> {title}
        </div>
        <div className="p-4 font-mono text-sm" style={{ color: "var(--themed-text)" }}>
          {children}
        </div>
      </div>
    </figure>
  );
}

export function AlgLine({
  indent = 0,
  children,
}: {
  indent?: number;
  children: ReactNode;
}) {
  return (
    <div style={{ paddingLeft: `${indent * 1.5}rem` }} className="py-0.5">
      {children}
    </div>
  );
}

export function Keyword({ children }: { children: ReactNode }) {
  return (
    <span className="font-bold" style={{ color: "var(--themed-text)" }}>
      {children}
    </span>
  );
}

export function Func({ children }: { children: ReactNode }) {
  return (
    <span className="font-semibold" style={{ color: "var(--themed-text)" }}>
      {children}
    </span>
  );
}
