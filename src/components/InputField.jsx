import Input from "./Input";

const InputField = ({ type, name, label, placeholder }) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        {label}
      </label>
      <Input type={type} id={name} name={name} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
