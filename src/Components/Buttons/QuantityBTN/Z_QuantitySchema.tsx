import z from "zod";
// export type QuantityType = z.infer<typeof QuantitySchema>;

export type Z_QuantitySchemaType = {
  success: boolean;
  msg: string;
};

export default function Z_QuantitySchema({
  quantity,
  least = 1,
  most = 100,
}: {
  quantity: number;
  least?: number;
  most?: number;
}) {
  const QuantitySchema = z
    .object({
      quantity: z
        .number({ invalid_type_error: " must be a number" })
        .refine(val => val >= least, { message: `least ${least}` })
        .refine(val => val <= most, { message: `most ${most}` }),
    })
    .strict();

  const res = QuantitySchema.safeParse({
    quantity: quantity,
  });
  if (!res.success) {
    return {
      success: false,
      msg: res.error.errors[0].message,
    };
  }
  if (res.success) {
    return {
      success: true,
      msg: "success",
    };
  }
}
