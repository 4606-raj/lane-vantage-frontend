// import { date } from 'node_modules/zod/v4/core/regexes'
import { z } from 'zod'
import { messages } from '@/utils/constants';

export const projectSchema = z.object({
  name: z.string({ message: messages.validation.not_empty })
    .min(3, { message: messages.validation.min_string }),

  description: z.string({ message: messages.validation.not_empty })
    .max(500, { message: messages.validation.too_long }),

  startDate: z.coerce.date({ message: messages.validation.invalid_value })
    .nullable()
    .optional(),

  expectedEndDate: z.coerce.date({ message: messages.validation.invalid_value })
    .nullable()
    .optional(),

  status: z.enum(['not_started', 'in_progress', 'completed'], {
    message: messages.validation.invalid_value
  }),

  priority: z.enum(['low', 'medium', 'high'], {
    message: messages.validation.invalid_value
  }),

  teamMembers: z.array(
    z.number({ message: messages.validation.invalid_value })
  )
})

export type ProjectForm = z.infer<typeof projectSchema>
