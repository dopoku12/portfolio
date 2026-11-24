import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  EnvelopeSimple,
  LinkedinLogo,
} from '@phosphor-icons/react'
import { Card, CardContent } from '#/components/ui/card'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main className="page-wrap px-4 py-12 md:py-16">
      <Card className="home-hero island-shell home-enter overflow-hidden rounded-3xl">
        <CardContent className="p-6 pt-6 sm:p-10 md:p-14">
          <section
            id="career"
            aria-labelledby="home-title"
            className="grid items-start gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-10"
          >
            <div className="home-enter home-enter-delay-1">
              <p className="island-kicker mb-4">
                Washington, D.C. Metro Area
              </p>
              <h1
                id="home-title"
                className="display-title mb-5 text-5xl font-bold text-[var(--sea-ink)] sm:text-6xl"
              >
                David Opoku
              </h1>
              <p className="island-kicker mb-2">Career</p>
              <h2 className="display-title mb-4 text-3xl font-semibold text-[var(--sea-ink)] sm:text-4xl">
                Building software that makes a difference.
              </h2>
              <p className="mb-6 max-w-2xl leading-relaxed text-[var(--sea-ink-soft)]">
                Full-stack software engineer with 3+ years of experience
                building and deploying practical, dependable production
                applications for municipal and federal clients. Skilled in
                full-stack development, CI/CD automation, cloud infrastructure,
                and automated testing.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/resume" className="home-cta">
                  Explore my resume
                  <ArrowRight aria-hidden="true" size={18} weight="bold" />
                </Link>
                <a
                  href="mailto:dopoku.tech@gmail.com"
                  className="home-cta-secondary"
                >
                  <EnvelopeSimple aria-hidden="true" size={18} weight="bold" />
                  dopoku.tech@gmail.com
                </a>
                <a
                  href="https://www.linkedin.com/in/david-o-7008721b7/"
                  target="_blank"
                  rel="noreferrer"
                  className="home-cta-secondary"
                >
                  <LinkedinLogo
                    aria-hidden="true"
                    size={18}
                    weight="fill"
                    className="text-[#0A66C2]"
                  />
                  LinkedIn
                </a>
              </div>
              <p className="mb-0 mt-6 text-sm text-[var(--sea-ink-soft)]">
                U.S. Citizen <span aria-hidden="true">·</span> Open to relocation
              </p>
            </div>
            <div className="flex justify-center sm:mt-12">
              <img
                src="/headshot-on-white.jpg"
                alt="David Opoku"
                className="h-56 w-48 rounded-2xl object-cover shadow-md transition-transform duration-300 hover:scale-105 sm:h-64 sm:w-52"
              />
            </div>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}
