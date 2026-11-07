export interface NarrationLine {
  text: string;
  language: string;
}

export interface Biodata {
  personal: {
    fullName: string;
    nickname: string;
    dateOfBirth: string;
    age: number;
    height: string;
    weight: string;
    bloodGroup: string;
    religion: string;
    nationality: string;
    permanentAddress: string;
    hometown: string;
  };
  education: {
    highestEducation: string;
    degree: string;
    subject: string;
    institution: string;
    passingYear: string;
    result: string;
    previousQualifications: {
      qualification: string;
      institution: string;
      result: string;
      passingYear: string;
    }[];
    publication: {
      title: string;
      status: string;
      date: string;
    };
    skills: {
      category: string;
      items: string[];
    }[];
  };
  professional: {
    currentOccupation: string;
    designation: string;
    company: string;
    income: string;
    workLocation: string;
    careerGoals: string;
  };
  family: {
    father: { name: string; occupation: string };
    mother: { name: string; occupation: string };
    brothers: number;
    sisters: number;
    olderSister: {
      name: string;
      maritalStatus: string;
      children: number;
      spouseOccupation: string;
      spouseLocation: string;
    };
    siblingPosition: string;
    familyBackground: string;
    familyResidence: string;
  };
  personalLife: {
    religiousPractice: string;
    lifestyle: string;
    hobbies: string[];
    qualities: string[];
    otherInformation: string;
  };
  preferences: {
    introduction: string;
    partnerPortrait: string;
    emphasis: string;
    expectations: string[];
  };
  narration: Partial<
    Record<
      "opening" | "introduction" | "about" | "education" | "career" | "family" | "personal" | "preferences" | "closing",
      NarrationLine
    >
  >;
}

export type SceneId =
  | "opening"
  | "introduction"
  | "about"
  | "education"
  | "career"
  | "family"
  | "personal"
  | "preferences"
  | "closing";