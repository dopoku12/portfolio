import type { Education } from 'content-collections'
import { ArrowSquareOut } from '@phosphor-icons/react'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'
import { formatResumeDate } from '#/components/resume/date'

export default function CertificationCard({
  certification,
}: {
  certification: Education
}) {
  return (
    <Card className="border border-[var(--line)] bg-[var(--card)] shadow-md transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl text-[var(--sea-ink)]">
          {certification.url ? (
            <a
              href={certification.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-inherit hover:text-[var(--primary)] hover:underline"
            >
              {certification.summary}
              <ArrowSquareOut aria-hidden="true" size={18} weight="duotone" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            certification.summary
          )}
        </CardTitle>
        <p className="text-sm text-[var(--sea-ink-soft)]">
          {certification.school} · Earned{' '}
          {formatResumeDate(certification.startDate)}
        </p>
      </CardHeader>

      {certification.status && (
        <CardContent>
          <p className="text-sm font-medium text-[var(--primary)]">
            {certification.status}
          </p>
        </CardContent>
      )}
    </Card>
  )
}
