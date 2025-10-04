export const metadata = {
    title: "About Me",
    description: "Learn more about the portfolio owner",
  }
  
  export default function AboutPage() {
    return (
      <section className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold">About Me</h1>
        <p>
          Hi! I'm Michael S. Mullen (Mr.), a full-stack developer specializing in
          Next.js, TypeScript, Prisma, and NextAuth. I build secure portfolio and
          blog platforms with modern UI patterns using Shadcn UI and React Quill.
        </p>
        <p>
          <b>Contact:</b> michael@example.com | (+1) 555-123-4567
        </p>
        <p>
          <b>Location:</b> Loudoun County, VA • Available for freelance and collaboration.
        </p>
      </section>
    )
  }
  