import type { Job } from 'content-collections'
import { Briefcase } from '@phosphor-icons/react'
import {
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '#/components/ui/trace'
import { formatResumeMonth } from '#/components/resume/date'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'
import { SkillBadge } from '#/components/resume/ResumeSkills'

export default function JobTimelineItem({ job }: { job: Job }) {
  const dateRange = `${formatResumeMonth(job.startDate)} – ${job.endDate ? formatResumeMonth(job.endDate) : 'Present'}`

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger className="w-full">
        <TraceLine className="w-full items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:bg-[var(--accent)]">
          <TraceIcon className="mt-0.5 size-10 rounded-full bg-[var(--accent)] text-[var(--primary)] [&_svg:not([class*='size-'])]:size-5">
            <Briefcase aria-hidden="true" size={22} weight="duotone" />
          </TraceIcon>
          <span className="min-w-0 flex-1">
            <TraceTitle className="block text-base font-semibold text-[var(--sea-ink)]">
              {job.jobTitle}
            </TraceTitle>
            <span className="mt-1 block text-sm text-[var(--primary)]">
              {job.company} · {job.location}
            </span>
          </span>
          <TraceDescription className="hidden pt-1 text-right text-xs text-[var(--sea-ink-soft)] sm:block">
            {dateRange}
          </TraceDescription>
        </TraceLine>
      </TraceCollapsibleTrigger>

      <TraceCollapsibleContent className="border-[var(--line)] text-[var(--sea-ink-soft)]">
        <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-sm">
          <p className="mb-4 text-xs font-medium text-[var(--sea-ink-soft)] sm:hidden">
            {dateRange}
          </p>
          <p className="leading-relaxed">{job.summary}</p>

          {job.content && (
            <ResumeMarkdown
              content={job.content}
              className="resume-task-list mt-4"
            />
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <SkillBadge key={`${job.company}-${tag}`} tag={tag} />
            ))}
          </div>
        </div>
      </TraceCollapsibleContent>
    </TraceCollapsible>
  )
}
