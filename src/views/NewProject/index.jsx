import { Link, useNavigate } from "react-router";
import { saveProject } from "../../utils/storage";
import { useActionState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";

const initialState = {
  error: "",
};

const NewProject = () => {
  const navigate = useNavigate();

  const createProjectAction = (previousState, formData) => {
    const name = formData.get("name")?.trim();
    const type = formData.get("type");
    const githubLink = formData.get("githubLink")?.trim();
    const demoLink = formData.get("demoLink")?.trim();
    const shortDescription = formData.get("shortDescription")?.trim();
    const goal = formData.get("goal")?.trim();
    const challenges = formData.get("challenges")?.trim();
    const learned = formData.get("learned")?.trim();
    const technologiesText = formData.get("technologies")?.trim();
    const selectGenerators = formData.getAll("generators");

    if (!name || !type || !shortDescription) {
      return {
        error: "Please fill in the project name, type, and short description.",
      };
    }

    if (selectGenerators.length === 0) {
      return {
        error: "Please select at least one material to generate.",
      };
    }

    const technologies = technologiesText
      ? technologiesText
          .split(",")
          .map((tech) => tech.trim())
          .filter(Boolean)
      : [];

    const project = {
      id: crypto.randomUUID(),
      name,
      type,
      githubLink,
      demoLink,
      shortDescription,
      goal,
      challenges,
      learned,
      technologies,
      selectGenerators,
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveProject(project);

    navigate("/dashboard", { replace: true });

    return {
      error: "",
    };
  };

  const [state, formAction, isPending] = useActionState(
    createProjectAction,
    initialState,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <section className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            ← Back to dashboard
          </Link>
          <h1 className="text-4xl font-bold mt-6 mb-3">Create new project</h1>
          <p className="text-slate-400">
            Describe your project once, then generate useful submission
            materials from it.
          </p>
        </div>

        <form
          action={formAction}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputField
              name="name"
              type="text"
              label="Project name"
              placeholder="LaunchPad"
            />

            <InputField
              name="type"
              type="text"
              label="Project type"
              options={[
                { value: "", label: "Select a type" },
                { value: "Website", label: "Website" },
                { value: "Bot", label: "Bot" },
                { value: "Game", label: "Game" },
                { value: "API", label: "API" },
                { value: "Extension", label: "Extension" },
                { value: "Automation", label: "Automation" },
                { value: "Hardware", label: "Hardware" },
              ]}
            />
          </div>

          <InputField
            name="shortDescription"
            type="textarea"
            label="Short description"
            placeholder="A web app that helps makers prepare project submissions faster."
            rows={3}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <InputField
              label="GitHub Link"
              name="githubLink"
              type="url"
              placeholder="https://github.com/noname697/launchpad"
            />
            <InputField
              label="Demo Link"
              name="demoLink"
              type="url"
              placeholder="https://demo.com"
            />
          </div>

          <InputField
            label="Technologies"
            name="technologies"
            placeholder="React,Vite,TailwindCSS"
          >
            <p className="text-xs text-slate-500 mt-2">
              Separate technologies with commas.
            </p>
          </InputField>

          <InputField
            label="Project goal"
            name="goal"
            type="textarea"
            rows={3}
            placeholder="What problem does this project solve?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <InputField
              label="Challenges"
              name="challenges"
              type="textarea"
              rows={4}
              placeholder="What was challenging while building it?"
            />
            <InputField
              label="What you learned"
              name="learned"
              type="textarea"
              rows={4}
              placeholder="What did you learn from this project?"
            />
          </div>

          <fieldset className="mb-6">
            <legend className="block text-sm font-medium text-slate-300 mb-3">
              What do you want to generate?
            </legend>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="README"
                  className="accent-cyan-400"
                />
                <span>README.md template</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="GitHub description"
                  className="accent-cyan-400"
                />
                <span>Github description</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="DevLog"
                  className="accent-cyan-400"
                />
                <span>DevLog</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="Checklist"
                  className="accent-cyan-400"
                />
                <span>Submission checklist</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="AI Usage Statement"
                  className="accent-cyan-400"
                />
                <span>AI usage statement</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl bg-slate-950 border border-slate-700 px-4 py-3 cursor-pointer hover:border-cyan-400 transition">
                <input
                  type="checkbox"
                  name="generators"
                  value="Submission Text"
                  className="accent-cyan-400"
                />
                <span>Submission text</span>
              </label>
            </div>
          </fieldset>

          {state.error && (
            <p className="mb-5 text-sm text-red-400">{state.error}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              type="submit"
              disabled={isPending}
              classes="disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Saving" : "Save Project"}
            </Button>

            <Link
              to="/dashboard"
              className="rounded-xl border border-slate-700 text-slate-300 font-semibold px-5 py-3 text-center hover:border-cyan-400 hover:text-cyan-400 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewProject;
