import * as yup from 'yup';

export const scheduleSchema = yup.object({
  classId: yup.string().required(),
  subjectId: yup.string().required(),
  dayOfWeek: yup.number().min(0).max(6).required(),
  startTime: yup.string().required(),
  endTime: yup.string().required(),
  orgId: yup.string().required()
});
