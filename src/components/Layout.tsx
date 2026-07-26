import { useEffect, useRef, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  FolderKanban,
  ClipboardCheck,
  Images,
  KanbanSquare,
  CalendarRange,
  FileText,
  Users,
  Sparkles,
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Plus,
} from 'lucide-react'
import clsx from 'clsx'
import { useTheme } from '@/lib/theme'
import { Avatar } from './ui'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/vistorias', label: 'Vistorias', icon: ClipboardCheck },
  { to: '/registro', label: 'Registro Fotográfico', icon: Images },
  { to: '/pendencias', label: 'Pendências', icon: KanbanSquare },
  { to: '/cronograma', label: 'Cronograma', icon: CalendarRange },
  { to: '/relatorios', label: 'Relatórios', icon: FileText },
  { to: '/cliente', label: 'Área do Cliente', icon: Users },
]

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'linear-gradient(135deg,#1c2d8a,#161d54)' }}>
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path d="M8 23L16 8L24 23" stroke="#598dff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11.5 23L16 14.5L20.5 23" stroke="#e57e57" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="leading-none">
        <div className="font-bold tracking-tight text-[15px]">
          Gest<span style={{ color: '#3563f6' }}>io</span>
        </div>
        <div className="text-[10px] font-medium uppercase tracking-widest text-dim">Obras & Projetos</div>
      </div>
    </div>
  )
}

const newOptions = [
  { label: 'Novo projeto', description: 'Cadastrar uma obra', icon: FolderKanban },
  { label: 'Novo relatório fotográfico', description: 'Registro de fotos da obra', icon: Images },
  { label: 'Nova vistoria', description: 'Checklist em campo', icon: ClipboardCheck },
]

function NewButton({ onSelect }: { onSelect?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button className="btn-primary w-full" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <Plus size={16} /> Novo
      </button>

      {open && (
        <div
          role="menu"
          className="absolute inset-x-0 top-full z-40 mt-1.5 overflow-hidden rounded-xl border shadow-lg"
          style={{ background: 'var(--surface)' }}
        >
          {newOptions.map((option) => (
            <button
              key={option.label}
              role="menuitem"
              onClick={() => {
                setOpen(false)
                onSelect?.()
              }}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-blueprint-50 dark:hover:bg-blueprint-950"
            >
              <option.icon size={17} className="shrink-0 text-blueprint-600" />
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{option.label}</span>
                <span className="block truncate text-xs text-dim">{option.description}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>

      <div className="px-3">
        <NewButton onSelect={onNavigate} />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-widest text-dim">Menu</p>
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) => clsx('nav-link', isActive && 'active')}
          >
            <item.icon size={18} strokeWidth={2} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3">
        <div className="relative overflow-hidden rounded-2xl p-4 text-white" style={{ background: 'linear-gradient(135deg,#1f45eb,#1c2d8a)' }}>
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />
          <Sparkles size={18} className="mb-2 text-clay-200" />
          <p className="text-sm font-bold leading-tight">Genie</p>
          <p className="mt-1 text-xs text-white/70">Análise automática de fotos e relatórios técnicos.</p>
          <button className="mt-3 rounded-lg bg-white/15 px-3 py-1.5 text-xs font-semibold backdrop-blur hover:bg-white/25 transition">
            Experimentar
          </button>
        </div>
      </div>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { theme, toggle } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const current = nav.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to) && n.to !== '/'))

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r lg:block" style={{ background: 'var(--surface)' }}>
        <Sidebar />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r shadow-2xl" style={{ background: 'var(--surface)' }}>
            <button className="absolute right-3 top-4 text-dim" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-20 border-b backdrop-blur-xl" style={{ background: 'color-mix(in srgb, var(--surface) 80%, transparent)' }}>
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button className="lg:hidden text-dim" onClick={() => setMobileOpen(true)}>
              <Menu size={22} />
            </button>
            <div className="hidden sm:block">
              <h1 className="text-[15px] font-bold tracking-tight">{current?.label ?? 'Dashboard'}</h1>
            </div>

            <div className="relative ml-auto hidden md:block">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dim" />
              <input
                placeholder="Buscar obras, pendências…"
                className="input w-64 pl-9"
                style={{ paddingTop: 8, paddingBottom: 8 }}
              />
            </div>

            <button onClick={toggle} className="grid h-10 w-10 place-items-center rounded-xl border text-dim transition hover:text-body" style={{ background: 'var(--surface)' }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className="relative grid h-10 w-10 place-items-center rounded-xl border text-dim transition hover:text-body" style={{ background: 'var(--surface)' }}>
              <Bell size={18} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full ring-2 ring-white dark:ring-ink-900" style={{ background: '#dc5d33' }} />
            </button>
            <div className="flex items-center gap-2 pl-1">
              <Avatar initials="AR" color="#3563f6" size={38} />
              <div className="hidden leading-tight lg:block">
                <div className="text-sm font-semibold">Ana Ribeiro</div>
                <div className="text-xs text-dim">Escritório Pro</div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 lg:py-8">{children}</main>
      </div>
    </div>
  )
}
