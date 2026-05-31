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
  screeningQuestions: { id: string; text: string; correct: boolean; rationale?: string }[];
  riskFactors: { id: string; label: string; correct: boolean; rationale?: string }[];
  correctUrgency: "Low" | "Moderate" | "High" | "Immediate";
  urgencyRationale: string;
  referralPathways: { id: string; label: string; category: string; correct: boolean; rationale?: string }[];
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
      { id: "sq1", text: "Does the resident have reliable cooling at home?", correct: true, rationale: "No AC during a record heat wave is the primary physical risk factor for a 74-year-old diabetic." },
      { id: "sq2", text: "Is the resident managing a chronic illness requiring medication?", correct: true, rationale: "Insulin requires refrigeration and becomes ineffective above safe temperatures — directly relevant here." },
      { id: "sq3", text: "Does the resident have daily social contact or a caregiver?", correct: true, rationale: "Living alone with no daily check-in means no one to identify deterioration early." },
      { id: "sq4", text: "Does the resident have reliable transportation?", correct: false, rationale: "Transportation is not the acute risk — the immediate threat is heat and medication safety, not mobility." },
      { id: "sq5", text: "Is the resident enrolled in a meal delivery program?", correct: false, rationale: "Nutrition is secondary to the immediate heat emergency and insulin storage concern." },
      { id: "sq6", text: "What is the resident's housing tenure status?", correct: false, rationale: "Housing tenure does not affect the acute heat risk assessment." },
    ],
    riskFactors: [
      { id: "rf1", label: "Extreme heat exposure", correct: true, rationale: "Record heat advisory + no AC in the home = direct physiological threat to a 74-year-old." },
      { id: "rf2", label: "Social isolation", correct: true, rationale: "Living alone with no daily check-in means a heat emergency could go undetected for days." },
      { id: "rf3", label: "Medication non-adherence risk", correct: true, rationale: "Extreme heat disrupts routine and impairs judgment — increasing missed-dose risk in insulin-dependent diabetes." },
      { id: "rf4", label: "Spanish-primary communication / language access need", correct: true, rationale: "Outreach and instructions must be in Spanish to ensure the resident understands and acts on the intervention." },
      { id: "rf5", label: "Insulin storage risk due to heat-sensitive medication", correct: true, rationale: "Insulin degrades above 77°F. A home without AC during a heat wave renders the resident's insulin ineffective." },
      { id: "rf6", label: "Food insecurity", correct: false, rationale: "Food insecurity is not supported by the case facts. The immediate risk is heat and medication safety." },
      { id: "rf7", label: "Unmanaged diabetes", correct: false, rationale: "The case describes insulin-dependent diabetes, not unmanaged diabetes. Labeling it unmanaged is not supported by the facts." },
      { id: "rf8", label: "Housing instability", correct: false, rationale: "There is no indication of housing instability in this case. The resident lives in his own home." },
    ],
    correctUrgency: "Immediate",
    urgencyRationale:
      "Older adult, insulin-dependent diabetes, no air conditioning, record heat advisory, lives alone, and no normal activity for three days. This combination creates a possible life-threatening heat emergency requiring same-day intervention.",
    referralPathways: [
      { id: "rp1", label: "SA Metro Health – Heat Emergency Line", category: "Emergency Services", correct: true, rationale: "The primary same-day response resource for heat emergencies in Bexar County." },
      { id: "rp2", label: "SA Area Agency on Aging – Wellness Check", category: "Senior Services", correct: true, rationale: "Provides immediate in-person wellness checks and cooling center transportation for isolated elderly residents." },
      { id: "rp3", label: "CPS Energy Cooling Assistance Program", category: "Utility Assistance", correct: true, rationale: "Can fund emergency AC installation or repair — directly addresses the absence of cooling in the home." },
      { id: "rp4", label: "Bilingual outreach / Spanish-language follow-up", category: "Language Access", correct: true, rationale: "Required for a Spanish-primary resident to ensure he understands instructions and follow-up care." },
      { id: "rp5", label: "WIC Nutrition Services", category: "Nutrition", correct: false, rationale: "WIC serves women and young children — not appropriate for a 74-year-old male. Not supported by case facts." },
      { id: "rp6", label: "Goodwill Job Training Center", category: "Employment", correct: false, rationale: "Employment is not relevant to this case. The resident's risk is acute heat exposure, not unemployment." },
    ],
    feedback: {
      recognized: [
        "Heat vulnerability in an elderly diabetic resident",
        "Absence of cooling infrastructure",
        "Social isolation amplifying risk",
        "Insulin storage risk in a home without air conditioning",
        "Language access need for a Spanish-primary resident",
      ],
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
      { id: "sq1", text: "Does the family have reliable transportation to health and food resources?", correct: true, rationale: "Transportation is the primary structural barrier named in this case — it blocks both food access and medical care." },
      { id: "sq2", text: "Are the children current on well-child visits and immunizations?", correct: true, rationale: "Six months of missed visits for children ages 4 and 7 means missed immunizations and developmental screenings." },
      { id: "sq3", text: "Does the family have consistent access to nutritious food?", correct: true, rationale: "The family explicitly relies on school meals — summer is a direct food-access gap." },
      { id: "sq4", text: "Is the parent currently employed full-time?", correct: false, rationale: "Employment status is secondary to the immediate transportation and food access barriers named in the case." },
      { id: "sq5", text: "Does the household have internet access?", correct: false, rationale: "Internet access is not relevant to the acute risks of food insecurity and missed pediatric care." },
      { id: "sq6", text: "What is the parent's highest level of education?", correct: false, rationale: "Education level is not a relevant screening question for this case's immediate risk profile." },
    ],
    riskFactors: [
      { id: "rf1", label: "Food insecurity", correct: true, rationale: "The family explicitly depends on school meals — the summer break creates a direct nutritional gap for two young children." },
      { id: "rf2", label: "Transportation barrier", correct: true, rationale: "No vehicle and limited bus access is the structural cause of both missed medical care and food pantry inaccessibility." },
      { id: "rf3", label: "Lapsed pediatric preventive care", correct: true, rationale: "Six months of missed well-child visits means missed immunizations and developmental milestones for children ages 4 and 7." },
      { id: "rf4", label: "Single-parent household stress", correct: true, rationale: "Single-parent households carry elevated logistics burden, especially when transportation and summer childcare intersect." },
      { id: "rf5", label: "Substance use", correct: false, rationale: "Substance use is not mentioned or implied anywhere in this case." },
      { id: "rf6", label: "Domestic violence", correct: false, rationale: "There is no indication of domestic violence in this case. Selecting this without case support is unsound clinical reasoning." },
    ],
    correctUrgency: "Moderate",
    urgencyRationale:
      "Elevated risk is present — children have missed care and are food-insecure — but the case does not describe acute illness, food absence today, abuse or neglect, or an immediate safety threat requiring same-day emergency response. Linkage within 1–2 weeks is appropriate.",
    referralPathways: [
      { id: "rp1", label: "San Antonio Food Bank – Mobile Pantry", category: "Food Access", correct: true, rationale: "A mobile pantry bypasses the transportation barrier by bringing food to the community — directly addresses the case facts." },
      { id: "rp2", label: "VIA Metropolitan Transit – Mobility on Demand", category: "Transportation", correct: true, rationale: "Provides door-to-door medical and essential-errand transportation — directly addresses the structural barrier." },
      { id: "rp3", label: "CHCS – Community Pediatric Clinic", category: "Pediatric Health", correct: true, rationale: "Federally Qualified Health Center with pediatric services, sliding-scale fees, and CHIP/Medicaid acceptance." },
      { id: "rp4", label: "SNAP enrollment / benefits eligibility check", category: "Benefits", correct: true, rationale: "The family may be eligible for SNAP benefits that substantially expand food purchasing power." },
      { id: "rp5", label: "Summer learning / community literacy program referral", category: "Child Development", correct: true, rationale: "Summer programs address food access AND developmental regression during school break for children ages 4 and 7." },
      { id: "rp6", label: "Behavioral Health Crisis Line", category: "Mental Health", correct: false, rationale: "There is no mental health crisis or behavioral concern described in this case." },
      { id: "rp7", label: "CPS Energy Low-Income Assistance", category: "Utility Assistance", correct: false, rationale: "Utility instability is not mentioned in this case. CPS Energy assistance does not address food access or transportation." },
    ],
    feedback: {
      recognized: [
        "Transportation as a structural barrier to care",
        "Summer food gap for school-age children",
        "Need to reconnect children with pediatric care",
        "SNAP eligibility to increase food access benefits",
        "Summer learning programs to reduce developmental risk during school break",
      ],
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
      { id: "sq1", text: "Is the child's current environment contributing to asthma triggers?", correct: true, rationale: "Overcrowded housing often contains mold, dust, and allergens that directly exacerbate pediatric asthma." },
      { id: "sq2", text: "Does the family have stable housing in the next 30 days?", correct: true, rationale: "The eviction notice is 30 days old — housing stability in the immediate term is a direct risk factor." },
      { id: "sq3", text: "Is the parent aware of tenant rights and eviction prevention resources?", correct: true, rationale: "Many families do not know eviction can be challenged or paused — this question opens the door to legal aid." },
      { id: "sq4", text: "Is the parent currently employed?", correct: false, rationale: "Employment status is secondary to the immediate housing and pediatric health crisis." },
      { id: "sq5", text: "What is the child's school attendance record?", correct: false, rationale: "School attendance is not the priority when the child has had two ER visits in 30 days and has no stable home." },
      { id: "sq6", text: "Does the family have a savings account?", correct: false, rationale: "Financial savings status is not a relevant screening question for this acute housing and health emergency." },
    ],
    riskFactors: [
      { id: "rf1", label: "Housing instability / pending eviction", correct: true, rationale: "The eviction notice is active and the family is already displaced into overcrowded temporary housing." },
      { id: "rf2", label: "Environmental asthma triggers in overcrowded home", correct: true, rationale: "Two ER visits in 30 days since the move strongly suggests the overcrowded environment is triggering Marcus's asthma." },
      { id: "rf3", label: "Fear of system involvement limiting access to care", correct: true, rationale: "The parent's explicit fear of CPS involvement is a documented barrier that must be addressed for successful engagement." },
      { id: "rf4", label: "Language access barrier", correct: true, rationale: "Spanish-primary communication requires bilingual navigation support for legal, medical, and housing interventions." },
      { id: "rf5", label: "Nutrition deficiency", correct: false, rationale: "Nutrition deficiency is not mentioned or supported by the case. Do not select risk factors without case evidence." },
      { id: "rf6", label: "Substance use", correct: false, rationale: "Substance use is not mentioned or implied in this case." },
    ],
    correctUrgency: "High",
    urgencyRationale:
      "Uncontrolled child asthma with two ER visits in 30 days, overcrowded housing, pending eviction, and a parent who fears seeking help require expedited intervention within 24–72 hours. Emergency activation is not yet needed unless active respiratory distress is present.",
    referralPathways: [
      { id: "rp1", label: "SAMMinistries – Emergency Housing Assistance", category: "Housing", correct: true, rationale: "Provides emergency shelter and transitional housing for families displaced by eviction." },
      { id: "rp2", label: "BCFS – Tenant Rights Navigation", category: "Legal Aid", correct: true, rationale: "Legal aid can stop or delay the eviction, directly addressing the immediate housing instability." },
      { id: "rp3", label: "University Health – Pediatric Asthma Clinic", category: "Pediatric Health", correct: true, rationale: "Two ER visits in 30 days indicates uncontrolled asthma requiring specialist management, not just ER visits." },
      { id: "rp4", label: "Bilingual housing and health navigation (Spanish)", category: "Language Access", correct: true, rationale: "Spanish-primary communication requires a bilingual navigator to ensure Ms. Torres understands her housing rights, medical options, and available resources." },
      { id: "rp5", label: "SA Food Bank", category: "Food Access", correct: false, rationale: "Food insecurity is not described in this case. Selecting unsupported referrals dilutes the quality of the care plan." },
      { id: "rp6", label: "Goodwill Employment Services", category: "Employment", correct: false, rationale: "Employment is not relevant to the immediate housing and pediatric health crisis in this case." },
    ],
    feedback: {
      recognized: [
        "Housing instability as primary stressor",
        "Environmental link between overcrowding and asthma exacerbation",
        "Parent trust as a key engagement variable",
        "Language access need for Spanish-primary communication",
      ],
      missed: [],
      strongerPathway:
        "Lead with housing navigation and tenant rights first to build trust, then coordinate pediatric asthma management and bilingual care navigation simultaneously.",
      whyItMatters:
        "Uncontrolled pediatric asthma during housing instability carries significant ER utilization and missed school days. Addressing root-cause housing stress reduces downstream health costs.",
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
      { id: "sq1", text: "Has the resident expressed thoughts of self-harm or suicide?", correct: true, rationale: "Passive suicidal ideation ('doesn't see the point') is explicitly stated — this must be screened directly." },
      { id: "sq2", text: "Is there a lethal means concern (firearms, medications) in the home?", correct: true, rationale: "Firearm access with suicidal ideation is the highest-risk combination in this case — lethal means counseling is required." },
      { id: "sq3", text: "Is the resident currently engaged with mental health treatment?", correct: true, rationale: "Three weeks of missed VA appointments indicates treatment disengagement — a critical escalation indicator." },
      { id: "sq4", text: "Does the resident have stable housing?", correct: false, rationale: "Housing stability is not the acute concern. The immediate risk is suicidal ideation with firearm access." },
      { id: "sq5", text: "Is the resident currently employed?", correct: false, rationale: "Employment status is not clinically relevant to this behavioral health crisis." },
      { id: "sq6", text: "What is the resident's transportation situation?", correct: false, rationale: "Transportation is not the barrier here — the barrier is engagement, isolation, and safety." },
    ],
    riskFactors: [
      { id: "rf1", label: "Suicidal ideation (passive)", correct: true, rationale: "Passive ideation ('doesn't see the point') expressed to a neighbor is a documented, actionable safety concern." },
      { id: "rf2", label: "Lethal means access (firearm)", correct: true, rationale: "Firearm access combined with suicidal ideation is the single highest-risk combination in suicide risk assessment." },
      { id: "rf3", label: "Comorbid PTSD and alcohol use disorder", correct: true, rationale: "PTSD + AUD comorbidity significantly elevates suicide risk and requires integrated treatment planning." },
      { id: "rf4", label: "Social isolation and disengagement", correct: true, rationale: "Three weeks of isolation and missed appointments is a documented behavioral escalation pattern preceding crisis." },
      { id: "rf5", label: "Food insecurity", correct: false, rationale: "Food insecurity is not mentioned in this case. Do not select risk factors unsupported by the case narrative." },
      { id: "rf6", label: "Transportation barrier", correct: false, rationale: "Transportation is not identified as a barrier. The resident's disengagement is behavioral, not logistical." },
    ],
    correctUrgency: "Immediate",
    urgencyRationale:
      "Passive suicidal ideation combined with firearm access, PTSD, alcohol use disorder, missed appointments, and three weeks of social isolation requires same-day safety intervention. This is not a watchful waiting situation.",
    referralPathways: [
      { id: "rp1", label: "Veterans Crisis Line – 988, Press 1", category: "Crisis Services", correct: true, rationale: "The national 24/7 veteran-specific crisis line with direct access to counselors trained in military culture and PTSD." },
      { id: "rp2", label: "SA Behavioral Health Crisis Center – Walk-in", category: "Crisis Services", correct: true, rationale: "Local walk-in crisis stabilization for same-day evaluation and safety planning." },
      { id: "rp3", label: "VA MISSION Act – Same-Day Mental Health", category: "VA Services", correct: true, rationale: "Federal mandate enables same-day mental health access at VA — directly applicable for a veteran with missed appointments." },
      { id: "rp4", label: "CPS Energy Assistance Program", category: "Utility Assistance", correct: false, rationale: "Utility assistance is not relevant to this behavioral health and safety crisis." },
      { id: "rp5", label: "SNAP Benefits Office", category: "Nutrition", correct: false, rationale: "Nutrition benefits are not the appropriate response to an immediate suicide risk with firearm access." },
    ],
    feedback: {
      recognized: [
        "Suicidal ideation as an immediate safety trigger",
        "Lethal means counseling priority given firearm access",
        "VA care system navigation for veteran-specific services",
        "Social isolation and treatment disengagement as escalation indicators",
      ],
      missed: [],
      strongerPathway:
        "Immediate safety planning with lethal means counseling, warm handoff to Veterans Crisis Line, and same-day VA mental health referral with peer support follow-up.",
      whyItMatters:
        "Veteran suicide rates remain elevated nationally. Lethal means counseling and immediate crisis linkage are the highest-leverage interventions at this acuity level.",
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
      { id: "sq1", text: "What is the resident's preferred language and available interpreter resources?", correct: true, rationale: "An indigenous Oaxacan dialect is her primary language — standard Spanish interpretation is insufficient for this resident." },
      { id: "sq2", text: "Has the resident received any prenatal care during this pregnancy?", correct: true, rationale: "Zero prenatal care at 32 weeks means no baseline fetal health data, no blood pressure monitoring, and no birth planning." },
      { id: "sq3", text: "Does the resident have concerns about accessing care due to documentation status?", correct: true, rationale: "Explicitly stated as the primary barrier — must be screened and addressed with correct legal information." },
      { id: "sq4", text: "Does the resident have stable housing?", correct: false, rationale: "Housing stability is not the primary risk in this case. The acute need is prenatal care access and language support." },
      { id: "sq5", text: "Is the resident currently employed?", correct: false, rationale: "Employment status is not the relevant screening priority for a third-trimester resident with zero prenatal care." },
      { id: "sq6", text: "Does the resident have reliable transportation?", correct: false, rationale: "Transportation is not identified as a barrier in this case. The barriers are language access and documentation fear." },
    ],
    riskFactors: [
      { id: "rf1", label: "No prenatal care at 32 weeks", correct: true, rationale: "Third-trimester presentation with zero prior visits means unknown fetal position, blood pressure, and gestational complications." },
      { id: "rf2", label: "Language access barrier (indigenous dialect)", correct: true, rationale: "Standard Spanish interpretation is insufficient — an FQHC with indigenous dialect capability is specifically required." },
      { id: "rf3", label: "Documentation-status fear limiting care-seeking", correct: true, rationale: "This fear is the explicit barrier named in the case. Correct information about EMTALA rights is part of the intervention." },
      { id: "rf4", label: "Uninsured – Emergency Medicaid eligibility not yet established", correct: true, rationale: "Undocumented pregnant individuals qualify for Emergency Medicaid in Texas for pregnancy-related care — enrollment is an urgent action item." },
      { id: "rf5", label: "Domestic violence screening needed", correct: false, rationale: "There is no indicator of domestic violence or IPV in this case. Selecting this risk factor is not supported by the case facts." },
      { id: "rf6", label: "Employment instability", correct: false, rationale: "Employment instability is not the presenting risk. The acute need is prenatal care, language access, and coverage enrollment." },
    ],
    correctUrgency: "High",
    urgencyRationale:
      "Third trimester with zero prenatal care, unknown fetal status, and significant access barriers requires urgent OB assessment within 24–72 hours. This is not an immediate emergency unless there are active labor symptoms or fetal distress, but the risk of undetected complications is high.",
    referralPathways: [
      { id: "rp1", label: "University Health – Obstetrics Urgent Clinic", category: "Maternal Health", correct: true, rationale: "Accepts uninsured patients and provides urgent OB evaluation for high-risk presentations including undocumented patients." },
      { id: "rp2", label: "CentroMed – Sliding Scale OB Care", category: "Community Health", correct: true, rationale: "FQHC with sliding-scale OB services, trusted in immigrant communities, and able to initiate prenatal care rapidly." },
      { id: "rp3", label: "SA Metro Health WIC Program", category: "Nutrition/Maternal", correct: true, rationale: "WIC provides nutrition support and prenatal coordination — available regardless of documentation status." },
      { id: "rp4", label: "FQHC Language Interpreter Line (indigenous dialects)", category: "Language Access", correct: true, rationale: "An FQHC interpreter line with indigenous dialect capability directly addresses the primary communication barrier." },
      { id: "rp5", label: "Emergency Medicaid – Pregnancy Coverage Enrollment", category: "Benefits", correct: true, rationale: "Texas Emergency Medicaid covers pregnancy-related care for undocumented individuals — enrollment is both legal and urgent." },
      { id: "rp6", label: "Goodwill Job Placement", category: "Employment", correct: false, rationale: "Employment placement is not appropriate for a 32-weeks-pregnant resident with zero prenatal care and immediate health needs." },
    ],
    feedback: {
      recognized: [
        "No prenatal care at 32 weeks as an immediate clinical risk",
        "Documentation-status fear as a structural access barrier",
        "Indigenous dialect interpreter need",
        "Uninsured status and pathway to Emergency Medicaid eligibility",
      ],
      missed: [],
      strongerPathway:
        "Urgent OB referral via University Health or CentroMed with FQHC indigenous-language interpreter, Emergency Medicaid pregnancy enrollment, WIC enrollment, and promotora continuity for trust and navigation support.",
      whyItMatters:
        "Third-trimester care without any prenatal history carries significant maternal and fetal risk. Language-appropriate care access and coverage enrollment can be lifesaving and are legal rights regardless of documentation status.",
    },
    categoryScores: {
      riskRecognition: 25,
      urgencyJudgment: 20,
      referralFit: 20,
      communicationLanguage: 10,
      safetyAwareness: 15,
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
