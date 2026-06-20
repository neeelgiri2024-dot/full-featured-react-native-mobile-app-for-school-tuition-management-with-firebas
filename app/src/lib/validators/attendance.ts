import * as yup from 'yup';

export const attendanceSchema = yup.object({
  classId: yup.string().required(),
  date: yup.string().required(),
  studentId: yup.string().required(),
  status: yup.mixed<'present'|'absent'|'late'|'excused'>().oneOf(['present','absent','late','excused']).required(),
  orgId: yup.string().required()
});
