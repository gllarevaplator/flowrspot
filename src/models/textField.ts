export default interface TextFieldProps {
  id: string,
  required?: boolean,
  name: string,
  label: string,
  type: string,
  variant: "outlined" | "standard" | "filled",  
  sx?: { mb: number, width: string },
  value?: number | string,
  touched?: boolean,
  onChange?: (
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) | undefined,
  onBlur?: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void,
  errors?: string,
}

