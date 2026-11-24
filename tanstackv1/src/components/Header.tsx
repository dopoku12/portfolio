import { Link } from '@tanstack/react-router'


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
            <svg viewBox="0 0 24 24" aria-hidden="true" width="24" height="24" fill="navy">
              <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.38a1.56 1.56 0 0 1 0 3.12ZM5.5 9.75h2.86v9.25H5.5V9.75Zm4.68 0h2.74v1.27h.04c.38-.72 1.32-1.48 2.71-1.48 2.9 0 3.43 1.9 3.43 4.38v5.08h-2.86v-4.74c0-1.13-.02-2.58-1.57-2.58-1.58 0-1.82 1.23-1.82 2.5v4.82H10.18V9.75Z" />
            </svg>
          </a>
         
          
        </div>
      </nav>
    </header>
  )
}
