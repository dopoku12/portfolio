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
  Atom,
  Browser,
  BracketsCurly,
  Briefcase,
  ChartLine,
  Cloud,
  Code,
  Database,
  FileJs,
  FilePy,
  FileTs,
  Flask,
  GithubLogo,
  GitlabLogo,
  MapPin,
  Package,
  type Icon,
  ShieldCheck,
  Stack,
  StripeLogo,
  Terminal,
  Wind,
  WindowsLogo,
  ArrowSquareOut,
} from '@phosphor-icons/react'

const skillCategories: Record<string, Array<string>> = {
  Frontend: ['React', 'Tailwind CSS', 'TypeScript'],
  Backend: [
    'Django',
    'FastAPI',
    'Node.js',
    'Python',
    'Role-Based Access',
    'Stripe',
  ],
  DevOps: [
    'Azure',
    'Azure Blob Storage',
    'Azure DevOps',
    'Bash',
    'Docker',
    'GitHub Actions',
    'GitLab CI',
    'Nginx',
    'Power Platform',
  ],
  Data: ['Grafana', 'KQL', 'MongoDB', 'PostgreSQL', 'SQL'],
  Testing: ['Playwright', 'Regression Testing', 'Vitest'],
}

export const Route = createFileRoute('/resume')({
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

  const groupedSkills = useMemo(
    () =>
      Object.entries(skillCategories)
        .map(([category, categoryTags]) => ({
          category,
          tags: allTags.filter((tag) => categoryTags.includes(tag)),
        }))
        .filter((group) => group.tags.length > 0),
    [allTags],
  )

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
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row">
        <aside className="border-b border-[var(--line)] bg-[var(--sidebar)] p-6 shadow-sm backdrop-blur-xl md:sticky md:top-0 md:min-h-screen md:w-72 md:border-b-0 md:border-r md:p-8">
          <p className="island-kicker mb-1">Filter by skill</p>
          <h3 className="mb-6 text-lg font-semibold text-[var(--sea-ink)]">
            Skills & Technologies
          </h3>

          <div className="space-y-6">
            {groupedSkills.map(({ category, tags }) => (
              <section key={category} aria-label={`${category} skills`}>
                <h4 className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-[var(--sea-ink-soft)]">
                  {category}
                </h4>
                <div className="space-y-3">
                  {tags.map((tag) => (
                    <SkillFilterItem
                      key={tag}
                      tag={tag}
                      checked={selectedTags.includes(tag)}
                      onToggle={toggleTag}
                    />
                  ))}
                </div>
              </section>
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

function getSkillIcon(tag: string): { icon: Icon; color: string } {
  const normalizedTag = tag.toLowerCase()

  if (/^react$/.test(normalizedTag)) return { icon: Atom, color: '#61DAFB' }
  if (/typescript/.test(normalizedTag)) return { icon: FileTs, color: '#3178C6' }
  if (/node\.?js|express/.test(normalizedTag)) {
    return { icon: FileJs, color: '#339933' }
  }
  if (/javascript/.test(normalizedTag)) return { icon: FileJs, color: '#F7DF1E' }
  if (/python|fastapi|django/.test(normalizedTag)) {
    return { icon: FilePy, color: '#3776AB' }
  }
  if (/github actions/.test(normalizedTag)) {
    return { icon: GithubLogo, color: '#2088FF' }
  }
  if (/gitlab/.test(normalizedTag)) {
    return { icon: GitlabLogo, color: '#FC6D26' }
  }
  if (/stripe|payment/.test(normalizedTag)) {
    return { icon: StripeLogo, color: '#635BFF' }
  }
  if (/azure|cloud/.test(normalizedTag)) return { icon: Cloud, color: '#0078D4' }
  if (/postgres/.test(normalizedTag)) {
    return { icon: Database, color: '#4169E1' }
  }
  if (/mongo/.test(normalizedTag)) return { icon: Database, color: '#47A248' }
  if (/sql|kql|database/.test(normalizedTag)) {
    return { icon: Database, color: '#CC2927' }
  }
  if (/docker|container/.test(normalizedTag)) {
    return { icon: Package, color: '#2496ED' }
  }
  if (/playwright/.test(normalizedTag)) {
    return { icon: Browser, color: '#2EAD33' }
  }
  if (/vitest|test|regression/.test(normalizedTag)) {
    return { icon: Flask, color: '#6E9F18' }
  }
  if (/grafana/.test(normalizedTag)) {
    return { icon: ChartLine, color: '#F46800' }
  }
  if (/tailwind/.test(normalizedTag)) return { icon: Wind, color: '#06B6D4' }
  if (/linux|bash|terminal/.test(normalizedTag)) {
    return { icon: Terminal, color: '#4EAA25' }
  }
  if (/power platform/.test(normalizedTag)) {
    return { icon: WindowsLogo, color: '#742774' }
  }
  if (/access|role-based|security/.test(normalizedTag)) {
    return { icon: ShieldCheck, color: '#4A8067' }
  }
  if (/gis|map/.test(normalizedTag)) return { icon: MapPin, color: '#4A8067' }
  if (/html|css|shadcn|ui/.test(normalizedTag)) {
    return { icon: Stack, color: '#52525B' }
  }
  if (/ci\/cd|workflow/.test(normalizedTag)) {
    return { icon: BracketsCurly, color: '#6B7280' }
  }
  if (/next\.?js|tanstack/.test(normalizedTag)) {
    return { icon: Code, color: '#111827' }
  }
  return { icon: Code, color: '#6B7280' }
}

function SkillIcon({ tag }: { tag: string }) {
  const { icon: Icon, color } = getSkillIcon(tag)

  return (
    <Icon
      aria-hidden="true"
      size={18}
      weight="duotone"
      className="size-[18px] shrink-0"
      style={{ color }}
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
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-inherit no-underline hover:text-[var(--primary)]"
            >
              {project.name}
              <ArrowSquareOut
                aria-hidden="true"
                size={20}
                weight="duotone"
              />
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
