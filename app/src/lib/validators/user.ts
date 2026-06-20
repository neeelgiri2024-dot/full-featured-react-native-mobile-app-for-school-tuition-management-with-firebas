import * as yup from 'yup';

export const userSchema = yup.object({
  displayName: yup.string().required(),
  email: yup.string().email().required(),
  role: yup.mixed<'admin' | 'teacher' | 'student' | 'parent'>().oneOf(['admin','teacher','student','parent']).required(),
  orgId: yup.string().required()
});
