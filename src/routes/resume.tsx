import { useMemo, useState } from 'react'

import { createFileRoute } from '@tanstack/react-router'
import { allEducations, allJobs, allProjects } from 'content-collections'
import CertificationCard from '#/components/resume/CertificationCard'
import EducationCard from '#/components/resume/EducationCard'
import JobTimelineItem from '#/components/resume/JobTimelineItem'
import ProjectCard from '#/components/resume/ProjectCard'
import { ResumeSkillsSidebar } from '#/components/resume/ResumeSkills'
import { Separator } from '#/components/ui/separator'
import { Trace } from '#/components/ui/trace'

const certifications = allEducations.filter((item) =>
  item.tags.includes('Certification'),
)
const educationRecords = allEducations.filter(
  (item) => !item.tags.includes('Certification'),
)

export const Route = createFileRoute('/resume')({
  component: ResumePage,
})

function ResumePage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const jobsNewestFirst = useMemo(
    () =>
      [...allJobs].sort(
        (first, second) =>
          Date.parse(second.startDate) - Date.parse(first.startDate),
      ),
    [],
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
        <ResumeSkillsSidebar
          jobs={jobsNewestFirst}
          selectedTags={selectedTags}
          onToggle={toggleTag}
        />

        <main className="flex-1 p-8 lg:p-12">
          <div className="mx-auto max-w-4xl space-y-12">
            <header className="space-y-4 text-center">
              <h1 className="text-5xl font-bold text-[var(--sea-ink)]">
                My Resume
              </h1>
              <p className="text-lg text-[var(--sea-ink-soft)]">
                Professional Experience, Certifications & Education
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
                Certifications
              </h2>
              <div className="space-y-6">
                {certifications.map((certification) => (
                  <CertificationCard
                    key={`${certification.school}-${certification.summary}`}
                    certification={certification}
                  />
                ))}
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-semibold text-[var(--sea-ink)]">
                Education
              </h2>
              <div className="space-y-6">
                {educationRecords.map((education) => (
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
