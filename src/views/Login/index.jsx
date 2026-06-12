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
    <main className="">
      <section className="">
        <div className="">
          <p className="">LaunchPad</p>
          <h1 className="">Welcome back</h1>
          <p className="">
            Organize your projects and generate submission materials faster
          </p>
        </div>

        <form action={formAction} className="">
          <div className="">
            <label htmlFor="name" className=""></label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              className=""
            />
          </div>
          <div className="">
            <label htmlFor="email" className=""></label>
            <input type="text" id="email" name="email" placeholder="john.doe@example.com" className="" />
          </div>

          {state.error && <p className="">{state.error}</p>}

          <button type="submit" disabled={isPending} className="">
            {isPending ? "Entering..." : "Enter dashboard"}
          </button>
        </form>

        <p className="">This login is stored locally for this prototype.</p>
      </section>
    </main>
  );
};

export default Login;
