// MOCK DATA - Replace with real API data in production

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------
export const mockUser = {
  fullName: "Amara Khan",
  email: "amara.khan@email.com",
  dateOfBirth: "1990-04-15",
  gender: "female" as "female" | "male" | "prefer_not_to_say",
  region: "usa" as "usa" | "southasia" | "eu",
  language: "en",
  ageGroup: "30-39",
  name: "Amara",
};

// ---------------------------------------------------------------------------
// Dashboard home
// ---------------------------------------------------------------------------
export const mockDashboard = {
  user: { name: "Amara" },
  scores: {
    activity: 75,
    diet: 60,
    riskIndicator: "Low",
  },
  todayFocus: [
    {
      title: "Skin self-check",
      description: "Monthly full-body skin check. Takes about 5 minutes.",
      duration: "5 min",
      link: "/dashboard/self-exam",
    },
    {
      title: "Log your meals",
      description: "You have not logged lunch yet. Keeping track helps your diet score.",
      duration: "2 min",
      link: "/dashboard/diet/meals",
    },
    {
      title: "20-min walk",
      description: "Low-intensity movement counts toward your weekly activity goal.",
      duration: "20 min",
      link: "/dashboard/exercise",
    },
  ],
  recentActivity: [
    {
      title: "Breast self-exam completed",
      detail: "All clear - no changes noted",
      timestamp: new Date(Date.now() - 2 * 3_600_000).toISOString(),
    },
    {
      title: "Diet log - Breakfast",
      detail: "Oatmeal with berries and flaxseed",
      timestamp: new Date(Date.now() - 5 * 3_600_000).toISOString(),
    },
    {
      title: "Exercise - Yoga flow",
      detail: "30 min low-impact session completed",
      timestamp: new Date(Date.now() - 26 * 3_600_000).toISOString(),
    },
  ],
};

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------
export const mockProgress = {
  currentStreak: 14,
  longestStreak: 31,
  achievements: [
    { id: "a1", label: "First check", unlocked: true, unlockedAt: "Jul 2026" },
    { id: "a2", label: "7-day streak", unlocked: true, unlockedAt: "Aug 2026" },
    { id: "a3", label: "30-day streak", unlocked: false, unlockedAt: null },
    { id: "a4", label: "Diet master", unlocked: true, unlockedAt: "Aug 2026" },
    { id: "a5", label: "Exam pro", unlocked: false, unlockedAt: null },
  ],
  selfExamHistory: [
    { date: "Sep 1, 2026", type: "Breast self-exam" },
    { date: "Aug 1, 2026", type: "Breast self-exam" },
    { date: "Jul 15, 2026", type: "Skin check" },
    { date: "Jul 1, 2026", type: "Breast self-exam" },
  ],
};

// ---------------------------------------------------------------------------
// Self-exam guides
// ---------------------------------------------------------------------------
export const mockSelfExamGuides = [
  {
    id: "se1",
    slug: "breast-self-exam",
    title: "Breast self-exam",
    description:
      "A step-by-step visual guide for a monthly breast self-check. Early detection significantly improves outcomes.",
    genderTarget: "female" as "female" | "male" | "all",
    ageGroups: ["18-29", "30-39", "40+"],
    dueInDays: 3,
  },
  {
    id: "se2",
    slug: "testicular-self-exam",
    title: "Testicular self-exam",
    description:
      "A straightforward guide for a monthly testicular self-check, recommended for men from age 15 onward.",
    genderTarget: "male" as "female" | "male" | "all",
    ageGroups: ["18-29", "30-39", "40+"],
    dueInDays: null,
  },
  {
    id: "se3",
    slug: "skin-check-guide",
    title: "Skin check guide",
    description:
      "Learn the ABCDE rule for spotting suspicious moles and skin changes. Recommended for all adults.",
    genderTarget: "all" as "female" | "male" | "all",
    ageGroups: ["18-29", "30-39", "40+"],
    dueInDays: null,
  },
];

