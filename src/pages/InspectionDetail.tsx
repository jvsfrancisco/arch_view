import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  Camera,
  AlertTriangle,
  FileText,
  PenTool,
  Circle,
  ArrowUpRight,
  Type,
  Undo2,
  Download,
  Sparkles,
  ClipboardCheck,
  MapPin,
  X,
} from 'lucide-react'
import { Card, Avatar, Badge, Progress } from '@/components/ui'
import { inspections, projects, photos } from '@/data/mock'
import { formatDateLong, inspectionStatusMeta, photoGradient } from '@/lib/ui'
import type { ChecklistGroup } from '@/data/types'
import clsx from 'clsx'

const markupTools = [
  { icon: PenTool, label: 'Desenhar' },
  { icon: Circle, label: 'Circular' },
  { icon: ArrowUpRight, label: 'Seta' },
  { icon: Type, label: 'Texto' },
]

export default function InspectionDetail() {
  const { id } = useParams()
  const inspection = inspections.find((i) => i.id === id)
  const [checklist, setChecklist] = useState<ChecklistGroup[]>(inspection?.checklist ?? [])
  const [tool, setTool] = useState('Circular')
  const [reportOpen, setReportOpen] = useState(false)

  if (!inspection) return <div className="text-dim">Vistoria não encontrada.</div>
  const project = projects.find((p) => p.id === inspection.projectId)!
  const st = inspectionStatusMeta[inspection.status]

  const total = checklist.reduce((a, g) => a + g.items.length, 0)
  const done = checklist.reduce((a, g) => a + g.items.filter((i) => i.checked).length, 0)
  const pct = Math.round((done / total) * 100)

  const toggle = (gi: number, ii: number) => {
    setChecklist((prev) =>
      prev.map((g, gx) =>
        gx !== gi ? g : { ...g, items: g.items.map((it, ix) => (ix !== ii ? it : { ...it, checked: !it.checked })) },
      ),
    )
  }

  const markupPhoto = photos.find((p) => p.hasMarkup)!
  const reportPhotos = photos.filter((p) => p.projectId === inspection.projectId && p.phase === 'durante')
  const pendingItems = checklist.flatMap((g) => g.items.filter((i) => !i.checked).map((i) => ({ group: g.title, ...i })))

  return (
    <div className="space-y-5">
      <Link to="/vistorias" className="inline-flex items-center gap-1.5 text-sm font-medium text-dim hover:text-body">
        <ArrowLeft size={16} /> Vistorias
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
            <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
          </div>
          <p className="mt-1 text-sm text-dim flex items-center gap-2 flex-wrap">
            <span className="flex items-center gap-1"><MapPin size={13} /> {inspection.stage} · {inspection.location}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Avatar initials="AR" color="#3563f6" size={18} /> {inspection.responsible}</span>
            <span>·</span>
            <span>{formatDateLong(inspection.date)}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-outline" onClick={() => setReportOpen(true)}>
            <FileText size={15} /> Gerar documento
          </button>
          <button className="btn-primary"><Check size={15} /> Concluir</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Checklist */}
        <div className="space-y-4 lg:col-span-2">
          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck size={18} className="text-blueprint-600" />
                <h2 className="font-bold tracking-tight">Checklist</h2>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-dim">{done}/{total}</span>
                <div className="w-24"><Progress value={pct} color={pct === 100 ? '#3f9d6b' : '#3563f6'} /></div>
              </div>
            </div>
            <div className="space-y-5">
              {checklist.map((group, gi) => (
                <div key={group.key}>
                  <p className="mb-2 text-xs font-bold uppercase tracking-widest text-dim">{group.title}</p>
                  <div className="space-y-2">
                    {group.items.map((item, ii) => (
                      <button
                        key={item.id}
                        onClick={() => toggle(gi, ii)}
                        className={clsx(
                          'flex w-full items-center gap-3 rounded-xl border p-3 text-left transition',
                          item.checked ? 'border-moss/40' : 'hover:border-blueprint-300',
                        )}
                        style={{ background: item.checked ? 'rgba(63,157,107,0.06)' : 'var(--surface-2)' }}
                      >
                        <span
                          className={clsx('grid h-5 w-5 shrink-0 place-items-center rounded-md border transition', item.checked && 'border-moss')}
                          style={{ background: item.checked ? '#3f9d6b' : 'transparent' }}
                        >
                          {item.checked && <Check size={13} className="text-white" strokeWidth={3} />}
                        </span>
                        <div className="flex-1">
                          <p className={clsx('text-sm font-medium', item.checked && 'text-dim line-through')}>{item.label}</p>
                          {item.note && <p className="text-xs text-clay-600 flex items-center gap-1 mt-0.5"><AlertTriangle size={11} /> {item.note}</p>}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Photo markup */}
          <Card className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PenTool size={18} className="text-clay-500" />
                <h2 className="font-bold tracking-tight">Marcação sobre foto</h2>
              </div>
              <span className="text-xs text-dim">{markupPhoto.location}</span>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {markupTools.map((t) => (
                <button
                  key={t.label}
                  onClick={() => setTool(t.label)}
                  className={clsx('flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition', tool === t.label ? 'border-blueprint-400 text-blueprint-600' : 'text-dim hover:text-body')}
                  style={{ background: tool === t.label ? 'rgba(53,99,246,0.08)' : 'var(--surface)' }}
                >
                  <t.icon size={15} /> {t.label}
                </button>
              ))}
              <button className="ml-auto flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm text-dim hover:text-body"><Undo2 size={15} /> Desfazer</button>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-2xl" style={{ background: photoGradient(markupPhoto.hue) }}>
              <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full">
                <ellipse cx="150" cy="110" rx="55" ry="42" fill="none" stroke="#ff3b6b" strokeWidth="3.5" />
                <path d="M300 60 L215 100" stroke="#ffd23f" strokeWidth="3.5" strokeLinecap="round" />
                <path d="M225 92 L215 100 L227 104" fill="none" stroke="#ffd23f" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="290" y="42" width="96" height="26" rx="6" fill="#161d54" opacity="0.9" />
                <text x="298" y="59" fill="#fff" fontSize="13" fontWeight="600" fontFamily="Inter">+5cm da cota</text>
              </svg>
              <div className="absolute bottom-3 left-3 rounded-lg bg-black/45 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {markupPhoto.comment}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <FileText size={18} className="text-blueprint-600" />
              <h2 className="font-bold tracking-tight">Diário de obra</h2>
              <span className="ml-auto text-xs text-dim">Automático</span>
            </div>
            <div className="relative space-y-4 pl-5">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border" style={{ background: 'var(--border)' }} />
              {[
                { t: '09:12', d: 'Vistoria iniciada por Ana Ribeiro' },
                { t: '09:34', d: `${inspection.photos} fotos registradas` },
                { t: '10:05', d: `${inspection.issuesFound} pendências geradas` },
                { t: '10:20', d: 'Observações adicionadas' },
                { t: '10:41', d: 'Relatório disponível' },
              ].map((e, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-5 top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-blueprint-500 dark:border-ink-900" />
                  <p className="font-mono text-xs text-blueprint-600">{e.t}</p>
                  <p className="text-sm">{e.d}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-dim">Observações</p>
            <p className="text-sm leading-relaxed">{inspection.notes}</p>
          </Card>

          <div className="relative overflow-hidden rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg,#6f291f,#dc5d33)' }}>
            <Sparkles size={18} className="mb-2" />
            <p className="font-bold">IA de Relatórios</p>
            <p className="mt-1 text-sm text-white/80">Transformar estas notas em relatório técnico profissional.</p>
            <button className="mt-3 rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30 transition">
              Gerar relatório com IA
            </button>
          </div>
        </div>
      </div>

      {reportOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" onClick={() => setReportOpen(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl shadow-lift"
            style={{ background: 'var(--surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <div>
                <h2 className="font-bold tracking-tight">Documento da vistoria</h2>
                <p className="text-sm text-dim">Montado a partir do checklist, das fotos e das observações</p>
              </div>
              <button className="text-dim hover:text-body" onClick={() => setReportOpen(false)} aria-label="Fechar">
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-5">
              <div className="border-b pb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-blueprint-600">Relatório de vistoria</p>
                <h3 className="mt-1 text-xl font-bold tracking-tight">{project.name}</h3>
                <p className="mt-1 text-sm text-dim">
                  {inspection.stage} · {inspection.location} · {formatDateLong(inspection.date)} · {inspection.responsible}
                </p>
              </div>

              <section className="border-b py-4">
                <h4 className="mb-3 text-sm font-bold">Checklist</h4>
                <p className="text-sm text-dim">
                  {done} de {total} itens verificados ({pct}%).
                  {pendingItems.length > 0 && ` ${pendingItems.length} item(ns) em aberto:`}
                </p>
                {pendingItems.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {pendingItems.map((item) => (
                      <li key={item.id} className="flex gap-2 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                        <span>
                          <b>{item.group}:</b> {item.label}
                          {item.note && <span className="text-dim"> — {item.note}</span>}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              <section className="border-b py-4">
                <h4 className="mb-3 text-sm font-bold">Registro fotográfico ({reportPhotos.length})</h4>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {reportPhotos.map((p) => (
                    <div key={p.id} className="overflow-hidden rounded-xl border">
                      <div className="relative aspect-[4/3]" style={{ background: photoGradient(p.hue) }}>
                        {p.hasMarkup && (
                          <>
                            <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full">
                              <ellipse cx="100" cy="75" rx="42" ry="32" fill="none" stroke="#ff3b6b" strokeWidth="3" />
                            </svg>
                            <span className="absolute right-1.5 top-1.5 rounded bg-clay-500 px-1.5 py-0.5 text-[9px] font-bold text-white">
                              Marcada
                            </span>
                          </>
                        )}
                      </div>
                      <div className="p-2">
                        <p className="text-xs font-semibold">{p.location}</p>
                        <p className="line-clamp-2 text-[11px] text-dim">{p.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="py-4">
                <h4 className="mb-2 text-sm font-bold">Observações</h4>
                <p className="text-sm leading-relaxed">{inspection.notes}</p>
              </section>
            </div>

            <div className="flex justify-end gap-2 border-t px-6 py-4">
              <button className="btn-ghost text-sm" onClick={() => setReportOpen(false)}>Fechar</button>
              <button className="btn-primary text-sm"><Download size={15} /> Exportar PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
