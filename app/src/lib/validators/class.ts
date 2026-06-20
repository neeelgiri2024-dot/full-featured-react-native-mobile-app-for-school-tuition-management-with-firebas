import * as yup from 'yup';

export const classSchema = yup.object({
  name: yup.string().required(),
  grade: yup.string().required(),
  section: yup.string().optional(),
  orgId: yup.string().required()
});
