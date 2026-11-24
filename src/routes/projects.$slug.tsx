import { ArrowLeft, ArrowSquareOut } from '@phosphor-icons/react'
import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { allProjects } from 'content-collections'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'
import { SkillBadge } from '#/components/resume/ResumeSkills'

function getSiteOrigin() {
  const configuredOrigin = import.meta.env.VITE_SITE_URL
  const netlifyOrigin =
    typeof process !== 'undefined' ? process.env.URL : undefined

  return (
    configuredOrigin ||
    netlifyOrigin ||
    (typeof window !== 'undefined'
      ? window.location.origin
      : 'http://localhost:3000')
  ).replace(/\/+$/, '')
}

export const Route = createFileRoute('/projects/$slug')({
  loader: ({ params }) => {
    const project = allProjects.find((item) => item._meta.path === params.slug)

    if (!project) {
      throw notFound()
    }

    return { project }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}

    const { project } = loaderData
    const origin = getSiteOrigin()
    const pageUrl = new URL(`/projects/${project._meta.path}`, origin).href
    const imageUrl = project.ogImage ? new URL(project.ogImage).href : undefined
    const title = `${project.name} | David Opoku`

    return {
      meta: [
        { title },
        { name: 'description', content: project.summary },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: project.summary },
        { property: 'og:url', content: pageUrl },
        ...(imageUrl
          ? [
              { property: 'og:image', content: imageUrl },
              {
                property: 'og:image:alt',
                content: `${project.name} project preview`,
              },
            ]
          : []),
        { property: 'og:site_name', content: 'David Opoku Portfolio' },
        {
          name: 'twitter:card',
          content: imageUrl ? 'summary_large_image' : 'summary',
        },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: project.summary },
        ...(imageUrl ? [{ name: 'twitter:image', content: imageUrl }] : []),
      ],
      links: [{ rel: 'canonical', href: pageUrl }],
    }
  },
  component: ProjectPage,
})

function ProjectPage() {
  const { project } = Route.useLoaderData()

  return (
    <main className="page-wrap space-y-8 px-4 py-12">
      <Link
        to="/resume"
        className="inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
      >
        <ArrowLeft aria-hidden="true" size={18} />
        Back to resume
      </Link>

      <article className="island-shell rounded-2xl p-6 sm:p-8">
        <p className="island-kicker mb-2">{project.role}</p>
        <h1 className="display-title mb-4 text-4xl font-bold text-[var(--sea-ink)] sm:text-5xl">
          {project.name}
        </h1>
        <p className="mb-6 max-w-3xl text-lg leading-relaxed text-[var(--sea-ink-soft)]">
          {project.summary}
        </p>

        <div className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <SkillBadge key={tag} tag={tag} />
          ))}
        </div>

        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mb-8 inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
          >
            Visit live project
            <ArrowSquareOut aria-hidden="true" size={18} weight="duotone" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}

        {project.content && (
          <ResumeMarkdown
            content={project.content}
            className="prose prose-sm max-w-none text-[var(--sea-ink-soft)]"
          />
        )}
      </article>
    </main>
  )
}
