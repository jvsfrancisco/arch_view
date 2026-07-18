import { useState } from 'react'
import { Camera, MapPin, PenTool, X, Calendar, User, Upload, Filter, Sparkles } from 'lucide-react'
import { Card, Avatar, Badge } from '@/components/ui'
import { photos, projects } from '@/data/mock'
import { photoGradient, formatDateLong } from '@/lib/ui'
import type { PhotoRecord } from '@/data/types'
import clsx from 'clsx'

export default function PhotoRegistry() {
  const [active, setActive] = useState<PhotoRecord | null>(null)
  const [onlyMarkup, setOnlyMarkup] = useState(false)
  const list = photos.filter((p) => (onlyMarkup ? p.hasMarkup : true))
  const project = projects[0]

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registro Fotográfico</h1>
          <p className="text-sm text-dim">{photos.length} registros · {project.name}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setOnlyMarkup((v) => !v)}
            className={clsx('btn-outline', onlyMarkup && 'border-blueprint-400 text-blueprint-600')}
          >
            <Filter size={15} /> Com marcação
          </button>
          <button className="btn-primary"><Upload size={15} /> Enviar fotos</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 stagger sm:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => (
          <button key={p.id} onClick={() => setActive(p)} className="group text-left">
            <Card className="overflow-hidden" hover>
              <div className="relative aspect-square" style={{ background: photoGradient(p.hue) }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                {p.hasMarkup && (
                  <span className="absolute right-2 top-2 flex items-center gap-1 rounded-lg bg-clay-500 px-2 py-1 text-[10px] font-bold text-white">
                    <PenTool size={11} /> Marcada
                  </span>
                )}
                <div className="absolute bottom-2 left-2.5 right-2 text-white">
                  <p className="text-sm font-bold leading-tight">{p.location}</p>
                  <p className="text-[11px] opacity-80">{p.stage}</p>
                </div>
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-sm text-dim">{p.comment}</p>
                <div className="mt-2 flex items-center justify-between text-xs text-dim">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {formatDateLong(p.date)}</span>
                  <Avatar initials={p.responsible.split(' ').map((n) => n[0]).slice(0, 2).join('')} color="#3563f6" size={20} />
                </div>
              </div>
            </Card>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" onClick={() => setActive(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl shadow-lift" style={{ background: 'var(--surface)' }} onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/40 text-white backdrop-blur hover:bg-black/60" onClick={() => setActive(null)}>
              <X size={18} />
            </button>
            <div className="grid md:grid-cols-[1.4fr_1fr]">
              <div className="relative aspect-square md:aspect-auto" style={{ background: photoGradient(active.hue) }}>
                {active.hasMarkup && (
                  <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
                    <ellipse cx="200" cy="200" rx="80" ry="60" fill="none" stroke="#ff3b6b" strokeWidth="4" />
                    <path d="M330 110 L270 165" stroke="#ffd23f" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                )}
              </div>
              <div className="p-6">
                <Badge color="#1f45eb" bg="rgba(53,99,246,0.12)">{active.stage}</Badge>
                <h2 className="mt-3 text-xl font-bold tracking-tight">{active.location}</h2>
                <p className="mt-2 text-sm leading-relaxed">{active.comment}</p>

                <div className="mt-5 space-y-3 border-t pt-4">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin size={16} className="text-dim" /> <span className="text-dim">Localização:</span> <b>{active.location}</b>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar size={16} className="text-dim" /> <span className="text-dim">Data:</span> <b>{formatDateLong(active.date)}</b>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <User size={16} className="text-dim" /> <span className="text-dim">Responsável:</span> <b>{active.responsible}</b>
                  </div>
                </div>

                {/* IA de Obra */}
                <div className="mt-5 rounded-2xl border p-3" style={{ background: 'rgba(53,99,246,0.05)', borderColor: 'rgba(53,99,246,0.2)' }}>
                  <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-blueprint-600">
                    <Sparkles size={13} /> Análise IA de Obra
                  </div>
                  <ul className="space-y-1.5 text-sm">
                    {['Acabamento incompleto detectado no canto inferior', 'Possível desalinhamento de 4–6 cm', 'Inconsistência de tonalidade entre placas'].map((t) => (
                      <li key={t} className="flex items-start gap-2">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="btn-primary flex-1"><PenTool size={15} /> Marcar</button>
                  <button className="btn-outline"><Camera size={15} /> Comparar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
