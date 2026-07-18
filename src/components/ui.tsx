import type { ReactNode } from 'react'
import clsx from 'clsx'

export function Avatar({
  initials,
  color,
  size = 32,
  ring,
}: {
  initials: string
  color: string
  size?: number
  ring?: boolean
}) {
  return (
    <div
      className={clsx('flex items-center justify-center rounded-full font-semibold text-white shrink-0', ring && 'ring-2 ring-white dark:ring-ink-900')}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}, ${color}cc)`,
        fontSize: size * 0.36,
      }}
    >
      {initials}
    </div>
  )
}

export function AvatarStack({ people, max = 4 }: { people: { initials: string; color: string }[]; max?: number }) {
  const shown = people.slice(0, max)
  const extra = people.length - max
  return (
    <div className="flex items-center">
      {shown.map((p, i) => (
        <div key={i} style={{ marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i }}>
          <Avatar initials={p.initials} color={p.color} size={30} ring />
        </div>
      ))}
      {extra > 0 && (
        <div
          className="flex items-center justify-center rounded-full text-xs font-semibold ring-2 ring-white dark:ring-ink-900"
          style={{ width: 30, height: 30, marginLeft: -10, background: 'var(--surface-2)', color: 'var(--text-muted)' }}
        >
          +{extra}
        </div>
      )}
    </div>
  )
}

export function Badge({
  children,
  color,
  bg,
  dot,
}: {
  children: ReactNode
  color: string
  bg: string
  dot?: string
}) {
  return (
    <span className="chip" style={{ color, background: bg }}>
      {dot && <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot }} />}
      {children}
    </span>
  )
}

export function Progress({ value, color = '#3563f6', height = 8 }: { value: number; color?: string; height?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-full" style={{ height, background: 'var(--surface-2)' }}>
      <div
        className="h-full rounded-full transition-all duration-700"
        style={{ width: `${value}%`, background: `linear-gradient(90deg, ${color}, ${color}cc)` }}
      />
    </div>
  )
}

export function Ring({ value, size = 56, stroke = 5, color = '#3563f6' }: { value: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface-2)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (value / 100) * c}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold">{value}%</div>
    </div>
  )
}

export function Card({ children, className, hover }: { children: ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={clsx('card', hover && 'transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift', className)}>
      {children}
    </div>
  )
}

export function SectionTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-lg font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-0.5 text-sm text-dim">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function EmptyState({ icon, title, hint }: { icon: ReactNode; title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-14 text-center">
      <div className="mb-3 text-ink-300">{icon}</div>
      <p className="font-semibold">{title}</p>
      {hint && <p className="mt-1 text-sm text-dim">{hint}</p>}
    </div>
  )
}
