"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { NarrationLine } from "@/types/biodata";

const voiceConfig = { rate: 0.88, pitch: 0.95, volume: 1 };

export function useNarrator() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const voiceList = useRef(voices);
  const selectedURI = useRef(selectedVoiceURI);
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const isSupported = useSyncExternalStore(
    () => () => undefined,
    () => "speechSynthesis" in window,
    () => false,
  );

  useEffect(() => {
    voiceList.current = voices;
    selectedURI.current = selectedVoiceURI;
  }, [selectedVoiceURI, voices]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices();
      setVoices(available);
      setSelectedVoiceURI((current) => current || available.find((voice) => voice.localService && voice.lang.startsWith("en"))?.voiceURI || available[0]?.voiceURI || "");
    };

    const frame = window.requestAnimationFrame(loadVoices);
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.cancelAnimationFrame(frame);
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      if (activeUtterance.current) {
        activeUtterance.current.onend = null;
        activeUtterance.current.onerror = null;
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    if (activeUtterance.current) {
      activeUtterance.current.onend = null;
      activeUtterance.current.onerror = null;
      activeUtterance.current = null;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  }, []);

  const speak = useCallback((line: NarrationLine, onEnd: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(line.text);
    const selected = voiceList.current.find((voice) => voice.voiceURI === selectedURI.current);
    const preferred =
      selected ??
      voiceList.current.find((voice) => voice.localService && voice.lang.toLowerCase().startsWith(line.language.slice(0, 2).toLowerCase())) ??
      voiceList.current.find((voice) => voice.lang.toLowerCase().startsWith(line.language.slice(0, 2).toLowerCase())) ??
      voiceList.current[0];

    if (preferred) utterance.voice = preferred;
    utterance.lang = line.language;
    utterance.rate = voiceConfig.rate;
    utterance.pitch = voiceConfig.pitch;
    utterance.volume = voiceConfig.volume;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };
    utterance.onend = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
      setIsPaused(false);
      onEnd();
    };
    utterance.onerror = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
      setIsPaused(false);
      onEnd();
    };
    activeUtterance.current = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  }, []);

  return { voices, selectedVoiceURI, setSelectedVoiceURI, isSupported, isSpeaking, isPaused, speak, stop, pause, resume };
}