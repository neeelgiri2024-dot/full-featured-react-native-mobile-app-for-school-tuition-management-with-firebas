import * as yup from 'yup';

export const feedSchema = yup.object({
  title: yup.string().required(),
  body: yup.string().optional(),
  orgId: yup.string().required()
});
