import React from "react";
import TextField from "@mui/material/TextField";

interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  type: string;
  variant: any;
  sx: Object;
  value?: number | string;
  touched: any;
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur: (e: any) => void;
  errors: any;
}

const TextFieldInput: React.FC<TextFieldProps> = ({
  id,
  label,
  name,
  type,
  value,
  touched,
  onChange,
  onBlur,
  variant,
  sx,
  errors,
}) => {
  return (
    <>
      {errors && touched && <span className="text-danger">{errors}</span>}
      <TextField
        id={id}
        label={label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        variant={variant}
        sx={sx}
      />
    </>
  );
};
export default TextFieldInput;
