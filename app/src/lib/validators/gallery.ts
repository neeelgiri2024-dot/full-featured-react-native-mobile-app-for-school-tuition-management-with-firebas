import * as yup from 'yup';

export const gallerySchema = yup.object({
  imageUrl: yup.string().required(),
  caption: yup.string().optional(),
  orgId: yup.string().required()
});
