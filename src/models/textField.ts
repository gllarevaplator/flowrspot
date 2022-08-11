export default interface TextFieldProps {
    id: "string";
    name: "string";
    label: "string";
    type: "string";
    value: number | string;
    onChange: () => void;
    variant: string;
    sx: Object;
  }