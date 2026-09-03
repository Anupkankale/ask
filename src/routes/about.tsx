import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "../components/page-hero";
import { pageHead } from "../lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About | Anup Kankale",
      description:
        "WordPress Core contributor and full-stack developer in Mumbai with 4+ years of experience across PHP, WordPress, Nuxt.js and AI integrations. Experience, education and resume.",
      path: "/about",
    }),
  component: About,
});

const experience = [
  {
    period: "Nov 2024 - Present",
    role: "Senior Web Developer",
    company: "Yallo Group",
    location: "Dubai",
    points: [
      "Architected and built Saasinator, a 30-40 page enterprise AI platform site in Nuxt.js, Vue and TypeScript, deployed on DigitalOcean.",
      "Led end-to-end development of the 90+ page Yallo Group corporate WordPress site, including a custom chatbot module and visitor-tracking plugins.",
      "Mentored a team of interns, setting implementation standards, running code reviews and guiding day-to-day practice.",
      "Delivered measurable Core Web Vitals gains alongside structured data and semantic-HTML SEO work.",
    ],
  },
  {
    period: "May 2024 - Nov 2024",
    role: "Web Developer",
    company: "Brain Cells Pvt Ltd",
    location: "Pune",
    points: [
      "Worked across the full WordPress stack: theme customization, custom post types, REST API integration and MySQL optimization.",
      "Shipped high-converting landing pages for marketing campaigns, tuned for speed and lead generation.",
      "Led development and ongoing maintenance of the TRIOS website, including security hardening.",
    ],
  },
  {
    period: "Mar 2023 - May 2024",
    role: "WordPress Developer",
    company: "Magicworks IT Solutions Pvt Ltd",
    location: "Pune",
    points: [
      "Delivered WordPress sites across a range of industries: theme customization, page builders and plugin configuration.",
      "Executed on-page SEO: meta tags, heading structure, image alt attributes and internal linking.",
      "Picked up deployment, cPanel management and post-launch support alongside senior developers.",
    ],
  },
];

const education = [
  { period: "2021 - 2023", qualification: "MCA, Master of Computer Applications", place: "Sant Gadge Baba Amravati University" },
  { period: "2018 - 2021", qualification: "BCA, Bachelor of Computer Applications", place: "Shri Shivaji Science College" },
];

const certificates = [
  "Legacy Responsive Web Design",
  "Model Context Protocol: Advanced Topics",
  "WordPress Projects: Modernize Workflows and Codebase",
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT ME"
        title={<>Hi, I&apos;m Anup. <span className="text-accent">A developer who loves the open web.</span></>}
        lead="I help businesses build modern WordPress websites and add intelligent, AI-powered features without losing the simplicity that makes WordPress great."
      />
      <section className="mx-auto max-w-3xl px-6 py-20 space-y-6 text-lg leading-relaxed text-muted-foreground">
        <p>I&apos;m based in <strong className="text-primary">Mumbai, India</strong> with <strong className="text-primary">4+ years</strong> of experience building full-stack web applications, from small business sites to enterprise platforms with 90+ pages and complex editorial workflows. Day to day that means PHP and WordPress on one side, and Nuxt.js, Vue and TypeScript on the other.</p>
        <p>I&apos;m a proud <strong className="text-primary">WordPress Core contributor</strong>, credited in the 7.0 &ldquo;Armstrong&rdquo; and 7.1 &ldquo;Mary Lou&rdquo; releases for work on the HTML API, Block Supports and CSS formatting functions. I&apos;ve also authored <strong className="text-primary">four open-source WordPress plugins</strong> and contribute to projects beyond WordPress, like the NudgeBee AI/SRE platform.</p>
        <p>My current obsession is the intersection of <strong className="text-primary">WordPress and AI</strong>: chatbots, LLM-powered content tools, and n8n automations that quietly take care of repetitive work so teams can focus on the meaningful parts of their job.</p>
        <p>I believe great websites should be <strong className="text-primary">fast, accessible and easy to manage</strong>. That&apos;s the bar I try to hit on every project, big or small.</p>
        <div className="pt-2">
          <a
            href="/anup-kankale-resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
          >
            Download my résumé <span className="text-xs font-normal opacity-70">(PDF)</span>
          </a>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <p className="font-display text-sm tracking-widest text-accent">EXPERIENCE</p>
          <h2 className="mt-3 text-3xl text-primary md:text-4xl">Where I&apos;ve been building.</h2>

          <ol className="mt-12 space-y-10 border-l border-border pl-6 md:pl-8">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period}`} className="relative">
                <span className="absolute -left-[1.85rem] top-2 h-3 w-3 rounded-full border-2 border-background bg-accent md:-left-[2.35rem]" />
                <p className="font-display text-xs tracking-widest text-muted-foreground">{job.period}</p>
                <h3 className="mt-1 text-xl text-primary">
                  {job.role} <span className="text-accent">· {job.company}</span>
                </h3>
                <p className="text-sm text-muted-foreground">{job.location}</p>
                <ul className="mt-3 space-y-2">
                  {job.points.map((point) => (
                    <li key={point} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <div className="mt-16 grid gap-10 md:grid-cols-2">
            <div>
              <p className="font-display text-sm tracking-widest text-accent">EDUCATION</p>
              <ul className="mt-4 space-y-4">
                {education.map((item) => (
                  <li key={item.qualification}>
                    <p className="text-primary">{item.qualification}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.place} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-display text-sm tracking-widest text-accent">CERTIFICATES</p>
              <ul className="mt-4 space-y-2">
                {certificates.map((cert) => (
                  <li key={cert} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-20 grid gap-12 md:grid-cols-2">
          <div>
            <p className="font-display text-sm tracking-widest text-accent">HOW I WORK</p>
            <h2 className="mt-3 text-3xl text-primary md:text-4xl">Calm, clear, and shipped on time.</h2>
          </div>
          <ul className="space-y-5">
            {[
              ["Honest scoping", "I&apos;d rather tell you something is the wrong fit than over-promise."],
              ["Plain-language updates", "No jargon walls. You&apos;ll always know what&apos;s happening and why."],
              ["WordPress-first thinking", "I lean on the platform&apos;s strengths instead of fighting them."],
              ["Built to hand off", "Clean code, documentation and editorial UX your team can actually maintain."],
            ].map(([h, b]) => (
              <li key={h} className="flex gap-4">
                <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-accent" />
                <div>
                  <p className="font-semibold text-primary">{h}</p>
                  <p className="text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: b }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="text-3xl text-primary md:text-4xl">Like what you read?</h2>
        <p className="mt-3 text-muted-foreground">Tell me about your project. I read every message.</p>
        <Link to="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 transition">Get in touch →</Link>
      </section>
    </>
  );
}