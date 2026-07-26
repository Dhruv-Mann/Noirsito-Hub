import { ref, computed } from 'vue'
import { PROJECTS } from '~/constants/projects'
import type { Project, ProjectCategory } from '~/types/project'

export function useProjects() {
  const selectedCategory = ref<ProjectCategory | 'All'>('All')
  const searchQuery = ref('')

  const categories: (ProjectCategory | 'All')[] = [
    'All',
    'AI & Systems',
    'Full-Stack Apps',
    'Research & Paper',
    'Dev Tools & APIs',
    'Design Explorations',
    'Playground'
  ]

  const featuredProjects = computed<Project[]>(() => {
    return PROJECTS.filter(p => p.featured)
  })

  const filteredProjects = computed<Project[]>(() => {
    return PROJECTS.filter(project => {
      const matchesCategory = selectedCategory.value === 'All' || project.category === selectedCategory.value
      const query = searchQuery.value.toLowerCase().trim()
      const matchesQuery = !query || 
        project.title.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        project.tags.some(t => t.toLowerCase().includes(query))

      return matchesCategory && matchesQuery
    })
  })

  function getProjectBySlug(slug: string): Project | undefined {
    return PROJECTS.find(p => p.slug === slug)
  }

  return {
    allProjects: PROJECTS,
    featuredProjects,
    filteredProjects,
    categories,
    selectedCategory,
    searchQuery,
    getProjectBySlug
  }
}
