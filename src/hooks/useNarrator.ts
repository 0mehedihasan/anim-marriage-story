"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { NarrationLine } from "@/types/biodata";

const voiceConfig = { rate: 0.88, pitch: 0.86, volume: 1 };
const allowedVoiceLanguages = new Set(["en", "bn", "de"]);
const masculineVoiceNameHints = new Set([
  "alex", "amit", "arjun", "daniel", "david", "fred", "george", "hans", "james", "john", "klaus", "liam", "mark", "michael", "oliver", "otto", "rahul", "ravi", "stefan", "thomas", "yannick",
]);

const isAllowedVoice = (voice: SpeechSynthesisVoice) =>
  allowedVoiceLanguages.has(voice.lang.split("-")[0].toLowerCase());

const isLikelyMasculineVoice = (voice: SpeechSynthesisVoice) => {
  const name = voice.name.toLowerCase();
  const firstName = name.split(/[\s(]/, 1)[0];
  return /\bmale\b/.test(name) || masculineVoiceNameHints.has(firstName);
};

export const narrationLanguages = [
  { value: "en-US", label: "English" },
  { value: "bn-BD", label: "বাংলা" },
  { value: "de-DE", label: "Deutsch" },
] as const;

export type NarrationLanguage = (typeof narrationLanguages)[number]["value"];

export function useNarrator() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<NarrationLanguage>("en-US");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [spokenCharacterIndex, setSpokenCharacterIndex] = useState<number | null>(null);
  const voiceList = useRef(voices);
  const activeUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  const isSupported = useSyncExternalStore(
    () => () => undefined,
    () => "speechSynthesis" in window,
    () => false,
  );

  useEffect(() => {
    voiceList.current = voices;
  }, [voices]);

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices().filter(isAllowedVoice);
      setVoices(available);
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
      activeUtterance.current.onstart = null;
      activeUtterance.current.onboundary = null;
      activeUtterance.current = null;
    }
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    setSpokenCharacterIndex(null);
  }, []);

  const speak = useCallback((line: NarrationLine, onEnd: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(line.text.replace(/\bAnim\b/g, "Onim"));
    const languagePrefix = selectedLanguage.slice(0, 2).toLowerCase();
    const availableVoices = window.speechSynthesis.getVoices().filter(isAllowedVoice);
    if (availableVoices.length > 0) voiceList.current = availableVoices;
    const languageVoices = voiceList.current.filter((voice) => voice.lang.toLowerCase().startsWith(languagePrefix));
    const preferred =
      languageVoices.find((voice) => voice.localService && isLikelyMasculineVoice(voice)) ??
      languageVoices.find(isLikelyMasculineVoice) ??
      languageVoices.find((voice) => voice.localService) ??
      languageVoices[0] ??
      voiceList.current.find((voice) => voice.localService && voice.lang.toLowerCase().startsWith(line.language.slice(0, 2).toLowerCase())) ??
      voiceList.current.find((voice) => voice.lang.toLowerCase().startsWith(line.language.slice(0, 2).toLowerCase())) ??
      voiceList.current[0];

    if (preferred) utterance.voice = preferred;
    utterance.lang = preferred?.lang ?? selectedLanguage;
    const masculineVoice = preferred ? isLikelyMasculineVoice(preferred) : false;
    utterance.rate = masculineVoice ? 0.76 : voiceConfig.rate;
    utterance.pitch = masculineVoice ? 0.96 : voiceConfig.pitch;
    utterance.volume = voiceConfig.volume;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setSpokenCharacterIndex(0);
    };
    utterance.onboundary = (event) => {
      setSpokenCharacterIndex(event.charIndex);
    };
    utterance.onend = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
      setIsPaused(false);
      setSpokenCharacterIndex(null);
      onEnd();
    };
    utterance.onerror = () => {
      activeUtterance.current = null;
      setIsSpeaking(false);
      setIsPaused(false);
      setSpokenCharacterIndex(null);
      onEnd();
    };
    activeUtterance.current = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }, [selectedLanguage]);

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

  return {
    selectedLanguage,
    setSelectedLanguage,
    isSupported,
    isSpeaking,
    isPaused,
    spokenCharacterIndex,
    speak,
    stop,
    pause,
    resume,
  };
}