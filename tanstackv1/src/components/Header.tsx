import { Link } from '@tanstack/react-router'
import { LinkedinLogo } from '@phosphor-icons/react'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 ">
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
            to="/about"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            About
          </Link>
          <a
            href="mailto:dopoku.tech@gmail.com"
            className="nav-link"
          >
            Contact
          </a>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <a
            href="https://linkedin.com/in/david-opoku-7008721b"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-xl p-2 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] sm:block"
          >
            <span className="sr-only">David Opoku LinkedIn</span>
            <LinkedinLogo
              aria-hidden="true"
              size={28}
              weight="fill"
              className="text-[var(--primary)]"
            />
          </a>
         
          
        </div>
      </nav>
    </header>
  )
}
