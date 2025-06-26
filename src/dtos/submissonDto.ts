import { z } from 'zod'


export type createSubmissonDto = z.infer<typeof createSubmisson>

export const createSubmisson = z.object({
    userId : z.string(),
    problemId : z.string(),
    language : z.string(),
    code : z.string()
}).strict();