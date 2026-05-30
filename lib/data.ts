export type Difficulty = "Introductory" | "Intermediate" | "Advanced";

export interface Scenario {
  id: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  estimatedMinutes: number;
  tags: string[];
  resident: {
    name: string;
    age: number;
    gender: string;
    zip: string;
    primaryLanguage: string;
    insurance: string;
  };
  situation: string;
  riskClues: string[];
  screeningQuestions: { id: string; text: string; correct: boolean }[];
  riskFactors: { id: string; label: string; correct: boolean }[];
  correctUrgency: "Low" | "Moderate" | "High" | "Immediate";
  referralPathways: { id: string; label: string; category: string; correct: boolean }[];
  feedback: {
    recognized: string[];
    missed: string[];
    strongerPathway: string;
    whyItMatters: string;
  };
  categoryScores: {
    riskRecognition: number;
    urgencyJudgment: number;
    referralFit: number;
    communicationLanguage: number;
    safetyAwareness: number;
  };
}

export const scenarios: Scenario[] = [
  {
    id: "heat-risk",
    title: "Heat Risk & Chronic Disease",
    summary:
      "An elderly diabetic resident without air conditioning faces dangerous heat exposure during a summer heat advisory.",
    difficulty: "Introductory",
    estimatedMinutes: 3,
    tags: ["Heat", "Diabetes", "Elderly"],
    resident: {
      name: "Mr. Ruben Garza",
      age: 74,
      gender: "Male",
      zip: "78207",
      primaryLanguage: "Spanish",
      insurance: "Medicare",
    },
    situation:
      "Mr. Garza is a 74-year-old diabetic man living alone in a low-income neighborhood on the west side of San Antonio. His neighbor called the Metro Health line stating he has not been seen outside in three days during a record heat wave. He has no air conditioning and takes insulin.",
    riskClues: [
      "No air conditioning in the home",
      "Age 74 – high heat vulnerability",
      "Insulin-dependent diabetes",
      "Lives alone with no daily check-in",
      "Three-day absence from normal activity",
      "Record heat advisory in effect",
    ],
    screeningQuestions: [
      { id: "sq1", text: "Does the resident have reliable cooling at home?", correct: true },
      { id: "sq2", text: "Is the resident managing a chronic illness requiring medication?", correct: true },
      { id: "sq3", text: "Does the resident have daily social contact or a caregiver?", correct: true },
      { id: "sq4", text: "Does the resident have reliable transportation?", correct: false },
      { id: "sq5", text: "Is the resident enrolled in a meal delivery program?", correct: false },
      { id: "sq6", text: "What is the resident's housing tenure status?", correct: false },
    ],
    riskFactors: [
      { id: "rf1", label: "Extreme heat exposure", correct: true },
      { id: "rf2", label: "Social isolation", correct: true },
      { id: "rf3", label: "Medication non-adherence risk", correct: true },
      { id: "rf4", label: "Spanish-primary communication / language access need", correct: true },
      { id: "rf5", label: "Insulin storage risk due to heat-sensitive medication", correct: true },
      { id: "rf6", label: "Food insecurity", correct: false },
      { id: "rf7", label: "Unmanaged diabetes", correct: false },
      { id: "rf8", label: "Housing instability", correct: false },
    ],
    correctUrgency: "Immediate",
    referralPathways: [
      { id: "rp1", label: "SA Metro Health – Heat Emergency Line", category: "Emergency Services", correct: true },
      { id: "rp2", label: "SA Area Agency on Aging – Wellness Check", category: "Senior Services", correct: true },
      { id: "rp3", label: "CPS Energy Cooling Assistance Program", category: "Utility Assistance", correct: true },
      { id: "rp4", label: "Bilingual outreach / Spanish-language follow-up", category: "Language Access", correct: true },
      { id: "rp5", label: "WIC Nutrition Services", category: "Nutrition", correct: false },
      { id: "rp6", label: "Goodwill Job Training Center", category: "Employment", correct: false },
    ],
    feedback: {
      recognized: [
        "Heat vulnerability in an elderly diabetic resident",
        "Absence of cooling infrastructure",
        "Social isolation amplifying risk",
        "Insulin storage risk in a home without air conditioning",
        "Language access need for a Spanish-primary resident",
      ],
      // 'missed' is computed dynamically in the feedback page — this array is never used.
      missed: [],
      strongerPathway:
        "A same-day wellness check through SA Area Agency on Aging coordinated with Metro Health Heat Emergency resources, CPS Energy cooling assistance, and bilingual Spanish-language follow-up.",
      whyItMatters:
        "Heat stroke in elderly diabetics can escalate to organ failure within hours. Insulin stored above safe temperature becomes ineffective. Immediate intervention, cooling access, and language-appropriate outreach are all life-saving steps.",
    },
    categoryScores: {
      riskRecognition: 25,
      urgencyJudgment: 20,
      referralFit: 20,
      communicationLanguage: 10,
      safetyAwareness: 15,
    },
  },
  {
    id: "food-transport",
    title: "Food Insecurity & Transportation Barrier",
    summary:
      "A single mother with two children cannot access a food pantry or medical appointments due to lack of transportation.",
    difficulty: "Introductory",
    estimatedMinutes: 3,
    tags: ["Food Insecurity", "Transportation", "Children"],
    resident: {
      name: "Ms. Dania Reyes",
      age: 29,
      gender: "Female",
      zip: "78220",
      primaryLanguage: "English",
      insurance: "CHIP/Medicaid",
    },
    situation:
      "Ms. Reyes is a 29-year-old single mother of two children (ages 4 and 7) living on the east side. She has not been able to keep the children's well-child checkups for six months due to no vehicle and bus route gaps. The family relies on school meals; the summer gap has left them food-insecure.",
    riskClues: [
      "No personal vehicle and limited bus access",
      "Missed pediatric well-child visits for 6+ months",
      "Food insecurity during summer school break",
      "Single-parent household",
      "Children ages 4 and 7 – developmental monitoring needed",
    ],
    screeningQuestions: [
      { id: "sq1", text: "Does the family have reliable transportation to health and food resources?", correct: true },
      { id: "sq2", text: "Are the children current on well-child visits and immunizations?", correct: true },
      { id: "sq3", text: "Does the family have consistent access to nutritious food?", correct: true },
      { id: "sq4", text: "Is the parent currently employed full-time?", correct: false },
      { id: "sq5", text: "Does the household have internet access?", correct: false },
      { id: "sq6", text: "What is the parent's highest level of education?", correct: false },
    ],
    riskFactors: [
      { id: "rf1", label: "Food insecurity", correct: true },
      { id: "rf2", label: "Transportation barrier", correct: true },
      { id: "rf3", label: "Lapsed pediatric preventive care", correct: true },
      { id: "rf4", label: "Single-parent household stress", correct: true },
      { id: "rf5", label: "Substance use", correct: false },
      { id: "rf6", label: "Domestic violence", correct: false },
    ],
    correctUrgency: "Moderate",
    referralPathways: [
      { id: "rp1", label: "San Antonio Food Bank – Mobile Pantry", category: "Food Access", correct: true },
      { id: "rp2", label: "VIA Metropolitan Transit – Mobility on Demand", category: "Transportation", correct: true },
      { id: "rp3", label: "CHCS – Community Pediatric Clinic", category: "Pediatric Health", correct: true },
      { id: "rp4", label: "SNAP enrollment / benefits eligibility check", category: "Benefits", correct: true },
      { id: "rp5", label: "Summer learning / community literacy program referral", category: "Child Development", correct: true },
      { id: "rp6", label: "Behavioral Health Crisis Line", category: "Mental Health", correct: false },
      { id: "rp7", label: "CPS Energy Low-Income Assistance", category: "Utility Assistance", correct: false },
    ],
    feedback: {
      recognized: [
        "Transportation as a structural barrier to care",
        "Summer food gap for school-age children",
        "Need to reconnect children with pediatric care",
        "SNAP eligibility to increase food access benefits",
        "Summer learning programs to reduce developmental risk during school break",
      ],
      // 'missed' is computed dynamically from unselected correct options — this array is a fallback only.
      missed: [],
      strongerPathway:
        "Connect the family to SA Food Bank mobile pantry and confirm SNAP eligibility, link to VIA Mobility on Demand for medical and program appointments, schedule catch-up well-child visits at CHCS, and enroll children in a summer literacy program.",
      whyItMatters:
        "Missed pediatric visits mean missed immunizations and developmental screenings. Transportation and food security together determine whether children enter school healthy. Summer learning programs protect against developmental regression during school breaks.",
    },
    categoryScores: {
      riskRecognition: 25,
      urgencyJudgment: 20,
      referralFit: 20,
      communicationLanguage: 10,
      safetyAwareness: 15,
    },
  },
  {
    id: "housing-child",
    title: "Housing Instability & Child Health",
    summary:
      "A family facing eviction with a child who has uncontrolled asthma is living temporarily with relatives in overcrowded conditions.",
    difficulty: "Intermediate",
    estimatedMinutes: 4,
    tags: ["Housing", "Asthma", "Child Health", "Eviction"],
    resident: {
      name: "Ms. Yolanda Torres",
      age: 34,
      gender: "Female",
      zip: "78228",
      primaryLanguage: "Spanish",
      insurance: "Medicaid",
    },
    situation:
      "Ms. Torres received an eviction notice 30 days ago and is now staying with her sister's family (6 people, 2-bedroom). Her 8-year-old son Marcus has asthma that has worsened since the move. He has been to the ER twice in the past month. She is afraid to seek help because she worries about child protective services involvement.",
    riskClues: [
      "Pending eviction – housing instability",
      "Overcrowded temporary housing",
      "Child with uncontrolled asthma and 2 ER visits in 30 days",
      "Parent fear of system involvement limiting help-seeking",
      "Spanish-primary communication",
      "No stable address for care coordination",
    ],
    screeningQuestions: [
      { id: "sq1", text: "Is the child's current environment contributing to asthma triggers?", correct: true },
      { id: "sq2", text: "Does the family have stable housing in the next 30 days?", correct: true },
      { id: "sq3", text: "Is the parent aware of tenant rights and eviction prevention resources?", correct: true },
      { id: "sq4", text: "Is the parent currently employed?", correct: false },
      { id: "sq5", text: "What is the child's school attendance record?", correct: false },
      { id: "sq6", text: "Does the family have a savings account?", correct: false },
    ],
    riskFactors: [
      { id: "rf1", label: "Housing instability / pending eviction", correct: true },
      { id: "rf2", label: "Environmental asthma triggers in overcrowded home", correct: true },
      { id: "rf3", label: "Fear of system involvement limiting access to care", correct: true },
      { id: "rf4", label: "Language access barrier", correct: true },
      { id: "rf5", label: "Nutrition deficiency", correct: false },
      { id: "rf6", label: "Substance use", correct: false },
    ],
    correctUrgency: "High",
    referralPathways: [
      { id: "rp1", label: "SAMMinistries – Emergency Housing Assistance", category: "Housing", correct: true },
      { id: "rp2", label: "BCFS – Tenant Rights Navigation", category: "Legal Aid", correct: true },
      { id: "rp3", label: "University Health – Pediatric Asthma Clinic", category: "Pediatric Health", correct: true },
      { id: "rp4", label: "SA Food Bank", category: "Food Access", correct: false },
      { id: "rp5", label: "Goodwill Employment Services", category: "Employment", correct: false },
    ],
    feedback: {
      recognized: [
        "Housing instability as primary stressor",
        "Environmental link between overcrowding and asthma exacerbation",
        "Parent trust as a key engagement variable",
      ],
      missed: [
        "Mold and allergen assessment – overcrowded housing often contains respiratory triggers",
        "School notification for asthma action plan – keeps care coordinated during instability",
      ],
      strongerPathway:
        "Lead with housing navigation and tenant rights first to build trust, then coordinate pediatric asthma management and bilingual care navigation simultaneously.",
      whyItMatters:
        "Uncontrolled pediatric asthma during housing instability carries significant ER utilization and missed school days. Addressing root-cause housing stress reduces downstream health costs.",
    },
    categoryScores: {
      riskRecognition: 78,
      urgencyJudgment: 82,
      referralFit: 76,
      communicationLanguage: 65,
      safetyAwareness: 80,
    },
  },
  {
    id: "behavioral-safety",
    title: "Behavioral Health & Safety Escalation",
    summary:
      "A veteran experiencing a mental health crisis and substance use is expressing thoughts of self-harm and has access to firearms at home.",
    difficulty: "Advanced",
    estimatedMinutes: 5,
    tags: ["Behavioral Health", "Veterans", "Safety", "Crisis"],
    resident: {
      name: "Mr. James Okafor",
      age: 47,
      gender: "Male",
      zip: "78233",
      primaryLanguage: "English",
      insurance: "VA / Tricare",
    },
    situation:
      "Mr. Okafor is a 47-year-old veteran referred by a VA peer support specialist. He has been isolating for three weeks, missing VA appointments, and recently expressed to a neighbor that he 'doesn't see the point.' He has a history of PTSD and alcohol use disorder. His neighbor reports firearms in the home.",
    riskClues: [
      "Expressed passive suicidal ideation",
      "Firearm access in home",
      "Social isolation for 3+ weeks",
      "Missed VA mental health appointments",
      "PTSD + alcohol use disorder comorbidity",
      "Veteran – specific care system navigation needed",
    ],
    screeningQuestions: [
      { id: "sq1", text: "Has the resident expressed thoughts of self-harm or suicide?", correct: true },
      { id: "sq2", text: "Is there a lethal means concern (firearms, medications) in the home?", correct: true },
      { id: "sq3", text: "Is the resident currently engaged with mental health treatment?", correct: true },
      { id: "sq4", text: "Does the resident have stable housing?", correct: false },
      { id: "sq5", text: "Is the resident currently employed?", correct: false },
      { id: "sq6", text: "What is the resident's transportation situation?", correct: false },
    ],
    riskFactors: [
      { id: "rf1", label: "Suicidal ideation (passive)", correct: true },
      { id: "rf2", label: "Lethal means access (firearm)", correct: true },
      { id: "rf3", label: "Comorbid PTSD and alcohol use disorder", correct: true },
      { id: "rf4", label: "Social isolation and disengagement", correct: true },
      { id: "rf5", label: "Food insecurity", correct: false },
      { id: "rf6", label: "Transportation barrier", correct: false },
    ],
    correctUrgency: "Immediate",
    referralPathways: [
      { id: "rp1", label: "Veterans Crisis Line – 988, Press 1", category: "Crisis Services", correct: true },
      { id: "rp2", label: "SA Behavioral Health Crisis Center – Walk-in", category: "Crisis Services", correct: true },
      { id: "rp3", label: "VA MISSION Act – Same-Day Mental Health", category: "VA Services", correct: true },
      { id: "rp4", label: "CPS Energy Assistance Program", category: "Utility Assistance", correct: false },
      { id: "rp5", label: "SNAP Benefits Office", category: "Nutrition", correct: false },
    ],
    feedback: {
      recognized: [
        "Suicidal ideation as an immediate safety trigger",
        "Lethal means counseling priority given firearm access",
        "VA care system navigation for veteran-specific services",
      ],
      missed: [
        "Alcohol use disorder as a modifiable risk factor requiring parallel treatment",
        "Peer support warm handoff – veteran-to-veteran connection is evidence-based for engagement",
      ],
      strongerPathway:
        "Immediate safety planning with lethal means counseling, warm handoff to Veterans Crisis Line, and same-day VA mental health referral with peer support follow-up.",
      whyItMatters:
        "Veteran suicide rates remain elevated nationally. Lethal means counseling and immediate crisis linkage are the highest-leverage interventions at this acuity level.",
    },
    categoryScores: {
      riskRecognition: 88,
      urgencyJudgment: 92,
      referralFit: 85,
      communicationLanguage: 75,
      safetyAwareness: 95,
    },
  },
  {
    id: "language-access-maternal-health",
    title: "Language Access & Maternal Health",
    summary:
      "A recently arrived Spanish-speaking immigrant in the third trimester has had no prenatal care and faces documentation-related fears about seeking services.",
    difficulty: "Advanced",
    estimatedMinutes: 5,
    tags: ["Maternal Health", "Language Access", "Prenatal", "Immigration"],
    resident: {
      name: "Ms. Sofia Mendez",
      age: 23,
      gender: "Female",
      zip: "78201",
      primaryLanguage: "Spanish (Oaxacan dialect)",
      insurance: "Uninsured",
    },
    situation:
      "Ms. Mendez is 23 years old, 32 weeks pregnant, and arrived from Oaxaca, Mexico four months ago. She has had no prenatal care. She was referred by a community promotora. She is afraid to seek care at a hospital due to documentation status concerns. She speaks an indigenous Oaxacan dialect as her primary language and limited Spanish.",
    riskClues: [
      "32 weeks pregnant with zero prenatal visits",
      "Uninsured and without documentation",
      "Primary language is an indigenous dialect – Spanish is secondary",
      "Fear of seeking care due to immigration status",
      "Unknown fetal health status",
      "Referred late by community health worker",
    ],
    screeningQuestions: [
      { id: "sq1", text: "What is the resident's preferred language and available interpreter resources?", correct: true },
      { id: "sq2", text: "Has the resident received any prenatal care during this pregnancy?", correct: true },
      { id: "sq3", text: "Does the resident have concerns about accessing care due to documentation status?", correct: true },
      { id: "sq4", text: "Does the resident have stable housing?", correct: false },
      { id: "sq5", text: "Is the resident currently employed?", correct: false },
      { id: "sq6", text: "Does the resident have reliable transportation?", correct: false },
    ],
    riskFactors: [
      { id: "rf1", label: "No prenatal care at 32 weeks", correct: true },
      { id: "rf2", label: "Language access barrier (indigenous dialect)", correct: true },
      { id: "rf3", label: "Documentation-status fear limiting care-seeking", correct: true },
      { id: "rf4", label: "Uninsured status", correct: true },
      { id: "rf5", label: "Domestic violence screening needed", correct: true },
      { id: "rf6", label: "Employment instability", correct: false },
    ],
    correctUrgency: "High",
    referralPathways: [
      { id: "rp1", label: "University Health – Obstetrics Urgent Clinic", category: "Maternal Health", correct: true },
      { id: "rp2", label: "CentroMed – Sliding Scale OB Care", category: "Community Health", correct: true },
      { id: "rp3", label: "SA Metro Health WIC Program", category: "Nutrition/Maternal", correct: true },
      { id: "rp4", label: "FQHC Language Interpreter Line (indigenous dialects)", category: "Language Access", correct: true },
      { id: "rp5", label: "Goodwill Job Placement", category: "Employment", correct: false },
    ],
    feedback: {
      recognized: [
        "No prenatal care as an immediate clinical risk",
        "Documentation-status fear as access barrier",
        "Interpreter need for indigenous dialect",
      ],
      missed: [
        "Emergency Medicaid eligibility – undocumented individuals qualify for pregnancy-related emergency coverage in Texas",
        "Domestic violence screening – immigrant women face elevated IPV risk during pregnancy",
      ],
      strongerPathway:
        "Urgent OB referral via FQHC with indigenous-language interpreter, Emergency Medicaid enrollment support, and promotora continuity for trust maintenance.",
      whyItMatters:
        "Third-trimester care without any prenatal history carries significant maternal and fetal risk. Language-appropriate care access can be lifesaving and is a legal right regardless of documentation status.",
    },
    categoryScores: {
      riskRecognition: 82,
      urgencyJudgment: 88,
      referralFit: 78,
      communicationLanguage: 92,
      safetyAwareness: 85,
    },
  },
];

export const STEPS = [
  "Review Case",
  "Ask Questions",
  "Identify Risks",
  "Assign Urgency",
  "Choose Pathway",
  "Results",
] as const;

export type Step = (typeof STEPS)[number];

export const URGENCY_OPTIONS = ["Low", "Moderate", "High", "Immediate"] as const;
export type Urgency = (typeof URGENCY_OPTIONS)[number];
