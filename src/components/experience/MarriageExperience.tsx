"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, Pause, Play, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { CurtainSystem } from "@/components/curtain/CurtainSystem";
import { SceneContent } from "@/components/scenes/SceneContent";
import { useNarrator } from "@/hooks/useNarrator";
import { narrationForScene, nextScene, scenes } from "@/lib/sceneConfig";
import { biodata } from "@/data/biodata";
import type { SceneId } from "@/types/biodata";

const visibleScenes = scenes.filter((scene) => !["opening", "closing"].includes(scene.id));
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToMotionPreference(onChange: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getMotionPreference() {
  return window.matchMedia(motionQuery).matches;
}

function estimateSpeechMs(text: string) {
  return Math.max(4500, (text.trim().split(/\s+/).length / 2.15) * 1000 + 2400);
}

export function MarriageExperience() {
  const [scene, setScene] = useState<SceneId>("opening");
  const [entered, setEntered] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [autoPlay, setAutoPlay] = useState(true);
  const [speechEnded, setSpeechEnded] = useState<SceneId | null>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, () => false);
  const { voices, selectedVoiceURI, setSelectedVoiceURI, isSupported, isSpeaking, isPaused, speak, stop, pause, resume } = useNarrator();
  const sceneIndex = scenes.findIndex((item) => item.id === scene);
  const speechLine = biodata.narration[narrationForScene(scene)];

  const changeScene = useCallback((next: SceneId) => {
    stop();
    setSpeechEnded(null);
    setScene(next);
  }, [stop]);

  const step = useCallback((direction: -1 | 1) => {
    const next = nextScene(scene, direction);
    if (next !== scene && next !== "opening") changeScene(next);
  }, [changeScene, scene]);

  const enterStory = () => {
    if (reducedMotion) {
      setCurtainsOpen(true);
      setEntered(true);
      changeScene("introduction");
      return;
    }

    const left = curtainRef.current;
    const right = left?.parentElement?.querySelector<HTMLElement>(".curtain-panel--right");
    if (!left || !right) return;

    gsap.killTweensOf([left, right]);
    gsap.timeline({
      onComplete: () => {
        setCurtainsOpen(true);
        setEntered(true);
        changeScene("introduction");
      },
    })
      .to(".opening-copy", { opacity: 0, y: -8, duration: 0.3, ease: "power1.out" })
      .to(".stage-light", { opacity: 1, scale: 1, duration: 0.85, ease: "power2.out" }, "<")
      .to(left, { xPercent: -88, duration: 1.6, ease: "power3.inOut" }, 0.25)
      .to(right, { xPercent: 88, duration: 1.6, ease: "power3.inOut" }, 0.25);
  };

  useEffect(() => {
    if (!entered || scene === "opening" || !voiceEnabled || !isSupported || !speechLine) return;
    speak(speechLine, () => setSpeechEnded(scene));
    return () => stop();
  }, [entered, isSupported, scene, speechLine, speak, stop, voiceEnabled]);

  useEffect(() => {
    if (!entered || !autoPlay || scene === "opening") return;
    const currentScene = scenes.find((item) => item.id === scene);
    const hasVoice = voiceEnabled && isSupported && speechLine;
    const delay = hasVoice
      ? speechEnded === scene ? 1500 : estimateSpeechMs(speechLine.text) + 7000
      : currentScene?.duration ?? 8000;
    const timer = window.setTimeout(() => {
      if (scene === "closing") {
        setAutoPlay(false);
        return;
      }
      changeScene(nextScene(scene, 1));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoPlay, changeScene, entered, isSupported, scene, speechEnded, speechLine, voiceEnabled]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable) return;
      if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
      if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
      if (event.code === "Space" && scene !== "opening") {
        event.preventDefault();
        setAutoPlay((playing) => !playing);
        if (isPaused) resume(); else if (isSpeaking) pause();
      }
      if (event.key.toLowerCase() === "m") setVoiceEnabled((enabled) => !enabled);
      if (event.key === "Escape" && document.fullscreenElement) void document.exitFullscreen();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPaused, isSpeaking, pause, resume, scene, step]);

  useEffect(() => () => {
    stop();
    gsap.killTweensOf(".curtain-panel");
  }, [stop]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  };

  const restart = () => {
    stop();
    setAutoPlay(true);
    setVoiceEnabled(true);
    setEntered(false);
    setCurtainsOpen(false);
    setScene("opening");
    setSpeechEnded(null);
    if (curtainRef.current) gsap.set(curtainRef.current, { xPercent: 0 });
    const right = curtainRef.current?.parentElement?.querySelector<HTMLElement>(".curtain-panel--right");
    if (right) gsap.set(right, { xPercent: 0 });
  };

  const startTouch = (event: React.TouchEvent) => {
    touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  };
  const endTouch = (event: React.TouchEvent) => {
    if (!touchStart.current) return;
    const deltaX = event.changedTouches[0].clientX - touchStart.current.x;
    const deltaY = event.changedTouches[0].clientY - touchStart.current.y;
    if (Math.abs(deltaX) > 65 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) step(deltaX < 0 ? 1 : -1);
    touchStart.current = null;
  };

  return (
    <main className={`experience${entered ? " experience--entered" : ""}${reducedMotion ? " reduced-motion" : ""}`}>
      <div className="stage-light" aria-hidden="true" />
      <div className="stage-architecture" aria-hidden="true"><div className="stage-arch"><i /><b /></div></div>
      <div className="stage-grain" aria-hidden="true" />
      <CurtainSystem ref={curtainRef} closing={scene === "closing" && entered} />

      {!entered && <div className="opening-copy">
        <div className="opening-emblem" aria-hidden="true"><span>ب</span><i /></div>
        <p className="eyebrow"><span />Marriage Biodata</p>
        <h1>A Journey<br /><em>Begins</em></h1>
        <p className="opening-subtitle">Take a moment to know Abdullah.</p>
        <button className="begin-button" onClick={enterStory}>
          Begin the Journey <ArrowRight size={17} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <span className="opening-voice-note"><Volume2 size={13} aria-hidden="true" /> Voice narration available</span>
      </div>}

      {entered && <>
        <header className="experience-header">
          <a className="brand-mark" href="#story" aria-label="Abdullah Al Hill Baki, journey home" onClick={(event) => { event.preventDefault(); restart(); }}>
            <span className="brand-monogram">AB</span><span className="brand-name">Abdullah <i>Al Hill Baki</i></span>
          </a>
          <div className="header-controls">
            <button className={`control-button${autoPlay ? " is-active" : ""}`} onClick={() => setAutoPlay((playing) => !playing)} aria-label={autoPlay ? "Turn autoplay off" : "Turn autoplay on"} aria-pressed={autoPlay}>
              {autoPlay ? <Pause size={15} /> : <Play size={15} />}<span>Auto Play</span>
            </button>
            <button className={`control-button${voiceEnabled ? " is-active" : ""}`} onClick={() => { setVoiceEnabled((enabled) => !enabled); if (voiceEnabled) stop(); }} aria-label={voiceEnabled ? "Mute narration" : "Enable narration"} aria-pressed={voiceEnabled}>
              {voiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}<span>Voice</span>
            </button>
            {isSupported && voices.length > 1 && <label className="voice-select-wrap">
              <span className="sr-only">Narration voice</span>
              <select value={selectedVoiceURI} onChange={(event) => { stop(); setSelectedVoiceURI(event.target.value); }} aria-label="Choose narration voice">
                {voices.map((voice) => <option key={voice.voiceURI} value={voice.voiceURI}>{voice.name} ({voice.lang})</option>)}
              </select>
            </label>}
            {isSpeaking && <button className="control-button voice-pause" onClick={() => isPaused ? resume() : pause()} aria-label={isPaused ? "Resume narration" : "Pause narration"}>
              {isPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>}
            <button className="icon-button" onClick={() => void toggleFullscreen()} aria-label="Toggle fullscreen"><Expand size={17} strokeWidth={1.6} /></button>
          </div>
        </header>

        <section id="story" className={`story-stage${scene === "closing" ? " story-stage--closing" : ""}`} onTouchStart={startTouch} onTouchEnd={endTouch} aria-live="polite">
          <AnimatePresence mode="wait">
            {scene !== "opening" && <SceneContent key={scene} scene={scene as Exclude<SceneId, "opening">} />}
          </AnimatePresence>
        </section>

        <footer className="experience-footer">
          <div className="navigation-controls">
            <button className="icon-button nav-arrow" aria-label="Previous scene" onClick={() => step(-1)} disabled={sceneIndex <= 1}><ArrowLeft size={17} /></button>
            <div className="progress-wrap">
              <div className="progress-track"><span style={{ width: `${Math.max(0, ((sceneIndex - 1) / (scenes.length - 2)) * 100)}%` }} /></div>
              <span className="progress-count">{String(Math.max(sceneIndex, 1)).padStart(2, "0")} <i>/</i> {String(scenes.length - 2).padStart(2, "0")}</span>
            </div>
            <button className="icon-button nav-arrow" aria-label="Next scene" onClick={() => step(1)} disabled={sceneIndex >= scenes.length - 1}><ArrowRight size={17} /></button>
          </div>
          <nav className="scene-navigation" aria-label="Story sections">
            {visibleScenes.map((item) => <button key={item.id} className={scene === item.id ? "is-current" : ""} onClick={() => changeScene(item.id)} aria-current={scene === item.id ? "step" : undefined}>
              <span className="nav-dot" />{item.label}
            </button>)}
          </nav>
          <div className="footer-actions">
            <a className="print-action" href="/print" target="_blank" rel="noreferrer">Print biodata <ArrowRight size={14} /></a>
            {scene === "closing" && <button className="icon-button restart-action" aria-label="Restart journey" onClick={restart}><RotateCcw size={16} /></button>}
          </div>
        </footer>
      </>}

      {scene === "closing" && entered && <span className="closing-veil" aria-hidden="true" />}
      <span className="corner-ornament corner-ornament--left" aria-hidden="true" />
      <span className="corner-ornament corner-ornament--right" aria-hidden="true" />
      <span className="visually-hidden" aria-live="polite">{curtainsOpen ? `Curtains open. ${scenes[sceneIndex]?.label} scene.` : "Curtains closed."}</span>
    </main>
  );
}