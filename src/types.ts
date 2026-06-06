export type ContactKind = "email" | "substack" | "github" | "linkedin";

export type Contact = {
  id: string;
  kind: ContactKind;
  label: string;
  href: string;
};

export type ProjectAttachment = {
  kind: "pdf" | "image";
  url: string;
  label: string;
};

export type Project = {
  id: string;
  title: string;
  year: string;
  note?: string;
  attachment?: ProjectAttachment;
};

export type ResumeItem = {
  primary?: string;
  secondary?: string;
  bullets: string[];
};

export type ResumeSection = {
  id: string;
  heading: string;
  items: ResumeItem[];
};

export type SiteContent = {
  bio: {
    greeting: string;
    intro: string;
    tagline: string;
  };
  contacts: Contact[];
  projects: Project[];
  resume: {
    downloadUrl: string;
    sections: ResumeSection[];
  };
};
