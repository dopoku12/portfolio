import { useRef, useState } from 'react'

import { Link } from '@tanstack/react-router'
import {
  EnvelopeSimple,
  LinkedinLogo,
  List,
  X,
} from '@phosphor-icons/react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header
      className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-xl"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && mobileMenuOpen) {
          closeMobileMenu()
          menuButtonRef.current?.focus()
        }
      }}
    >
      <div className="page-wrap">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="rounded-lg text-lg font-bold tracking-tight text-[var(--sea-ink)] transition hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            David Opoku
          </Link>

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 text-sm font-semibold md:flex"
          >
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

            <span
              aria-hidden="true"
              className="mx-2 h-6 w-px bg-[var(--line)]"
            />

            <a
              href="mailto:dopoku.tech@gmail.com"
              aria-label="Email David Opoku"
              title="Email David Opoku"
              className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <EnvelopeSimple aria-hidden="true" size={24} weight="regular" />
            </a>
            <a
              href="https://www.linkedin.com/in/david-o-7008721b7/"
              target="_blank"
              rel="noreferrer"
              aria-label="David Opoku on LinkedIn (opens in a new tab)"
              title="LinkedIn"
              className="rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
            >
              <LinkedinLogo
                aria-hidden="true"
                size={26}
                weight="fill"
                className="text-[#0A66C2]"
              />
            </a>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-xl text-[var(--sea-ink)] transition hover:bg-[var(--link-bg-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)] md:hidden"
          >
            {mobileMenuOpen ? (
              <X aria-hidden="true" size={25} />
            ) : (
              <List aria-hidden="true" size={25} />
            )}
          </button>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          hidden={!mobileMenuOpen}
          className="border-t border-[var(--line)] py-3 md:hidden"
        >
          <div className="grid gap-1 text-base font-semibold">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="nav-link w-full"
              activeProps={{ className: 'nav-link is-active w-full' }}
            >
              Home
            </Link>
            <Link
              to="/resume"
              onClick={closeMobileMenu}
              className="nav-link w-full"
              activeProps={{ className: 'nav-link is-active w-full' }}
            >
              Resume
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className="nav-link w-full"
              activeProps={{ className: 'nav-link is-active w-full' }}
            >
              About
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-[var(--line)] pt-3">
            <a
              href="mailto:dopoku.tech@gmail.com"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            >
              <EnvelopeSimple aria-hidden="true" size={20} />
              Email
            </a>
            <a
              href="https://www.linkedin.com/in/david-o-7008721b7/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
            >
              <LinkedinLogo
                aria-hidden="true"
                size={20}
                weight="fill"
                className="text-[#0A66C2]"
              />
              LinkedIn
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
