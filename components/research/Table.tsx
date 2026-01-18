"use client";

import { ReactNode } from "react";

interface TableProps {
  caption?: string;
  children: ReactNode;
}

export function Table({ caption, children }: TableProps) {
  return (
    <figure className="my-8 overflow-x-auto">
      <table
        className="w-full text-sm border-collapse"
        style={{ color: "var(--themed-text)" }}
      >
        {children}
      </table>
      {caption && (
        <figcaption
          className="mt-3 text-sm text-center"
          style={{ color: "var(--themed-text-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function THead({ children }: { children: ReactNode }) {
  return (
    <thead
      style={{
        borderBottom: "2px solid var(--themed-border-strong)",
      }}
    >
      {children}
    </thead>
  );
}

export function TBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children }: { children: ReactNode }) {
  return (
    <tr
      className="border-b transition-colors hover:bg-opacity-50"
      style={{ borderColor: "var(--themed-border)" }}
    >
      {children}
    </tr>
  );
}

export function Th({ children, align = "left" }: { children: ReactNode; align?: "left" | "center" | "right" }) {
  return (
    <th
      className="px-4 py-3 font-semibold"
      style={{
        textAlign: align,
        color: "var(--themed-heading)",
      }}
    >
      {children}
    </th>
  );
}

export function Td({ children, align = "left" }: { children: ReactNode; align?: "left" | "center" | "right" }) {
  return (
    <td className="px-4 py-3" style={{ textAlign: align }}>
      {children}
    </td>
  );
}
