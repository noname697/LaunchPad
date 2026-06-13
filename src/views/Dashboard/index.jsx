import { Link, useNavigate } from "react-router";
import { getProjects, getUser, removeUser } from "../../utils/storage";
import Button from "../../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();
  const projects = getProjects();
  console.log(projects[0]);

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
        <div className="">
          <div>
            <h2 className="">Your projects</h2>
            <p className="">
              Manage your saved projects and prepare submission materials.
            </p>
          </div>

          <Link to="/projects/new"> Create new project</Link>
        </div>

        {projects.length === 0 ? (
          <div className="">
            <h3 className="">No projects yet</h3>

            <p className="">
              Create you first project to start generating README templates,
              devlogs, checklists, and descriptions.
            </p>

            <Link to="/projects/new">Create your first project</Link>
          </div>
        ) : (
          <div className="">
            {projects.map((project) => (
              <article key={project.id} className="">
                <div className="">
                  <div>
                    <span className="">{project.type}</span>
                    <h3 className="">{project.name}</h3>
                  </div>

                  <span className="">{project.status}</span>
                </div>

                <p className="">{project.shortDescription}</p>

                {project.technologies.length > 0 && (
                  <div className="">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="">
                  <p className="">Selected generators: </p>

                  <div className="">
                    {(Array.isArray(project.selectGenerators)
                      ? project.selectGenerators
                      : []
                    ).map((generator) => (
                      <span key={generator} className="">
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
