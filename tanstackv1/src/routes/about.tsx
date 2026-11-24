import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">About</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          Full-stack engineer focused on useful, durable software.
        </h1>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          David Opoku is a full-stack software engineer with 3+ years of experience
          building and deploying production applications for municipal and federal
          clients. His work spans full-stack development, CI/CD automation, cloud
          infrastructure, and automated testing.
        </p>
      </section>
    </main>
  )
}