// ---------------------------------------------------------------------------
// Warning signs
// ---------------------------------------------------------------------------
export const mockWarningSigns = [
  {
    id: "ws1",
    title: "Unexplained lump or swelling",
    type: "Breast",
    ageRelevance: "All ages",
    description:
      "A new lump in the breast, armpit, or surrounding tissue that persists for more than two to three weeks. Most lumps are benign, but any new growth should be assessed promptly.",
    whenToSeeDoctor:
      "If a lump does not resolve within two to three weeks, or if it is hard, painless, or accompanied by skin changes.",
  },
  {
    id: "ws2",
    title: "Changes in skin texture or colour",
    type: "Skin",
    ageRelevance: "40+",
    description:
      "Patches of skin that become thickened, scaly, or develop an unusual colour. The ABCDE rule (Asymmetry, Border, Colour, Diameter, Evolution) is a useful guide.",
    whenToSeeDoctor:
      "If a mole or lesion changes in size, shape, or colour, or if a new growth appears that does not heal within four weeks.",
  },
  {
    id: "ws3",
    title: "Persistent change in bowel habits",
    type: "Colorectal",
    ageRelevance: "40+",
    description:
      "Lasting changes such as looser stools, increased frequency, or constipation without an obvious cause. Blood in the stool - whether bright red or dark - should never be ignored.",
    whenToSeeDoctor:
      "If changes persist for more than three weeks, especially if accompanied by abdominal pain, bloating, or unintended weight loss.",
  },
  {
    id: "ws4",
    title: "Difficulty urinating or blood in urine",
    type: "Prostate",
    ageRelevance: "50+",
    description:
      "Weak urine flow, frequent urination at night, or blood in urine or semen. These symptoms can relate to benign prostate enlargement or, less commonly, prostate cancer.",
    whenToSeeDoctor:
      "If urinary symptoms are persistent or worsening, or if blood appears in urine or semen at any time.",
  },
  {
    id: "ws5",
    title: "Persistent cough or shortness of breath",
    type: "Lung",
    ageRelevance: "40+",
    description:
      "A cough lasting more than three weeks, coughing up blood, or new onset breathlessness. These symptoms are more common with a smoking history but can affect non-smokers too.",
    whenToSeeDoctor:
      "If a cough persists beyond three weeks without improvement, or if there is any blood in sputum.",
  },
];

// ---------------------------------------------------------------------------
// Diet plan
// ---------------------------------------------------------------------------
type MealSlot = { name: string; description?: string };
type DayPlan = {
  breakfast: MealSlot;
  lunch: MealSlot;
  dinner: MealSlot;
  snacks: MealSlot;
};
type DietPlan = {
  meals: Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", DayPlan>;
};

