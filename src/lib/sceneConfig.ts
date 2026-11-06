import { biodata } from "@/data/biodata";
import type { SceneId } from "@/types/biodata";

const hasCareer = Object.values(biodata.professional).some(Boolean);

export const allScenes: { id: SceneId; label: string; duration: number }[] = [
  { id: "opening", label: "Opening", duration: 0 },
  { id: "introduction", label: "Introduction", duration: 9000 },
  { id: "about", label: "About", duration: 7000 },
  { id: "education", label: "Education", duration: 7000 },
  { id: "career", label: "Career", duration: 7000 },
  { id: "family", label: "Family", duration: 9000 },
  { id: "personal", label: "Faith & Home", duration: 8000 },
  { id: "preferences", label: "His Words", duration: 7000 },
  { id: "closing", label: "Closing", duration: 9000 },
];

// Hide sections with nothing to show yet, instead of a "to be shared" placeholder.
export const scenes = allScenes.filter((scene) => scene.id !== "career" || hasCareer);

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