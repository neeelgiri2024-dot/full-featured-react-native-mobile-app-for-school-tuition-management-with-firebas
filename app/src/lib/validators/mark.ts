import * as yup from 'yup';

export const markSchema = yup.object({
  studentId: yup.string().required(),
  marksObtained: yup.number().min(0).required(),
  orgId: yup.string().required(),
  classId: yup.string().required(),
  subjectId: yup.string().required(),
  examId: yup.string().required()
});
