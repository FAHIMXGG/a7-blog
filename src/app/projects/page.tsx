// app/projects/page.tsx
import Image from "next/image"
import Link from "next/link"

const projects = [
  {
    id: 1,
    title: "DaimJobHub",
    description:
      "Job platform with 'Apply Now' and application tracking dashboard.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8nyFwH3COoKCvjI2WEYb0uAFtGeahRfU5lTpr",
    tags: ["React", "Tailwind CSS", "Flowbite"],
    link: "https://imaginative-biscotti-36f3c1.netlify.app/",
    github: "https://github.com/FAHIMXGG/job-hub",
  },
  {
    id: 2,
    title: "Seoul Garden",
    description: "Explore chefs' recipes and save favorites in a recipe book.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8zF7iBP3fd2ZgbTxyeN5UHVGuIRSmCLv6FtYa",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "Flowbite",
    ],
    link: "https://ass-10-eb539.web.app/",
    github: "https://github.com/FAHIMXGG/ass-10-chef-clint--",
  },
  {
    id: 3,
    title: "PlayfulParadise",
    description:
      "Users can add, remove, and manage toys via personal and public dashboards.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8pAOc7ldDvUhQVKfNCekItyGJwXWS2Hdxs5rT",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "Flowbite",
    ],
    link: "https://ass-11-toys.web.app/",
    github: "https://github.com/FAHIMXGG/Ass11-toymarket",
  },
  {
    id: 6,
    title: "CarRepairBook",
    description: "Car repair booking platform with admin and user dashboards.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA80XjQsx3pAuOtNPTFVbLHX9BzkjEfer7ndS1v",
    tags: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "daisyui",
    ],
    link: "https://car-doctor-lyart.vercel.app/",
    github: "https://github.com/FAHIMXGG/car-doctor",
  },
  {
    id: 5,
    title: "BuySellCar",
    description:
      "Platform to buy, sell, and list cars with separate admin and user dashboards.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8vaWXd241laORUxEAk4jgC8MKBro3yVY9iZz2",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "daisyui",
    ],
    link: "https://graceful-pithivier-654561.netlify.app/",
    github: "https://github.com/FAHIMXGG/b2c-car-management",
  },
  {
    id: 4,
    title: "ThePencilPalette",
    description:
      "Platform for drawing courses with dashboards for admin, instructors, and users.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8X28pEGTEzoByqxHPW8OmCYFQg2AV0di9DpaL",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Firebase",
      "Tailwind CSS",
      "daisyui",
      "Stripe",
    ],
    link: "https://ass-12-d2ded.web.app/",
    github: "https://github.com/FAHIMXGG/The_Pencil_Palette",
  },
  {
    id: 7,
    title: "WebAnalyzer",
    description:
      "Tool to extract site metadata, links, images, and download them as ZIP.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA85kQx2jIE7myflD1Mi0jt3SR8O9kB64FGbaoh",
    tags: ["React", "Node.js", "Express.js", "Tailwind CSS", "Cheerio"],
    link: "https://web-scraping-client.vercel.app/",
    github: "https://github.com/FAHIMXGG/web-scraping-client",
  },
  {
    id: 8,
    title: "Amazon Price Tracker",
    description:
      "Tracks Amazon product prices and notifies users via email on price updates.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8HML0jCExqVNMCeP7gcUO4fpwWHI0FEXzGmrA",
    tags: [
      "Next.js",
      "TypeScript",
      "Mongoose",
      "Tailwind CSS",
      "Nodemailer",
      "Axios",
    ],
    link: "https://price-tracker-wheat.vercel.app/",
    github: "https://github.com/FAHIMXGG/Price_Tracker",
  },
  {
    id: 11,
    title: "Safar",
    description:
      "Elementor template kit for travel agencies and tourism businesses.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8Z5owNg6gWMN6jAs89xpfKOI1VHTmuLiF4Ghd",
    tags: ["Elementor", "WordPress", "Travel", "Tourism", "Template Kit"],
    link: "https://safar.kraito.com/",
    github: "",
  },
  {
    id: 9,
    title: "CasePython",
    description:
      "Create custom phone cases with upload, drag-and-drop, Stripe checkout, and order tracking.",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8N83FG4HVCrUAi3dLK5eFGhBsnkq1Hx4tzMbg",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Resend",
      "Shadcn",
      "Stripe",
      "Framer Motion",
      "Dropzone",
      "Zod",
    ],
    link: "https://casepython.vercel.app/",
    github: "",
  },
  {
    id: 10,
    title: "Real estate",
    description: "Running...",
    image:
      "https://nhs4sxaav5.ufs.sh/f/tl0YFFZLZVA8aVC82URMU6o0S3kOD97NYGhZts5ujcfPm2qr",
    tags: ["Next.js", "TypeScript", "Running"],
    link: "",
    github: "",
  },
]

export const revalidate = 60

export const metadata = {
  title: "Projects",
  description: "Personal projects and experiments",
}

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <h1 className="text-2xl font-semibold">Projects</h1>

      {/* Carousel (CSS scroll-snap) */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory pb-2">
          {projects.map((p) => {
            const hasLive = Boolean(p.link)
            const hasGit = Boolean(p.github)
            return (
              <div
                key={p.id}
                className="min-w-[280px] max-w-[320px] snap-start rounded-xl border overflow-hidden hover:shadow-lg transition bg-background"
              >
                <div className="relative aspect-video bg-muted">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 320px"
                    priority={p.id <= 3}
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <h3 className="font-semibold leading-tight">{p.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {p.description}
                    </p>
                  </div>

                  {/* tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags?.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* actions */}
                  {(hasLive || hasGit) && (
                    <div className="flex items-center gap-2 pt-1">
                      {hasLive && (
                        <Link
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs hover:bg-accent"
                        >
                          Live
                        </Link>
                      )}
                      {hasGit && (
                        <Link
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-md border px-2.5 py-1 text-xs hover:bg-accent"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
