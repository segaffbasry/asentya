import articleEntries from "./insights.generated.json";

export type PrimaryPagePath =
  | "/"
  | "/about"
  | "/peoples"
  | "/services"
  | "/insights"
  | "/careers"
  | "/contact";

export type PersonSlug =
  | "zidny-assegaf"
  | "raditya-rahmadhan"
  | "christian-kevin-yoga-p"
  | "faraz-almira-arelia"
  | "elizabeth-yunita-krisnawati";

export type PersonPath = "/zidny-assegaf" | "/raditya-rahmadhan";

export type ServiceSlug =
  | "corporate-commercial"
  | "mergers-acquisitions"
  | "restructuring-insolvency"
  | "intellectual-property"
  | "dispute-resolutions"
  | "litigation"
  | "criminal-proceedings"
  | "private-clients";

export type InsightSlug = string;

export type InsightPath = `/insights/${InsightSlug}`;
export type CareerSlug = "job-2319";
export type CareerPath = `/${CareerSlug}`;

export interface RichTextMark {
  readonly text: string;
  readonly emphasis?: boolean;
  readonly href?: string;
  readonly strong?: boolean;
}

export type RichTextInline = string | RichTextMark;
export type RichTextParagraph = string | readonly RichTextInline[];

export interface SiteLink<Path extends string = string> {
  readonly label: string;
  readonly href: Path;
}

export interface Office {
  readonly name: "Head Office" | "Operational Office";
  readonly lines: readonly string[];
}

export interface Service {
  readonly slug: ServiceSlug;
  readonly title: string;
  readonly description: string;
}

export interface Person {
  readonly slug: PersonSlug;
  readonly path: PersonPath | null;
  readonly name: string;
  readonly role: "Partner" | "Associate";
  readonly email: string | null;
  readonly phone: string | null;
  readonly imageUrl: string;
  readonly pageDescription: string | null;
  readonly expertise: readonly string[];
  readonly industriesAndSectors: readonly string[];
  readonly biography: readonly string[];
}

export interface InsightArticle {
  readonly slug: InsightSlug;
  readonly path: InsightPath;
  readonly title: string;
  readonly pageTitle: string;
  readonly pageDescription: string;
  readonly category: string | null;
  readonly publishedDate: string;
  readonly publishedDateIso: string;
  readonly byline: string;
  readonly excerpt: string;
  readonly imageUrl: string;
  readonly bodyHtml: string;
  readonly contactParagraph: RichTextParagraph;
  readonly disclaimerLabel: RichTextParagraph;
  readonly disclaimer: RichTextParagraph;
  readonly copyright: string;
}

export interface CareerListItem {
  readonly text: string;
  readonly children?: readonly string[];
}

export interface CareerSection {
  readonly heading: string;
  readonly items: readonly CareerListItem[];
}

export interface CareerListing {
  readonly slug: CareerSlug;
  readonly path: CareerPath;
  readonly badge: string;
  readonly title: string;
  readonly location: string;
  readonly applyLabel: string;
  readonly applyEmail: string;
  readonly introduction: string;
  readonly sections: readonly CareerSection[];
  readonly closing: string;
  readonly howToApplyHeading: string;
  readonly howToApply: string;
  readonly emailSubject: string;
  readonly moreCareersHeading: string;
  readonly moreCareersDescription: string;
}

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Peoples", href: "/peoples" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const satisfies readonly SiteLink<PrimaryPagePath>[];

export const footerNavigation = primaryNavigation.filter(
  (item) => item.href !== "/",
);

export const site = {
  name: "Asentya Legal Advisor",
  shortName: "Asentya",
  description:
    "Asentya Legal Advisor is an Indonesian law firm which offer a broad field of legal services, stretching from commercial transaction or corporate needs on a daily basis to a challenging litigation matters.",
  tagline:
    "At Asentya, we guide our clients to reach their interests in an effective yet efficient manner, because we are always at your presence.",
  navigation: primaryNavigation,
  contact: {
    email: "admin@asentya.com",
    phone: "021 3881 5179",
    phoneHref: "tel:+622138815179",
  },
  reachUs: {
    heading: "Reach Us",
    description:
      "Ready to take the next step? Contact us to schedule a consultation and learn how we can help you achieve your legal objectives.",
    actionLabel: "Contact",
    actionHref: "/contact" as const,
  },
  offices: [
    {
      name: "Head Office",
      lines: [
        "Indonesia Stock Exchange",
        "Tower I, Level 3",
        "Jl. Jend. Sudirman Kav. 52-53, Senayan, Kebayoran Baru, Jakarta Selatan, Indonesia 12190",
      ],
    },
    {
      name: "Operational Office",
      lines: [
        "Kindo Square, Blok B5",
        "Jl. Duren Tiga Raya No. 101, Duren Tiga, Pancoran, Jakarta Selatan, Indonesia 12760",
      ],
    },
  ] as const satisfies readonly Office[],
  footer: {
    findUsHeading: "Find Us",
    linksHeading: "Links",
    links: footerNavigation,
    copyright:
      "© 2026 Asentya Legal Advisor | All Rights Reserved | Prior results do not guarantee a similar outcome",
  },
} as const;

