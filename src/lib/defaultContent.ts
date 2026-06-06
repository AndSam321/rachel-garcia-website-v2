import type { SiteContent } from "@/types";

export const defaultContent: SiteContent = {
  bio: {
    greeting: "Hello,",
    intro: "my name is",
    tagline: "I am a senior mathematics student, with a passion for public health.",
  },
  contacts: [
    {
      id: "email",
      kind: "email",
      label: "rachel.garcia@my.simpson.edu",
      href: "mailto:rachel.garcia@my.simpson.edu",
    },
    {
      id: "substack",
      kind: "substack",
      label: "Rachel Gone Global - My personal blog!",
      href: "https://substack.com/@rachelmgarcia?r=61pi0g&utm_campaign=profile&utm_medium=profile-page",
    },
    {
      id: "github",
      kind: "github",
      label: "github.com/rachelgarc",
      href: "https://github.com/rachelgarc",
    },
    {
      id: "linkedin",
      kind: "linkedin",
      label: "Rachel Garcia",
      href: "https://www.linkedin.com/in/rachelmgarcia-ia",
    },
  ],
  projects: [
    {
      id: "down-syndrome-mexico",
      title:
        "Dr. Albert H. & Greta A. Bryan Summer Research Program: Down syndrome birth rates in Mexico",
      year: "2024",
      attachment: { kind: "pdf", url: "/seed/poster-2024.pdf", label: "final poster" },
    },
    {
      id: "student-loan-debt",
      title: "Student Loan Debt Risk",
      year: "2025",
      attachment: {
        kind: "pdf",
        url: "/seed/loan-debt-2025.pdf",
        label: "final presentation",
      },
    },
    {
      id: "manatee-conservation",
      title: "Antillean Manatee Conservation",
      year: "2026",
      note: "more to come",
      attachment: { kind: "image", url: "/seed/manatee.jpg", label: "Antillean manatee" },
    },
  ],
  resume: {
    downloadUrl: "/seed/resume.pdf",
    sections: [
      {
        id: "education",
        heading: "Education",
        items: [
          {
            primary: "Simpson College — Indianola, IA",
            secondary: "Bachelor of Arts in Mathematics, expected May 2027",
            bullets: [
              "Coursework: Real Analysis, Adv Data Modeling, Intro to Epidemiology, Basic Infectious Disease",
              "Research interests: infectious disease epidemiology, spatial health disparities, and social determinants of health in Latin American populations",
            ],
          },
        ],
      },
      {
        id: "research",
        heading: "Research Experience",
        items: [
          {
            primary: "Researcher, SIAM-Simons Program",
            secondary: "Inter American University, Bayamón, PR · June – July 2026",
            bullets: [],
          },
          {
            primary: "Research Assistant, SYLFF Research Grant",
            secondary: "Simpson College · May – July 2025",
            bullets: [
              "Collaborated on a manuscript adapting dissertation-level research for academic publication",
              "Analyzed a 1000-respondent survey dataset in STATA: variable construction, regression modeling, diagnostic testing on how student debt shapes labor market decisions",
              "Produced publication-ready figures and regression tables",
            ],
          },
          {
            primary: "Researcher, Greta A. & Albert H. Bryan Program",
            secondary: "Simpson College · June – August 2024",
            bullets: [
              "Geospatial analysis of Down syndrome birth rates across all 32 Mexican states using R (sf, leaflet, ggplot2)",
              "Quantified associations between socioeconomic factors and Down syndrome birth outcomes",
              "Designed interactive visualizations enabling non-technical audiences to explore spatial correlations",
            ],
          },
        ],
      },
      {
        id: "leadership",
        heading: "Campus Leadership",
        items: [
          {
            primary: "President, Latinos Unidos",
            secondary: "December 2023 – May 2026",
            bullets: [
              "Led a student organization of 100+ members promoting Latino culture in the Des Moines metro",
            ],
          },
          {
            primary: "Undergraduate Assistant, Speech and Debate",
            secondary: "August 2025 – May 2026",
            bullets: ["Coached 50+ students on researching topics for advocacy and debate"],
          },
          {
            primary: "Undergraduate Assistant, Mathematics Department",
            secondary: "August 2024 – Present",
            bullets: ["Recruited and supported current and future mathematics majors"],
          },
        ],
      },
      {
        id: "skills",
        heading: "Technical Skills",
        items: [
          {
            bullets: [
              "Statistical software: R (ggplot2, dplyr, leaflet, sf), STATA, Python (pandas, matplotlib, statsmodels, scipy)",
              "Methods: spatial analysis, multivariate regression, hypothesis testing, data modeling",
              "Tools: LaTeX, Git, AWS, Excel, Tableau",
              "Languages: English (native), Spanish (elementary)",
            ],
          },
        ],
      },
    ],
  },
};
