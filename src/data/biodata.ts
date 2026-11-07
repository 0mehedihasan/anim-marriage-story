import type { Biodata } from "@/types/biodata";

export const biodata: Biodata = {
  personal: {
    fullName: "Abdullah Al Hill Baki",
    nickname: "Anim",
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
    highestEducation: "Bachelor of Science",
    degree: "B.Sc.",
    subject: "Computer Science and Engineering",
    institution: "Bangladesh University of Business and Technology (BUBT)",
    passingYear: "December 2025",
    result: "CGPA 2.81",
    previousQualifications: [
      {
        qualification: "Higher Secondary Certificate (H.S.C.)",
        institution: "Milestone College Uttara",
        result: "GPA 4.42 out of 5.00",
        passingYear: "2019",
      },
      {
        qualification: "Secondary School Certificate (S.S.C.)",
        institution: "Jamalpur Zilla School",
        result: "GPA 4.44 out of 5.00",
        passingYear: "2017",
      },
    ],
    publication: {
      title: "X-GNN: An Explainable Ensemble Graph–Transformer Framework for Human Protein–Protein Interaction Prediction",
      status: "Accepted for oral presentation",
      date: "January 31, 2026",
    },
    skills: [
      { category: "Programming", items: ["C", "C++", "C#", "Java", "PHP", "Python", "JavaScript"] },
      { category: "Web", items: ["HTML", "CSS", "JSP", "Servlet", "JDBC"] },
      { category: "Databases", items: ["MySQL", "MS SQL Server", "Firebase"] },
      { category: "Data science", items: ["NumPy", "Pandas", "Seaborn", "Matplotlib", "Scikit-learn", "PyTorch", "Anaconda"] },
    ],
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
    mother: { name: "Nure Zannat", occupation: "Homemaker" },
    brothers: 0,
    sisters: 1,
    olderSister: {
      name: "Fatema tuz jahura Rima",
      maritalStatus: "Married",
      children: 1,
      spouseOccupation: "Businessman",
      spouseLocation: "Uttara",
    },
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
    introduction:
      "You have raised your daughter with so much love. My wish is that, after marriage, she never feels she has lost the care of her parents' home. I hope she feels she has gained a partner who will share her joys, sorrows and dreams, and always honour her dignity.",
    partnerPortrait:
      "She finds joy in the little things: cake, a favourite song and a touch of playful mischief. The mountains call to her, and she enjoys dressing up and wearing a saree as a way to express her style.",
    expectations: [],
  },
  narration: {
    opening: {
      text: "Assalamu alaikum. Thank you for taking the time to get to know Abdullah Al Hill Baki, called Anim at home, and his family.",
      language: "en-US",
    },
    introduction: {
      text: "Anim was born on the twenty-first of June, two thousand, and grew up in Jamalpur. He is the younger child of Md Bazlur Rahman and Nure Zannat. Today he is twenty-six, a recent graduate, and ready to start a family of his own.",
      language: "en-US",
    },
    about: {
      text: "A few details first. Anim is five feet nine inches tall, and his blood group is A positive. He is a Bangladeshi Muslim from Jamalpur.",
      language: "en-US",
    },
    education: {
      text: "Anim completed a Bachelor of Science in Computer Science and Engineering at Bangladesh University of Business and Technology in December 2025, with a CGPA of 2.81. Before that, he completed his Higher Secondary Certificate at Milestone College Uttara in 2019, with a GPA of 4.42 out of 5, and his Secondary School Certificate at Jamalpur Zilla School in 2017, with a GPA of 4.44 out of 5. He also co-authored a research paper on explainable graph and transformer methods for predicting human protein interactions, accepted for oral presentation on January 31, 2026. His listed technical skills cover programming, web development, databases, and data science.",
      language: "en-US",
    },
    family: {
      text: "Through every year of study, his family stood behind him. His father, Md Bazlur Rahman, is now retired. His mother, Nure Zannat, looks after the home. His older sister, Fatema tuz jahura Rima, is married, with one child, and her husband runs a business in Uttara.",
      language: "en-US",
    },
    personal: {
      text: "The family is Muslim, and their home is in Gopalpur, Jamalpur. It is a home Anim hopes to share one day.",
      language: "en-US",
    },
    preferences: {
      text: "Anim wanted to end with a few words of his own, written to her parents. You have raised your daughter with so much love. My wish is that, after marriage, she never feels she has lost the care of her parents' home. I hope she feels she has gained a partner who will share her joys, sorrows and dreams, and always honour her dignity. She finds joy in the little things: cake, a favourite song and a touch of playful mischief. The mountains call to her, and she enjoys dressing up and wearing a saree as a way to express her style.",
      language: "en-US",
    },
    closing: {
      text: "Thank you for reading about Anim. If you would like to talk further, or to meet, his family would be very happy to hear from you.",
      language: "en-US",
    },
  },
};