export const contactPage = {
  heading: "Reach Us",
  address: [
    "Kindo Square, Blok B5",
    "Jl. Duren Tiga Raya No. 101, Duren Tiga, Pancoran",
    "Jakarta Selatan, Indonesia 12760",
  ],
  locationStatement:
    "From our strategic location, ensuring seamless access for our clients.",
  description:
    "Reach out to Asentya for expert legal and consultancy services. Our team is ready to assist you with your unique needs.",
  appointmentHeading: "Make an Appointment",
  formFields: [
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Choose Partner",
    "Date",
    "Method",
    "Message*",
  ],
  submitLabel: "Book",
  consent:
    "By submitting this form, you agree to our privacy policy and terms of service. Your information is kept confidential.",
  mapLabels: [
    {
      name: "Asentya Head Office",
      address: "Indonesia Stock Exchange Tower I, Level 3",
    },
    {
      name: "Asentya Operational Office",
      address: "Jl. Duren Tiga Raya No. 101,Jakarta Selatan 12760",
    },
  ],
} as const;

export const services = [
  {
    slug: "corporate-commercial",
    title: "Corporate & Commercial",
    description:
      "We provide a span of services to guide our clients through opportunities in: transaction structuring, legal due diligence, preparing sale and purchase agreements and related agreements, company establishment, necessary internal corporate documents or approval, regulatory filings, general legal advice, company regulations, day-to-day operation, and business operational support.",
  },
  {
    slug: "mergers-acquisitions",
    title: "Mergers & Acquisitions",
    description:
      "We help clients and companies to achieve their objectives on deals: acquisitions, mergers, joint ventures, equity investment, hostile takeover, and sale and purchase.",
  },
  {
    slug: "restructuring-insolvency",
    title: "Restructuring & Insolvency",
    description:
      "We advise our clients and companies who are experiencing financial challenges in: debt restructuring, suspension of debt payment obligations, out of court debt settlement, and asset recovery. To ensure our clients receive their legal rights accordingly.",
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    description:
      "We guide and advise our clients in field of Intellectual Property: protection (trademark, copyright, industrial design, and patent), due diligence, portfolio building, strategy, licensing, registrability checking, infringement enforcement, and trademark monitoring.",
  },
  {
    slug: "dispute-resolutions",
    title: "Dispute Resolutions",
    description:
      "We serve assistance, represent, and/or provide resolution on dispute matters in: potential dispute, debt settlement, out of court settlement (negotiation or mediation), default or breach of contract, tort or unlawful act, employment, and claim.",
  },
  {
    slug: "litigation",
    title: "Litigation",
    description:
      "We represent clients or companies in court trials to claim or defend your rights: default or breach of contract, tort or unlawful act, employment, land disputes, appeal, cassation, enforcement, securities litigation, private or family matters, commercial court, IP enforcement litigation, bankruptcy or suspension of debt payment, contract disputes, regulatory enforcement or filing, and state administrative.",
  },
  {
    slug: "criminal-proceedings",
    title: "Criminal Proceedings",
    description:
      "We assist our clients or address and assert criminal acts to the authorities in: investigation, examination assistance (police or other law enforcement), attorney in criminal case, filing police report, preparation for examination, witness assistance, criminal prosecution process, and pre-trial.",
  },
  {
    slug: "private-clients",
    title: "Private Clients",
    description:
      "We provide support and assistance to our clients and high-net-worth individuals to: wealth management, protection, transfer, inheritance, and investments.",
  },
] as const satisfies readonly Service[];

