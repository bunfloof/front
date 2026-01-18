"use client";

import { ThemedNavbar } from "@/components/ThemedNavbar";
import { ThemedFooter } from "@/components/ThemedFooter";
import { Math, BlockMathDisplay } from "@/components/research/MathBlock";
import { Theorem } from "@/components/research/Theorem";
import { CodeBlock } from "@/components/research/CodeBlock";
import {
  Algorithm,
  AlgLine,
  Keyword,
  Func,
} from "@/components/research/Algorithm";
import { Table, THead, TBody, Tr, Th, Td } from "@/components/research/Table";
import Link from "next/link";
import { ArrowLeft, Share2, Check } from "lucide-react";
import { useState } from "react";
import "./computer-modern.css";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-12 scroll-mt-24">
      <h2
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--themed-heading)" }}
      >
        {title}
      </h2>
      <div className="space-y-4" style={{ color: "var(--themed-text)" }}>
        {children}
      </div>
    </section>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6">
      <h3
        className="text-lg font-bold mb-3"
        style={{ color: "var(--themed-heading)" }}
      >
        {title}
      </h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Reference({
  num,
  authors,
  title,
  venue,
  year,
}: {
  num: number;
  authors: string;
  title: string;
  venue: string;
  year: string;
}) {
  return (
    <li className="text-sm pl-2" style={{ color: "var(--themed-text)" }}>
      <span style={{ color: "var(--themed-text-muted)" }}>[{num}]</span>{" "}
      {authors}. <em>{title}</em>. {venue}, {year}.
    </li>
  );
}

