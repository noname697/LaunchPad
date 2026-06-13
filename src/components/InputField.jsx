import Input from "./Input";

const InputField = ({
  children,
  type,
  name,
  label,
  placeholder,
  options,
  rows,
}) => {
  if (options) {
    return (
      <div>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          {label}
        </label>
        <select
          name={name}
          id={name}
          defaultValue=""
          className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    return (
      <div className="mb-5">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-300 mb-2"
        >
          {label}
        </label>
        <textarea
          name={name}
          id={name}
          rows={rows}
          placeholder={placeholder}
          className="w-full resize-none rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
        />
      </div>
    );
  }

  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-300 mb-2"
      >
        {label}
      </label>
      <Input type={type} id={name} name={name} placeholder={placeholder} />
      {children}
    </div>
  );
};

export default InputField;
