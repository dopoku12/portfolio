import type { Job } from 'content-collections'
import { Briefcase } from '@phosphor-icons/react'
import {
  TimelineCollapsible,
  TimelineContent,
  TimelineDescription,
  TimelineIcon,
  TimelineItem,
  TimelineTitle,
  TimelineTrigger,
} from '#/components/ui/timeline'
import { formatResumeMonth } from '#/components/resume/date-formatters'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'
import { SkillBadge } from '#/components/resume/ResumeSkills'

const employerLogos: Record<string, string> = {
  "City of Baltimore | Mayor's Office of Performance and Innovation":
    '/assets/logos/bmore.jpg',
  Cloudforce: '/assets/logos/gocloudforce_logo.jpg',
  Mathsolutely: '/assets/logos/mathsolutely_logo.jpg',
  'Pacific Consulting Group': '/assets/logos/pacific_consulting_group_logo.jpg',
}

export default function JobTimelineItem({ job }: { job: Job }) {
  const dateRange = `${formatResumeMonth(job.startDate)} – ${job.endDate ? formatResumeMonth(job.endDate) : 'Present'}`
  const employerLogo = employerLogos[job.company]

  return (
    <TimelineCollapsible defaultOpen>
      <TimelineTrigger className="w-full">
        <TimelineItem className="w-full items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:bg-[var(--accent)]">
          <TimelineIcon className="mt-0.5 size-10 rounded-full bg-[var(--accent)] text-[var(--primary)] [&_svg:not([class*='size-'])]:size-5">
            {employerLogo ? (
              <img
                src={employerLogo}
                alt=""
                className="size-full rounded-md object-contain"
              />
            ) : (
              <Briefcase aria-hidden="true" size={22} weight="duotone" />
            )}
          </TimelineIcon>
          <span className="min-w-0 flex-1">
            <TimelineTitle className="block text-base font-semibold text-[var(--sea-ink)]">
              {job.jobTitle}
            </TimelineTitle>
            <span className="mt-1 block text-sm text-[var(--primary)]">
              {job.company} · {job.location}
            </span>
          </span>
          <TimelineDescription className="hidden pt-1 text-right text-xs text-[var(--sea-ink-soft)] sm:block">
            {dateRange}
          </TimelineDescription>
        </TimelineItem>
      </TimelineTrigger>

      <TimelineContent className="border-[var(--line)] text-[var(--sea-ink-soft)]">
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
      </TimelineContent>
    </TimelineCollapsible>
  )
}
