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

export type InsightSlug =
  | "indonesia-eases-foreign-investment-rules-through-bkpm-regulation"
  | "trademarks-deletion";

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
  readonly authorSlug: PersonSlug;
  readonly byline: string;
  readonly excerpt: string;
  readonly imageUrl: string;
  readonly body: readonly RichTextParagraph[];
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
      "© 2025 Asentya Legal Advisor | All Rights Reserved | Prior results do not guarantee a similar outcome",
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

const sharedArticlePageDescription =
  "Asentya Legal Advisor is an Indonesian law firm which offer a broad field of legal services, stretching from commercial transaction or corporate needs on a daily basis to a challenging litigation matters.";

export const insights = [
  {
    slug: "indonesia-eases-foreign-investment-rules-through-bkpm-regulation",
    path: "/insights/indonesia-eases-foreign-investment-rules-through-bkpm-regulation",
    title:
      "Indonesia Eases Foreign Investment Rules Through BKPM Regulation No. 5/2025",
    pageTitle:
      "Indonesia Eases Foreign Investment Rules Through BKPM Regulation No. 5/2025 - Free SaaS Website Kit",
    pageDescription: sharedArticlePageDescription,
    category: "Alerts",
    publishedDate: "Oct 10, 2025",
    publishedDateIso: "2025-10-10",
    authorSlug: "faraz-almira-arelia",
    byline: "By Faraz Almira Arelia | Associate",
    excerpt: "Uncover the newest BKPM regulations",
    imageUrl: "/images/insight-bkpm.avif",
    body: [
      [
        "The Indonesian government has taken another significant step to strengthen its investment climate by issuing Ministry of Investment and Downstream Industry/Investment Coordinating Board (“",
        { text: "BKPM", strong: true },
        "”) Regulation No. 5 of 2025, which came into effect on 2 October 2025. Enacted by BKPM, this regulation replaces 3 (three) previous investment regulations: No. 5/2021, No. 3/2021, and No. 4/2021, and forms part of the broader structural reform agenda launched under the Job Creation Law.",
      ],
      "The new regulation is closely linked to Government Regulation No. 28/2025, which mandates the enhancement of Indonesia’s Online Single Submission (OSS) system. In line with this mandate, BKPM Regulation No. 5/2025 introduces 3 (three) new core subsystems within the OSS framework: basic requirements, investment facilities, and partnership mechanisms. The reform aims to streamline investment procedures, reinforce legal certainty, and minimize regulatory overlap that has previously created confusion for foreign and domestic investors.",
      "A key highlight of the regulation is the substantial reduction in minimum paid-up capital for Foreign Investment Companies (PT PMA). Under earlier rules, PT PMA were required to have at least IDR 10 billion in paid-up capital. The new regulation lowers this amount to IDR 2.5 billion, making Indonesia more accessible for small- and medium-scale foreign investors. However, the regulation introduces a safeguard: the paid-up capital must remain in the company’s account for at least 12 (twelve) months, except when used for asset purchases, development activities, or operational expenses.",
      "Furthermore, the regulation introduces streamlined licensing procedures for certain business activities. Under Article 41, trading or service businesses operating in shared commercial spaces, such as malls, office buildings, or commercial complexes, may utilize the basic licensing approvals already obtained by the building owner or manager. As a result, business applicants can submit their PB or PB-UMKU applications by relying on the building’s existing permits, eliminating the need to secure the same foundational approvals independently.",
      "Article 43 further simplifies requirements for business expansion projects. Specifically, companies are exempt from obtaining a new Spatial Suitability Approval (KKPR) when their expansion only increases production capacity, adds supporting facilities on the same site, or integrates new activities either vertically within the supply chain or horizontally within the same business group. This exemption applies as long as the business has existing KKPR and land-use rights, and the expansion occurs within the same land area by the same legal entity.",
      "Finally, Article 44 provides additional flexibility for supporting or ancillary business activities located at the same site as the primary operation. These supporting activities may rely on the main business’s KKPR and environmental approvals, provided they remain covered within the existing environmental documents. Where new construction is required to support these activities, the regulation allows businesses to obtain a Building Approval (PBG) and subsequently secure a Certificate of Building Worthiness (SLF), ensuring procedural clarity and regulatory efficiency.",
      "The Ministry of Investment and Downstream Industry expects the revised capital policy to encourage greater investment participation and support Indonesia’s ambitious plan to achieve 8% (eight percent) economic growth over the coming years. To reach this target, the government aims to attract approximately IDR 13,032.8 trillion in combined foreign and domestic investment within the next 5 (five) years.",
      "Overall, BKPM Regulation 5/2025 reflects Indonesia’s ongoing commitment to improving the ease of doing business and creating a more transparent and predictable investment environment. As the country continues to refine its regulatory framework, both established and emerging investors may find new opportunities to participate in Indonesia’s rapidly developing economy.",
    ],
    contactParagraph: [
      "For further information or queries, kindly reach out to our partner Zidny Assegaf ",
      {
        text: "(z.assegaf@asentya.com)",
        emphasis: true,
        href: "mailto:z.assegaf@asentya.com",
      },
      " or Raditya Rahmadhan ",
      {
        text: "(r.rahmadhan@asentya.com)",
        emphasis: true,
        href: "mailto:r.rahmadhan@asentya.com",
      },
      ".",
    ],
    disclaimerLabel: [{ text: "Disclaimer:", emphasis: true }],
    disclaimer: [
      {
        text: "This insights is prepared for general information purposes and should not be taken as a legal advice. Asentya Legal Advisor bear no responsibility due to losses arising from the use of this general information.",
        emphasis: true,
      },
    ],
    copyright: "© Asentya Legal Advisor | 2026",
  },
  {
    slug: "trademarks-deletion",
    path: "/insights/trademarks-deletion",
    title: "Deletion of Registered Trademarks Due to Non-Use",
    pageTitle:
      "Deletion of Registered Trademarks Due to Non-Use - Free SaaS Website Kit",
    pageDescription: sharedArticlePageDescription,
    category: "Insights",
    publishedDate: "Jul 24, 2026",
    publishedDateIso: "2026-07-24",
    authorSlug: "elizabeth-yunita-krisnawati",
    byline: "By Elizabeth Yunita Krisnawati | Associate",
    excerpt:
      "Understand on how to apply for the deletion of an unused trademark",
    imageUrl: "/images/insight-trademarks.avif",
    body: [
      [
        "The term “Trademark” under Article 1 of Law Number 15 of 2001 concerning Trademarks, as lastly amended by Law Number 20 of 2016 concerning Trademarks and Geographical Indications (“",
        { text: "TGI Law", strong: true },
        "”), is defined as a sign in the form of an image, logo, name, word, letter, number, or color composition, whether in two-dimensional or three-dimensional form. A trademark serves to distinguish goods and/or services produced by individuals or legal entities in the trade of goods and services.",
      ],
      [
        "Trademark Registration is an essential step for Trademark owners to obtain protection for their Marks. However, Trademark rights will only be granted by the Directorate General of Intellectual Property (“",
        { text: "DGIP", strong: true },
        "”) if the Trademark application is filed in good faith. In addition, Applicants must ensure compliance with the applicable legal requirements in order for their Trademark applications to proceed to registration.",
      ],
      "In practice, even though there are comprehensive provisions governing the registration of Trademarks under the TGI Law, it is not uncommon for Trademark applications to  submit Trademarks that are identical or similar to previously registered trademarks. Such circumstances often result in the rejection of Trademark applications on the grounds of similarity to previously registered Marks. Furthermore, the TGI Law stipulates that, under certain conditions, registered Trademarks may be deleted or revoked. The deletion of a registered Trademark can be initiated by the Trademark Owner, the Ministry of Law through the DGIP, or by a Third Party.",
      [
        "With respect to deletion initiated by the ",
        { text: "Trademark owner", strong: true },
        ", Article 72 of the TGI Law stipulates that a request for deletion of a registered Trademark may be submitted by the Trademark owner directly or through its authorized representative. Such deletion may be processed through the DGIP Trademark portal by filing an online ",
        {
          text: "(https://merek.dgip.go.id)",
          emphasis: true,
          href: "https://merek.dgip.go.id",
        },
        " post-registration application for the recorded of Trademark deletion. Documents generally required for such application include the Owner’s Information, the Trademark Certificate, a Power of Attorney (if represented by an Intellectual Property Consultant), and a Written Request for Deletion of the Trademark Registration.",
      ],
      [
        "A registered Trademark may also be deleted by the ",
        { text: "Ministry of Law through the DGIP", strong: true },
        ". This may occur where the registered Trademark is found to be ",
        {
          text: "identical or substantially similar to another mark; contrary to the state ideology, prevailing laws and regulations, morality, religion, decency, or public order; or similar to traditional cultural expressions, intangible cultural heritage, or names and logos that have become part of a longstanding tradition.",
          strong: true,
        },
      ],
      [
        "The procedure for the Ministry of Law through the DGIP is further regulated under Government Regulation Number 90 of 2019 concerning Procedures for Application, Examination, and Appeal Resolution before the Trademark Appeal Commission (“",
        { text: "GR 90/2019", strong: true },
        "”). Before the deletion of a registered Trademark under the Ministry of Law through the DGIP, an examination and recommendation from the Trademark Appeal Commission is required, confirming that the deletion requirements have been met, as stipulated in Article 31 of GR 90/2019.",
      ],
      [
        "A registered Trademark may also be deleted in the form of a lawsuit filed by a ",
        { text: "third party", strong: true },
        " in the Commercial Court on the grounds that the Trademark has not been used for 3 (three) consecutive years in the trade of goods and/or services from the date of its registration or its last use, regardless of the reason, except where such non-use results from import restrictions, temporary marketing authorization prohibitions, or other similar restrictions established by Government Regulation.",
      ],
      "A Deletion Action brought by a Third Party cannot be filed by just any person. The Third Party must demonstrate a legitimate legal interest in the deletion of the Trademark, such as a business actor seeking to register its own Trademark but being obstructed by an existing registered Trademark that is no longer in use, a party intending to use a similar mark, or another Trademark owner who has suffered prejudice as a result of the registration. Evidence commonly required to support such Action includes the Third Party’s Identification Documents, a copy of the Registered Trademark Certificate, market survey reports concerning the circulation of goods and/or services under the registered Trademark, witness statements from business actors, distributors, or consumers, product catalogs, and proof of sales through online marketplaces.",
      [
        "Significant changes regarding Trademark deletion actions by Third Parties have arisen following Constitutional Court Decision Number 144/PUU-XXI/2023 (“",
        {
          text: "Constitutional Court Decision 144/2023",
          strong: true,
        },
        "”). In this decision, the Constitutional Court held that a",
        {
          text: " deletion action may only be filed where the Trademark has not been used for 5 (five) consecutive years",
          strong: true,
        },
        ". Furthermore, the Court expanded the exception relating to ",
        {
          text: "other similar restrictions to include force majeure circumstances established by Government Regulation.",
          strong: true,
        },
        " As a result, Trademark owners are afforded a longer period of non-use before their Trademarks may be challenged for deletion by interested parties.",
      ],
      "A Trademark deletion action must be filed with the Commercial Court having jurisdiction over the defendant’s domicile. Pursuant to Article 85 of the TGI Law, Trademark deletion proceedings must be completed within 90 (ninety) calendar days from the date the case is assigned to the panel of judges and may be extended for a maximum of 30 (thirty) calendar days with the approval of the Chief Justice of the Supreme Court.",
      "Any objection to the deletion of a Trademark, whether initiated by the Ministry of Law through the DGIP or by a Third Party, may be challenged through a cassation appeal to the Supreme Court. Any deletion of a registered Trademark, whether initiated by the Trademark owner, the Ministry of Law through the DGIP, or a Third Party, must be recorded and published in the Official Trademark Gazette. Upon deletion, the Trademark owner loses its Exclusive Rights over the Trademark and is no longer entitled to legal protection for the Trademark. Moreover, the deletion of a registered Trademark may create an opportunity for other parties to apply for registration of the deleted Trademark.",
    ],
    contactParagraph: [
      "For further information or queries, kindly reach out to our partner Zidny Assegaf ",
      {
        text: "(z.assegaf@asentya.com)",
        emphasis: true,
        href: "mailto:z.assegaf@asentya.com",
      },
      " or Raditya Rahmadhan ",
      {
        text: "(r.rahmadhan@asentya.com)",
        emphasis: true,
        href: "mailto:r.rahmadhan@asentya.com",
      },
      ".",
    ],
    disclaimerLabel: [{ text: "Disclaimer:", emphasis: true }],
    disclaimer: [
      {
        text: "This insights is prepared for general information purposes and should not be taken as a legal advice. Asentya Legal Advisor bear no responsibility due to losses arising from the use of this general information.",
        emphasis: true,
      },
    ],
    copyright: "© Asentya Legal Advisor | 2026",
  },
] as const satisfies readonly InsightArticle[];

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
