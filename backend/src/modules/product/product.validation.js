// import {z} from "zod";

// export const productSchemaValidation = z.object({
//   title: z.string().min(2),
//   url: z.string().url(),
//   currentPrice: z.number(),
//   image: z.string().optional(),
//   site: z.enum(["amazon", "flipkart", "myntra", "meesho"]),
// });

import { z } from "zod";

export const productSchemaValidation = z.object({
  url: z.string().url(),
});