import { useState } from 'react'
import { FileText, Download, Check, PenLine, Sparkles, CalendarDays, Building2, Image as ImageIcon } from 'lucide-react'
import { Card, Badge, Avatar } from '@/components/ui'
import { projects } from '@/data/mock'
import clsx from 'clsx'

const reportTypes = [
  { key: 'semanal', label: 'Relatório Semanal', desc: 'Resumo de avanços e pendências da semana', color: '#3563f6' },
  { key: 'mensal', label: 'Relatório Mensal', desc: 'Consolidado de execução e medições', color: '#8b5cf6' },
  { key: 'final', label: 'Relatório Final', desc: 'Entrega e checklist completo da obra', color: '#3f9d6b' },
]

const sections = ['Logo do escritório', 'Fotos da vistoria', 'Pendências', 'Checklist', 'Assinatura']

export default function Reports() {
  const [selected, setSelected] = useState('semanal')
  const [signed, setSigned] = useState(false)

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
        <p className="text-sm text-dim">Gere PDFs profissionais com um clique</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {reportTypes.map((r) => (
          <button key={r.key} onClick={() => setSelected(r.key)} className="text-left">
            <Card className={clsx('h-full p-5 transition', selected === r.key && 'ring-2')} hover>
              <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${r.color}18`, color: r.color }}>
                <FileText size={22} />
              </div>
              <p className="font-bold">{r.label}</p>
              <p className="mt-0.5 text-sm text-dim">{r.desc}</p>
            </Card>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        {/* Config */}
        <div className="space-y-4">
          <Card className="p-5">
            <h2 className="mb-4 font-bold tracking-tight">Configurar relatório</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-semibold text-dim">Projeto</label>
                <select className="input">{projects.map((p) => <option key={p.id}>{p.name}</option>)}</select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-dim">De</label>
                  <input type="date" className="input" defaultValue="2026-07-10" />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-dim">Até</label>
                  <input type="date" className="input" defaultValue="2026-07-17" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold text-dim">Incluir no PDF</p>
              <div className="space-y-1.5">
                {sections.map((s, i) => (
                  <label key={s} className="flex items-center gap-2.5 rounded-lg px-1 py-1 text-sm cursor-pointer">
                    <span className="grid h-5 w-5 place-items-center rounded-md bg-blueprint-600 text-white">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {s}
                  </label>
                ))}
              </div>
            </div>
          </Card>

          <div className="relative overflow-hidden rounded-2xl p-5 text-white" style={{ background: 'linear-gradient(135deg,#1c2d8a,#1f45eb)' }}>
            <Sparkles size={18} className="mb-2 text-clay-200" />
            <p className="font-bold">IA de Relatórios</p>
            <p className="mt-1 text-sm text-white/80">Transforme notas rápidas em relatório técnico profissional automaticamente.</p>
            <button className="mt-3 rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30 transition">
              Redigir com IA
            </button>
          </div>
        </div>

        {/* Preview */}
        <Card className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold tracking-tight">Pré-visualização</h2>
            <button className="btn-primary text-sm"><Download size={15} /> Baixar PDF</button>
          </div>
          <div className="rounded-2xl border bg-white p-6 text-ink-900 shadow-soft dark:bg-ink-50">
            {/* Letterhead */}
            <div className="flex items-center justify-between border-b border-ink-200 pb-3">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: '#161d54' }}>
                  <svg width="16" height="16" viewBox="0 0 32 32"><path d="M8 23L16 8L24 23" stroke="#598dff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold leading-none">Ateliê Ana Ribeiro</p>
                  <p className="text-[10px] text-ink-500">Arquitetura & Interiores</p>
                </div>
              </div>
              <div className="text-right text-[10px] text-ink-500">
                <p className="font-semibold text-ink-700">{reportTypes.find((r) => r.key === selected)?.label}</p>
                <p>10–17 Jul 2026</p>
              </div>
            </div>

            <h3 className="mt-4 text-base font-bold">Residência Villa Aurora</h3>
            <p className="text-xs text-ink-500">Marina Duarte · São Paulo · SP</p>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              {[24, 210, 40, 160].map((h, i) => (
                <div key={i} className="aspect-video rounded-lg" style={{ background: `linear-gradient(150deg, hsl(${h} 45% 62%), hsl(${(h + 30) % 360} 40% 40%))` }} />
              ))}
            </div>

            <div className="mt-3 space-y-1.5">
              <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Pendências da semana</p>
              {['Reposicionar ponto hidráulico', 'Diferença de tonalidade porcelanato'].map((p, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-ink-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-clay-500" /> {p}
                </div>
              ))}
            </div>

            {/* Signature */}
            <div className="mt-5 flex items-end justify-between border-t border-ink-200 pt-4">
              <div>
                <div className={clsx('h-10 w-40 border-b-2 border-ink-300', signed && 'border-blueprint-500')}>
                  {signed && <span className="font-mono text-lg italic text-blueprint-700" style={{ fontFamily: 'cursive' }}>Ana Ribeiro</span>}
                </div>
                <p className="mt-1 text-[10px] text-ink-500">Arquiteta Responsável · CAU 12345-6</p>
              </div>
              <button
                onClick={() => setSigned((s) => !s)}
                className={clsx('flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition', signed ? 'bg-moss text-white' : 'bg-blueprint-600 text-white')}
              >
                {signed ? <><Check size={13} /> Assinado</> : <><PenLine size={13} /> Assinar</>}
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Digital signature workflow */}
      <Card className="p-5">
        <h2 className="mb-4 font-bold tracking-tight">Assinatura Digital</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: 'Aprovação de etapa', s: 'Gesso — Pav. Superior', done: true },
            { t: 'Aprovação de medição', s: 'Medição #3 — Jul/2026', done: true },
            { t: 'Recebimento da vistoria', s: 'Vistoria 15/07', done: false },
          ].map((a) => (
            <div key={a.t} className="rounded-2xl border p-4" style={{ background: 'var(--surface-2)' }}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold">{a.t}</p>
                {a.done ? <Badge color="#2f7a52" bg="rgba(63,157,107,0.14)"><Check size={12} /> Assinado</Badge> : <Badge color="#a06a00" bg="rgba(224,164,17,0.15)">Pendente</Badge>}
              </div>
              <p className="mt-1 text-xs text-dim">{a.s}</p>
              <div className="mt-3 flex items-center gap-2">
                <Avatar initials="MD" color="#8b5cf6" size={24} />
                <span className="text-xs text-dim">Marina Duarte</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
