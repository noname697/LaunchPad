import { useActionState } from "react";
import { saveUser } from "../../utils/storage";

const initialState = {
  error: "",
};

const Login = ({ onLogin }) => {
  const loginAction = (previousState, formData) => {
    const name = formData.get("name")?.trim();
    const email = formData.get("email")?.trim();

    if (!name || !email) {
      return {
        error: "Please fill in all fields.",
      };
    }

    const user = {
      id: crypto.randomUUID(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };

    saveUser(user);
    onLogin(user);

    return {
      error: "",
    };
  };

  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-400 mb-3">
            LaunchPad
          </p>
          <h1 className="text-slate-400">Welcome back</h1>
          <p className="">
            Organize your projects and generate submission materials faster
          </p>
        </div>

        <form
          action={formAction}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-300 mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="john.doe@example.com"
              className="w-full rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
          </div>

          {state.error && (
            <p className="mb-5 text-sm text-red-400">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-cyan-400 text-slate-950 font-semibold py-3 hover:bg-cyan-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Entering..." : "Enter dashboard"}
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          This login is stored locally for this prototype.
        </p>
      </section>
    </main>
  );
};

export default Login;
