import type { SceneId } from "@/types/biodata";

export const scenes: { id: SceneId; label: string; duration: number }[] = [
  { id: "opening", label: "Opening", duration: 0 },
  { id: "introduction", label: "Intro", duration: 9000 },
  { id: "about", label: "About", duration: 7000 },
  { id: "education", label: "Education", duration: 7000 },
  { id: "career", label: "Career", duration: 7000 },
  { id: "family", label: "Family", duration: 9000 },
  { id: "personal", label: "Personal", duration: 8000 },
  { id: "preferences", label: "Future", duration: 7000 },
  { id: "closing", label: "Closing", duration: 9000 },
];

export const narrationForScene = (scene: SceneId) => {
  const keys = {
    opening: "opening",
    introduction: "introduction",
    about: "about",
    education: "education",
    career: "career",
    family: "family",
    personal: "personal",
    preferences: "preferences",
    closing: "closing",
  } as const;

  return keys[scene];
};

export const nextScene = (scene: SceneId, direction: -1 | 1): SceneId => {
  const currentIndex = scenes.findIndex((item) => item.id === scene);
  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), scenes.length - 1);
  return scenes[nextIndex].id;
};