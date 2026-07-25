import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  MapPin,
  Ruler,
  Calendar,
  Heart,
  MessageCircle,
  Play,
  Mic,
  Camera,
  Layers,
  GitCompareArrows,
  Mail,
  Phone,
  Ban,
  Image as ImageIcon,
} from 'lucide-react'
import { Card, Avatar, AvatarStack, Progress, Badge, Ring } from '@/components/ui'
import { projects, timeline, issues, inspections, photos } from '@/data/mock'
import type { MediaPhase } from '@/data/types'
import { coverGradient, photoGradient, formatDateLong, formatDate, priorityMeta, issueStatusMeta } from '@/lib/ui'
import clsx from 'clsx'

const tabs = ['Visão geral', 'Timeline', 'Mídia', 'Cliente', 'Equipe', 'Projeto × Executado'] as const
type Tab = (typeof tabs)[number]

const mediaSections: { phase: MediaPhase; title: string; description: string }[] = [
  { phase: 'antes', title: 'Antes do projeto', description: 'Registro do espaço original, feito no levantamento inicial' },
  { phase: 'durante', title: 'Relatórios fotográficos', description: 'Fotos das vistorias durante a execução' },
  { phase: 'depois', title: 'Projeto concluído', description: 'Registro final da obra entregue' },
]

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  const [tab, setTab] = useState<Tab>('Visão geral')

  if (!project) return <div className="text-dim">Projeto não encontrado.</div>

  const posts = timeline.filter((t) => t.projectId === project.id)
  const projectIssues = issues.filter((i) => i.projectId === project.id)
  const projectInspections = inspections.filter((i) => i.projectId === project.id)
  const crew = project.team.filter((m) => m.role !== 'Cliente')
  const client = project.clientProfile
  const projectPhotos = photos.filter((p) => p.projectId === project.id)

  return (
    <div className="space-y-5">
      <Link to="/projetos" className="inline-flex items-center gap-1.5 text-sm font-medium text-dim hover:text-body">
        <ArrowLeft size={16} /> Projetos
      </Link>

      {/* Cover header */}
      <Card className="overflow-hidden">
        <div className="relative h-40 sm:h-48" style={{ background: coverGradient(project.cover) }}>
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <span className="rounded-lg bg-black/25 px-2.5 py-1 text-xs font-semibold backdrop-blur">{project.type}</span>
              <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
              <p className="text-sm text-white/85">{project.client}</p>
            </div>
            <Ring value={project.progress} size={72} stroke={6} color="#fff" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-px sm:grid-cols-4" style={{ background: 'var(--border)' }}>
          {[
            { icon: MapPin, label: 'Endereço', value: project.address },
            { icon: Ruler, label: 'Área', value: `${project.area} m²` },
            { icon: Calendar, label: 'Início', value: formatDate(project.startDate) },
            { icon: Calendar, label: 'Entrega', value: formatDate(project.deadline) },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-3 p-4" style={{ background: 'var(--surface)' }}>
              <m.icon size={18} className="text-blueprint-500" />
              <div className="min-w-0">
                <p className="text-xs text-dim">{m.label}</p>
                <p className="truncate text-sm font-semibold">{m.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={clsx(
              'relative whitespace-nowrap px-4 py-2.5 text-sm font-semibold transition',
              tab === t ? 'text-blueprint-600' : 'text-dim hover:text-body',
            )}
          >
            {t}
            {tab === t && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-blueprint-600" />}
          </button>
        ))}
      </div>

      {tab === 'Visão geral' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card className="p-5">
              <h2 className="mb-4 font-bold tracking-tight">Etapas da obra</h2>
              <div className="space-y-3">
                {project.stages.map((s) => (
                  <div key={s.key} className="flex items-center gap-3">
                    <span className="w-24 shrink-0 text-sm font-medium">{s.label}</span>
                    <Progress value={s.progress} color={s.progress === 100 ? '#3f9d6b' : '#3563f6'} />
                    <span className="w-10 shrink-0 text-right text-sm font-semibold text-dim">{s.progress}%</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="font-bold tracking-tight">Pendências recentes</h2>
                <Link to="/pendencias" className="text-sm font-semibold text-blueprint-600">Ver todas</Link>
              </div>
              <div className="space-y-2">
                {projectIssues.slice(0, 4).map((i) => {
                  const s = issueStatusMeta[i.status]
                  return (
                    <div key={i.id} className="flex items-center gap-3 rounded-xl border p-3" style={{ background: 'var(--surface-2)' }}>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{i.title}</p>
                        <p className="text-xs text-dim">{i.location}</p>
                      </div>
                      <Badge color={priorityMeta[i.priority].color} bg={priorityMeta[i.priority].bg}>{priorityMeta[i.priority].label}</Badge>
                      <Badge color={s.color} bg={s.bg} dot={s.dot}>{s.label}</Badge>
                    </div>
                  )
                })}
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <h2 className="mb-3 font-bold tracking-tight">Resumo</h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Vistorias', value: projectInspections.length, color: '#3563f6' },
                  { label: 'Pendências', value: project.openIssues, color: '#e0a411' },
                  { label: 'Críticas', value: project.criticalIssues, color: '#e0446b' },
                  { label: 'Fotos', value: 42, color: '#8b5cf6' },
                ].map((s) => (
                  <div key={s.label} className="rounded-xl border p-3" style={{ background: 'var(--surface-2)' }}>
                    <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
                    <div className="text-xs text-dim">{s.label}</div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <h2 className="mb-3 font-bold tracking-tight">Equipe</h2>
              <div className="space-y-2.5">
                {crew.map((m) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <Avatar initials={m.initials} color={m.avatarColor} size={34} />
                    <div>
                      <p className="text-sm font-semibold">{m.name}</p>
                      <p className="text-xs text-dim">{m.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'Timeline' && (
        <div className="mx-auto max-w-xl space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden" hover>
              <div className="flex items-center gap-3 p-4">
                <Avatar initials={post.authorInitials} color={post.authorColor} size={40} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-dim flex items-center gap-1"><MapPin size={11} /> {post.location} · {formatDateLong(post.date)}</p>
                </div>
                <Badge color="#1f45eb" bg="rgba(53,99,246,0.12)">{post.stage}</Badge>
              </div>

              <div className={clsx('grid gap-0.5', post.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
                {post.media.map((m, i) => (
                  <div key={i} className={clsx('relative aspect-[4/3]', post.media.length === 3 && i === 0 && 'col-span-2')} style={{ background: photoGradient(m.hue) }}>
                    {m.type !== 'photo' && (
                      <div className="absolute inset-0 grid place-items-center">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-black/40 text-white backdrop-blur">
                          {m.type === 'video' ? <Play size={20} fill="white" /> : <Mic size={20} />}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-4">
                <p className="text-sm leading-relaxed">{post.text}</p>
                <div className="mt-3 flex items-center gap-4 text-sm text-dim">
                  <button className="flex items-center gap-1.5 hover:text-rose2 transition"><Heart size={16} /> {post.likes}</button>
                  <button className="flex items-center gap-1.5 hover:text-blueprint-600 transition"><MessageCircle size={16} /> {post.comments}</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Mídia' && (
        <div className="space-y-5">
          {mediaSections.map((section) => {
            const shots = projectPhotos.filter((p) => p.phase === section.phase)
            return (
              <Card key={section.phase} className="p-5">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="font-bold tracking-tight">{section.title}</h2>
                    <p className="text-sm text-dim">{section.description}</p>
                  </div>
                  <Badge color="#1f45eb" bg="rgba(53,99,246,0.12)">{shots.length} registro(s)</Badge>
                </div>

                {shots.length === 0 ? (
                  <div className="rounded-xl border border-dashed p-6 text-center">
                    <ImageIcon size={20} className="mx-auto mb-2 text-dim" />
                    <p className="text-sm text-dim">Nenhum registro nesta fase ainda.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {shots.map((p) => (
                      <div key={p.id} className="overflow-hidden rounded-xl border">
                        <div className="relative aspect-square" style={{ background: photoGradient(p.hue) }}>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2.5 right-2 text-white">
                            <p className="text-sm font-bold leading-tight">{p.location}</p>
                            <p className="text-[11px] opacity-80">{p.stage}</p>
                          </div>
                        </div>
                        <div className="p-2.5">
                          <p className="line-clamp-2 text-xs text-dim">{p.comment}</p>
                          <p className="mt-1.5 text-[11px] text-dim">{formatDate(p.date)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )
          })}

          <Card className="flex flex-wrap items-center gap-3 p-4">
            <div className="flex-1">
              <p className="font-bold">Registro fotográfico geral</p>
              <p className="text-sm text-dim">Veja as fotos de todas as obras em um só lugar.</p>
            </div>
            <Link to="/registro" className="btn-outline text-sm">Abrir registro</Link>
          </Card>
        </div>
      )}

      {tab === 'Cliente' && (
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <Card className="p-5">
              <h2 className="mb-4 font-bold tracking-tight">Briefing</h2>
              <dl className="space-y-3">
                {client.briefing.map((b) => (
                  <div key={b.label} className="rounded-xl border p-3.5" style={{ background: 'var(--surface-2)' }}>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-dim">{b.label}</dt>
                    <dd className="mt-1 text-sm leading-relaxed">{b.value}</dd>
                  </div>
                ))}
              </dl>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="p-5">
                <h2 className="mb-3 flex items-center gap-2 font-bold tracking-tight">
                  <Heart size={16} className="text-blueprint-600" /> Preferências
                </h2>
                <ul className="space-y-2">
                  {client.preferences.map((p) => (
                    <li key={p} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blueprint-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="p-5">
                <h2 className="mb-3 flex items-center gap-2 font-bold tracking-tight">
                  <Ban size={16} className="text-clay-500" /> Restrições
                </h2>
                <ul className="space-y-2">
                  {client.restrictions.map((r) => (
                    <li key={r} className="flex gap-2 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="p-5">
              <h2 className="mb-3 font-bold tracking-tight">Contato</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold">{client.name}</p>
                  <p className="text-xs text-dim">{client.contactName}</p>
                </div>
                <a href={`mailto:${client.email}`} className="flex items-center gap-2.5 text-sm hover:text-blueprint-600">
                  <Mail size={15} className="shrink-0 text-dim" />
                  <span className="truncate">{client.email}</span>
                </a>
                <a href={`tel:${client.phone.replace(/\D/g, '')}`} className="flex items-center gap-2.5 text-sm hover:text-blueprint-600">
                  <Phone size={15} className="shrink-0 text-dim" />
                  {client.phone}
                </a>
                <p className="flex items-center gap-2.5 text-sm text-dim">
                  <Calendar size={15} className="shrink-0" />
                  Cliente desde {formatDate(client.since)}
                </p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline flex-1 text-sm">Mensagem</button>
                <Link to="/cliente" className="btn-ghost text-sm">Portal</Link>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="mb-2 font-bold tracking-tight">Observações</h2>
              <p className="text-sm leading-relaxed text-dim">{client.notes}</p>
            </Card>
          </div>
        </div>
      )}

      {tab === 'Equipe' && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {crew.map((m) => (
            <Card key={m.id} className="p-5" hover>
              <div className="flex items-center gap-3">
                <Avatar initials={m.initials} color={m.avatarColor} size={48} />
                <div>
                  <p className="font-bold">{m.name}</p>
                  <Badge color={m.avatarColor} bg={`${m.avatarColor}18`}>{m.role}</Badge>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-outline flex-1 text-sm">Mensagem</button>
                <button className="btn-ghost text-sm">Perfil</button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === 'Projeto × Executado' && (
        <div className="space-y-4">
          <Card className="flex flex-wrap items-center gap-3 p-4">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-blueprint-50 text-blueprint-600 dark:bg-blueprint-950">
              <GitCompareArrows size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Comparação Projeto × Executado</p>
              <p className="text-sm text-dim">Sobreponha a planta ao registro fotográfico para conferência.</p>
            </div>
            <Badge color="#a06a00" bg="rgba(224,164,17,0.15)">Premium</Badge>
          </Card>
          {[
            { room: 'Cozinha', hue: 160, note: 'Ponto hidráulico deslocado 12cm' },
            { room: 'Banheiro Suíte', hue: 200, note: 'Nicho 5cm acima da cota' },
          ].map((c) => (
            <Card key={c.room} className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-bold">{c.room}</h3>
                <Badge color="#a93520" bg="rgba(220,93,51,0.14)">Divergência</Badge>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-dim"><Layers size={13} /> Projeto</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border bg-white dark:bg-ink-950">
                    <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(53,99,246,0.25) 1px,transparent 1px),linear-gradient(90deg,rgba(53,99,246,0.25) 1px,transparent 1px)', backgroundSize: '18px 18px' }} />
                    <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
                      <rect x="20" y="20" width="160" height="110" fill="none" stroke="#1f45eb" strokeWidth="2" />
                      <line x1="20" y1="80" x2="120" y2="80" stroke="#1f45eb" strokeWidth="1.5" />
                      <rect x="120" y="20" width="60" height="60" fill="none" stroke="#dc5d33" strokeWidth="1.5" strokeDasharray="4 3" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-dim"><Camera size={13} /> Executado</p>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl" style={{ background: photoGradient(c.hue) }}>
                    <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-black/45 px-2.5 py-1.5 text-xs font-medium text-white backdrop-blur">
                      {c.note}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
