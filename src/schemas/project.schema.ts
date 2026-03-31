// import { date } from 'node_modules/zod/v4/core/regexes'
import { z } from 'zod'
import { messages } from '@/utils/constants';

export const projectSchema = z.object({
  name: z.string(messages.validation.not_empty).min(3, messages.validation.min_string),
  description: z.string(messages.validation.not_empty).max(500, messages.validation.too_long),
  date: z.date().optional(),
  expectedEndDate: z.date().optional(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  owner: z.string(messages.validation.not_empty),
  client: z.string(messages.validation.not_empty),
  teamMembers: z.array(z.string().uuid('Invalid team member ID'))
})

export type ProjectForm = z.infer<typeof projectSchema>
