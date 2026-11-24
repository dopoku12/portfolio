import { ArrowRight, ArrowSquareOut } from '@phosphor-icons/react'
import { Link } from '@tanstack/react-router'
import type { Project } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'
import { SkillBadge } from '#/components/resume/ResumeSkills'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          <Link
            to="/projects/$slug"
            params={{ slug: project._meta.path }}
            className="inline-flex items-center gap-2 text-inherit no-underline hover:text-[var(--primary)]"
          >
            {project.name}
            <ArrowRight aria-hidden="true" size={20} weight="duotone" />
          </Link>
        </CardTitle>
        <p className="font-medium text-[var(--primary)]">{project.role}</p>
      </CardHeader>

      <CardContent>
        <p className="mb-6 leading-relaxed text-[var(--sea-ink-soft)]">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <SkillBadge key={tag} tag={tag} />
          ))}
        </div>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--primary)] hover:underline"
          >
            Visit live project
            <ArrowSquareOut
              aria-hidden="true"
              size={18}
              weight="duotone"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        {project.content && (
          <ResumeMarkdown
            content={project.content}
            className="prose prose-sm mt-6 max-w-none text-[var(--sea-ink-soft)]"
          />
        )}
      </CardContent>
    </Card>
  )
}
