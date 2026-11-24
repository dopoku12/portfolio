import type { Education } from 'content-collections'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import ResumeMarkdown from '#/components/resume/ResumeMarkdown'

export default function EducationCard({ education }: { education: Education }) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          {education.school}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="leading-relaxed text-[var(--sea-ink-soft)]">
          {education.summary}
        </p>

        {education.content && (
          <ResumeMarkdown
            content={education.content}
            className="prose prose-sm mt-6 max-w-none text-[var(--sea-ink-soft)]"
          />
        )}
      </CardContent>
    </Card>
  )
}
