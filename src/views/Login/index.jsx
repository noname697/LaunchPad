import { useActionState } from "react";
import { saveUser } from "../../utils/storage";
import { useNavigate } from "react-router";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const initialState = {
  error: "",
};

const Login = () => {
  const navigate = useNavigate();

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

    navigate("/dashboard", { replace: true });

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
          <h1 className="text-4xl font-bold mb-3">Welcome back</h1>
          <p className="text-slate-400">
            Organize your projects and generate submission materials faster
          </p>
        </div>

        <form
          action={formAction}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl"
        >
          <InputField
            type="text"
            name="name"
            label="Name"
            placeholder="John Doe"
          />
          <InputField
            type="text"
            name="email"
            label="Email"
            placeholder="john.doe@example.com"
          />

          {state.error && (
            <p className="mb-5 text-sm text-red-400">{state.error}</p>
          )}

          <Button
            type="submit"
            disabled={isPending}
            classes="w-full disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending ? "Entering..." : "Enter dashboard"}
          </Button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          This login is stored locally for this prototype.
        </p>
      </section>
    </main>
  );
};

export default Login;
