export interface CustomFormData {
  id: string;
  label: string;
  value: string;
  type?: 'password' | 'email' | 'text';
  reg?: RegExp;
  autocomplete?: string;
}
