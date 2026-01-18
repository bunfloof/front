"use client";

import { ReactNode } from "react";

type TheoremType =
  | "theorem"
  | "lemma"
  | "definition"
  | "proposition"
  | "corollary"
  | "proof";

interface TheoremProps {
  type: TheoremType;
  title?: string;
  id?: string;
  children: ReactNode;
}

const typeLabels: Record<TheoremType, string> = {
  theorem: "Theorem",
  lemma: "Lemma",
  definition: "Definition",
  proposition: "Proposition",
  corollary: "Corollary",
  proof: "Proof",
};

export function Theorem({ type, title, id, children }: TheoremProps) {
  const label = typeLabels[type];

  if (type === "proof") {
    return (
      <div id={id} className="my-4" style={{ color: "var(--themed-text)" }}>
        <em>{label}.</em> {children}
        <div className="text-right mt-2">∎</div>
      </div>
    );
  }

  return (
    <div id={id} className="my-4" style={{ color: "var(--themed-text)" }}>
      <strong>{label}</strong>
      {title && <span> ({title})</span>}
      <strong>.</strong>{" "}
      {children}
    </div>
  );
}
