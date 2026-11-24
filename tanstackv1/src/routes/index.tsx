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



export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allJobs.forEach((job) => {
      job.tags.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [])

  const filteredJobs = useMemo(() => {
    if (selectedTags.length === 0) return allJobs

    return allJobs.filter((job) =>
      selectedTags.some((tag) => job.tags.includes(tag)),
    )
  }, [selectedTags])

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

              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobExperienceCard key={`${job.company}-${job.jobTitle}-${job.startDate}`} job={job} />
                ))}
              </div>
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
      <label
        htmlFor={tag}
        className="cursor-pointer text-sm font-medium leading-none text-[var(--sea-ink-soft)] transition-colors group-hover:text-[var(--sea-ink)]"
      >
        {tag}
      </label>
    </div>
  )
}

function JobExperienceCard({ job }: { job: (typeof allJobs)[number] }) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-[var(--sea-ink)]">
              {job.jobTitle}
            </CardTitle>
            <p className="font-medium text-[var(--primary)]">
              {job.company} - {job.location}
            </p>
          </div>

          <Badge variant="secondary" className="text-sm">
            {job.startDate} - {job.endDate || 'Present'}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-6 leading-relaxed text-[var(--sea-ink-soft)]">{job.summary}</p>

        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <HoverCard key={`${job.company}-${job.jobTitle}-${tag}`}>
              <HoverCardTrigger>
                <Badge
                  variant="outline"
                  className="cursor-pointer border-[var(--line)] text-[var(--sea-ink-soft)] transition-colors hover:bg-[var(--accent)]"
                >
                  {tag}
                </Badge>
              </HoverCardTrigger>

              <HoverCardContent className="w-64">
                <p className="text-sm text-[var(--sea-ink-soft)]">
                  Experience with {tag} in professional development
                </p>
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>

        {job.content && (
          <div
            className="prose prose-sm mt-6 max-w-none text-[var(--sea-ink-soft)]"
            dangerouslySetInnerHTML={{
              __html: marked(job.content),
            }}
          />
        )}
      </CardContent>
    </Card>
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