export const people = [
  {
    slug: "zidny-assegaf",
    path: "/zidny-assegaf",
    name: "Zidny Assegaf",
    role: "Partner",
    email: "z.assegaf@asentya.com",
    phone: "+62 21 3881 5179",
    imageUrl: "/images/zidny.avif",
    pageDescription:
      "Having a broad range of experiences with measurable work standards, Zidny has a comprehensive proficiency in guiding various client’s interests to solve its legal issues from a multi-sectors business transactions to a complex dispute resolution.",
    expertise: [
      "Corporate & Commercial",
      "Mergers & Acquisitions",
      "Restructuring & Insolvency",
      "Dispute Resolutions",
      "Family Wealth",
      "Private Clients",
    ],
    industriesAndSectors: [
      "Mining",
      "Technology",
      "Consumer Goods & Retail",
      "Commercial Corporate",
      "Media & Entertainment",
    ],
    biography: [
      "Having a broad range of experiences with measurable and professional work standards, Zidny Assegaf (“Zidny”) has a comprehensive proficiency in guiding various client’s interests to solve its legal issues from a multi-sectors business transactions to a complex dispute resolution. As a legal advisor, Zidny tends to exercise an amiable way of solution for problem-solving purposes or by negotiating with proper leverage. With the client’s interest in mind and a pleasant yet innovative approach, thus Zidny is supremely versatile in dealing with reputable companies, high-ranking officials, and individuals with interest.",
      "Zidny’s area of practice are mostly in corporate commercial, merger & acquisition, suspension of debt payment, dispute resolution, out-of-court settlement, and other general corporate matters. With industry and sectors spanning from capital intensive industries such as mining to emerging modern industries such as startups and technology. Zidny previously worked for a reputable law firm based in Jakarta.",
      "Zidny graduated from Atma Jaya Catholic University of Indonesia (S.H.).",
      "Zidny is a registered Advocate from Indonesian Advocates Association (PERADI), Certified Legal Auditor (C.L.A.) from Indonesian Legal Auditors Association (ASAHI), and a Certified Mining Legal Consultant (CMLC) from Indonesian Mining Lawyers & Legal Consultants Association (PERKHAPPI).",
    ],
  },
  {
    slug: "raditya-rahmadhan",
    path: "/raditya-rahmadhan",
    name: "Raditya Rahmadhan",
    role: "Partner",
    email: "r.rahmadhan@asentya.com",
    phone: "+62 21 3881 5179",
    imageUrl: "/images/raditya.avif",
    pageDescription:
      "Raditya is an experienced intellectual property consultant with a strong background in law and business. Raditya possesses deep expertise in the protection, management, and commercialization of intellectual property rights.",
    expertise: [
      "Intellectual Property",
      "Commercial Litigation",
      "General Litigation",
      "Criminal Proceedings",
    ],
    industriesAndSectors: [
      "Technology",
      "Digital Assets",
      "Consumer Goods & Retail",
      "Land & Property",
    ],
    biography: [
      "Raditya Rahmadhan is an experienced intellectual property consultant with a strong background in law and business. Raditya possesses deep expertise in the protection, management, and commercialization of intellectual property rights, including copyrights, trademarks, patents, and industrial designs.",
      "With a comprehensive understanding of national and international intellectual property regulations, Raditya assists clients in developing effective protection strategies and navigating complex legal issues related to intellectual property, having handled numerous disputes involving copyright infringement, trademark violations, and patent conflicts, both domestically and internationally.",
      "Raditya area of practice is mostly in Intellectual Property, Commercial Litigation, IP Dispute Resolution, General Litigation, and other general corporate matters. Raditya previously worked in a reputable law firm based in Jakarta and a multinational Fast Moving Consumer Goods company. Raditya time at a prestigious law firm sharpened his legal acumen in managing complex litigation cases, while his role at a multinational FMCG company equipped him with a deep understanding of the business side of IP asset management in highly competitive industries. This combination allows Raditya to provide practical and strategic solutions for clients, helping them maximize the value of their intellectual property assets while safeguarding their business interests.",
      "Raditya graduated from Atma Jaya Catholic University of Indonesia (S.H.).",
      "Raditya is a registered Advocate from Indonesian Advocates Association (PERADI).",
    ],
  },
  {
    slug: "christian-kevin-yoga-p",
    path: null,
    name: "Christian Kevin Yoga P",
    role: "Associate",
    email: null,
    phone: null,
    imageUrl: "/images/christian.avif",
    pageDescription: null,
    expertise: [],
    industriesAndSectors: [],
    biography: [],
  },
  {
    slug: "faraz-almira-arelia",
    path: null,
    name: "Faraz Almira Arelia",
    role: "Associate",
    email: null,
    phone: null,
    imageUrl: "/images/faraz.avif",
    pageDescription: null,
    expertise: [],
    industriesAndSectors: [],
    biography: [],
  },
  {
    slug: "elizabeth-yunita-krisnawati",
    path: null,
    name: "Elizabeth Yunita Krisnawati",
    role: "Associate",
    email: null,
    phone: null,
    imageUrl: "/images/elizabeth.avif",
    pageDescription: null,
    expertise: [],
    industriesAndSectors: [],
    biography: [],
  },
] as const satisfies readonly Person[];

