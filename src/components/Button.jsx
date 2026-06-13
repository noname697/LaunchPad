const Button = ({ children, classes, variant = "primary", ...props }) => {
  const baseClasses = "rounded-xl transition";

  const variantClasses = {
    primary:
      "bg-cyan-400 text-slate-950 font-semibold px-5 py-3 hover:bg-cyan-300",
    secondary:
      "border border-slate-700 text-slate-300 px-4 py-2 text-sm hover:border-cyan-400 hover:text-cyan-400",
  };

  return (
    <button
      {...props}
      className={`${classes} ${baseClasses} ${variantClasses[variant]}`}
    >
      {children}
    </button>
  );
};

export default Button;
