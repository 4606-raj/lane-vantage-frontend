import { z } from 'zod'

export const projectSchema = z.object({
  name: z
    .string()
    .min(3, 'Project name must be at least 3 characters'),

  description: z
    .string()
    .max(500, 'Description too long')
})

export type ProjectForm = z.infer<typeof projectSchema>