export const insights: readonly InsightArticle[] = articleEntries.map((entry) => ({
  slug: entry.slug,
  path: `/insights/${entry.slug}`,
  title: entry.title,
  pageTitle: entry.title,
  pageDescription: entry.excerpt,
  category: entry.category || null,
  publishedDate: new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${entry.date}T00:00:00Z`)),
  publishedDateIso: entry.date,
  byline: entry.byline,
  excerpt: entry.excerpt,
  imageUrl: entry.image,
  bodyHtml: entry.body,
  contactParagraph: [
    "For further information or queries, kindly reach out to our partner Zidny Assegaf ",
    { text: "(z.assegaf@asentya.com)", emphasis: true, href: "mailto:z.assegaf@asentya.com" },
    " or Raditya Rahmadhan ",
    { text: "(r.rahmadhan@asentya.com)", emphasis: true, href: "mailto:r.rahmadhan@asentya.com" },
    ".",
  ],
  disclaimerLabel: [{ text: "Disclaimer:", emphasis: true }],
  disclaimer: [{
    text: "This insights is prepared for general information purposes and should not be taken as a legal advice. Asentya Legal Advisor bear no responsibility due to losses arising from the use of this general information.",
    emphasis: true,
  }],
  copyright: "© Asentya Legal Advisor | 2026",
}));

export const careers = [
  {
    slug: "job-2319",
    path: "/job-2319",
    badge: "Urgent",
    title: "Senior Legal Associate",
    location: "Jakarta Raya, Indonesia",
    applyLabel: "Apply now",
    applyEmail: "info@asentya.com",
    introduction:
      "Asentya Legal Advisor is seeking a skilled and motivated Legal Coordinator to join our team. The Legal Coordinator will support the legal department in managing case files, conducting research, and preparing documentation. This role is ideal for a detail-oriented individual with a strong interest in law and excellent organizational abilities.",
    sections: [
      {
        heading: "Responsibilities",
        items: [
          {
            text: "Assist in the preparation and organization of legal documents and case files",
          },
          {
            text: "Conduct legal research to support attorneys and case strategies",
          },
          {
            text: "Coordinate communication between clients, attorneys, and external parties",
          },
          { text: "Maintain and update legal databases and records" },
          {
            text: "Assist in drafting correspondence, contracts, and pleadings",
          },
          {
            text: "Support scheduling and coordination of meetings, depositions, and court appearances",
          },
          {
            text: "Monitor deadlines and ensure compliance with legal procedures",
            children: [
              "Collaborate with the legal team to ensure efficient workflow",
            ],
          },
        ],
      },
      {
        heading: "Qualifications",
        items: [
          {
            text: "Bachelor’s degree in Law, Legal Studies, or related field",
          },
          { text: "1-3 years of experience in a legal support role" },
          { text: "Strong understanding of legal terminology and processes" },
          { text: "Excellent written and verbal communication skills" },
          { text: "Proficiency in legal research tools and software" },
          { text: "Exceptional organizational and time management skills" },
          { text: "Familiarity with case management systems is a plus" },
        ],
      },
      {
        heading: "Benefits",
        items: [
          { text: "Competitive salary and benefits package" },
          {
            text: "Opportunities for professional growth and development",
          },
          { text: "Collaborative and supportive work environment" },
        ],
      },
    ],
    closing:
      "Join us at Asentya Legal Advisor and contribute to our mission of delivering exceptional legal and consultancy services. Apply today to become a part of our innovative and dedicated team!",
    howToApplyHeading: "How to Apply",
    howToApply:
      "If you are interested in joining us, please send us an email to info@asentya.com with the email subject “Application – Position (Intern/Associate/Support)”.",
    emailSubject: "Application – Position (Intern/Associate/Support)",
    moreCareersHeading: "More Careers",
    moreCareersDescription:
      "Explore exciting career opportunities at Asentya, where innovation, excellence, and growth are at the forefront of everything we do.",
  },
] as const satisfies readonly CareerListing[];

export const partners = people.filter((person) => person.role === "Partner");
export const associates = people.filter(
  (person) => person.role === "Associate",
);

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getPersonBySlug(slug: string): Person | undefined {
  return people.find((person) => person.slug === slug);
}

export function getPersonByPath(path: string): Person | undefined {
  return people.find((person) => person.path === path);
}

export function getInsightBySlug(slug: string): InsightArticle | undefined {
  return insights.find((insight) => insight.slug === slug);
}

export function getInsightByPath(path: string): InsightArticle | undefined {
  return insights.find((insight) => insight.path === path);
}

export function getCareerBySlug(slug: string): CareerListing | undefined {
  return careers.find((career) => career.slug === slug);
}

export function getCareerByPath(path: string): CareerListing | undefined {
  return careers.find((career) => career.path === path);
}
