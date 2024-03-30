import zod from "zod";
const imageType = zod
  .string()
  .refine(
    value =>
      value === "image/png" || value === "image/jpeg" || value === "image/JPG",
    {
      message: "Allowed file types are png,jpeg,jpg!",
    }
  );
const Z_imageSchema = zod.object({
  type: imageType,
  size: zod
    .number()
    .min(100, "Min file size is 100KB")
    .max(4000000, "Max file size is 4MB"),
  dimensions: zod.string().refine(value => {
    const [width, height] = value.split("x");
    return (
      parseInt(width, 10) > 0 &&
      parseInt(height, 10) > 0 &&
      parseInt(width, 10) <= 1000 &&
      parseInt(height, 10) <= 1000
    );
  }, "Image dimensions must be within 1000x1000 pixels"),
});

export default Z_imageSchema;
