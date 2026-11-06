import type { Biodata } from "@/types/biodata";

export const biodata: Biodata = {
  personal: {
    fullName: "Abdullah Al Hill Baki",
    dateOfBirth: "21 June 2000",
    age: 26,
    height: "5'9\"",
    weight: "78 kg",
    bloodGroup: "A+",
    religion: "Islam",
    nationality: "Bangladeshi",
    permanentAddress: "Gopalpur, Jamalpur",
    hometown: "Jamalpur",
  },
  education: {
    highestEducation: "",
    degree: "",
    subject: "",
    institution: "",
    passingYear: "",
    result: "",
  },
  professional: {
    currentOccupation: "",
    designation: "",
    company: "",
    income: "",
    workLocation: "",
    careerGoals: "",
  },
  family: {
    father: { name: "Md Bazlur Rahman", occupation: "Retired" },
    mother: { name: "Nure Zannat", occupation: "Housewife" },
    brothers: 0,
    sisters: 1,
    siblingPosition: "2nd among siblings",
    familyBackground: "",
    familyResidence: "",
  },
  personalLife: {
    religiousPractice: "",
    lifestyle: "",
    hobbies: [],
    qualities: [],
    otherInformation: "",
  },
  preferences: {
    introduction: "",
    expectations: [],
  },
  narration: {
    opening: {
      text: "Welcome. Take a moment to get to know Abdullah Al Hill Baki.",
      language: "en-US",
    },
    introduction: {
      text: "Abdullah Al Hill Baki is from Jamalpur, Bangladesh. This introduction shares the personal and family details provided for his marriage biodata.",
      language: "en-US",
    },
    family: {
      text: "Abdullah's family includes his father, Md Bazlur Rahman, who is retired, his mother, Nure Zannat, who is a housewife, and one sister. Abdullah is the second among the siblings.",
      language: "en-US",
    },
    personal: {
      text: "Abdullah is Muslim and Bangladeshi. His hometown is Jamalpur, and his permanent address is Gopalpur, Jamalpur.",
      language: "en-US",
    },
    closing: {
      text: "Thank you for taking the time to learn about Abdullah Al Hill Baki.",
      language: "en-US",
    },
  },
};