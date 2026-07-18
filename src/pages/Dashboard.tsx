import { Link } from 'react-router-dom'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts'
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  ListTodo,
  CalendarClock,
  Timer,
  ArrowUpRight,
  ArrowRight,
  Camera,
  MapPin,
  ClipboardCheck,
} from 'lucide-react'
import { Card, Avatar, AvatarStack, Progress, Badge } from '@/components/ui'
import { kpis, resolutionTrend, progressByProject, projects, inspections, photos, issues } from '@/data/mock'
import { coverGradient, photoGradient, formatDate, formatDateLong, issueStatusMeta, priorityMeta } from '@/lib/ui'

const kpiCards = [
  { key: 'a', label: 'Obras em andamento', value: kpis.emAndamento, icon: Building2, color: '#3563f6', trend: '+1 este mês' },
  { key: 'b', label: 'Obras concluídas', value: kpis.concluidas, icon: CheckCircle2, color: '#3f9d6b', trend: '2 no trimestre' },
  { key: 'c', label: 'Pendências abertas', value: kpis.pendenciasAbertas, icon: ListTodo, color: '#e0a411', trend: '-3 na semana' },
  { key: 'd', label: 'Pendências críticas', value: kpis.pendenciasCriticas, icon: AlertTriangle, color: '#e0446b', trend: 'Requer atenção' },
  { key: 'e', label: 'Próximas visitas', value: kpis.proximasVisitas, icon: CalendarClock, color: '#8b5cf6', trend: 'Próximos 7 dias' },
  { key: 'f', label: 'Prazo médio de resolução', value: `${kpis.prazoMedio}d`, icon: Timer, color: '#dc5d33', trend: '-0.6d vs. mês' },
]

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border px-3 py-2 text-xs shadow-lift" style={{ background: 'var(--surface)' }}>
      <p className="mb-1 font-semibold">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color ?? p.fill }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const lastInspection = inspections[0]
  const lastProject = projects.find((p) => p.id === lastInspection.projectId)!
  const nextProject = projects[1]
  const recentPhotos = photos.slice(0, 5)
  const criticalIssues = issues.filter((i) => i.priority === 'critica' && i.status !== 'concluida')

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl p-6 text-white sm:p-8" style={{ background: 'linear-gradient(120deg,#161d54,#1f45eb 60%,#3563f6)' }}>
        <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/70">Sexta-feira, {formatDateLong('2026-07-17')}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Bom dia, Ana 👋</h1>
            <p className="mt-1 max-w-lg text-sm text-white/80">
              Você tem <b className="text-white">{kpis.pendenciasCriticas} pendências críticas</b> e{' '}
              <b className="text-white">{kpis.proximasVisitas} visitas</b> agendadas para esta semana.
            </p>
          </div>
          <div className="flex gap-2">
            <Link to="/vistorias" className="rounded-xl bg-white/15 px-4 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/25">
              Ver agenda
            </Link>
            <Link to="/pendencias" className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blueprint-800 transition hover:bg-white/90">
              Pendências críticas
            </Link>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 stagger md:grid-cols-3 xl:grid-cols-6">
        {kpiCards.map((k) => (
          <Card key={k.key} className="p-4" hover>
            <div className="flex items-center justify-between">
              <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: `${k.color}18`, color: k.color }}>
                <k.icon size={18} />
              </div>
              <ArrowUpRight size={15} className="text-dim" />
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">{k.value}</div>
            <div className="mt-0.5 text-xs font-medium text-dim">{k.label}</div>
            <div className="mt-2 text-[11px] font-semibold" style={{ color: k.color }}>
              {k.trend}
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold tracking-tight">Pendências: abertas vs. resolvidas</h2>
              <p className="text-sm text-dim">Últimos 6 meses</p>
            </div>
            <Badge color="#2f7a52" bg="rgba(63,157,107,0.14)">
              88% de resolução
            </Badge>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={resolutionTrend} margin={{ left: -20, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3563f6" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#3563f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gB" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3f9d6b" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#3f9d6b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} />
                <Tooltip content={<ChartTooltip />} />
                <Area type="monotone" dataKey="abertas" name="Abertas" stroke="#3563f6" strokeWidth={2.5} fill="url(#gA)" />
                <Area type="monotone" dataKey="resolvidas" name="Resolvidas" stroke="#3f9d6b" strokeWidth={2.5} fill="url(#gB)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="font-bold tracking-tight">Progresso por obra</h2>
          <p className="text-sm text-dim">Execução atual</p>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progressByProject} layout="vertical" margin={{ left: 8, right: 24 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={72} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--surface-2)' }} />
                <Bar dataKey="progresso" name="Progresso" radius={[0, 8, 8, 0]} fill="#3563f6" barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Cards row: última / próxima vistoria + fotos */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Última vistoria */}
        <Card className="overflow-hidden" hover>
          <div className="h-24" style={{ background: coverGradient(lastProject.cover) }} />
          <div className="p-5">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-dim">
              <ClipboardCheck size={14} /> Última vistoria
            </div>
            <h3 className="font-bold tracking-tight">{lastProject.name}</h3>
            <p className="text-sm text-dim">{lastInspection.stage} · {lastInspection.location}</p>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar initials="AR" color="#3563f6" size={28} />
                <span className="text-sm font-medium">{lastInspection.responsible}</span>
              </div>
              <span className="text-sm text-dim">{formatDate(lastInspection.date)}</span>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-dim"><Camera size={14} /> {lastInspection.photos} fotos</span>
              <span className="flex items-center gap-1.5 text-clay-600"><AlertTriangle size={14} /> {lastInspection.issuesFound} pendências</span>
            </div>
            <Link to={`/vistorias/${lastInspection.id}`} className="btn-outline mt-4 w-full">
              Abrir relatório <ArrowRight size={15} />
            </Link>
          </div>
        </Card>

        {/* Próxima vistoria */}
        <Card className="p-5" hover>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-dim">
            <CalendarClock size={14} /> Próxima vistoria
          </div>
          <div className="rounded-2xl border p-4" style={{ background: 'var(--surface-2)' }}>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-xl text-white" style={{ background: coverGradient(nextProject.cover) }}>
                <span className="text-lg font-bold">21</span>
              </div>
              <div>
                <p className="font-bold">{nextProject.name}</p>
                <p className="text-sm text-dim flex items-center gap-1"><MapPin size={13} /> {nextProject.city}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
              <div className="rounded-lg bg-white/60 px-3 py-2 dark:bg-white/5">
                <p className="text-xs text-dim">Etapa</p>
                <p className="font-semibold">Instalações</p>
              </div>
              <div className="rounded-lg bg-white/60 px-3 py-2 dark:bg-white/5">
                <p className="text-xs text-dim">Horário</p>
                <p className="font-semibold">09:30</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-dim">Equipe presente</p>
            <div className="flex items-center justify-between">
              <AvatarStack people={nextProject.team.map((t) => ({ initials: t.initials, color: t.avatarColor }))} />
              <button className="btn-ghost text-sm">Reagendar</button>
            </div>
          </div>
        </Card>

        {/* Últimas fotos */}
        <Card className="p-5" hover>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-dim">
              <Camera size={14} /> Últimas fotos enviadas
            </div>
            <Link to="/registro" className="text-xs font-semibold text-blueprint-600">Ver todas</Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recentPhotos.slice(0, 6).map((p) => (
              <div key={p.id} className="group relative aspect-square overflow-hidden rounded-xl" style={{ background: photoGradient(p.hue) }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="absolute bottom-1 left-1.5 right-1 text-[10px] font-semibold text-white opacity-0 transition group-hover:opacity-100">
                  {p.location}
                </div>
                {p.hasMarkup && <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-clay-400 ring-2 ring-white/50" />}
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed p-3 text-center text-sm text-dim">
            <b className="text-body">{photos.length} registros</b> nas últimas vistorias
          </div>
        </Card>
      </div>

      {/* Critical issues strip */}
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-rose2" />
            <h2 className="font-bold tracking-tight">Pendências críticas</h2>
          </div>
          <Link to="/pendencias" className="text-sm font-semibold text-blueprint-600">Ver quadro</Link>
        </div>
        <div className="space-y-2">
          {criticalIssues.map((i) => {
            const s = issueStatusMeta[i.status]
            return (
              <div key={i.id} className="flex flex-wrap items-center gap-3 rounded-xl border p-3 transition hover:border-blueprint-300" style={{ background: 'var(--surface-2)' }}>
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: '#e0446b' }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{i.title}</p>
                  <p className="text-sm text-dim">{projects.find((p) => p.id === i.projectId)?.name} · {i.location}</p>
                </div>
                <Badge color={priorityMeta[i.priority].color} bg={priorityMeta[i.priority].bg}>{priorityMeta[i.priority].label}</Badge>
                <Badge color={s.color} bg={s.bg} dot={s.dot}>{s.label}</Badge>
                <div className="flex items-center gap-2">
                  <Avatar initials={i.assigneeInitials} color={i.assigneeColor} size={26} />
                  <span className="hidden text-sm font-medium sm:block">{i.assignee}</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
