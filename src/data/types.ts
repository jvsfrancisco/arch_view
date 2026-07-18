export type ProjectType = 'Residencial' | 'Comercial' | 'Corporativo' | 'Interiores'
export type ProjectStatus = 'em_andamento' | 'concluida' | 'pausada'

export type StageKey =
  | 'demolicao'
  | 'alvenaria'
  | 'eletrica'
  | 'hidraulica'
  | 'gesso'
  | 'pintura'
  | 'marcenaria'
  | 'decoracao'

export interface Stage {
  key: StageKey
  label: string
  progress: number // 0-100
  start: string // ISO
  end: string // ISO
}

export interface TeamMember {
  id: string
  name: string
  role: 'Arquiteto' | 'Cliente' | 'Engenheiro' | 'Mestre de obras' | 'Fornecedor'
  avatarColor: string
  initials: string
}

export interface Project {
  id: string
  name: string
  client: string
  address: string
  city: string
  area: number // m2
  type: ProjectType
  status: ProjectStatus
  progress: number
  cover: string // gradient descriptor
  startDate: string
  deadline: string
  team: TeamMember[]
  stages: Stage[]
  openIssues: number
  criticalIssues: number
}

export type IssueStatus = 'aberta' | 'execucao' | 'fornecedor' | 'revisao' | 'concluida'
export type IssuePriority = 'baixa' | 'media' | 'alta' | 'critica'

export interface Issue {
  id: string
  projectId: string
  title: string
  description: string
  status: IssueStatus
  priority: IssuePriority
  assignee: string
  assigneeInitials: string
  assigneeColor: string
  dueDate: string
  createdAt: string
  location: string
  photos: number
  comments: number
}

export interface ChecklistItem {
  id: string
  label: string
  checked: boolean
  note?: string
}
export interface ChecklistGroup {
  key: string
  title: string
  items: ChecklistItem[]
}

export type InspectionStatus = 'rascunho' | 'concluida' | 'assinada'
export interface Inspection {
  id: string
  projectId: string
  date: string
  responsible: string
  stage: string
  location: string
  status: InspectionStatus
  checklist: ChecklistGroup[]
  photos: number
  issuesFound: number
  notes: string
}

export type PostMediaType = 'photo' | 'video' | 'audio'
export interface TimelinePost {
  id: string
  projectId: string
  date: string
  author: string
  authorInitials: string
  authorColor: string
  stage: string
  media: { type: PostMediaType; hue: number }[]
  text: string
  likes: number
  comments: number
  location: string
}

export interface PhotoRecord {
  id: string
  projectId: string
  location: string
  date: string
  responsible: string
  comment: string
  hue: number
  hasMarkup: boolean
  stage: string
}
