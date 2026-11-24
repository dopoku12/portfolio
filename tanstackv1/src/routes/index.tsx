import { useState, useMemo } from 'react'
import { marked } from 'marked'

import { createFileRoute } from '@tanstack/react-router'
import { allJobs, allEducations, allProjects } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { Checkbox } from '#/components/ui/checkbox'
import { Badge } from '#/components/ui/badge'
import { Separator } from '#/components/ui/separator'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '#/components/ui/hover-card'
import {
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
} from '#/components/ui/trace'
import {
  Braces,
  Briefcase,
  Cloud,
  Code2,
  Container,
  CreditCard,
  Database,
  FlaskConical,
  Layers,
  MapPin,
  ShieldCheck,
  Terminal,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const jobsNewestFirst = useMemo(
    () =>
      [...allJobs].sort(
        (first, second) =>
          Date.parse(second.startDate) - Date.parse(first.startDate),
      ),
    [],
  )

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    jobsNewestFirst.forEach((job) => {
      job.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [jobsNewestFirst])

  const filteredJobs = useMemo(() => {
    if (selectedTags.length === 0) return jobsNewestFirst

    return jobsNewestFirst.filter((job) =>
      selectedTags.some((tag) => job.tags.includes(tag)),
    )
  }, [jobsNewestFirst, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="flex flex-col md:flex-row">
        <aside className="border-b border-[var(--line)] bg-[var(--sidebar)] p-6 shadow-sm md:sticky md:top-0 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:p-8">
          <h3 className="mb-6 text-lg font-semibold text-[var(--sea-ink)]">
            Skills & Technologies
          </h3>

          <div className="space-y-4">
            {allTags.map((tag) => (
              <SkillFilterItem
                key={tag}
                tag={tag}
                checked={selectedTags.includes(tag)}
                onToggle={toggleTag}
              />
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-12">
            <header className="space-y-4 text-center">
              <h1 className="text-5xl font-bold text-[var(--sea-ink)]">
                My Resume
              </h1>
              <p className="text-lg text-[var(--sea-ink-soft)]">
                Professional Experience & Education
              </p>
              <Separator className="mt-8" />
            </header>

            <Card className="border border-[var(--line)] bg-[var(--card)] shadow-lg shadow-[oklch(0.42_0.035_158/0.08)]">
              <CardHeader>
                <CardTitle className="text-2xl text-[var(--sea-ink)]">
                  Career Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-8">
                  <p className="flex-1 leading-relaxed text-[var(--sea-ink-soft)]">
                    Full-stack software engineer with 3+ years of experience
                    building and deploying production applications for municipal
                    and federal clients. Skilled in full-stack development,
                    CI/CD automation, cloud infrastructure, and automated testing.
                  </p>

                  <img
                    src="/headshot-on-white.jpg"
                    alt="Professional headshot"
                    className="h-52 w-44 rounded-2xl object-cover shadow-md transition-transform hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-[var(--sea-ink)]">
                Work Experience
              </h2>

              <Trace className="gap-5">
                {filteredJobs.map((job) => (
                  <JobTimelineItem
                    key={`${job.company}-${job.jobTitle}-${job.startDate}`}
                    job={job}
                  />
                ))}
              </Trace>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-[var(--sea-ink)]">
                Projects
              </h2>

              <div className="space-y-6">
                {allProjects.map((project) => (
                  <ProjectCard key={project.name} project={project} />
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-[var(--sea-ink)]">
                Education
              </h2>

              <div className="space-y-6">
                {allEducations.map((education) => (
                  <EducationCard key={education.school} education={education} />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}

function SkillFilterItem({
  tag,
  checked,
  onToggle,
}: {
  tag: string
  checked: boolean
  onToggle: (tag: string) => void
}) {
  return (
    <div className="group flex items-center space-x-3">
      <Checkbox
        id={tag}
        checked={checked}
        onCheckedChange={() => onToggle(tag)}
        className="data-[state=checked]:bg-[var(--primary)]"
      />
      <label htmlFor={tag} className="flex cursor-pointer items-center gap-2">
        <SkillIcon tag={tag} />
        <span className="text-sm font-medium leading-none text-[var(--sea-ink-soft)] transition-colors group-hover:text-[var(--sea-ink)]">
          {tag}
        </span>
      </label>
    </div>
  )
}

function JobTimelineItem({ job }: { job: (typeof allJobs)[number] }) {
  const dateRange = `${formatMonth(job.startDate)} – ${job.endDate ? formatMonth(job.endDate) : 'Present'}`

  return (
    <TraceCollapsible defaultOpen>
      <TraceCollapsibleTrigger className="w-full">
        <TraceLine className="w-full items-start gap-3 rounded-xl border border-[var(--line)] bg-[var(--card)] p-4 shadow-sm hover:bg-[var(--accent)]">
          <TraceIcon className="mt-0.5 size-9 rounded-full bg-[var(--accent)] text-[var(--primary)] [&_svg:not([class*='size-'])]:size-4">
            <Briefcase aria-hidden="true" />
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
            <div
              className="resume-task-list mt-4"
              dangerouslySetInnerHTML={{
                __html: marked(job.content),
              }}
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

function formatMonth(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${date.slice(0, 7)}-01T00:00:00Z`))
}

function getSkillIcon(tag: string): LucideIcon {
  const normalizedTag = tag.toLowerCase()

  if (/azure|cloud/.test(normalizedTag)) return Cloud
  if (/postgres|mongo|database|sql/.test(normalizedTag)) return Database
  if (/docker|container/.test(normalizedTag)) return Container
  if (/playwright|vitest|test|regression/.test(normalizedTag)) {
    return FlaskConical
  }
  if (/github actions|gitlab ci|ci\/cd|workflow/.test(normalizedTag)) {
    return Workflow
  }
  if (/stripe|payment/.test(normalizedTag)) return CreditCard
  if (/access|role-based|security/.test(normalizedTag)) return ShieldCheck
  if (/gis|map/.test(normalizedTag)) return MapPin
  if (/bash|terminal|linux/.test(normalizedTag)) return Terminal
  if (/html|css|tailwind|shadcn|ui/.test(normalizedTag)) return Layers
  if (/typescript|javascript|python|node|react|fastapi|django/.test(normalizedTag)) {
    return Braces
  }
  return Code2
}

function SkillIcon({ tag }: { tag: string }) {
  const Icon = getSkillIcon(tag)

  return (
    <Icon
      aria-hidden="true"
      className="size-3.5 shrink-0 text-[var(--primary)]"
    />
  )
}

function SkillBadge({ tag }: { tag: string }) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Badge
          variant="outline"
          className="gap-1.5 border-[var(--line)] text-[var(--sea-ink-soft)] transition-colors hover:bg-[var(--accent)]"
        >
          <SkillIcon tag={tag} />
          {tag}
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-64">
        <p className="text-sm text-[var(--sea-ink-soft)]">
          Experience with {tag} in professional development
        </p>
      </HoverCardContent>
    </HoverCard>
  )
}

function EducationCard({
  education,
}: {
  education: (typeof allEducations)[number]
}) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          {education.school}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="leading-relaxed text-[var(--sea-ink-soft)]">{education.summary}</p>

        {education.content && (
          <div
            className="prose prose-sm mt-6 max-w-none text-[var(--sea-ink-soft)]"
            dangerouslySetInnerHTML={{
              __html: marked(education.content),
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}

function ProjectCard({
  project,
}: {
  project: (typeof allProjects)[number]
}) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          {project.name}
        </CardTitle>
        <p className="font-medium text-[var(--primary)]">{project.role}</p>
      </CardHeader>

      <CardContent>
        <p className="mb-6 leading-relaxed text-[var(--sea-ink-soft)]">
          {project.summary}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
        {project.content && (
          <div
            className="prose prose-sm mt-6 max-w-none text-[var(--sea-ink-soft)]"
            dangerouslySetInnerHTML={{
              __html: marked(project.content),
            }}
          />
        )}
      </CardContent>
    </Card>
  )
}