export default function BeroResearchPage() {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="font-sans min-h-screen transition-colors duration-300"
      style={{ backgroundColor: "var(--themed-bg)" }}
    >
      <ThemedNavbar />

      {/* Header */}
      <header
        className="pt-32 pb-8"
        style={{ borderColor: "var(--themed-border)" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/research"
            className="inline-flex items-center gap-1.5 text-sm mb-8 transition-colors hover:opacity-70"
            style={{ color: "var(--themed-text-muted)" }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="font-mono">cd /research</span>
          </Link>

          <div className="text-center paper-content">
            <h1
              className="text-2xl md:text-3xl font-bold mb-2 leading-tight"
              style={{ color: "var(--themed-heading)" }}
            >
              Bero: A Distributed Deduplication Backup System
              <br />
              with Node-Side Content-Defined Chunking
            </h1>
            <p
              className="text-base mb-6 italic"
              style={{ color: "var(--themed-text-muted)" }}
            >
              A Production Analysis from Foxomy Minecraft Hosting Infrastructure
            </p>

            <div className="mb-4" style={{ color: "var(--themed-text)" }}>
              <p>Foxomy Team</p>
              <span className="">
                University of California, Los Angeles
              </span>
              <p>Department of Computer Science</p>
            </div>

            <p style={{ color: "var(--themed-text-muted)" }}>
              January 10, 2026
            </p>

            {/* Draft Disclaimer */}
            <div
              className="mt-6 px-4 py-3 rounded-lg border-l-4"
              style={{
                backgroundColor: "rgba(251, 191, 36, 0.1)",
                borderLeftColor: "#f59e0b",
              }}
            >
              <p
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: "#d97706" }}
              >
                Draft. This document is a work in progress
              </p>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--themed-text-muted)" }}
              >
                New information is currently being written and sections may be
                incomplete or subject to change. Formatting amd content may also
                be broken due to experiemental LaTeX rendering.
              </p>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer hover:opacity-80"
              style={{ color: "var(--themed-text-muted)" }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  Share
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="paper-content">
            {/* Abstract */}
            <section className="mb-10">
              <h2
                className="text-lg font-bold mb-3 text-center"
                style={{ color: "var(--themed-heading)" }}
              >
                Abstract
              </h2>
              <p
                className="text-sm leading-relaxed text-justify"
                style={{ color: "var(--themed-text)" }}
              >
                Keeping backups is an extremely important responsibility for a
                company to protect their data. This paper proposes Bero, an
                off-site distributed backup system deployed in production at
                Foxomy, a game hosting provider with a global presence in
                multiple geographical regions. Foxomy previously used Borg for
                off-site backups, but it could not scale effectively when
                concurrent operations overloaded their storage servers. Bero
                uses content-defined chunking, cryptographic hashing, and
                deduplication computations. Bero addresses this scaling problem
                by allocating computational tasks to each distributed node
                instead of centralized storage servers. After processing, all
                deduplicated chunks are uploaded directly to S3-compatible
                object storage. We provide formal proofs for the distribution of
                chunk size constrained by detected boundaries, derive the
                theoretical deduplication ratio for incremental backup, and
                validate our findings against 30 days of production telemetry in
                Foxomy's infrastructure, demonstrating a 41:1 storage reduction
                ratio.
              </p>
            </section>

            {/* Section 1: Introduction */}
            <Section id="introduction" title="1. Introduction">
              <p>
                Foxomy operates a Minecraft server hosting platform in multiple
                datacenters with dozens of physical nodes, averaging 0-100
                Minecraft server instances each. Each Minecraft server generates
                world data that must be backed up regularly to protect customer
                data and be able to restore successfully. The previous backup
                infrastructure relied on Borg, which did not natively support
                S3, and the computation burden of deduplication was on the
                repository server instead of the backup clients. This design
                became untenable as Foxomy scaled. As multiple nodes initiated
                concurrent backup operations, the central Borg repository
                servers became a severe bottleneck with CPU utilization
                exceeding capacity during peak backup hours, causing backup and
                restoration operations to time out.
              </p>
              <p>
                Bero was developed to address Borg's limitations. There are two
                layers, which is the computational layer and storage layer. The
                computational layer is the nodes themselves, which handles
                content-defined chunking, cryptographic hashing, and
                deduplication. The deduplication index is distributed to all
                nodes to maintain a state that determines content novelty.
                Periodic synchronization across all nodes ensures that servers
                that migrate between physical hosts can be deduplicated
                effectively. The storage layer only acts as a simple object
                store with no computation needed.
              </p>
              <p>
                First, we provide a complete formal specification of BuzHash32
                rolling hash algorithm and prove that chunk boundaries exhibit
                geometric distribution when an expected value is equal to the
                target chunk size. Second, we derive closed-form expressions for
                the resulting expected chunk size and variance to determine
                constrained minimum and maximum chunk sizes. Third, we analyze
                the V2 index format in content-addressable storage and indirect
                object representation for files that exceed single chunk
                capacity. Fourth, we focus on the per-content key derivation
                that secures convergent encryption. Fifth, we present the Bero
                distributed system layer that manages backup operations across
                all nodes. Finally, we validate our theoretical analysis against
                production telemetry data collected over 30 days.
              </p>
            </Section>

            {/* Section 2: System Architecture */}
            <Section id="architecture" title="2. System Architecture Overview">
              <p>
                Bero uses a client-server architecture where the central server
                manages policy and scheduling while the client server performs
                all computationally expensive operations. This section describes
                the high-level architecture before diving into the algorithmic
                details in later sections.
              </p>

              <Subsection title="2.1 The Borg Scaling Problem">
                <p>
                  Foxomy's original Borg implementation has serious performance
                  issues. Borg performs deduplication on the storage server at
                  the repository level, meaning that when a client initiates a
                  backup, raw file data streams to the repository server, which
                  then chunks the data, computes hashes, and determines which
                  chunks are unique. With <Math>N</Math> nodes performing
                  concurrent backups of average size <Math>S</Math> bytes, the
                  repository server must process <Math>{"N \\cdot S"}</Math>{" "}
                  bytes of incoming data, compute approximately{" "}
                  <Math>{"N \\cdot S / A"}</Math> hash operations where{" "}
                  <Math>A</Math> is the average chunk size, and perform{" "}
                  <Math>{"N \\cdot S / A"}</Math> index lookups. For Foxomy's
                  workload with <Math>{"N = 48"}</Math> nodes,{" "}
                  <Math>{"S = 2"}</Math> GB average backup size, and{" "}
                  <Math>{"A = 4"}</Math> MB chunks, this translates to
                  approximately 96 GB of data processing and 24,000 hash
                  computations per backup cycle on a single server.
                </p>
              </Subsection>

              <Subsection title="2.2 Bero's Node-Side Architecture">
                <p>
                  Bero inverts this architecture entirely. Each node runs a
                  local Bero agent that performs chunking, hashing, compression,
                  and deduplication locally. The client maintains a local
                  content index that tracks which content IDs have already been
                  uploaded to the repository. When processing a backup, the
                  client computes chunk boundaries using BuzHash32, hashes each
                  chunk with BLAKE2b-256, checks the local index for content
                  existence, and only uploads unique chunks. The central storage
                  is S3-compatible object storage, which can handle arbitrary
                  concurrent upload throughput limited only by network
                  bandwidth.
                </p>
                <p>
                  The computational load distribution changes dramatically. Each
                  of the <Math>N</Math> nodes processes only its own{" "}
                  <Math>S</Math> bytes of data, computes its own{" "}
                  <Math>{"S/A"}</Math> hashes, and performs its own index
                  lookups against a local data structure. The S3 storage layer
                  handles <Math>N</Math> concurrent upload streams but performs
                  no computation beyond simple PUT operations.
                </p>
              </Subsection>

              <Subsection title="2.3 Policy and Compression Configuration">
                <p>
                  The Bero server manages backup policies through a REST API.
                  Policies specify retention parameters, scheduling intervals,
                  and compression settings. The default compression policy uses
                  Zstandard:
                </p>
                <CodeBlock
                  language="rust"
                  caption="Default compression policy configuration"
                >
                  {`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CompressionPolicy {
    #[serde(rename = "compressorName")]
    pub compressor_name: String,
}

impl Default for CompressionPolicy {
    fn default() -> Self {
        Self {
            compressor_name: "zstd".to_string(),
        }
    }
}`}
                </CodeBlock>
              </Subsection>
              <p>
                Zstd provides an excellent balance between compression ratio and
                throughput for Minecraft world data, which contains highly
                compressible region files alongside less compressible binary
                data.
              </p>
            </Section>

            {/* Section 3: Content-Defined Chunking */}
            <Section id="cdc" title="3. Content-Defined Chunking">
              <p>
                Content-defined chunking partitions an input byte stream into
                variable-length segments where boundary positions are determined
                by the content itself rather than fixed offsets. This approach
                ensures that insertions or deletions in the middle of a file
                affect only nearby chunks, preserving deduplication
                effectiveness across file modifications.
              </p>

              <Subsection title="3.1 Problem Formulation">
                <p>
                  Let <Math>{"D = d_1 d_2 \\cdots d_n"}</Math> be an input byte
                  stream of length <Math>n</Math>. We seek a partitioning{" "}
                  <Math>
                    {
                      "\\mathcal{P} = \\{[s_1, e_1], [s_2, e_2], \\ldots, [s_k, e_k]\\}"
                    }
                  </Math>{" "}
                  such that each partition <Math>{"[s_i, e_i]"}</Math> defines a
                  chunk <Math>{"C_i = d_{s_i} d_{s_i+1} \\cdots d_{e_i}"}</Math>
                  , the partitions are contiguous and non-overlapping with{" "}
                  <Math>{"s_1 = 1"}</Math>, <Math>{"e_k = n"}</Math>, and{" "}
                  <Math>{"s_{i+1} = e_i + 1"}</Math> for all{" "}
                  <Math>{"i < k"}</Math>, and each boundary <Math>{"e_i"}</Math>{" "}
                  for <Math>{"i < k"}</Math> is determined solely by the content
                  of a local window of bytes ending at position{" "}
                  <Math>{"e_i"}</Math>.
                </p>
              </Subsection>

              <Subsection title="3.2 Rolling Hash Functions">
                <p>
                  A rolling hash function <Math>H</Math> computes a fingerprint
                  over a sliding window of <Math>w</Math> bytes such that given{" "}
                  <Math>{"H(d_i \\cdots d_{i+w-1})"}</Math>, the value{" "}
                  <Math>{"H(d_{i+1} \\cdots d_{i+w})"}</Math> can be computed in{" "}
                  <Math>{"O(1)"}</Math> time. Bero implements two rolling hash
                  functions: BuzHash32 (default) and Rabin-Karp64.
                </p>

                <Theorem type="definition" title="BuzHash32 Rolling Hash">
                  <span>
                    Let <Math>{"w = 64"}</Math> be the window size and let{" "}
                    <Math>
                      {"T: \\{0,1,\\ldots,255\\} \\to \\{0,1\\}^{32}"}
                    </Math>{" "}
                    be a table of random 32-bit values indexed by byte value.
                    Define the left rotation operator{" "}
                    <Math>
                      {"\\text{rol}_k(x) = (x \\ll k) \\oplus (x \\gg (32-k))"}
                    </Math>
                    . The BuzHash32 hash of window{" "}
                    <Math>{"b_1 b_2 \\cdots b_w"}</Math> is:
                  </span>
                  <BlockMathDisplay>
                    {
                      "H_{\\text{buz}}(b_1 \\cdots b_w) = \\bigoplus_{j=1}^{w} \\text{rol}_{w-j}(T[b_j])"
                    }
                  </BlockMathDisplay>
                </Theorem>

                <Theorem
                  type="lemma"
                  title="BuzHash Rolling Update"
                  id="lem:buzhash-roll"
                >
                  <span>
                    Given <Math>{"H_{\\text{buz}}(b_1 \\cdots b_w)"}</Math>, the
                    hash of the shifted window{" "}
                    <Math>{"H_{\\text{buz}}(b_2 \\cdots b_{w+1})"}</Math> can be
                    computed as:
                  </span>
                  <BlockMathDisplay>
                    {
                      "H_{\\text{buz}}(b_2 \\cdots b_{w+1}) = \\text{rol}_1(H_{\\text{buz}}(b_1 \\cdots b_w)) \\oplus \\text{rol}_w(T[b_1]) \\oplus T[b_{w+1}]"
                    }
                  </BlockMathDisplay>
                </Theorem>

                <Theorem type="proof">
                  <span>
                    We expand both sides using the definition. The left-hand
                    side is{" "}
                    <BlockMathDisplay>
                      {
                        "\\begin{aligned} H_{\\text{buz}}(b_2 \\cdots b_{w+1}) &= \\bigoplus_{j=1}^{w} \\text{rol}_{w-j}(T[b_{j+1}]) \\\\ &= \\bigoplus_{j=2}^{w+1} \\text{rol}_{w+1-j}(T[b_j]) \\end{aligned}"
                      }
                    </BlockMathDisplay>
                    . For the right-hand side, we first compute{" "}
                    <BlockMathDisplay>
                      {
                        "\\begin{aligned} \\text{rol}_1(H_{\\text{buz}}(b_1 \\cdots b_w)) &= \\text{rol}_1(\\bigoplus_{j=1}^{w} \\text{rol}_{w-j}(T[b_j])) \\\\ &= \\bigoplus_{j=1}^{w} \\text{rol}_{w-j+1}(T[b_j]) \\end{aligned}"
                      }
                    </BlockMathDisplay>{" "}
                    where the second equality follows from the distributivity of{" "}
                    <Math>{"\\text{rol}_1"}</Math> over XOR, which holds because
                    rotation is a linear operation over GF(2)<sup>32</sup>.
                  </span>
                  <p>
                    Now observe that{" "}
                    <Math>
                      {"\\text{rol}_{w-1+1}(T[b_1]) = \\text{rol}_w(T[b_1])"}
                    </Math>{" "}
                    appears in this sum. The XOR self-inverse property states
                    that <Math>{"x \\oplus x = 0"}</Math> for any{" "}
                    <Math>{"x"}</Math>, so
                  </p>
                  <BlockMathDisplay>
                    {
                      "\\text{rol}_1(H) \\oplus \\text{rol}_w(T[b_1]) = \\bigoplus_{j=2}^{w} \\text{rol}_{w-j+1}(T[b_j])"
                    }
                  </BlockMathDisplay>
                  <p>
                    Finally, adding{" "}
                    <Math>{"T[b_{w+1}] = \\text{rol}_w(T[b_{w+1}])"}</Math>{" "}
                    completes the sum, and we verify that{" "}
                    <Math>{"w + 1 - j"}</Math> for{" "}
                    <Math>{"j \\in \\{w-1, w-2, \\ldots, 0\\}"}</Math>, matching
                    the target expression..
                  </p>
                </Theorem>
              </Subsection>

              <Subsection title="3.3 Chunk Boundary Detection">
                <p>
                  Bero determines chunk boundaries using a masking operation on
                  the rolling hash value. Given target average chunk size{" "}
                  <Math>A</Math> that must be a power of two, we define mask{" "}
                  <Math>{"M = A - 1"}</Math> and declare a boundary at position{" "}
                  <Math>i</Math> when:
                </p>
                <BlockMathDisplay>
                  {"H_{\\text{buz}}(d_{i-w+1} \\cdots d_i) \\land M = 0"}
                </BlockMathDisplay>
                <p>
                  where <Math>{"\\land"}</Math> denotes the bitwise AND.
                </p>

                <Theorem
                  type="theorem"
                  title="Chunk Boundary Probability"
                  id="thm:cutprob"
                >
                  <span>
                    Assuming the hash function <Math>{"H_{\\text{buz}}"}</Math>{" "}
                    produces uniformly distributed 32-bit outputs, the
                    probability of a chunk boundary at any given position is:
                  </span>
                  <BlockMathDisplay>
                    {"P(\\text{boundary}) = \\frac{1}{A}"}
                  </BlockMathDisplay>
                </Theorem>

                <Theorem type="proof">
                  <span>
                    The mask <Math>{"M = A - 1"}</Math> where{" "}
                    <Math>{"A = 2^k"}</Math> selects exactly the lowest{" "}
                    <Math>k</Math> bits of the hash value. For a uniformly
                    distributed 32-bit hash, these <Math>k</Math> bits are
                    uniformly distributed over{" "}
                    <Math>{"\\{0, 1, \\ldots, 2^k - 1\\}"}</Math>. The condition{" "}
                    <Math>{"H \\land M = 0"}</Math> is satisfied if and only if
                    all <Math>k</Math> lowest bits are zero, which occurs with
                    probability <Math>{"2^{-k} = 1/A"}</Math>.
                  </span>
                </Theorem>
              </Subsection>

              <Subsection title="3.4 Rust Implementation">
                <p>
                  The following Rust code implements the BuzHash32 algorithm as
                  used in Bero. The random table <Math>{"T"}</Math> is
                  precomputed at compile time.
                </p>
                <CodeBlock
                  language="rust"
                  caption="BuzHash32 implementation in Rust"
                >
                  {`const WINDOW_SIZE: usize = 64;

pub struct BuzHash32 {
    table: [u32; 256],
    window: [u8; WINDOW_SIZE],
    hash: u32,
    pos: usize,
    count: usize,
}

impl BuzHash32 {
    pub fn new(table: [u32; 256]) -> Self {
        Self {
            table,
            window: [0u8; WINDOW_SIZE],
            hash: 0,
            pos: 0,
            count: 0,
        }
    }
    
    #[inline]
    fn rol(x: u32, n: u32) -> u32 {
        (x << n) | (x >> (32 - n))
    }
    
    pub fn update(&mut self, byte: u8) -> u32 {
        let out_byte = self.window[self.pos];
        self.window[self.pos] = byte;
        self.pos = (self.pos + 1) % WINDOW_SIZE;
        
        // Rolling update from Lemma 1
        self.hash = Self::rol(self.hash, 1)
            ^ Self::rol(self.table[out_byte as usize], 
                        WINDOW_SIZE as u32)
            ^ self.table[byte as usize];
        
        self.count += 1;
        self.hash
    }
    
    pub fn is_boundary(&self, mask: u32) -> bool {
        (self.hash & mask) == 0
    }
}`}
                </CodeBlock>
              </Subsection>
            </Section>

            {/* Section 4: Chunk Size Distribution */}
            <Section
              id="distribution"
              title="4. Chunk Size Distribution Analysis"
            >
              <p>
                The stochastic nature of content-defined chunking leads to
                variable chunk sizes. This distrubution method is imporant for
                capacity planning and performance optimization. This section
                derives the theoretical chunk size distribution and validates it
                against empirical measurements from Foxomy's production
                enviroment.
              </p>

              <Subsection title="4.1 Unconstrained Distribution">
                <Theorem
                  type="theorem"
                  title="Geometric Chunk Length Distribution"
                  id="thm:geometric"
                >
                  <span>
                    Under the assumption that hash values are independent and
                    uniformly distributed, the chunk length <Math>L</Math>{" "}
                    follows a geometric distribution with parameter{" "}
                    <Math>{"p = 1/A"}</Math>:
                  </span>
                  <BlockMathDisplay>
                    {
                      "P(L = \\ell) = \\left(1 - \\frac{1}{A}\\right)^{\\ell-1} \\cdot \\frac{1}{A}"
                    }
                  </BlockMathDisplay>
                  <span>
                    for <Math>{"\\ell \\geq 1"}</Math>, with expected value{" "}
                    <Math>{"E[L] = A"}</Math> and variance{" "}
                    <Math>{"\\text{Var}(L) = A(A-1)"}</Math>.
                  </span>
                  <Theorem type="proof">
                    <span>
                      The chunk length <Math>L</Math> equals{" "}
                      <Math>{"\\ell"}</Math> if and only if{" "}
                      <Math>{"\\ell - 1"}</Math> positions after the previous
                      boundary are not boundaries and position{" "}
                      <Math>{"\\ell"}</Math> is a boundary. By independence and
                      Theorem 3.3,
                      <BlockMathDisplay>
                        {
                          "P(L = \\ell) = \\left(1 - \\frac{1}{A}\\right)^{\\ell-1} \\cdot \\frac{1}{A}"
                        }
                      </BlockMathDisplay>
                      <p>
                        This is the probability mass function of a geometric
                        distribution with success probability{" "}
                        <Math>{"p = 1/A"}</Math>. The expected value of a
                        geometric distribution is{" "}
                        <Math>{"E[L] = 1/p = A"}</Math>, and the variance is{" "}
                        <Math>
                          {"Var(L) = (1-p)/p^2 = A(A-1)/A \\cdot A^2 = A(A-1)"}
                        </Math>
                        .
                      </p>
                    </span>
                  </Theorem>
                </Theorem>
              </Subsection>

              <Subsection title="4.2 Constrained Distribution">
                <p>
                  In practice, Bero enforces minimum and maximum chunk size
                  constraints to prevent pathological cases. The constraint
                  tuple <Math>{"(S_{\\min}, A, S_{\\max})"}</Math> with typical
                  values <Math>{"(A/2, A, 2A)"}</Math> constrains chunks so that
                  they are neither too small (which would increase metadata
                  overhead) nor too large (which would reduce deduplication
                  granularity).
                </p>
                <p>
                  Let <Math>{"L^*"}</Math> denote the constrained chunk length.
                  The chunking algorithm operates so that: no boundary is
                  delcared before reaching <Math>{"S_{\\min}"}</Math> bytes, a
                  bounary is declared at the first qualifying position after{" "}
                  <Math>{"S_{\\min}"}</Math>, and if no boundary found by
                  position <Math>{"S_{\\max}"}</Math>,a forced boundary is
                  inserted.
                </p>

                <Theorem
                  type="theorem"
                  title="Constrained Expected Chunk Size"
                  id="thm:constrained"
                >
                  <span>
                    For the constraint tuple{" "}
                    <Math>{"(S_{\\min}, A, S_{\\max}) = (A/2, A, 2A)"}</Math>,
                    the expected constrained chunk size is:
                  </span>
                  <BlockMathDisplay>
                    {
                      "E[L^*] = S_{\\min} + \\frac{1 - (1-p)^{S_{\\max} - S_{\\min}}}{p} - (S_{\\max} - S_{\\min})(1-p)^{S_{\\max} - S_{\\min}}"
                    }
                  </BlockMathDisplay>
                  <span>
                    where <Math>{"p = 1/A"}</Math>. For large <Math>A</Math>,
                    this simplifies to:
                  </span>
                  <BlockMathDisplay>
                    {
                      "E[L^*] \\approx \\frac{A}{2} + A(1 - e^{-3/2}) \\approx 1.11A"
                    }
                  </BlockMathDisplay>
                  <Theorem type="proof">
                    <span>
                      We condition on where the first boundary occurs in the
                      detection window <Math>{"[S_{\\min}, S_{\\max}]"}</Math>.
                      Let <Math>{"W = S_{\\max} - S_{\\min} = 3A/2"}</Math> be
                      the window width. For position{" "}
                      <Math>{"k \\in \\{1, 2, \\ldots, W\\}"}</Math> within this
                      window, the probability that the first boundary occurs at
                      position k is{" "}
                      <BlockMathDisplay>
                        {"P(\\text{first at}\\ k) = (1-p)^{k-1} \\cdot p"}
                      </BlockMathDisplay>
                      The probability that no boundary occurs in the entire
                      window, triggering a forced cut at{" "}
                      <Math>{"S_{\\max}"}</Math> is{" "}
                      <BlockMathDisplay>
                        {"P(\\text{forced}) = (1-p)^W"}
                      </BlockMathDisplay>
                      The expected is therefore
                      <BlockMathDisplay>
                        {
                          "\\begin{aligned} E[L^*] &= \\sum_{k=1}^{W} (S_{\\min} + k) \\cdot (1-p)^{k-1} \\cdot p + S_{\\max} \\cdot (1-p)^W \\\\ &= S_{\\min} \\cdot \\left( \\sum_{k=1}^{W} (1-p)^{k-1} \\cdot p + (1-p)^W \\right) \\\\ &\\quad + \\sum_{k=1}^{W} k \\cdot (1-p)^{k-1} \\cdot p + W \\cdot (1-p)^W \\end{aligned}"
                        }
                      </BlockMathDisplay>
                      The first parenthesized terms equals 1 since it represents
                      the total probability. For the sum involving{" "}
                      <Math>{"k"}</Math>, we use the identity
                      <BlockMathDisplay>
                        {
                          "\\sum_{k=1}^{W} k \\cdot (1-p)^{k-1} \\cdot p = \\frac{1 - (1-p)^W - W \\cdot p \\cdot (1-p)^W}{p}"
                        }
                      </BlockMathDisplay>
                      which can be derived by differentiating the geometric
                      series. Substituting and simplying yields the stated
                      result.
                    </span>
                    <span>
                      For the asympotic approximation, note that{" "}
                      <Math>{"(1-1/A)^{3A/2} \\rightarrow e^{-3/2}"}</Math> as{" "}
                      <Math>{"A \\rightarrow \\infty"}</Math> by the limit
                      definition of <Math>{"e"}</Math>. The dominant terms give
                    </span>
                    <BlockMathDisplay>
                      {
                        "E[L^*] \\approx \\frac{A}{2} + A(1 - e^{-3/2}) = A \\left( \\frac{1}{2} + 1 - e^{-3/2} \\right) \\approx 1.11A"
                      }
                    </BlockMathDisplay>
                  </Theorem>
                </Theorem>
              </Subsection>
              <Subsection title="4.3 Variance of Constrained Distribution">
                <Theorem
                  type="proposition"
                  title="Constrained Variance Bound"
                  id="thm:constrained-variance"
                >
                  <span>
                    The variance of the constrained chunk size satisfies
                  </span>
                  <BlockMathDisplay>
                    {
                      "Var(L^*) \\leq (S_{\\max} - S_{\\min})^2 \\cdot p \\cdot (1-p)"
                    }
                  </BlockMathDisplay>
                  <span>
                    with equality appraoched as{" "}
                    <BlockMathDisplay>
                      {"S_{\\max} \\rightarrow \\infty"}
                    </BlockMathDisplay>
                    .
                  </span>
                  <span>
                    This proof follows from the general principle that
                    truncation reduces variance. The constraint{" "}
                    <Math>{"L^* \\in [S_{\\min}, S_{\\max}]"}</Math> eliminates
                    the tails of the geometric distribution and thus reduces the
                    spread of the outcomes.
                  </span>
                </Theorem>
              </Subsection>
              <Subsection title="4.4 Empirical Validation">
                <p>
                  The follwing table presents empirical chunk statistics
                  collected from Foxomy's production bakcup of 5 MB test files
                  compared against theoretical predictions.
                </p>
                <Table caption="Table 1: Chunk size validation: theoretical vs. empirical">
                  <THead>
                    <Tr>
                      <Th>Target A</Th>
                      <Th align="right">Chunks</Th>
                      <Th align="right">Emp. E[S]</Th>
                      <Th align="right">Thy. E[S]</Th>
                      <Th align="right">Error</Th>
                    </Tr>
                  </THead>
                  <TBody>
                    <Tr>
                      <Td>32 B</Td>
                      <Td align="right">124,235</Td>
                      <Td align="right">40.2 B</Td>
                      <Td align="right">35.5 B</Td>
                      <Td align="right">13.2%</Td>
                    </Tr>
                    <Tr>
                      <Td>1 KB</Td>
                      <Td align="right">3,835</Td>
                      <Td align="right">1,303 B</Td>
                      <Td align="right">1,137 B</Td>
                      <Td align="right">14.6%</Td>
                    </Tr>
                    <Tr>
                      <Td>32 KB</Td>
                      <Td align="right">112</Td>
                      <Td align="right">44,642 B</Td>
                      <Td align="right">36,454 B</Td>
                      <Td align="right">22.4%</Td>
                    </Tr>
                    <Tr>
                      <Td>64 KB</Td>
                      <Td align="right">57</Td>
                      <Td align="right">87,719 B</Td>
                      <Td align="right">72,909 B</Td>
                      <Td align="right">20.3%</Td>
                    </Tr>
                    <Tr>
                      <Td>4 MB</Td>
                      <Td align="right">2</Td>
                      <Td align="right">2.5 MB</Td>
                      <Td align="right">2.2 MB</Td>
                      <Td align="right">13.6%</Td>
                    </Tr>
                  </TBody>
                </Table>
                <p>
                  The empirical values exceed theoretical predictions due to the
                  constraint tuple effect. The theoretical values in the table
                  assume the unconstrained geometric distribution; when
                  accounting for constraints as in Theorem 4.2, the prediction
                  aligns within 1% of observed values.
                </p>
              </Subsection>
            </Section>

            {/* Section 5: Content-Addressable Storage */}
            <Section id="storage" title="5. Content-Addressable Storage">
              <p>
                Bero organizes deduplicated content in a three-tier storage
                hierarchy: content chunks, pack blobs, and indices. This section
                formalizes the storage model and analyzes space overhead.
              </p>

              <Subsection title="5.1 Content Identification">
                <p>
                  Each chunk is identified by a cryptographic hash of its
                  content after compression but before encryption. Bero uses
                  BLAKE2b-256 truncated to 128 bit to provide a 128-bit content
                  idenitifier with negligible collision probability.
                </p>
                <Theorem type="definition" title="Content ID">
                  <span>
                    For a compressed chunk <Math>C</Math>, the content ID is:
                  </span>
                  <BlockMathDisplay>
                    {
                      "\\text{ID}(C) = \\text{prefix} \\| \\text{HMAC-BLAKE2b}(K_{\\text{hmac}}, C)[0:16]"
                    }
                  </BlockMathDisplay>
                  <span>
                    where <Math>{"K_{\\text{hmac}}"}</Math> is a
                    repository-specific secret, HMAC-BLAKE2b denotes keyed
                    BLAKE2b, the notation <Math>{"[0:16]"}</Math> indicates
                    truncation the first 16 bytes (128 bits), and prefix is a
                    single character in the range <Math>{"[g-z]"}</Math> used to
                    distinguish content types.
                  </span>
                  <p>
                    The HMAC construction creates unpredictable content IDs
                    without knowledge of the repository secret, preventing
                    offline attacks against the content-addressable store.
                  </p>
                </Theorem>
              </Subsection>

              <Subsection title="5.2 Pack Blob Structure">
                <p>
                  Individual chunks are agregated into pack blobs to reduce the
                  number of objects sotred in S3 and amoratize per-object
                  overhead. A pack blob contains multiple encrypted chunks
                  concatenated together, with a pack index stored separately.
                </p>
                <Theorem type="definition" title="Pack Blob">
                  <span>
                    A pack blob <Math>B</Math> is a concatenation of encrypted
                    chunks:
                  </span>
                  <BlockMathDisplay>
                    {
                      "B = E_{K_1}(C_1) \\| E_{K_2}(C_2) \\| \\cdots \\| E_{K_m}(C_m)"
                    }
                  </BlockMathDisplay>
                  <span>
                    where <Math>{"E_{K_i}"}</Math> denotes AES-256-GCM
                    encryption with per-content key <Math>{"K_i"}</Math> derived
                    from the content ID, and <Math>{"C_i"}</Math> is the i-th
                    compressed chunk.
                  </span>
                  <p>
                    The maxmium blob size is configurable, with a default of 20
                    MB for Foxomy's S3 backend. This balances upload granularity
                    against object count overhead.
                  </p>
                </Theorem>
              </Subsection>
              <Subsection title="5.3 Index Structure">
                <p>
                  Bero uses a V2 index format that stores content metadata in a
                  compact binary representation. Each index entry occupies
                  between 16 and 19 bytes depending on whether extended fields
                  are present.
                </p>
                <p>
                  The index entry layout consists of a 4-byte timestamp field
                  storing the Unix timestamp of content creation, a 4-byte
                  combined field encoding the pack offset in the lower 26 bits
                  and flags in the upper 6 bits, a 3-byte original length field,
                  a 3-byte packed (compressed) length field, a 2-byte pack blob
                  ID as an offset into a separate pack ID table, and optionally
                  1-3 additional bytes for format ID, extended pack ID, and
                  high-order length bits.
                </p>
              </Subsection>
              <Subsection title="5.4 Indirect Objects">
                <p>
                  Files larger than a single chunk are represented as indirect
                  objects containing references to constituent chunks. The
                  indirect object format uses JSON encoding for portability.
                </p>
                <CodeBlock
                  language="rust"
                  caption="Indirect object structure in Rust"
                >
                  {`#[derive(Debug, Serialize, Deserialize)]
pub struct IndirectObject {
    pub stream: String, // "bero:indirect"
    pub entries: Vec<IndirectEntry>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IndirectEntry {
    #[serde(rename = "s")]
    pub start: i64,      // byte offset
    #[serde(rename = "l")]  
    pub length: i64,     // chunk length
    #[serde(rename = "o")]
    pub object_id: String, // content ID
}`}
                </CodeBlock>
                <p>
                  For a file size of <Math>{"F"}</Math> bytes with average chunk
                  size <Math>{"A"}</Math>, the indirect object contains
                  approximately <Math>{"F/A"}</Math> entries. Each entry
                  requires approximately 50 bytes in JSON representation,
                  yielding an overhead ratio of <Math>{"50F/A"}</Math> which is
                  neglible.
                </p>
              </Subsection>
            </Section>

            {/* Section 6: Encryption Pipeline */}
            <Section id="encryption" title="6. Encryption Pipeline">
              <p>
                Bero implements authenticated encryption using AES-256-GCM with
                per-content key derivation. This section provides a complete
                formal specficiation of the key derivation chain and encryption
                operations.
              </p>

              <Subsection title="6.1 Primary Key Derivation">
                <p>
                  The repository primary key is derived from a user-provided
                  password using the scrypt key derivation function with
                  parameters tuned for security against offline attacks.
                </p>
                <Theorem type="definition" title="Primary Key Derivation">
                  <span>
                    Given password <Math>P</Math> and random salt <Math>S</Math>{" "}
                    of 32 bytes:
                  </span>
                  <BlockMathDisplay>
                    {
                      "K_{\\text{master}} = \\text{scrypt}(P, S, N = 2^{16}, r = 8, p = 1, \\text{len} = 32)"
                    }
                  </BlockMathDisplay>
                  <span>
                    where <Math>N</Math> is the CPU/memory cost parameter
                    requiring <Math>{"128\\cdot N \\cdot r = "}</Math> 128 MB of
                    memory, <Math>r</Math> is the block size parameter, and{" "}
                    <Math>p</Math> is the parallelization parameter.
                  </span>
                </Theorem>
              </Subsection>

              <Subsection title="6.2 Per-Content Key Derivation">
                <p>
                  From the master key, Bero derives purpose-specific keys using
                  HKDF-SHA256 for cryptographic sepration between different
                  operations
                </p>
                <Theorem
                  type="theorem"
                  title="Per-Content Key Security"
                  id="thm:perkey"
                >
                  <span>The encrpytion base key is derived as</span>
                  <BlockMathDisplay>
                    {
                      'K_{\\text{enc}} = \\text{HKDF-SHA256}(K_{\\text{primary}}, \\text{purpose} = \\texttt{"encryption"})'
                    }
                  </BlockMathDisplay>
                </Theorem>
              </Subsection>
              <Subsection title="6.1 Primary Key Derivation">
                <p>
                  Each content chunk is encrypted with a unique key derived from
                  the base encryption key and the content's identifier so that
                  the identical plaintext chunks encrypt to identical ciphertext
                  for convergent encryption while maintaining security.
                </p>
                <Theorem type="definition" title="Per-Content Key Security">
                  <span> The per-content key derivation</span>
                  <BlockMathDisplay>
                    {
                      "K_{\\text{content}} = \\text{HMAC-SHA256}(K_{\\text{enc}}, \\text{content\\_id})"
                    }
                  </BlockMathDisplay>
                  <span>
                    satisfies the following security properties. First,
                    identical content produces identical keys, enabling
                    deduplication of encrypted data. Second, different content
                    produces computationally independent keys under the
                    assumption that HMAC-SHA256 is a secure pseudorandom
                    function. Third, the per-content key is unpredictable
                    without knowledge of <Math>{"K_{\\text{enc}}"}</Math> and
                    prevents plaintext attacks.
                  </span>
                </Theorem>
                <Theorem type="proof">
                  <span>
                    Property (1) follows directly from the determinism of HMAC.
                    For property (2), under the PRF assumption, HMAC-SHA256
                    outputs for distinct inputs are computationally
                    indistinguishable from independent random values. Property
                    (3) follows from the unforgeability of HMAC: without{" "}
                    <Math>{"K_{\\text{enc}}"}</Math>, an adversary cannot
                    compute valid outputs even for chosen content IDs.
                  </span>
                </Theorem>
              </Subsection>
              <Subsection title="6.4 AES-256-GCM Encryption">
                <p>
                  The actual encryption uses AES-256-GCM with a random 12-byte
                  nonce and the content ID as additional authenticated data
                  (AAD).
                </p>
                <CodeBlock
                  language="rust"
                  caption="Per-content encryption in Rust"
                >
                  {`use aes_gcm::{Aes256Gcm, KeyInit, Nonce};
use hmac::{Hmac, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

pub struct ContentEncryptor {
    base_key: [u8; 32],
}

impl ContentEncryptor {
    pub fn encrypt(
        &self,
        content_id: &[u8],
        plaintext: &[u8],
    ) -> Result<Vec<u8>, Error> {
        let mut mac = HmacSha256::new_from_slice(&self.base_key)?;
        mac.update(content_id);
        let per_key: [u8; 32] = mac.finalize().into_bytes().into();
        
        let nonce_bytes: [u8; 12] = rand::random();
        let nonce = Nonce::from_slice(&nonce_bytes);
        
        let cipher = Aes256Gcm::new(&per_key.into());
        let ciphertext = cipher.encrypt_in_place_detached(
            nonce, content_id, plaintext.to_vec()
        )?;
        
        // Output: nonce || ciphertext || tag
        let mut output = Vec::with_capacity(12 + plaintext.len() + 16);
        output.extend_from_slice(&nonce_bytes);
        output.extend_from_slice(&ciphertext);
        Ok(output)
    }
}`}
                </CodeBlock>
                <p>
                  The total encryption overhead is 28 bytes per chunk (12 byte
                  nonce + 16 byte GCM authentication tag).
                </p>
              </Subsection>
            </Section>

            {/* Section 7: Zstandard Compression */}
            <Section id="compression" title="7. Zstandard Compression">
              <p>
                Bero applies Zstandard compression to each chunk before
                encryption. Zstandard provides an excellent balance of
                compression ratio and throughput.
              </p>

              <Subsection title="7.1 Compression Policy">
                <p>
                  The Bero server configures compression policy as part of the
                  backup source setup. The default configuration uses Zstandard
                  at its default compression level, which provides approximately
                  3:1 compression on typical Minecraft world data while
                  maintaining throughput exceeding 400 MB/s on modern hardware.
                </p>
                <CodeBlock
                  language="rust"
                  caption="Policy creation with zstd compression"
                >
                  {`pub fn create_policy_with_options(
    interval_seconds: Option<i64>,
    keep_latest: i32,
    ignore_patterns: Option<Vec<String>>,
) -> Policy {
    let is_manual = interval_seconds.is_none() 
        || interval_seconds == Some(0);
    
    Policy {
        retention: Some(RetentionPolicy {
            keep_latest: Some(keep_latest),
            keep_hourly: Some(0),
            keep_daily: Some(0),
            keep_weekly: Some(0),
            keep_monthly: Some(0),
        }),
        scheduling: Some(SchedulingPolicy {
            interval_seconds: if is_manual { 
                None 
            } else { 
                interval_seconds 
            },
            manual: if is_manual { 
                Some(true) 
            } else { 
                None 
            },
        }),
        // Always use zstd compression
        compression: Some(CompressionPolicy::default()),
        files: ignore_patterns.map(|p| FilesPolicy {
            ignore: if p.is_empty() { 
                None 
            } else { 
                Some(p) 
            },
        }),
    }
}`}
                </CodeBlock>
              </Subsection>

              <Subsection title="7.2 Compression Ratio Analysis">
                <p>
                  Let <Math>{"R_c"}</Math> denote the compression ratio achieved
                  by Zstandard on a given chunk. For Minecraft world data,
                  empirical measurements from Foxomy's production environment
                  show that region files (.mca) compress at approximately{" "}
                  <Math>{"R_c \\approx 4.2"}</Math>, player data files achieve{" "}
                  <Math>{"R_c \\approx 3.1"}</Math>, configuration files achieve{" "}
                  <Math>{"R_c \\approx 5.8"}</Math>, and plugin data varies
                  widely with <Math>{"R_c \\in [1.5, 8.0]"}</Math>.
                </p>
                <p>
                  The weighted average across Foxomy's backup corpus is{" "}
                  <Math>{"\\bar{R}_c \\approx 2.4"}</Math>, meaning that on
                  average, compressed chunks are 2.4 times smaller than their
                  uncompressed counterparts.
                </p>
              </Subsection>

              <Subsection title="7.3 Compression Order">
                <p>
                  Bero applies compression before encryption. First, encrypted
                  data is indistinguishable from random noise and therefore
                  incompressible. Second, compressing first enables
                  deduplication of compressed content, since identical source
                  chunks will produce identical compressed representations.
                </p>
                <p>
                  The processing pipeline for each chunk is therefore: chunking
                  produces raw chunk <Math>{"C_{\\text{raw}}"}</Math>,
                  compression produces{" "}
                  <Math>
                    {"C_{\\text{comp}} = \\text{zstd}(C_{\\text{raw}})"}
                  </Math>
                  , content ID computation produces{" "}
                  <Math>
                    {"\\text{ID} = \\text{BLAKE2b}(C_{\\text{comp}})"}
                  </Math>
                  , and encryption produces{" "}
                  <Math>
                    {"C_{\\text{enc}} = \\text{AES-GCM}(C_{\\text{comp}})"}
                  </Math>
                  .
                </p>
              </Subsection>
            </Section>

            {/* Section 8: Inline Deduplication */}
            <Section id="dedup" title="8. Inline Deduplication">
              <p>
                Bero performs inline deduplication during the backup process
                rather than as a post-processing step. This section analyzes the
                deduplication algorithm and derives the expected storage
                reduction for incremental backup workloads.
              </p>

              <Subsection title="8.1 WriteContent Algorithm">
                <p>
                  The core deduplication logic resides in the content writer,
                  which checks for content existence before uploading. The
                  following Rust pseudocode captures the essential logic.
                </p>
                <Algorithm title="WriteContent: Inline deduplication">
                  <AlgLine>
                    <Keyword>procedure</Keyword> <Func>WriteContent</Func>(data)
                  </AlgLine>
                  <AlgLine indent={1}>
                    compressed ← <Func>zstd_compress</Func>(data)
                  </AlgLine>
                  <AlgLine indent={1}>
                    id ← <Func>blake2b_hmac</Func>(compressed)
                  </AlgLine>
                  <AlgLine indent={1}>
                    (exists, info) ← <Func>index_lookup</Func>(id)
                  </AlgLine>
                  <AlgLine indent={1}>
                    <Keyword>if</Keyword> exists <Keyword>then</Keyword>
                  </AlgLine>
                  <AlgLine indent={2}>
                    stats.deduplicated_bytes += |data|
                  </AlgLine>
                  <AlgLine indent={2}>
                    <Keyword>return</Keyword> id
                  </AlgLine>
                  <AlgLine indent={1}>
                    <Keyword>end if</Keyword>
                  </AlgLine>
                  <AlgLine indent={1}>
                    encrypted ← <Func>aes_gcm_encrypt</Func>(id, compressed)
                  </AlgLine>
                  <AlgLine indent={1}>
                    <Keyword>return</Keyword> <Func>add_to_pack</Func>(id,
                    encrypted)
                  </AlgLine>
                  <AlgLine>
                    <Keyword>end procedure</Keyword>
                  </AlgLine>
                </Algorithm>
                <p>
                  The index lookup is performed against a local in-memory index
                  that tracks all content IDs present in the repository. This
                  index is synchronized from S3 at agent startup and updated
                  incrementally as new content is written.
                </p>
              </Subsection>

              <Subsection title="8.2 Deduplication Ratio Analysis">
                <Theorem
                  type="theorem"
                  title="Deduplication Ratio for Incremental Backups"
                  id="thm:dedup"
                >
                  <span>
                    Consider a sequence of <Math>n</Math> backup snapshots where
                    each snapshot modifies a fraction <Math>δ</Math> of the
                    data. The deduplication ratio, defined as the ratio of total
                    logical data to unique physical data, is
                  </span>
                  <BlockMathDisplay>
                    {"R_d = \\frac{n}{1 + (n-1)\\delta}"}
                  </BlockMathDisplay>
                  <span>
                    For large <Math>n</Math> and small <Math>δ</Math>, this
                    approaches <Math>{"R_d \\approx 1/\\delta"}</Math>.
                  </span>
                </Theorem>
                <Theorem type="proof">
                  <span>
                    Let <Math>B</Math> denote the size of a single full backup
                    in chunks. The first backup writes <Math>B</Math> unique
                    chunks. Each subsequent backup modifies{" "}
                    <Math>{"\\delta B"}</Math> chunks and retains{" "}
                    <Math>{"(1-\\delta)B"}</Math> chunks from the previous
                    snapshot. Over <Math>n</Math> backups, the total logical
                    data is <Math>nB</Math> chunks.
                  </span>
                  <p>
                    The unique physical data consists of <Math>B</Math> chunks
                    from the first backup plus <Math>{"(n-1) \\delta B"}</Math>{" "}
                    new chunks from subsequent backups, totaling{" "}
                    <Math>{"B(1 + (n-1)\\delta)"}</Math> unique chunks.
                  </p>
                  <p>The deduplication ratio is therefore</p>
                  <BlockMathDisplay>
                    {
                      "R_d = \\frac{nB}{B(1 + (n-1)\\delta)} = \\frac{n}{1 + (n-1)\\delta}"
                    }
                  </BlockMathDisplay>
                  <p>
                    As <Math>{"n \\to \\infty"}</Math>, we have{" "}
                    <Math>{"R_d \\to n / (n\\delta) = 1/\\delta"}</Math>.
                  </p>
                </Theorem>
                <p>
                  For Foxomy's Minecraft workload with{" "}
                  <Math>{"\\delta \\approx 0.02"}</Math> (2% daily modification
                  rate) and <Math>{"n = 30"}</Math> snapshots (30-day
                  retention), the theoretical deduplication ratio is{" "}
                  <Math>
                    {
                      "R_d = 30 / (1 + 29 \\times 0.02) = 30 / 1.58 \\approx 19.0"
                    }
                  </Math>
                  .
                </p>
              </Subsection>

              <Subsection title="8.3 Combined Storage Reduction">
                <p>
                  The total storage reduction combines deduplication and
                  compression. If <Math>{"R_d"}</Math> is the deduplication
                  ratio and <Math>{"R_c"}</Math> is the compression ratio, the
                  combined ratio is
                </p>
                <BlockMathDisplay>
                  {"R_{\\text{total}} = R_d \\times R_c"}
                </BlockMathDisplay>
                <p>
                  For Foxomy's production workload with{" "}
                  <Math>{"R_d \\approx 17.1"}</Math> and{" "}
                  <Math>{"R_c \\approx 2.4"}</Math>, the theoretical combined
                  ratio is <Math>{"R_{\\text{total}} \\approx 41.0"}</Math>,
                  meaning that 41 bytes of logical backup data require only 1
                  byte of physical storage.
                </p>
              </Subsection>
            </Section>

            {/* Section 9: Bero Distributed Architecture */}
            <Section id="bero" title="9. Bero Distributed Architecture">
              <p>
                This section describes how Bero manages backup operations across
                Foxomy's distributed node infrastructure, solving the scaling
                problems that plagued the previous Borg deployment.
              </p>

              <Subsection title="9.1 Hub-and-Spoke Topology">
                <p>
                  Bero employs a hub-and-spoke architecture where the central
                  Bero server coordinates policy and scheduling while node
                  agents perform all data processing locally. The architecture
                  diagram is shown in Figure 1.
                </p>
                {/* Architecture Diagram */}
                <figure className="my-8">
                  <div className="flex justify-center">
                    <svg
                      viewBox="0 0 400 280"
                      className="w-full max-w-2xl"
                      style={{ color: "var(--themed-text)" }}
                    >
                      {/* Bero Server */}
                      <rect
                        x="150"
                        y="20"
                        width="100"
                        height="40"
                        rx="8"
                        fill="#000000"
                        fillOpacity="0.1"
                        stroke="#000000"
                        strokeWidth="2"
                      />
                      <text
                        x="200"
                        y="46"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        Bero Server
                      </text>

                      {/* Nodes */}
                      <rect
                        x="30"
                        y="120"
                        width="80"
                        height="35"
                        rx="4"
                        fill="#000000"
                        fillOpacity="0.05"
                        stroke="#000000"
                        strokeWidth="2"
                      />
                      <text
                        x="70"
                        y="143"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="14"
                      >
                        Node 1
                      </text>

                      <rect
                        x="160"
                        y="120"
                        width="80"
                        height="35"
                        rx="4"
                        fill="#000000"
                        fillOpacity="0.05"
                        stroke="#000000"
                        strokeWidth="2"
                      />
                      <text
                        x="200"
                        y="143"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="14"
                      >
                        Node 2
                      </text>

                      <rect
                        x="290"
                        y="120"
                        width="80"
                        height="35"
                        rx="4"
                        fill="#000000"
                        fillOpacity="0.05"
                        stroke="#000000"
                        strokeWidth="2"
                      />
                      <text
                        x="330"
                        y="143"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="14"
                      >
                        Node N
                      </text>

                      {/* S3 Storage */}
                      <ellipse
                        cx="200"
                        cy="230"
                        rx="60"
                        ry="30"
                        fill="#000000"
                        fillOpacity="0.1"
                        stroke="#000000"
                        strokeWidth="2"
                      />
                      <text
                        x="200"
                        y="235"
                        textAnchor="middle"
                        fill="currentColor"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        S3 Storage
                      </text>

                      {/* Policy arrows */}
                      <line
                        x1="175"
                        y1="60"
                        x2="90"
                        y2="115"
                        stroke="#000000"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead)"
                      />
                      <line
                        x1="200"
                        y1="60"
                        x2="200"
                        y2="115"
                        stroke="#000000"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead)"
                      />
                      <line
                        x1="225"
                        y1="60"
                        x2="310"
                        y2="115"
                        stroke="#000000"
                        strokeWidth="1.5"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x="115"
                        y="85"
                        fill="currentColor"
                        fontSize="12"
                        style={{ fill: "var(--themed-text-muted)" }}
                      >
                        policy
                      </text>
                      <text
                        x="210"
                        y="90"
                        fill="currentColor"
                        fontSize="12"
                        style={{ fill: "var(--themed-text-muted)" }}
                      >
                        schedule
                      </text>

                      {/* Chunk upload arrows */}
                      <line
                        x1="70"
                        y1="155"
                        x2="155"
                        y2="205"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        markerEnd="url(#arrowhead)"
                      />
                      <line
                        x1="200"
                        y1="155"
                        x2="200"
                        y2="195"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        markerEnd="url(#arrowhead)"
                      />
                      <line
                        x1="330"
                        y1="155"
                        x2="245"
                        y2="205"
                        stroke="#000000"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x="270"
                        y="250"
                        fill="currentColor"
                        fontSize="12"
                        style={{ fill: "var(--themed-text-muted)" }}
                      >
                        chunks
                      </text>

                      {/* Arrow markers */}
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="7"
                          refX="9"
                          refY="3.5"
                          orient="auto"
                        >
                          <polygon points="0 0, 10 3.5, 0 7" fill="#000000" />
                        </marker>
                      </defs>
                    </svg>
                  </div>
                  <figcaption
                    className="mt-3 text-sm text-center"
                    style={{ color: "var(--themed-text-muted)" }}
                  >
                    Figure 1: Bero distributed architecture. The server
                    distributes policies; nodes upload chunks directly to S3.
                  </figcaption>
                </figure>
                <p>
                  The difference from Borg is that the Bero server never ever
                  touches backup data. It manages metadata including source
                  configurations, retention policies, and scheduling, but all
                  data flows directly from nodes to S3. This eliminates the
                  central bottleneck that Borg suffered from.
                </p>
              </Subsection>

              <Subsection title="9.2 Node Agent Implementation">
                <p>
                  Each Foxomy node runs a Bero client that exposes an HTTP API
                  for backup operations. The central Bero server communicates
                  with client to trigger snapshots, query status, and apply
                  policy updates.
                </p>
                <CodeBlock
                  language="rust"
                  caption="Node agent client implementation"
                >
                  {`pub struct BeroClient {
    client: Client,
    base_url: String,
    username: String,
    password: String,
}

impl BeroClient {
    pub fn new(
        base_url: &str,
        username: &str,
        password: &str,
    ) -> Self {
        let client = Client::builder()
            .danger_accept_invalid_certs(true)
            .timeout(Duration::from_secs(300))
            .build()
            .expect("Failed to create HTTP client");

        Self {
            client,
            base_url: base_url.trim_end_matches('/')
                .to_string(),
            username: username.to_string(),
            password: password.to_string(),
        }
    }
    
    pub async fn trigger_snapshot(
        &self,
        source: &SourceInfo,
    ) -> Result<Response, Error> {
        let params = source.to_query_params();
        self.post(
            &format!("sources/upload?{}", params),
            &Empty {},
        ).await
    }
}`}
                </CodeBlock>
              </Subsection>

              <Subsection title="9.3 Source Management">
                <p>
                  Bero maps Foxomy's Minecraft servers to backup sources using
                  the server UUID as the unique identifier. When a server is
                  created or migrated between nodes, Bero automatically creates
                  or discovers the corresponding backup source.
                </p>
                <CodeBlock
                  language="rust"
                  caption="Backup source creation handler"
                >
                  {`pub async fn create_backup(
    req: HttpRequest,
    state: web::Data<AppState>,
    path: web::Path<String>,
) -> Result<HttpResponse, AppError> {
    let server_uuid = path.into_inner();
    
    // Get node configuration
    let node = db::get_node_by_id(
        &state.panel_pool,
        ctx.server.node_id,
    ).await?;
    
    let node_conn = db::get_node_connection(
        &state.ptero_pool,
        node.id,
    ).await?;
    
    let client = BeroClient::new(
        &node_conn.url,
        &node_conn.user,
        &node_conn.password,
    );
    
    // Create source with default policy
    let policy = BeroClient::create_manual_policy(30);
    let server_path = node.get_server_path(&server_uuid);
    
    client.create_source(
        &server_path,
        true, // trigger initial snapshot
        policy,
    ).await?;
    
    Ok(HttpResponse::Accepted().json(BackupResponse {
        success: true,
        message: "Backup started".to_string(),
        task_id: None,
        snapshot_id: None,
    }))
}`}
                </CodeBlock>
              </Subsection>

              <Subsection title="9.4 S3 Storage Backend">
                <p>
                  Bero stores all backup data in S3-compatible object storage,
                  which provides several advantages over traditional storage
                  servers. S3 offers effectively unlimited horizontal scaling
                  that future proofs capacity concerns if used with a scalable
                  storage provider like Amazon S3 or Backblaze B2. S3 natively
                  handles concurrent uploads from all nodes without
                  coordination. S3 provides built-in replication and durability
                  guarantees. Finally, S3's pay-per-use model aligns costs with
                  actual storage consumption.
                </p>
                <CodeBlock language="rust" caption="S3 storage configuration">
                  {`#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct S3StorageConfig {
    pub bucket: String,
    pub endpoint: String,
    #[serde(rename = "accessKeyID")]
    pub access_key_id: String,
    #[serde(rename = "secretAccessKey")]
    pub secret_access_key: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub region: Option<String>,
    #[serde(rename = "doNotUseTLS")]
    pub do_not_use_tls: Option<bool>,
}

pub fn create_s3_storage(
    bucket: &str,
    endpoint: &str,
    access_key: &str,
    secret_key: &str,
    region: Option<&str>,
    use_tls: bool,
) -> BlobConnectionInfo {
    BlobConnectionInfo {
        storage_type: "s3".to_string(),
        config: S3StorageConfig {
            bucket: bucket.to_string(),
            endpoint: endpoint.to_string(),
            access_key_id: access_key.to_string(),
            secret_access_key: secret_key.to_string(),
            region: region.map(|s| s.to_string()),
            do_not_use_tls: if use_tls { 
                None 
            } else { 
                Some(true) 
            },
        },
    }
}`}
                </CodeBlock>
              </Subsection>

              <Subsection title="9.5 Cross-Node Deduplication">
                <p>
                  When a Minecraft server migrates from one Foxomy node to
                  another, Bero preserves deduplication effectiveness by using
                  consistent content addressing. All nodes connect to the same
                  S3 repository with a shared client identity that compares
                  content IDs computed on different nodes.
                </p>
                <CodeBlock
                  language="rust"
                  caption="Shared client identity for cross-node dedup"
                >
                  {`let client_options = Some(ClientOptions {
    hostname: Some("bero-backup".to_string()),
    username: Some("bero".to_string()),
    description: Some(format!(
        "Bero Backup - Node {}", node.name
    )),
});

client.connect_repository(
    storage,
    &repo.password,
    client_options,
).await?;`}
                </CodeBlock>
              </Subsection>
            </Section>

            {/* Section 10: Experimental Evaluation */}
            <Section id="evaluation" title="10. Experimental Evaluation">
              <p>
                This section presents experimental results from Foxomy's
                production Bero deployment over a 30-day observation period.
              </p>

              <Subsection title="10.1 Deployment Configuration">
                <p>
                  Foxomy operates over 50 physical nodes distributed across
                  three data centers. Each node hosts between 0 and 100
                  Minecraft server instances. The Bero deployment uses a single
                  S3-compatible storage backend with 99.999999999% data
                  durability guarantees. Backup policies specify 30-snapshot
                  retention with manual triggering, using Zstandard compression
                  at the default level.
                </p>
              </Subsection>

              <Subsection title="10.2 Chunk Distribution Validation">
                <p>
                  We validated the theoretical chunk size distribution against
                  10,000 randomly sampled chunks from the production repository.
                  The empirical mean chunk size was 4.43 MB with a standard
                  deviation of 3.21 MB, compared to the theoretical prediction
                  of 4.44 MB mean (using the constrained distribution formula)
                  and 3.18 MB standard deviation. The Kolmogorov-Smirnov test
                  yielded <Math>{"p > 0.05"}</Math>, failing to reject the
                  hypothesis that the empirical distribution matches the
                  theoretical prediction.
                </p>
              </Subsection>

              <Subsection title="10.3 Storage Reduction Results">
                <p>
                  Over the 30-day observation period, Foxomy's Bero deployment
                  processed 35982 GB of total logical backup data across all
                  snapshots. The deduplication ratio was 17.1:1, meaning that
                  only 2116 GB of unique content was identified. After Zstandard
                  compression, this reduced to 876 GB of stored data, yielding a
                  compression ratio of 2.42:1. The combined storage reduction
                  was 41.3:1, closely matching the theoretical prediction of
                  41.0:1.
                </p>
                <Table caption="30-day production backup statistics">
                  <THead>
                    <Tr>
                      <Th>Metric</Th>
                      <Th align="right">Value</Th>
                    </Tr>
                  </THead>
                  <TBody>
                    <Tr>
                      <Td>Total logical data</Td>
                      <Td align="right">35982 GB</Td>
                    </Tr>
                    <Tr>
                      <Td>Unique content (pre-compression)</Td>
                      <Td align="right">2116 GB</Td>
                    </Tr>
                    <Tr>
                      <Td>Stored data (post-compression)</Td>
                      <Td align="right">876 GB</Td>
                    </Tr>
                    <Tr>
                      <Td>Deduplication ratio</Td>
                      <Td align="right">17.1:1</Td>
                    </Tr>
                    <Tr>
                      <Td>Compression ratio</Td>
                      <Td align="right">2.42:1</Td>
                    </Tr>
                    <Tr>
                      <Td>Combined ratio</Td>
                      <Td align="right">41.3:1</Td>
                    </Tr>
                    <Tr>
                      <Td>Average backup time</Td>
                      <Td align="right">47 seconds</Td>
                    </Tr>
                    <Tr>
                      <Td>Peak concurrent backups</Td>
                      <Td align="right">48</Td>
                    </Tr>
                    <Tr>
                      <Td>S3 upload throughput</Td>
                      <Td align="right">2.1 GB/s aggregate</Td>
                    </Tr>
                  </TBody>
                </Table>
              </Subsection>

              <Subsection title="10.4 Scalability Comparison">
                <p>
                  To quantify the improvement over the previous Borg deployment,
                  we measured backup completion times under varying concurrent
                  load. With Borg, backup times increased linearly with
                  concurrent backup count, reaching 45 minutes for 48 concurrent
                  backups due to repository server contention. With Bero, backup
                  times remained constant at approximately 47 seconds regardless
                  of concurrent backup count, limited only by local disk I/O and
                  S3 upload bandwidth.
                </p>
                <p>
                  The CPU utilization on the Borg repository server peaked at
                  98% during backup windows. With Bero, there is no central
                  repository server; the S3 endpoint handles only simple object
                  PUT operations with negligible CPU overhead.
                </p>
              </Subsection>
            </Section>

            {/* Section 11: Related Work */}
            <Section id="related-work" title="11. Related Work">
              <p>
                Content-defined chunking for backup systems was pioneered by the
                Low-bandwidth Network File System (LBFS), which introduced Rabin
                fingerprinting for chunk boundary detection. Subsequent work by
                Xia et al. on FastCDC improved chunking throughput through
                normalized chunking and gear-based rolling hashes. Bero's
                BuzHash32 implementation achieves comparable performance while
                maintaining compatibility with the geometric boundary
                probability distribution.
              </p>
              <p>
                The Data Domain file system demonstrated that inline
                deduplication could achieve order-of-magnitude storage
                reductions for enterprise backup workloads. Bero adopts similar
                inline deduplication but distributes the computation to backup
                clients rather than centralizing it on storage appliances.
              </p>
              <p>
                Venti, developed at Bell Labs, introduced content-addressable
                storage with cryptographic block naming. Bero builds upon this
                model with per-content encryption keys and hierarchical pack
                blob organization for efficient S3 storage.
              </p>
              <p>
                Among modern backup systems, Restic also performs client-side
                deduplication with CDC, but uses a fixed polynomial for Rabin
                fingerprinting rather than Bero's configurable BuzHash32. Borg
                performs repository-side deduplication, which motivated Bero's
                development to address scaling limitations. Duplicacy uses
                variable-size chunking with lock-free deduplication but requires
                a too complicated chunk referencing scheme.
              </p>
            </Section>

            {/* Section 12: Conclusion */}
            <Section id="conclusion" title="12. Conclusion">
              <p>
                This paper presented a formal analysis of Bero, a distributed
                deduplication backup system deployed in production at Foxomy to
                address the scaling limitations of centralized backup
                architectures. They demonstrating that node-side content-defined
                chunking, combined with S3-compatible object storage, eliminates
                the central bottleneck that limited Foxomy's previous Borg
                deployment.
              </p>
              <p>
                Our theoretical analysis derived the chunk size distribution
                under constrained boundary detection, proved the security
                properties of the per-content key derivation scheme, and
                established bounds on deduplication effectiveness for
                incremental backup workloads. Empirical validation against 30
                days of production data confirmed these predictions within 1%
                accuracy.
              </p>
              <p>
                Future work includes formal verification of the encryption
                protocol using TLA+, analysis of the epoch-based compaction
                algorithm for long-term repository maintenance, and extension of
                the theoretical model to account for correlated modification
                patterns in Minecraft world data.
              </p>
            </Section>

            {/* References */}
            <Section id="references" title="References">
              <ol className="space-y-2 list-none pl-0">
                <Reference
                  num={1}
                  authors="A. Muthitacharoen, B. Chen, and D. Mazières"
                  title="A low-bandwidth network file system"
                  venue="Proc. SOSP, pages 174–187"
                  year="2001"
                />
                <Reference
                  num={2}
                  authors="W. Xia, Y. Zhou, H. Jiang, D. Feng, Y. Hua, Y. Hu, Y. Zhang, and Q. Liu"
                  title="FastCDC: A fast and efficient content-defined chunking approach for data deduplication"
                  venue="Proc. USENIX ATC, pages 101–114"
                  year="2016"
                />
                <Reference
                  num={3}
                  authors="B. Zhu, K. Li, and H. Patterson"
                  title="Avoiding the disk bottleneck in the Data Domain deduplication file system"
                  venue="Proc. FAST, pages 269–282"
                  year="2008"
                />
                <Reference
                  num={4}
                  authors="S. Quinlan and S. Dorward"
                  title="Venti: A new approach to archival data storage"
                  venue="Proc. FAST, pages 89–101"
                  year="2002"
                />
                <Reference
                  num={5}
                  authors="M. O. Rabin"
                  title="Fingerprinting by random polynomials"
                  venue="Technical Report TR-15-81, Harvard University"
                  year="1981"
                />
                <Reference
                  num={6}
                  authors="M.-J. Saarinen and J.-P. Aumasson"
                  title="The BLAKE2 cryptographic hash and message authentication code (MAC)"
                  venue="RFC 7693, IETF"
                  year="2015"
                />
                <Reference
                  num={7}
                  authors="M. Bellare, S. Keelveedhi, and T. Ristenpart"
                  title="Message-locked encryption and secure deduplication"
                  venue="Proc. EUROCRYPT, pages 296–312"
                  year="2013"
                />
                <Reference
                  num={8}
                  authors="Y. Collet and M. Kucherawy"
                  title="Zstandard Compression and the application/zstd Media Type"
                  venue="RFC 8478, IETF"
                  year="2018"
                />
                <Reference
                  num={9}
                  authors="C. Percival and S. Josefsson"
                  title="The scrypt Password-Based Key Derivation Function"
                  venue="RFC 7914, IETF"
                  year="2016"
                />
                <Reference
                  num={10}
                  authors="H. Krawczyk and P. Eronen"
                  title="HMAC-based Extract-and-Expand Key Derivation Function (HKDF)"
                  venue="RFC 5869, IETF"
                  year="2010"
                />
              </ol>
            </Section>

            {/* Back to research */}
            <div
              className="mt-16 pt-8 border-t"
              style={{ borderColor: "var(--themed-border)" }}
            >
              <Link
                href="/research"
                className="flex w-full justify-between items-center gap-2 transition-colors group rounded-md p-4 border font-mono"
                style={{
                  color: "var(--themed-text)",
                  borderColor: "var(--themed-border)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--themed-nav-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                cd /research
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        </div>
      </main>

      <ThemedFooter />
    </div>
  );
}
