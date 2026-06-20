import * as yup from 'yup';

export const feeSchema = yup.object({
  studentId: yup.string().required(),
  amount: yup.number().min(0).required(),
  dueDate: yup.string().required(),
  status: yup.mixed<'due'|'paid'|'overdue'>().oneOf(['due','paid','overdue']).required(),
  orgId: yup.string().required()
});
