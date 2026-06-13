const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
    />
  );
};

export default Input;
