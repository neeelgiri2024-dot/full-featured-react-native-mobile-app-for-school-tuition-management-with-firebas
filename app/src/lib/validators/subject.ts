import * as yup from 'yup';

export const subjectSchema = yup.object({
  name: yup.string().required(),
  code: yup.string().optional(),
  orgId: yup.string().required(),
  classId: yup.string().required()
});