export const mockDietPlan: DietPlan = {
  meals: {
    mon: {
      breakfast: {
        name: "Oatmeal with berries and flaxseed",
        description: "Rich in fibre and omega-3s. Supports gut health.",
      },
      lunch: {
        name: "Lentil and vegetable soup",
        description: "High-protein, low-glycaemic. Contains anti-inflammatory turmeric.",
      },
      dinner: {
        name: "Baked salmon with broccoli and quinoa",
        description: "Omega-3 fatty acids and cruciferous vegetables.",
      },
      snacks: { name: "Walnuts and green tea", description: "Antioxidant-rich snack." },
    },
    tue: {
      breakfast: {
        name: "Greek yoghurt with mango and chia seeds",
        description: "Probiotics and antioxidants.",
      },
      lunch: {
        name: "Chickpea and spinach salad",
        description: "Folate-rich greens with plant-based protein.",
      },
      dinner: {
        name: "Grilled chicken with sweet potato and kale",
        description: "Lean protein and beta-carotene.",
      },
      snacks: { name: "Apple slices with almond butter", description: "Balanced fibre and healthy fat." },
    },
    wed: {
      breakfast: { name: "Smoothie: spinach, banana, flaxseed, oat milk" },
      lunch: {
        name: "Whole-grain wrap with hummus and roasted vegetables",
        description: "Fibre-dense with plant-based protein.",
      },
      dinner: {
        name: "Tofu stir-fry with brown rice and bok choy",
        description: "Isoflavones and cruciferous vegetables.",
      },
      snacks: { name: "Edamame and sliced bell pepper" },
    },
    thu: {
      breakfast: { name: "Whole-grain toast with avocado and a poached egg" },
      lunch: {
        name: "Mixed bean salad with olive oil dressing",
        description: "Plant-based protein and healthy fats.",
      },
      dinner: {
        name: "Baked cod with asparagus and wild rice",
        description: "Lean white fish with folate-rich asparagus.",
      },
      snacks: { name: "A handful of mixed berries and dark chocolate (70% cacao or above)" },
    },
    fri: {
      breakfast: {
        name: "Overnight oats with pomegranate seeds",
        description: "Prepared the night before. High in antioxidants.",
      },
      lunch: {
        name: "Tomato and lentil soup with rye bread",
        description: "Lycopene from tomatoes supports cellular health.",
      },
      dinner: {
        name: "Mackerel with roasted Brussels sprouts and barley",
        description: "Omega-3s and glucosinolates.",
      },
      snacks: { name: "Carrot sticks with tzatziki" },
    },
    sat: {
      breakfast: {
        name: "Buckwheat pancakes with blueberries",
        description: "Gluten-free grain with flavonoid-rich berries.",
      },
      lunch: {
        name: "Quinoa bowl with roasted chickpeas and tahini",
        description: "Complete protein and sesame-based calcium.",
      },
      dinner: {
        name: "Turkey meatballs with courgette noodles and marinara",
        description: "Lean protein with lycopene-rich tomato sauce.",
      },
      snacks: { name: "Orange slices and a small handful of almonds" },
    },
    sun: {
      breakfast: {
        name: "Frittata with mushrooms, spinach, and feta",
        description: "Egg-based protein with selenium-rich mushrooms.",
      },
      lunch: {
        name: "Black bean and sweet corn salad with lime dressing",
        description: "Prebiotic fibre and plant-based iron.",
      },
      dinner: {
        name: "Slow-cooked lentil dahl with cauliflower rice",
        description: "Anti-inflammatory spices with a low-carb cruciferous base.",
      },
      snacks: { name: "Celery with peanut butter and raisins" },
    },
  },
};

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------
export const mockExercises = [
  {
    id: "ex1",
    slug: "upper-body-resistance",
    title: "Upper Body Resistance",
    duration: 35,
    difficulty: "Moderate",
    type: "standard",
    equipment: ["Dumbbells"],
  },
  {
    id: "ex2",
    slug: "core-strength-fundamentals",
    title: "Core Strength Fundamentals",
    duration: 25,
    difficulty: "Beginner",
    type: "standard",
    equipment: ["Mat"],
  },
  {
    id: "ex3",
    slug: "full-body-cardio-circuit",
    title: "Full Body Cardio Circuit",
    duration: 40,
    difficulty: "Moderate",
    type: "standard",
    equipment: [],
  },
  {
    id: "ex4",
    slug: "low-impact-yoga-flow",
    title: "Low-Impact Yoga Flow",
    duration: 30,
    difficulty: "Beginner",
    type: "low-impact",
    equipment: ["Mat"],
  },
  {
    id: "ex5",
    slug: "gentle-morning-stretch",
    title: "Gentle Morning Stretch",
    duration: 15,
    difficulty: "Beginner",
    type: "low-impact",
    equipment: [],
  },
  {
    id: "ex6",
    slug: "seated-strength-routine",
    title: "Seated Strength Routine",
    duration: 20,
    difficulty: "Beginner",
    type: "low-impact",
    equipment: ["Resistance band"],
  },
];

