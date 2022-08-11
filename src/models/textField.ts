export default interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  variant: any;
  sx: Object;
  value: number | string;
  touched: any;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur: (e: any) => void;
  errors: any;
}
