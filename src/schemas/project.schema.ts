// import { date } from 'node_modules/zod/v4/core/regexes'
import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().max(500, 'Description too long'),
  date: z.date().optional(),
  expectedEndDate: z.date().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  owner: z.string(),
  client: z.string(),
  teamMembers: z.array(z.string().uuid('Invalid team member ID'))
})

export type ProjectForm = z.infer<typeof projectSchema>