// ---------------------------------------------------------------------------
// Screening reminders
// ---------------------------------------------------------------------------
export const mockScreeningReminders = [
  {
    id: "sr1",
    type: "Mammogram",
    recommendedAge: 40,
    description: "Annual breast imaging for women aged 40 and above.",
    status: "upcoming" as "due" | "upcoming" | "not-due",
  },
  {
    id: "sr2",
    type: "Cervical smear (Pap test)",
    recommendedAge: 21,
    description: "Every three years from age 21, or every five years with HPV co-test.",
    status: "due" as "due" | "upcoming" | "not-due",
  },
  {
    id: "sr3",
    type: "Colorectal cancer screening",
    recommendedAge: 45,
    description: "Colonoscopy every 10 years, or stool-based test annually, starting at age 45.",
    status: "not-due" as "due" | "upcoming" | "not-due",
  },
  {
    id: "sr4",
    type: "Skin cancer check",
    recommendedAge: 18,
    description: "Annual full-body skin examination by a dermatologist if you have risk factors.",
    status: "upcoming" as "due" | "upcoming" | "not-due",
  },
];

// ---------------------------------------------------------------------------
// Admin stats
// ---------------------------------------------------------------------------
// MOCK DATA - Replace with real API data
export const mockAdminStats = {
  totalUsers: 18204,
  active7d: 6412,
  newSignups7d: 842,
  selfExams7d: 1537,
  regionBreakdown: [
    { region: "USA", percentage: 48, color: "var(--sage-dark)" },
    { region: "South Asia", percentage: 31, color: "var(--coral-dark)" },
    { region: "European Union", percentage: 15, color: "#a8944f" },
    { region: "Other", percentage: 6, color: "var(--ink-soft)" },
  ],
  recentSignups: [
    { name: "Priya Nair", region: "South Asia", joinedAt: "Sep 3, 2026" },
    { name: "James Okafor", region: "USA", joinedAt: "Sep 3, 2026" },
    { name: "Lena Fischer", region: "European Union", joinedAt: "Sep 2, 2026" },
    { name: "Sofia Reyes", region: "USA", joinedAt: "Sep 2, 2026" },
    { name: "Arjun Mehta", region: "South Asia", joinedAt: "Sep 1, 2026" },
  ],
};

// ---------------------------------------------------------------------------
// Admin users
// ---------------------------------------------------------------------------
// MOCK DATA - Replace with real API data
export const mockAdminUsers = [
  {
    id: "u1",
    name: "Amara Khan",
    email: "amara.khan@email.com",
    region: "usa",
    ageGroup: "30-39",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u2",
    name: "Priya Nair",
    email: "priya.nair@email.com",
    region: "southasia",
    ageGroup: "30-39",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u3",
    name: "James Okafor",
    email: "james.okafor@email.com",
    region: "usa",
    ageGroup: "40+",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u4",
    name: "Lena Fischer",
    email: "lena.fischer@email.com",
    region: "eu",
    ageGroup: "18-29",
    status: "inactive" as "active" | "inactive" | "banned",
  },
  {
    id: "u5",
    name: "Sofia Reyes",
    email: "sofia.reyes@email.com",
    region: "usa",
    ageGroup: "30-39",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u6",
    name: "Arjun Mehta",
    email: "arjun.mehta@email.com",
    region: "southasia",
    ageGroup: "40+",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u7",
    name: "Chioma Eze",
    email: "chioma.eze@email.com",
    region: "usa",
    ageGroup: "18-29",
    status: "active" as "active" | "inactive" | "banned",
  },
  {
    id: "u8",
    name: "David Park",
    email: "david.park@email.com",
    region: "usa",
    ageGroup: "40+",
    status: "banned" as "active" | "inactive" | "banned",
  },
];