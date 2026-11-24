import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell about-enter rounded-2xl p-6 sm:p-8">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(16rem,24rem)]">
          <div>
            <p className="island-kicker about-enter-item mb-2">About</p>
            <h1 className="display-title about-enter-item mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
              Software with real-world impact.
            </h1>
            <p className="about-enter-item mb-4 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
              I’m motivated by software that makes a tangible difference:
              reducing manual work, helping people make better decisions, or
              making essential services easier to use.
            </p>
            <p className="about-enter-item m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
              My experience includes building an opioid restitution reporting
              platform and citywide 311 map in Baltimore, as well as
              establishing CI/CD and deployment foundations for a federal IRS
              engagement. Those projects shaped how I work: partner closely with
              the people affected, understand the problem, and build dependable
              tools. I’m excited to bring that approach to meaningful challenges
              across industries.
            </p>
          </div>
          <img
            src="/assets/illustrations/undraw_deploy-globally_2k9s.svg"
            alt="Illustration of a developer working on a global software deployment"
            className="about-enter-item w-full max-w-sm justify-self-center"
          />
        </div>
      </section>
    </main>
  )
}
