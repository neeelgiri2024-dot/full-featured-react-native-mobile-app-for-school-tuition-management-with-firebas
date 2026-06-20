import * as yup from 'yup';

export const examSchema = yup.object({
  name: yup.string().required(),
  date: yup.string().required(),
  maxMarks: yup.number().min(0).required(),
  orgId: yup.string().required(),
  classId: yup.string().required(),
  subjectId: yup.string().required()
});
