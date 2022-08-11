import React from "react";
import TextField from "@mui/material/TextField";
import TextFieldProps from "../../models/textField";

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
        onBlur={onBlur}
        variant={variant}
        sx={sx}
      />
    </>
  );
};
export default TextFieldInput;
