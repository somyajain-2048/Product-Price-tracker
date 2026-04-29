

import { z } from "zod";

export const productSchemaValidation = z.object({
  url: z.string().url(),
});