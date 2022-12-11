export default interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  variant: "outlined" | "standard" | "filled";  
  sx: object;
  value?: number | string;
  touched?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  errors?: string;
}


