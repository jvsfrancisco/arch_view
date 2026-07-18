import { Link } from 'react-router-dom'
import { Plus, Camera, AlertTriangle, MapPin, ChevronRight, PenLine, ClipboardCheck } from 'lucide-react'
import { Card, Avatar, Badge } from '@/components/ui'
import { inspections, projects } from '@/data/mock'
import { formatDateLong, inspectionStatusMeta, coverGradient } from '@/lib/ui'

const stages = ['Demolição', 'Alvenaria', 'Gesso', 'Marcenaria', 'Iluminação']

export default function Inspections() {
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vistorias</h1>
          <p className="text-sm text-dim">O coração do sistema — registre visitas técnicas com checklist</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} /> Nova vistoria
        </button>
      </div>

      {/* New inspection quick card */}
      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-[1.2fr_1fr]">
          <div className="p-6">
            <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-blueprint-600">
              <ClipboardCheck size={14} /> Criar nova vistoria
            </div>
            <h2 className="text-lg font-bold tracking-tight">Registre uma visita técnica</h2>
            <p className="text-sm text-dim">Preencha os dados e conduza o checklist etapa por etapa.</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-dim">Data</label>
                <input type="date" className="input" defaultValue="2026-07-17" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-dim">Responsável</label>
                <select className="input"><option>Ana Ribeiro</option><option>Carlos Mendes</option></select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-dim">Etapa da obra</label>
                <select className="input">{stages.map((s) => <option key={s}>{s}</option>)}</select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-dim">Local</label>
                <input className="input" placeholder="Ex: Pav. Superior" />
              </div>
            </div>
            <button className="btn-primary mt-4">
              <PenLine size={15} /> Iniciar vistoria
            </button>
          </div>
          <div className="relative hidden md:block" style={{ background: 'linear-gradient(135deg,#1f45eb,#161d54)' }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="relative flex h-full flex-col justify-center gap-3 p-8 text-white">
              {stages.map((s, i) => (
                <div key={s} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-2.5 backdrop-blur">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white/20 text-xs font-bold">{i + 1}</span>
                  <span className="text-sm font-medium">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* History */}
      <div>
        <h2 className="mb-3 text-lg font-bold tracking-tight">Histórico de vistorias</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {inspections.map((v) => {
            const project = projects.find((p) => p.id === v.projectId)!
            const st = inspectionStatusMeta[v.status]
            const total = v.checklist.reduce((a, g) => a + g.items.length, 0)
            const done = v.checklist.reduce((a, g) => a + g.items.filter((i) => i.checked).length, 0)
            return (
              <Link key={v.id} to={`/vistorias/${v.id}`}>
                <Card className="group flex gap-4 p-4" hover>
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-xl text-white" style={{ background: coverGradient(project.cover) }}>
                    <div className="text-center leading-none">
                      <div className="text-lg font-bold">{new Date(v.date + 'T00:00').getDate()}</div>
                      <div className="text-[10px] uppercase">{new Date(v.date + 'T00:00').toLocaleDateString('pt-BR', { month: 'short' })}</div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate font-bold group-hover:text-blueprint-600 transition">{project.name}</p>
                      <Badge color={st.color} bg={st.bg}>{st.label}</Badge>
                    </div>
                    <p className="text-sm text-dim flex items-center gap-1"><MapPin size={12} /> {v.stage} · {v.location}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-dim">
                      <span className="flex items-center gap-1"><Camera size={14} /> {v.photos}</span>
                      <span className="flex items-center gap-1 text-clay-600"><AlertTriangle size={14} /> {v.issuesFound}</span>
                      <span className="flex items-center gap-1"><ClipboardCheck size={14} /> {done}/{total}</span>
                      <span className="ml-auto flex items-center gap-1"><Avatar initials="AR" color="#3563f6" size={20} /> {formatDateLong(v.date)}</span>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
