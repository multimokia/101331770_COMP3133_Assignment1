import { model, Schema } from 'mongoose';
import { EMAIL_PROP } from './types/email.js';

export type Employee = {
  first_name: string,
  last_name: string,
  email: string,
  gender?: string
  salary: number,
}

const employeeSchema = new Schema<Employee>({
  first_name: { type: String, required: true, maxLength: 100 },
  last_name: { type: String, required: true, maxLength: 50 },
  email: EMAIL_PROP,
  gender: { type: String, enum: ['male', 'female', 'other'] },
  salary: { type: Number, required: true }
});

export const Employee = model<Employee>('Employee', employeeSchema);
