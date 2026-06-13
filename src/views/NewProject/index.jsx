import { Link, useNavigate } from "react-router";
import { saveProject } from "../../utils/storage";
import { useActionState } from "react";

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
    const selectGenerators = formData.get("generators");

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
    <main className="">
      <section className="">
        <div className="">
          <Link to="dashboard" className="">
            ← Back to dashboard
          </Link>
          <h1 className="">Create new project</h1>
          <p className="">
            Describe your project once, then generate useful submission
            materials from it.
          </p>
        </div>
        <form action={formAction} className="">
          <div className="">
            <div>
              <label htmlFor="name" className="">
                Project name
              </label>
              <input
                id="name"
                name="name"
                placeholder="LaunchPad"
                type="text"
                className=""
              />
            </div>
            <div>
              <label htmlFor="type" className="">
                Project type
              </label>
              <select name="type" id="type" defaultValue="" className="">
                <option value="" disable>
                  Select a type
                </option>
                <option value="Website">Website</option>
                <option value="Bot">Bot</option>
                <option value="Game">Game</option>
                <option value="API">API</option>
                <option value="Extension">Extension</option>
                <option value="Automation">Automation</option>
                <option value="Hardware">Hardware</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="">
            <label htmlFor="shortDescription" className="">
              Short description
            </label>
            <textarea
              name="shortDescription"
              id="shortDescription"
              rows="3"
              placeholder="A web app that help makers prepare project submissions faster."
              className=""
            />
          </div>

          <div className="">
            <div>
              <label htmlFor="githubLink" className="">
                Github link
              </label>
              <input
                id="githubLink"
                name="githubLink"
                type="url"
                placeholder="https://github.com/noname697/launchpad"
                className=""
              />
            </div>
            <div>
              <label htmlFor="demoLink" className="">
                Demo link
              </label>
              <input
                id="demoLink"
                name="demoLink"
                type="url"
                placeholder="https://demo.com"
                className=""
              />
            </div>
          </div>

          <div className="">
            <label htmlFor="technologies" className="">
              Tecnologies
            </label>
            <input
              id="technologies"
              name="technologies"
              type="text"
              placeholder="React, Vite, TailwindCSS"
              className=""
            />
            <p className="">Separate technologies with commas.</p>
          </div>

          <div className="">
            <label htmlFor="goal" className="">
              Project goal
            </label>
            <textarea
              name="goal"
              id="goal"
              rows="3"
              placeholder="What problem does this project solve?"
              className=""
            ></textarea>
          </div>

          <div className="">
            <div>
              <label htmlFor="challenges" className="">
                Challenges
              </label>
              <textarea
                name="challenges"
                id="challenges"
                rows="4"
                placeholder="What was challenging while building it?"
                className=""
              ></textarea>
            </div>
            <div>
              <label htmlFor="learned" className="">
                What you learned
              </label>
              <textarea
                name="learned"
                id="learned"
                rows="4"
                placeholder="What did you learn from this project?"
                className=""
              ></textarea>
            </div>
          </div>

          <fieldset className="">
            <legend className="">What do you want to generate?</legend>
            <div className="">
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="README.md template"
                  className=""
                />
                <span>README.MD template</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="GitHub description"
                  className=""
                />
                <span>Github description</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="DevLog"
                  className=""
                />
                <span>DevLog</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="Checklist"
                  className=""
                />
                <span>Submission checklist</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="AI Usage Statement"
                  className=""
                />
                <span>AI usage statement</span>
              </label>
              <label className="">
                <input
                  type="checkbox"
                  name="generators"
                  value="Submission Text"
                  className=""
                />
                <span>Submission text</span>
              </label>
            </div>
          </fieldset>

          {state.error && <p className="">{state.error}</p>}

          <div className="">
            <button type="submit" disabled={isPending} className="">
              {isPending ? "Saving" : "Save Project"}
            </button>

            <Link to="/dashboard" className="">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
};

export default NewProject;
