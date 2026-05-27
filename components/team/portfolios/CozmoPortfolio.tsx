"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CozmoPortfolio.module.css";

export const memberData = {
  id: "cozmo",
  name: "Cozmo",
  role: "Owner / Chief Executive Officer",
  handle: "@CozmoFPS",
  avatar: "/imgs/portfolios/cozmo/20594b994afb294be1b8268c5bc3a2f1.png",
  portfolioBg: "bg-black",
};

const ICON_VOLUME_ON = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="1em" height="1em">
    <defs>
      <mask id="cozmoVolOn">
        <g fill="none" stroke="#fff" strokeWidth="4">
          <path
            fill="#555"
            strokeLinejoin="round"
            d="M24 6v36c-7 0-12.201-9.16-12.201-9.16H6a2 2 0 0 1-2-2V17.01a2 2 0 0 1 2-2h5.799S17 6 24 6Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M32 15a11.91 11.91 0 0 1 1.684 1.859A12.07 12.07 0 0 1 36 24c0 2.654-.846 5.107-2.278 7.09A11.936 11.936 0 0 1 32 33"
          />
          <path
            strokeLinecap="round"
            d="M34.236 41.186C40.084 37.696 44 31.305 44 24c0-7.192-3.796-13.496-9.493-17.02"
          />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#cozmoVolOn)" />
  </svg>
);

const ICON_VOLUME_OFF = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="1em" height="1em">
    <defs>
      <mask id="cozmoVolOff">
        <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
          <g strokeLinecap="round">
            <path d="m40.735 20.286l-8.486 8.485m.001-8.485l8.485 8.485" />
          </g>
          <path
            fill="#555"
            d="M24 6v36c-7 0-12.201-9.16-12.201-9.16H6a2 2 0 0 1-2-2V17.01a2 2 0 0 1 2-2h5.799S17 6 24 6Z"
          />
        </g>
      </mask>
    </defs>
    <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#cozmoVolOff)" />
  </svg>
);

const EQ_FREQUENCIES = [60, 230, 910, 3600, 7200, 14000];
const EQ_LABELS = ["60", "230", "910", "3.6k", "7.2k", "14k"];
const EQ_Q_VALUES = [0.5, 0.6, 0.7, 0.7, 0.6, 0.5];

const COMP_DEFAULTS = {
  threshold: -24,
  ratio: 1,
  knee: 0,
  attack: 0,
  release: 0,
  makeup: 0,
};

const SPEC_BAR_COUNT = 48;
const SPEC_BAR_GAP = 2;
const SPEC_MAX_FREQ = 10000;

const DISCORD_ID = "444287158908485632";
const LANYARD_ENDPOINT = `https://api.lanyard.rest/v1/users/${DISCORD_ID}`;

type DiscordStatus = "online" | "idle" | "dnd" | "offline" | null;
type DiscordPresence = {
  avatarUrl: string;
  username: string;
  status: DiscordStatus;
  customStatus: string;
  activity: { title: string; details: string[] } | null;
};

interface DiscordActivity {
  type: number;
  name?: string;
  state?: string;
  details?: string;
}

interface DiscordUser {
  id: string;
  avatar?: string | null;
  discriminator?: string;
  username?: string;
  global_name?: string;
  display_name?: string;
}

function presenceClass(status: DiscordStatus): string {
  switch (status) {
    case "online":
      return styles.presenceOnline;
    case "idle":
      return styles.presenceIdle;
    case "dnd":
      return styles.presenceDnd;
    default:
      return styles.presenceOffline;
  }
}

