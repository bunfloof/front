"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  caption?: string;
}

export function CodeBlock({ children, language = "rust", caption }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <figure className="my-6">
      <div
        className="rounded-lg overflow-hidden border"
        style={{
          borderColor: "var(--themed-border)",
          backgroundColor: "var(--themed-bg-secondary)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b text-xs"
          style={{
            borderColor: "var(--themed-border)",
            backgroundColor: "var(--themed-bg)",
          }}
        >
          <span
            className="font-mono uppercase tracking-wider"
            style={{ color: "var(--themed-text-muted)" }}
          >
            {language}
          </span>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 transition-colors hover:opacity-70 cursor-pointer"
            style={{ color: "var(--themed-text-muted)" }}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        {/* Code */}
        <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
          <code
            className="font-mono"
            style={{ color: "var(--themed-text)" }}
          >
            {children}
          </code>
        </pre>
      </div>
      {caption && (
        <figcaption
          className="mt-2 text-sm text-center italic"
          style={{ color: "var(--themed-text-muted)" }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
