import { useMemo } from 'react'

import type { Job } from 'content-collections'
import {
  Atom,
  Browser,
  BracketsCurly,
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
  ShieldCheck,
  Stack,
  StripeLogo,
  Terminal,
  Wind,
  WindowsLogo,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { Badge } from '#/components/ui/badge'
import { Checkbox } from '#/components/ui/checkbox'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '#/components/ui/hover-card'

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

export function ResumeSkillsSidebar({
  jobs,
  selectedTags,
  onToggle,
}: {
  jobs: Job[]
  selectedTags: string[]
  onToggle: (tag: string) => void
}) {
  const groupedSkills = useMemo(() => {
    const allTags = Array.from(new Set(jobs.flatMap((job) => job.tags))).sort()

    return Object.entries(skillCategories)
      .map(([category, categoryTags]) => ({
        category,
        tags: allTags.filter((tag) => categoryTags.includes(tag)),
      }))
      .filter((group) => group.tags.length > 0)
  }, [jobs])

  return (
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
                  onToggle={onToggle}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
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

function getSkillIcon(tag: string): { icon: Icon; color: string } {
  const normalizedTag = tag.toLowerCase()

  if (/^react$/.test(normalizedTag)) return { icon: Atom, color: '#61DAFB' }
  if (/typescript/.test(normalizedTag))
    return { icon: FileTs, color: '#3178C6' }
  if (/node\.?js|express/.test(normalizedTag)) {
    return { icon: FileJs, color: '#339933' }
  }
  if (/javascript/.test(normalizedTag))
    return { icon: FileJs, color: '#F7DF1E' }
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
  if (/azure|cloud/.test(normalizedTag))
    return { icon: Cloud, color: '#0078D4' }
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

export function SkillBadge({ tag }: { tag: string }) {
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
