export type ProjectCategory = 
  | 'AI & Systems'
  | 'Full-Stack Apps'
  | 'Research & Paper'
  | 'Dev Tools & APIs'
  | 'Design Explorations'
  | 'Playground'

export interface ProjectMetric {
  label: string
  value: string
}

export interface Project {
  id: string
  slug: string
  title: string
  subtitle: string
  category: ProjectCategory
  description: string
  longDescription?: string
  tags: string[]
  year: string
  featured: boolean
  bentoSize?: 'large' | 'tall' | 'wide' | 'normal'
  accentColor?: string
  githubUrl?: string
  liveUrl?: string
  metrics?: ProjectMetric[]
  highlights?: string[]
  imageSeed: string
}
