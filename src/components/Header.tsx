import { Link } from '@tanstack/react-router'
import { EnvelopeSimple, LinkedinLogo } from '@phosphor-icons/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-xl">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <div className="order-3 flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-none sm:w-auto sm:flex-nowrap sm:pb-0">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Home
          </Link>
          <Link
            to="/resume"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Resume
          </Link>
          <Link
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <a
            href="mailto:dopoku.tech@gmail.com"
            aria-label="Email David Opoku"
            title="Email David Opoku"
            className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
          >
            <EnvelopeSimple aria-hidden="true" size={26} weight="regular" />
          </a>
          <a
            href="https://www.linkedin.com/in/david-o-7008721b7/"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block"
          >
            <span className="sr-only">David Opoku LinkedIn</span>
            <LinkedinLogo
              aria-hidden="true"
              size={28}
              weight="fill"
              className="text-[#0A66C2]"
            />
          </a>
        </div>
      </nav>
    </header>
  )
}
