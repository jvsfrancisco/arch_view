import { Eye, Download, Camera, TrendingUp, CheckCircle2, Calendar, MessageSquare } from 'lucide-react'
import { Card, Progress, Ring, Badge, Avatar } from '@/components/ui'
import { projects, timeline } from '@/data/mock'
import { coverGradient, photoGradient, formatDateLong } from '@/lib/ui'

export default function ClientArea() {
  const project = projects[0]
  const posts = timeline.filter((t) => t.projectId === project.id)

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm" style={{ background: 'rgba(53,99,246,0.06)', borderColor: 'rgba(53,99,246,0.2)' }}>
        <Eye size={16} className="text-blueprint-600" />
        <span className="text-dim">Você está vendo o <b className="text-body">Portal do Cliente</b> — visão simplificada, sem controles internos.</span>
      </div>

      {/* Hero */}
      <Card className="overflow-hidden">
        <div className="relative h-36 sm:h-44" style={{ background: coverGradient(project.cover) }}>
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '24px 24px' }} />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
            <div>
              <p className="text-sm text-white/80">Sua obra</p>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h1>
              <p className="text-sm text-white/85">Arquiteta responsável: Ana Ribeiro</p>
            </div>
            <Ring value={project.progress} size={76} stroke={6} color="#fff" />
          </div>
        </div>
      </Card>

      {/* Progress highlights */}
      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: TrendingUp, label: 'Avanço da obra', value: `${project.progress}%`, color: '#3563f6' },
          { icon: CheckCircle2, label: 'Etapas concluídas', value: `${project.stages.filter((s) => s.progress === 100).length} de ${project.stages.length}`, color: '#3f9d6b' },
          { icon: Calendar, label: 'Previsão de entrega', value: '15 Set 2026', color: '#8b5cf6' },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-5" hover>
            <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${s.color}18`, color: s.color }}>
              <s.icon size={22} />
            </div>
            <div>
              <div className="text-xl font-bold">{s.value}</div>
              <div className="text-sm text-dim">{s.label}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Cronograma simplificado */}
        <Card className="p-5 lg:col-span-2">
          <h2 className="mb-4 font-bold tracking-tight">Cronograma da obra</h2>
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

        {/* Relatórios disponíveis */}
        <Card className="p-5">
          <h2 className="mb-3 font-bold tracking-tight">Relatórios</h2>
          <div className="space-y-2">
            {[
              { t: 'Relatório Semanal', d: '10–17 Jul' },
              { t: 'Relatório Semanal', d: '03–09 Jul' },
              { t: 'Relatório Mensal', d: 'Junho 2026' },
            ].map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border p-3" style={{ background: 'var(--surface-2)' }}>
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-blueprint-50 text-blueprint-600 dark:bg-blueprint-950">
                  <Download size={16} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{r.t}</p>
                  <p className="text-xs text-dim">{r.d}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-outline mt-3 w-full text-sm"><MessageSquare size={15} /> Falar com a arquiteta</button>
        </Card>
      </div>

      {/* Photo feed */}
      <Card className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera size={18} className="text-blueprint-600" />
            <h2 className="font-bold tracking-tight">Acompanhe as fotos</h2>
          </div>
        </div>
        <div className="space-y-5">
          {posts.map((post) => (
            <div key={post.id} className="border-b pb-5 last:border-0 last:pb-0">
              <div className="mb-3 flex items-center gap-3">
                <Avatar initials={post.authorInitials} color={post.authorColor} size={36} />
                <div>
                  <p className="text-sm font-semibold">{post.author}</p>
                  <p className="text-xs text-dim">{formatDateLong(post.date)} · {post.location}</p>
                </div>
                <Badge color="#1f45eb" bg="rgba(53,99,246,0.12)">{post.stage}</Badge>
              </div>
              <p className="mb-3 text-sm">{post.text}</p>
              <div className="grid grid-cols-3 gap-2">
                {post.media.map((m, i) => (
                  <div key={i} className="aspect-square rounded-xl" style={{ background: photoGradient(m.hue) }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
