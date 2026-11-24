import { ArrowSquareOut } from '@phosphor-icons/react'
import type { Project } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'
import { SkillBadge } from '#/components/resume/ResumeSkills'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-inherit no-underline hover:text-[var(--primary)]"
            >
              {project.name}
              <ArrowSquareOut aria-hidden="true" size={20} weight="duotone" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            project.name
          )}
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