function getAvatarUrl(user: DiscordUser): string {
  if (user.avatar) {
    const ext = user.avatar.startsWith("a_") ? "gif" : "png";
    return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=256`;
  }
  const index = Number(user.discriminator || 0) % 5;
  return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
}

function getRichActivity(
  activities: DiscordActivity[]
): { title: string; details: string[] } | null {
  if (!activities) return null;
  const activity = activities.find((a) => a.type !== 4);
  if (!activity) return null;

  let title: string | null;
  switch (activity.type) {
    case 0:
      title = `Playing ${activity.name}`;
      break;
    case 1:
      title = `Streaming ${activity.name}`;
      break;
    case 2:
      if (activity.name === "Spotify") {
        title = `Listening to ${activity.details || "music"} by ${
          activity.state || "music"
        }`;
      } else {
        title = `Listening to ${activity.name}`;
      }
      break;
    case 3:
      title = `Watching ${activity.name}`;
      break;
    case 5:
      title = `Competing in ${activity.name}`;
      break;
    default:
      title = activity.name || null;
  }

  if (!title) return null;

  const details: string[] = [];
  if (activity.type !== 2 || activity.name !== "Spotify") {
    if (activity.details) details.push(activity.details);
    if (activity.state) details.push(activity.state);
  }

  return { title, details };
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function CozmoPortfolio() {
  const rootRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const glitchCanvasRef = useRef<HTMLCanvasElement>(null);
  const spectrumCanvasRef = useRef<HTMLCanvasElement>(null);
  const typewriterRef = useRef<HTMLParagraphElement>(null);
  const compMeterRef = useRef<HTMLDivElement>(null);

  // EQ slider refs (for setting background fill)
  const eqSliderRefs = useRef<(HTMLInputElement | null)[]>([]);
  const compSliderRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Web Audio refs (mutable, don't trigger re-renders)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const eqFiltersRef = useRef<BiquadFilterNode[]>([]);
  const compressorRef = useRef<DynamicsCompressorNode | null>(null);
  const makeupGainRef = useRef<GainNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const eqSavedGainsRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const compSavedRef = useRef({ ...COMP_DEFAULTS });
  const savedMakeupDbRef = useRef(0);
  const eqBypassedRef = useRef(false);
  const compBypassedRef = useRef(false);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const barPeaksRef = useRef<number[]>(new Array(SPEC_BAR_COUNT).fill(Infinity));
  const lastVolumeRef = useRef(80);
  const animationFramesRef = useRef<number[]>([]);

  // React state
  const [entered, setEntered] = useState(false);
  const [enterHidden, setEnterHidden] = useState(false);
  const [cardEntered, setCardEntered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubberValue, setScrubberValue] = useState(0);
  const [timeText, setTimeText] = useState("0:00 / 0:00");
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [eqBypass, setEqBypass] = useState(false);
  const [compBypass, setCompBypass] = useState(false);
  const [eqValues, setEqValues] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [compThreshold, setCompThreshold] = useState(-24);
  const [compRatio, setCompRatio] = useState(1);
  const [compKnee, setCompKnee] = useState(0);
  const [compAttack, setCompAttack] = useState(0);
  const [compRelease, setCompRelease] = useState(0);
  const [compMakeup, setCompMakeup] = useState(0);
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [discordPresence, setDiscordPresence] = useState<DiscordPresence | null>(
    null
  );
  const [discordError, setDiscordError] = useState(false);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const [tooltipText, setTooltipText] = useState("Copy Discord");
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterDone, setTypewriterDone] = useState(false);

  const TYPEWRITER_TEXT = "hello!! my name is tai! i do music :3";

  // EQ slider track fill
  const updateEqTrackFill = useCallback(
    (slider: HTMLInputElement | null, val: number) => {
      if (!slider) return;
      const min = parseFloat(slider.min);
      const max = parseFloat(slider.max);
      const range = max - min;
      const thumbPct = ((max - val) / range) * 100;
      const centerPct = ((max - 0) / range) * 100;
      const lo = Math.min(thumbPct, centerPct);
      const hi = Math.max(thumbPct, centerPct);
      const base = "rgba(155, 124, 255, 0.15)";
      const fill = "rgba(155, 124, 255, 0.55)";
      slider.style.backgroundImage = `linear-gradient(to bottom, ${base} ${lo}%, ${fill} ${lo}%, ${fill} ${hi}%, ${base} ${hi}%)`;
    },
    []
  );

  const updateCompSliderFill = useCallback(
    (slider: HTMLInputElement | null, val: number) => {
      if (!slider) return;
      const min = parseFloat(slider.min);
      const max = parseFloat(slider.max);
      const pct = ((val - min) / (max - min)) * 100;
      const base = "rgba(155, 124, 255, 0.15)";
      const fill = "rgba(155, 124, 255, 0.55)";
      slider.style.background = `linear-gradient(to right, ${fill} ${pct}%, ${base} ${pct}%)`;
    },
    []
  );

  // Build/rebuild the Web Audio graph
  const rebuildChain = useCallback(() => {
    const ctx = audioCtxRef.current;
    const source = sourceNodeRef.current;
    const comp = compressorRef.current;
    const makeup = makeupGainRef.current;
    const analyser = analyserRef.current;
    if (!ctx || !source || !comp || !makeup) return;

    source.disconnect();
    eqFiltersRef.current.forEach((f) => f.disconnect());
    comp.disconnect();
    makeup.disconnect();
    if (analyser) analyser.disconnect();

    eqFiltersRef.current.forEach((f, i) => {
      f.gain.value = eqBypassedRef.current ? 0 : eqSavedGainsRef.current[i];
    });

    if (compBypassedRef.current) {
      makeup.gain.value = 1;
    } else {
      makeup.gain.value = Math.pow(10, savedMakeupDbRef.current / 20);
    }

    const chain: AudioNode[] = [
      source,
      ...eqFiltersRef.current,
      comp,
      makeup,
    ];
    for (let i = 0; i < chain.length - 1; i++) {
      chain[i].connect(chain[i + 1]);
    }
    makeup.connect(ctx.destination);
    if (analyser) makeup.connect(analyser);
  }, []);

  // Initialize Web Audio context (call once after user gesture)
  const initAudioContext = useCallback(() => {
    if (audioCtxRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;

    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctor();
    audioCtxRef.current = ctx;
    sourceNodeRef.current = ctx.createMediaElementSource(audio);

    const filters: BiquadFilterNode[] = [];
    EQ_FREQUENCIES.forEach((freq, i) => {
      const filter = ctx.createBiquadFilter();
      filter.type = i === 0 ? "lowshelf" : i === 5 ? "highshelf" : "peaking";
      filter.frequency.value = freq;
      filter.gain.value = 0;
      if (filter.type === "peaking") filter.Q.value = EQ_Q_VALUES[i];
      filters.push(filter);
    });
    eqFiltersRef.current = filters;

    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.ratio.value = 1;
    compressor.attack.value = 0;
    compressor.release.value = 0;
    compressor.knee.value = 0;
    compressorRef.current = compressor;

    const makeup = ctx.createGain();
    makeup.gain.value = 1;
    makeupGainRef.current = makeup;

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;
    analyserRef.current = analyser;

    rebuildChain();
  }, [rebuildChain]);

  // Compressor meter loop
  const updateCompMeterLoop = useCallback(() => {
    const comp = compressorRef.current;
    const bar = compMeterRef.current;
    if (comp && bar) {
      const reduction = comp.reduction;
      const pct = Math.min((Math.abs(reduction) / 30) * 100, 100);
      bar.style.width = `${pct}%`;
    }
    const id = requestAnimationFrame(updateCompMeterLoop);
    animationFramesRef.current.push(id);
  }, []);

  // Spectrum draw loop
  const resizeSpecCanvas = useCallback(() => {
    const canvas = spectrumCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, rect.width * dpr);
    canvas.height = Math.max(1, rect.height * dpr);
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    barPeaksRef.current.fill(rect.height);
  }, []);

  const drawSpectrumLoop = useCallback(() => {
    const id = requestAnimationFrame(drawSpectrumLoop);
    animationFramesRef.current.push(id);
    const canvas = spectrumCanvasRef.current;
    const analyser = analyserRef.current;
    const ctx = audioCtxRef.current;
    if (!canvas || !analyser || !ctx) return;
    const specCtx = canvas.getContext("2d");
    if (!specCtx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width / dpr;
    const H = canvas.height / dpr;

    if (!dataArrayRef.current) {
      dataArrayRef.current = new Uint8Array(
        new ArrayBuffer(analyser.frequencyBinCount)
      );
    }
    const dataArray = dataArrayRef.current;
    analyser.getByteFrequencyData(dataArray);
    const bufferLength = dataArray.length;

    specCtx.clearRect(0, 0, W, H);

    specCtx.strokeStyle = "rgba(255, 255, 255, 0.06)";
    specCtx.lineWidth = 1;
    for (const db of [0, -18]) {
      const y = ((12 - db) / 48) * H;
      specCtx.beginPath();
      specCtx.moveTo(0, y);
      specCtx.lineTo(W, y);
      specCtx.stroke();
    }

    const barWidth =
      (W - SPEC_BAR_GAP * (SPEC_BAR_COUNT - 1)) / SPEC_BAR_COUNT;
    const nyquist = ctx.sampleRate / 2;
    const maxBin = Math.min(
      bufferLength - 1,
      Math.floor((SPEC_MAX_FREQ / nyquist) * bufferLength)
    );
    const binFreqStep = ctx.sampleRate / analyser.fftSize;

    for (let i = 0; i < SPEC_BAR_COUNT; i++) {
      const t = i / SPEC_BAR_COUNT;
      const binIndex = Math.floor(Math.pow(t, 1.4) * (maxBin - 1));
      const nextBin = Math.floor(
        Math.pow((i + 1) / SPEC_BAR_COUNT, 1.4) * (maxBin - 1)
      );

      let peak = 0;
      const end = Math.min(bufferLength, Math.max(binIndex + 1, nextBin));
      for (let b = binIndex; b < end; b++) {
        if (dataArray[b] > peak) peak = dataArray[b];
      }

      const binFreq = ((binIndex + nextBin) / 2) * binFreqStep;
      const tiltDb = binFreq > 20 ? 4.5 * Math.log2(binFreq / 1000) : 0;
      const dB = peak > 0 ? 20 * Math.log10(peak / 255) : -100;
      const adjustedDb = dB + tiltDb + 12;
      const value = Math.max(0, Math.min(1, (adjustedDb + 36) / 48));

      const barHeight = Math.max(1, value * H);
      const x = i * (barWidth + SPEC_BAR_GAP);
      const y = H - barHeight;

      const gradient = specCtx.createLinearGradient(x, H, x, y);
      gradient.addColorStop(0, `rgba(155, 124, 255, ${0.3 + value * 0.5})`);
      gradient.addColorStop(0.5, `rgba(180, 140, 255, ${0.5 + value * 0.4})`);
      gradient.addColorStop(1, `rgba(220, 180, 255, ${0.6 + value * 0.4})`);

      specCtx.fillStyle = gradient;
      specCtx.beginPath();
      specCtx.roundRect(x, y, barWidth, barHeight, 1.5);
      specCtx.fill();

      if (value > 0.01 && y < barPeaksRef.current[i])
        barPeaksRef.current[i] = y;
      barPeaksRef.current[i] = Math.min(H, barPeaksRef.current[i] + 0.5);
      if (barPeaksRef.current[i] < H - 2) {
        specCtx.fillStyle = "rgba(255, 255, 255, 0.6)";
        specCtx.fillRect(x, barPeaksRef.current[i], barWidth, 1.5);
      }
    }
  }, []);

  // Glitch text animation setup (uses Satoshi font once loaded)
  const setupGlitch = useCallback(async () => {
    if (typeof document === "undefined") return;
    try {
      await document.fonts.ready;
    } catch {
      // ignore
    }

    const canvas = glitchCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const TEXT = "cozmofps";
    const COLOR = "#ffffff";
    const INTENSITY = 6;
    const fontSize = 38;
    const font = `700 ${fontSize}px 'Satoshi', sans-serif`;

    const off = document.createElement("canvas");
    const offCtx = off.getContext("2d", { willReadFrequently: true });
    if (!offCtx) return;

    offCtx.font = font;
    const m = offCtx.measureText(TEXT);
    const tw = Math.ceil(m.width);
    const th = Math.ceil(
      m.actualBoundingBoxAscent + m.actualBoundingBoxDescent
    );
    const hPad = INTENSITY * 2;
    const vPad = 20;
    const W = tw + hPad;
    const H = th + vPad;

    canvas.width = off.width = W;
    canvas.height = off.height = H;

    offCtx.font = font;
    offCtx.fillStyle = COLOR;
    offCtx.textBaseline = "top";
    offCtx.fillText(TEXT, hPad / 2, vPad / 2);

    const src = offCtx.getImageData(0, 0, W, H).data;

    const loop = () => {
      const dest = ctx.createImageData(W, H);
      const dp = dest.data;
      for (let y = 0; y < H; y++) {
        const offset = (Math.random() - 0.5) * INTENSITY;
        for (let x = 0; x < W; x++) {
          const sx = Math.round(x + offset);
          if (sx >= 0 && sx < W) {
            const di = (y * W + x) * 4;
            const si = (y * W + sx) * 4;
            dp[di] = src[si];
            dp[di + 1] = src[si + 1];
            dp[di + 2] = src[si + 2];
            dp[di + 3] = src[si + 3];
          }
        }
      }
      ctx.clearRect(0, 0, W, H);
      ctx.putImageData(dest, 0, 0);
      const id = requestAnimationFrame(loop);
      animationFramesRef.current.push(id);
    };
    loop();
  }, []);

  // Typewriter for text body
  const startTypewriter = useCallback(() => {
    let i = 0;
    const type = () => {
      if (i < TYPEWRITER_TEXT.length) {
        setTypewriterText(TYPEWRITER_TEXT.slice(0, i + 1));
        i++;
        setTimeout(type, 60 + Math.random() * 40);
      } else {
        setTypewriterDone(true);
      }
    };
    type();
  }, []);

  // Click-to-enter handler
  const handleEnter = useCallback(async () => {
    if (entered) return;
    setEntered(true);

    initAudioContext();

    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
      } catch {
        // ignore autoplay failure
      }
    }

    const bgVideo = bgVideoRef.current;
    if (bgVideo) {
      bgVideo.muted = true;
      try {
        await bgVideo.play();
      } catch {
        // ignore
      }
    }

    requestAnimationFrame(() => {
      setCardEntered(true);
    });

    setTimeout(() => setEnterHidden(true), 500);
    setTimeout(() => startTypewriter(), 800);

    setupGlitch();
    updateCompMeterLoop();
    drawSpectrumLoop();
    resizeSpecCanvas();
  }, [
    entered,
    initAudioContext,
    setupGlitch,
    startTypewriter,
    updateCompMeterLoop,
    drawSpectrumLoop,
    resizeSpecCanvas,
  ]);

  // Audio toggle
  const handleAudioToggle = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch {
      // ignore
    }
  }, []);

  // Volume slider change
  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      const val = parseFloat(e.target.value);
      setVolume(val);
      if (audio) {
        audio.muted = false;
        audio.volume = val / 100;
      }
      if (val > 0) lastVolumeRef.current = val;
      setMuted(false);
    },
    []
  );

  // Volume toggle (mute)
  const handleVolumeToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.muted || audio.volume === 0) {
      const v = lastVolumeRef.current > 0 ? lastVolumeRef.current : 80;
      audio.muted = false;
      audio.volume = v / 100;
      setVolume(v);
      setMuted(false);
    } else {
      lastVolumeRef.current = volume;
      audio.muted = true;
      setMuted(true);
    }
  }, [volume]);

  // Scrubber change
  const handleScrubberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const audio = audioRef.current;
      const val = parseFloat(e.target.value);
      setScrubberValue(val);
      if (audio && audio.duration) {
        audio.currentTime = (val / 100) * audio.duration;
      }
    },
    []
  );

  // EQ band change
  const handleEqChange = useCallback(
    (idx: number, value: number) => {
      eqSavedGainsRef.current[idx] = value;
      setEqValues((prev) => {
        const next = [...prev];
        next[idx] = value;
        return next;
      });
      const filter = eqFiltersRef.current[idx];
      if (filter && !eqBypassedRef.current) {
        filter.gain.value = value;
      }
      updateEqTrackFill(eqSliderRefs.current[idx], value);
    },
    [updateEqTrackFill]
  );

  const handleEqBypass = useCallback(() => {
    const next = !eqBypass;
    setEqBypass(next);
    eqBypassedRef.current = next;
    eqFiltersRef.current.forEach((f, i) => {
      f.gain.value = next ? 0 : eqSavedGainsRef.current[i];
    });
  }, [eqBypass]);

  const handleEqReset = useCallback(() => {
    const zeros = [0, 0, 0, 0, 0, 0];
    eqSavedGainsRef.current = [...zeros];
    setEqValues(zeros);
    eqFiltersRef.current.forEach((f) => {
      if (f) f.gain.value = 0;
    });
    eqSliderRefs.current.forEach((slider) => updateEqTrackFill(slider, 0));
  }, [updateEqTrackFill]);

  // Compressor controls
  const handleCompChange = useCallback(
    (
      key: "threshold" | "ratio" | "knee" | "attack" | "release",
      value: number,
      sliderId: string
    ) => {
      compSavedRef.current[key] = value;
      if (key === "threshold") setCompThreshold(value);
      else if (key === "ratio") setCompRatio(value);
      else if (key === "knee") setCompKnee(value);
      else if (key === "attack") setCompAttack(value);
      else if (key === "release") setCompRelease(value);
      const comp = compressorRef.current;
      if (comp && !compBypassedRef.current) {
        comp[key].value = value;
      }
      updateCompSliderFill(compSliderRefs.current[sliderId], value);
    },
    [updateCompSliderFill]
  );

  const handleMakeupChange = useCallback(
    (value: number) => {
      savedMakeupDbRef.current = value;
      setCompMakeup(value);
      const makeup = makeupGainRef.current;
      if (makeup && !compBypassedRef.current) {
        makeup.gain.value = Math.pow(10, value / 20);
      }
      updateCompSliderFill(compSliderRefs.current["makeup"], value);
    },
    [updateCompSliderFill]
  );

  const handleCompBypass = useCallback(() => {
    const next = !compBypass;
    setCompBypass(next);
    compBypassedRef.current = next;
    const comp = compressorRef.current;
    const makeup = makeupGainRef.current;
    if (!comp || !makeup) return;
    if (next) {
      compSavedRef.current.threshold = comp.threshold.value;
      compSavedRef.current.ratio = comp.ratio.value;
      compSavedRef.current.knee = comp.knee.value;
      compSavedRef.current.attack = comp.attack.value;
      compSavedRef.current.release = comp.release.value;
      comp.threshold.value = 0;
      comp.ratio.value = 1;
      comp.knee.value = 0;
      makeup.gain.value = 1;
    } else {
      comp.threshold.value = compSavedRef.current.threshold;
      comp.ratio.value = compSavedRef.current.ratio;
      comp.knee.value = compSavedRef.current.knee;
      comp.attack.value = compSavedRef.current.attack;
      comp.release.value = compSavedRef.current.release;
      makeup.gain.value = Math.pow(10, savedMakeupDbRef.current / 20);
    }
  }, [compBypass]);

  const handleCompReset = useCallback(() => {
    compSavedRef.current = { ...COMP_DEFAULTS };
    setCompThreshold(COMP_DEFAULTS.threshold);
    setCompRatio(COMP_DEFAULTS.ratio);
    setCompKnee(COMP_DEFAULTS.knee);
    setCompAttack(COMP_DEFAULTS.attack);
    setCompRelease(COMP_DEFAULTS.release);
    setCompMakeup(COMP_DEFAULTS.makeup);
    const comp = compressorRef.current;
    const makeup = makeupGainRef.current;
    if (comp && !compBypassedRef.current) {
      comp.threshold.value = COMP_DEFAULTS.threshold;
      comp.ratio.value = COMP_DEFAULTS.ratio;
      comp.knee.value = COMP_DEFAULTS.knee;
      comp.attack.value = COMP_DEFAULTS.attack;
      comp.release.value = COMP_DEFAULTS.release;
    }
    if (makeup && !compBypassedRef.current) makeup.gain.value = 1;
    savedMakeupDbRef.current = 0;

    updateCompSliderFill(
      compSliderRefs.current["threshold"],
      COMP_DEFAULTS.threshold
    );
    updateCompSliderFill(compSliderRefs.current["ratio"], COMP_DEFAULTS.ratio);
    updateCompSliderFill(compSliderRefs.current["knee"], COMP_DEFAULTS.knee);
    updateCompSliderFill(
      compSliderRefs.current["attack"],
      COMP_DEFAULTS.attack
    );
    updateCompSliderFill(
      compSliderRefs.current["release"],
      COMP_DEFAULTS.release
    );
    updateCompSliderFill(
      compSliderRefs.current["makeup"],
      COMP_DEFAULTS.makeup
    );
  }, [updateCompSliderFill]);

  // Discord copy
  const copyDiscord = useCallback(async () => {
    const text = "cozmofps";
    let success = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        success = true;
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        success = document.execCommand("copy");
        document.body.removeChild(ta);
      }
    } catch {
      success = false;
    }
    setTooltipText(success ? "Copied!" : "Copy Failed");
    setTimeout(() => setTooltipText("Copy Discord"), 1200);
  }, []);

  // Audio time update
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateUI = () => {
      const duration = audio.duration || 0;
      const current = audio.currentTime || 0;
      if (duration > 0) {
        setScrubberValue((current / duration) * 100);
      } else {
        setScrubberValue(0);
      }
      setTimeText(`${formatTime(current)} / ${formatTime(duration)}`);
      setIsPlaying(!audio.paused);
    };
    audio.addEventListener("timeupdate", updateUI);
    audio.addEventListener("loadedmetadata", updateUI);
    audio.addEventListener("play", updateUI);
    audio.addEventListener("pause", updateUI);
    updateUI();
    return () => {
      audio.removeEventListener("timeupdate", updateUI);
      audio.removeEventListener("loadedmetadata", updateUI);
      audio.removeEventListener("play", updateUI);
      audio.removeEventListener("pause", updateUI);
    };
  }, []);

  // Initial EQ track + comp track fill
  useEffect(() => {
    eqSliderRefs.current.forEach((slider, i) =>
      updateEqTrackFill(slider, eqSavedGainsRef.current[i])
    );
    updateCompSliderFill(
      compSliderRefs.current["threshold"],
      COMP_DEFAULTS.threshold
    );
    updateCompSliderFill(compSliderRefs.current["ratio"], COMP_DEFAULTS.ratio);
    updateCompSliderFill(compSliderRefs.current["knee"], COMP_DEFAULTS.knee);
    updateCompSliderFill(compSliderRefs.current["attack"], COMP_DEFAULTS.attack);
    updateCompSliderFill(
      compSliderRefs.current["release"],
      COMP_DEFAULTS.release
    );
    updateCompSliderFill(
      compSliderRefs.current["makeup"],
      COMP_DEFAULTS.makeup
    );
  }, [updateEqTrackFill, updateCompSliderFill]);

  // Spectrum canvas resize listener
  useEffect(() => {
    const handler = () => resizeSpecCanvas();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [resizeSpecCanvas]);

  // Discord presence fetch
  useEffect(() => {
    let cancelled = false;
    const loadCard = async () => {
      try {
        const res = await fetch(LANYARD_ENDPOINT);
        const json = await res.json();
        if (!json.success || !json.data) {
          throw new Error("Invalid response from Lanyard API");
        }
        if (cancelled) return;
        const data = json.data;
        const user: DiscordUser = data.discord_user;
        const activities: DiscordActivity[] = data.activities || [];
        const customStatusActivity = activities.find((a) => a.type === 4);
        const activity =
          data.discord_status === "offline"
            ? null
            : getRichActivity(activities);
        setDiscordPresence({
          avatarUrl: getAvatarUrl(user),
          username:
            user.display_name || user.global_name || user.username || "",
          status: data.discord_status as DiscordStatus,
          customStatus: customStatusActivity?.state || "",
          activity,
        });
        setDiscordError(false);
      } catch {
        if (!cancelled) setDiscordError(true);
      }
    };
    loadCard();
    const id = setInterval(loadCard, 30000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  // View count fetch
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch("https://fur1.foxomy.com/cozmo-space/view-counter");
        const json = await res.json();
        if (typeof json.count === "number" && !cancelled) {
          setViewCount(json.count);
        }
      } catch {
        // ignore
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // Escape closes credits modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && creditsOpen) setCreditsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [creditsOpen]);

  // Cleanup all animation frames on unmount
  useEffect(() => {
    return () => {
      animationFramesRef.current.forEach((id) => cancelAnimationFrame(id));
      animationFramesRef.current = [];
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
      const ctx = audioCtxRef.current;
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {});
      }
    };
  }, []);

  // Helpers for formatting comp values
  const fmtMs = (s: number) => `${Math.round(s * 1000)} ms`;
  const fmtDb = (v: number) => `${v} dB`;
  const fmtRatio = (v: number) => `${v}:1`;
  const fmtGainDb = (v: number) => `${v > 0 ? "+" : ""}${v} dB`;
  const fmtEq = (v: number) => `${v > 0 ? "+" : ""}${v} dB`;

  return (
    <div ref={rootRef} className={styles.root}>
      {/* Click to enter overlay */}
      {!enterHidden && (
        <div
          className={`${styles.enterScreen} ${entered ? styles.fadeOut : ""}`}
          onClick={handleEnter}
        >
          <button
            type="button"
            className={styles.enterButton}
            onClick={handleEnter}
          >
            click to enter...
          </button>
        </div>
      )}

      <div className={styles.container}>
        {/* Hidden audio element */}
        <audio ref={audioRef} loop preload="auto">
          <source
            src="/imgs/portfolios/cozmo/media/spacedog.flac"
            type="audio/flac"
          />
        </audio>

        <div
          className={`${styles.card} ${
            cardEntered ? styles.cardEntered : ""
          }`}
        >
          <div className={styles.cardLayout}>
            <div className={styles.cardLeft}>
              <div className={styles.avatar}>
                <img
                  src="/imgs/portfolios/cozmo/site/pfp.png"
                  className={styles.pfp}
                  alt="Cozmo profile"
                />
                <img
                  src="/imgs/portfolios/cozmo/site/decoration.png"
                  className={styles.decoration}
                  alt=""
                />
              </div>
              <canvas ref={glitchCanvasRef} className={styles.glitch} />
              <h3 className={styles.handle}>@cozmofps</h3>
              <p
                ref={typewriterRef}
                className={`${styles.typewriter} ${
                  typewriterDone ? styles.done : ""
                }`}
                data-text={TYPEWRITER_TEXT}
              >
                <b>{typewriterText}</b>
              </p>

              {/* Discord card */}
              <div className={styles.discordCard}>
                <video
                  ref={bgVideoRef}
                  className={styles.cardBgVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                >
                  <source
                    src="/imgs/portfolios/cozmo/media/nameplate.webm"
                    type="video/webm"
                  />
                </video>
                {!discordPresence && (
                  <div className={styles.discordLoading}>
                    <img
                      src="/imgs/portfolios/cozmo/site/discord.svg"
                      alt="Discord Icon"
                      className={styles.discordLoadingIcon}
                    />
                    <span>
                      {discordError
                        ? "couldn't load discord presence"
                        : "loading discord presence..."}
                    </span>
                  </div>
                )}
                {discordPresence && (
                  <div className={`${styles.discordLoaded} ${styles.visible}`}>
                    <div className={styles.discordavatarWrap}>
                      <img
                        className={styles.discordavatar}
                        src={discordPresence.avatarUrl}
                        alt="Discord avatar"
                      />
                      <div
                        className={`${styles.presenceDot} ${presenceClass(
                          discordPresence.status
                        )}`}
                      />
                    </div>
                    <div className={styles.discordInfo}>
                      <div className={styles.username}>
                        {discordPresence.username}
                      </div>
                      {discordPresence.customStatus && (
                        <div className={styles.statusLine}>
                          {discordPresence.customStatus}
                        </div>
                      )}
                      {discordPresence.status === "offline" && (
                        <div
                          className={`${styles.activityLine} ${styles.offlineLine}`}
                        >
                          Currently offline
                        </div>
                      )}
                      {discordPresence.status !== "offline" &&
                        discordPresence.activity && (
                          <div className={styles.activityLine}>
                            {discordPresence.activity.title}
                            {discordPresence.activity.details.map(
                              (line, i) => (
                                <div key={i} className={styles.activityDetail}>
                                  {line}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      {discordPresence.status !== "offline" &&
                        !discordPresence.activity && (
                          <div
                            className={`${styles.activityLine} ${styles.offlineLine}`}
                          >
                            Currently doing nothing
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>

              {/* Socials */}
              <div className={styles.socials}>
                <button
                  type="button"
                  className={`${styles.social} ${styles.socialDiscord}`}
                  data-tooltip={tooltipText}
                  onClick={copyDiscord}
                  aria-label="Copy Discord username"
                >
                  <img
                    src="/imgs/portfolios/cozmo/site/discord.svg"
                    alt="Discord Icon"
                  />
                </button>
                <a
                  href="https://www.youtube.com/@CozmoFPS"
                  className={styles.social}
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/imgs/portfolios/cozmo/site/youtube.svg"
                    alt="YouTube Icon"
                  />
                </a>
                <a
                  href="https://www.instagram.com/CozmoFPS"
                  className={styles.social}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/imgs/portfolios/cozmo/site/instagram.svg"
                    alt="Instagram Icon"
                  />
                </a>
                <a
                  href="https://x.com/BoatSushii"
                  className={styles.social}
                  aria-label="X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/imgs/portfolios/cozmo/site/x.svg"
                    alt="X Icon"
                  />
                </a>
                <a
                  href="https://steamcommunity.com/id/CozmoFPS"
                  className={styles.social}
                  aria-label="Steam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/imgs/portfolios/cozmo/site/steam.svg"
                    alt="Steam Icon"
                  />
                </a>
              </div>
            </div>

            <div className={styles.cardRight}>
              {/* EQ */}
              <div className={styles.eqContainer}>
                <div className={styles.eqHeader}>
                  <span className={styles.eqLabel}>Equalizer</span>
                  <div className={styles.eqActions}>
                    <button
                      type="button"
                      className={styles.panelBtn}
                      onClick={handleEqReset}
                      aria-label="Reset EQ"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className={`${styles.panelBtn} ${
                        eqBypass ? styles.active : ""
                      }`}
                      onClick={handleEqBypass}
                      aria-label="Bypass EQ"
                    >
                      {eqBypass ? "Bypassed" : "Bypass"}
                    </button>
                  </div>
                </div>
                <div className={styles.eqBands}>
                  {EQ_FREQUENCIES.map((_, i) => (
                    <div key={i} className={styles.eqBand}>
                      <label>{EQ_LABELS[i]}</label>
                      <input
                        ref={(el) => {
                          eqSliderRefs.current[i] = el;
                        }}
                        type="range"
                        min={-12}
                        max={12}
                        step={0.5}
                        value={eqValues[i]}
                        onChange={(e) =>
                          handleEqChange(i, parseFloat(e.target.value))
                        }
                        className={styles.eqSlider}
                        {...{ orient: "vertical" }}
                      />
                      <span className={styles.eqValue}>
                        {fmtEq(eqValues[i])}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Compressor */}
              <div className={styles.compressorContainer}>
                <div className={styles.compHeader}>
                  <span className={styles.compLabel}>Compressor</span>
                  <div className={styles.compActions}>
                    <button
                      type="button"
                      className={styles.panelBtn}
                      onClick={handleCompReset}
                      aria-label="Reset compressor"
                    >
                      Reset
                    </button>
                    <button
                      type="button"
                      className={`${styles.panelBtn} ${
                        compBypass ? styles.active : ""
                      }`}
                      onClick={handleCompBypass}
                      aria-label="Bypass compressor"
                    >
                      {compBypass ? "Bypassed" : "Bypass"}
                    </button>
                  </div>
                </div>
                <div className={styles.compControls}>
                  <div className={styles.compKnob}>
                    <label>Thresh</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["threshold"] = el;
                      }}
                      type="range"
                      min={-60}
                      max={0}
                      step={1}
                      value={compThreshold}
                      onChange={(e) =>
                        handleCompChange(
                          "threshold",
                          parseFloat(e.target.value),
                          "threshold"
                        )
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtDb(compThreshold)}
                    </span>
                  </div>
                  <div className={styles.compKnob}>
                    <label>Ratio</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["ratio"] = el;
                      }}
                      type="range"
                      min={1}
                      max={20}
                      step={0.5}
                      value={compRatio}
                      onChange={(e) =>
                        handleCompChange(
                          "ratio",
                          parseFloat(e.target.value),
                          "ratio"
                        )
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtRatio(compRatio)}
                    </span>
                  </div>
                  <div className={styles.compKnob}>
                    <label>Knee</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["knee"] = el;
                      }}
                      type="range"
                      min={0}
                      max={40}
                      step={1}
                      value={compKnee}
                      onChange={(e) =>
                        handleCompChange(
                          "knee",
                          parseFloat(e.target.value),
                          "knee"
                        )
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtDb(compKnee)}
                    </span>
                  </div>
                  <div className={styles.compKnob}>
                    <label>Attack</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["attack"] = el;
                      }}
                      type="range"
                      min={0}
                      max={1}
                      step={0.001}
                      value={compAttack}
                      onChange={(e) =>
                        handleCompChange(
                          "attack",
                          parseFloat(e.target.value),
                          "attack"
                        )
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtMs(compAttack)}
                    </span>
                  </div>
                  <div className={styles.compKnob}>
                    <label>Release</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["release"] = el;
                      }}
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={compRelease}
                      onChange={(e) =>
                        handleCompChange(
                          "release",
                          parseFloat(e.target.value),
                          "release"
                        )
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtMs(compRelease)}
                    </span>
                  </div>
                  <div className={styles.compKnob}>
                    <label>Gain</label>
                    <input
                      ref={(el) => {
                        compSliderRefs.current["makeup"] = el;
                      }}
                      type="range"
                      min={0}
                      max={24}
                      step={0.5}
                      value={compMakeup}
                      onChange={(e) =>
                        handleMakeupChange(parseFloat(e.target.value))
                      }
                      className={styles.compSlider}
                    />
                    <span className={styles.compValue}>
                      {fmtGainDb(compMakeup)}
                    </span>
                  </div>
                </div>
                <div className={styles.compMeterWrap}>
                  <div className={styles.compMeterLabel}>GR</div>
                  <div className={styles.compMeterTrack}>
                    <div
                      ref={compMeterRef}
                      className={styles.compMeterBar}
                    />
                  </div>
                </div>
              </div>

              {/* Spectrum */}
              <div className={styles.spectrumWrap}>
                <canvas
                  ref={spectrumCanvasRef}
                  className={styles.spectrum}
                  height={48}
                />
              </div>

              {/* Audio controls */}
              <div className={styles.audioControls}>
                <button
                  type="button"
                  className={styles.audioToggle}
                  onClick={handleAudioToggle}
                  aria-label="Play or pause audio"
                >
                  {isPlaying ? "\u275A\u275A" : "\u25B6"}
                </button>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={scrubberValue}
                  onChange={handleScrubberChange}
                  className={styles.audioScrubber}
                  aria-label="Seek audio"
                  style={{
                    background: `linear-gradient(to right, #9b7cff ${scrubberValue}%, rgba(255,255,255,0.15) ${scrubberValue}%)`,
                  }}
                />
                <span className={styles.audioTime}>{timeText}</span>
                <button
                  type="button"
                  className={styles.creditsBtn}
                  onClick={() => setCreditsOpen(true)}
                  aria-label="View credits"
                  data-tooltip="Credits"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </button>
                <span className={styles.volumeWrap}>
                  <button
                    type="button"
                    className={styles.volumeIcon}
                    onClick={handleVolumeToggle}
                    aria-label="Mute or unmute"
                  >
                    {muted || volume === 0 ? ICON_VOLUME_OFF : ICON_VOLUME_ON}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={muted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className={styles.volumeSlider}
                    aria-label="Volume"
                    style={{
                      background: `linear-gradient(to right, rgba(155,124,255,0.6) ${
                        muted ? 0 : volume
                      }%, rgba(255,255,255,0.12) ${muted ? 0 : volume}%)`,
                    }}
                  />
                </span>
              </div>
            </div>
          </div>

          {viewCount !== null && (
            <span className={`${styles.viewCount} ${styles.visible}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="12"
                height="12"
                fill="currentColor"
              >
                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1-288 0zm144-64a64 64 0 1 1 0 128 64 64 0 1 1-128z" />
              </svg>
              <span>{viewCount.toLocaleString()}</span>
            </span>
          )}
          <a
            href="https://tech1k.com"
            className={styles.credit}
            target="_blank"
            rel="noopener noreferrer"
          >
            made by tech1k
          </a>
        </div>
      </div>

      {/* Credits modal */}
      <div
        className={`${styles.creditsModal} ${
          creditsOpen ? styles.open : ""
        }`}
        onClick={(e) => {
          if (e.target === e.currentTarget) setCreditsOpen(false);
        }}
      >
        <div className={styles.creditsCard}>
          <button
            type="button"
            className={styles.creditsClose}
            onClick={() => setCreditsOpen(false)}
            aria-label="Close credits"
          >
            &times;
          </button>
          <h2 className={styles.creditsTitle}>Credits</h2>
          <div className={styles.creditsSong}>spacedog (remix)</div>
          <div className={styles.creditsList}>
            <div className={styles.creditsRow}>
              <span className={styles.creditsLabel}>Composition</span>
              <span className={styles.creditsValue}>DanTDM, Cozmo</span>
            </div>
            <div className={styles.creditsRow}>
              <span className={styles.creditsLabel}>
                Arrangement/Synth Programmer
              </span>
              <span className={styles.creditsValue}>Cozmo</span>
            </div>
            <div className={styles.creditsRow}>
              <span className={styles.creditsLabel}>Mixing/Master</span>
              <span className={styles.creditsValue}>Cozmo</span>
            </div>
            <div className={styles.creditsRow}>
              <span className={styles.creditsLabel}>Original</span>
              <span className={styles.creditsValue}>DanTDM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
