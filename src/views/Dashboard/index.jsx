import { Link, useNavigate } from "react-router";
import { getProjects, getUser, removeUser } from "../../utils/storage";
import Button from "../../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const projects = getProjects();

  const handleLogout = () => {
    removeUser();
    navigate("/auth/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <header className="max-h-5xl mx-auto flex items-center justify-between mb-10">
        <div>
          <p className="text-sm text-cyan-400 mb-1">LaunchApp</p>

          <h1 className="text-3xl font-bold">Hello, {user?.name}</h1>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>
      </header>

      <section className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Your projects</h2>
            <p className="text-slate-400">
              Manage your saved projects and prepare submission materials.
            </p>
          </div>

          <Link to="/projects/new">
            <Button>Create new project</Button>
          </Link>
        </div>

        {projects.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-3">No projects yet</h3>

            <p className="text-slate-400 mb-6">
              Create you first project to start generating README templates,
              devlogs, checklists, and descriptions.
            </p>

            <Link to="/projects/new">
              <Button classes="inline-block">Create your first project</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((project) => (
              <article
                key={project.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="inline-block text-xs text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1 mb-3">
                      {project.type}
                    </span>
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                  </div>

                  <span className="text-xs uppercase tracking-wide text-slate-500">
                    {project.status}
                  </span>
                </div>

                <p className="text-slate-400 mb-5">
                  {project.shortDescription}
                </p>

                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs rounded-full bg-slate-950 border border-slate-700 px-3 py-1 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="border-t border-slate-800 pt-4">
                  <p className="text-xs text-slate-500 mb-2">
                    Selected generators:{" "}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(project.selectGenerators)
                      ? project.selectGenerators
                      : []
                    ).map((generator) => (
                      <span
                        key={generator}
                        className="text-xs rounded-full bg-slate-800 px-3 py-1 text-slate-300"
                      >
                        {generator}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Dashboard;
