export interface CustomFormData {
  id: string;
  label: string;
  value: string;
  type?: 'password' | 'email' | 'text' | 'number';
  reg?: RegExp;
  autocomplete?: string;
}
