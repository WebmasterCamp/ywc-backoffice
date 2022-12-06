import { z } from 'zod'

export const IdStringParam = z.object({
  id: z.string(),
})
