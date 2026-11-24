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
          Civic technology with real-world impact.
        </h1>
        <p className="mb-4 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          I’m drawn to civic technology because good software can make public
          work clearer, reduce manual effort, and help teams serve their
          communities more effectively.
        </p>
        <p className="m-0 max-w-3xl text-base leading-8 text-[var(--sea-ink-soft)]">
          In Baltimore, I helped build a reporting platform for the Opioid
          Restitution Fund and a citywide 311 map. I enjoy working closely with
          the people who use a tool, understanding what gets in their way, and
          turning those needs into something straightforward and dependable.
        </p>
      </section>
    </main>
  )
}
