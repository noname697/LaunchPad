import { Link, useNavigate, useParams } from "react-router";
import { getProjectById, removeProject } from "../../utils/storage";
import { useState } from "react";
import {
  getGenerateResources,
  getResourcesFileName,
} from "../../utils/generators";
import { downloadTextFile } from "../../utils/downloadFile";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const project = getProjectById(id);
  const selectedGenerators = Array.isArray(project?.selectedGenerators)
    ? project.selectedGenerators
    : Array.isArray(project?.selectGenerators)
      ? project.selectGenerators
      : [];
  const technologies = Array.isArray(project?.technologies)
    ? project.technologies
    : [];

  const [selectedResource, setSelectedResource] = useState(
    selectedGenerators[0] || "",
  );

  const [copyMessage, setCopyMessage] = useState("");

  if (!project) {
    return (
      <main className="">
        <section className="">
          <Link to="/dashboard" className="">
            ← Back to dashboard
          </Link>

          <div className="">
            <h1 className="">Project Not Found</h1>

            <p className="">
              This project may have been deleted or does not exist.
            </p>
          </div>
        </section>
      </main>
    );
  }

  const generatedContent = selectedResource
    ? getGenerateResources(project, selectedResource)
    : "";

  const handleDeleteProject = () => {
    const wantsToDelete = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!wantsToDelete) return;

    removeProject(project.id);
    navigate("/dashboard", { replace: true });
  };

  const handleCopyResource = async () => {
    if (!generatedContent) return;

    await navigator.clipboard.writeText(generatedContent);

    setCopyMessage("Resource copied to clipboard!");

    setTimeout(() => {
      setCopyMessage("");
    }, 2000);
  };

  const handleDownloadResource = () => {
    if (!generatedContent) return;

    const fileName = getResourcesFileName(project, selectedResource);

    downloadTextFile(generatedContent, fileName);
  };

  return (
    <main className="">
      <section className="">
        <div className="">
          <Link to="/dashboard" className="">
            ← Back to dashboard
          </Link>

          <div className="">
            <div>
              <span className="">{project.type}</span>

              <h1 className="">{project.name}</h1>

              <p className="">{project.shortDescription}</p>
            </div>

            <button onClick={handleDeleteProject} className="">
              Delete project
            </button>
          </div>
        </div>

        <div className="">
          <aside className="">
            <section className="">
              <h2 className="">Project info</h2>
              <div className="">
                <div>
                  <p className="">Status</p>
                  <p className="">{project.status}</p>
                </div>

                <div>
                  <p className="">GitHub</p>

                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                    >
                      {project.githubLink}
                    </a>
                  ) : (
                    <p className="">Not added</p>
                  )}
                </div>

                <div>
                  <p className="">Demo</p>
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                    >
                      {project.demoLink}
                    </a>
                  ) : (
                    <p className="">Not added</p>
                  )}
                </div>

                <div>
                  <p className="">Technologies</p>

                  {technologies.length > 0 ? (
                    <div className="">
                      {technologies.map((technologie) => (
                        <span key={technologie} className="">
                          {technologie}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="">Not specified</p>
                  )}
                </div>
              </div>
            </section>

            <section className="">
              <h2 className="">Generate resources</h2>

              <div className="">
                {selectedGenerators.map((generator) => (
                  <button
                    key={generator}
                    onClick={() => setSelectedResource(generator)}
                    className=""
                  >
                    {generator}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="">
            <div className="">
              <div>
                <p className="">Generated resource</p>

                <h2 className="">{selectedResource || "Select a resource"}</h2>
              </div>

              <div className="">
                <button
                  onClick={handleCopyResource}
                  disabled={!generatedContent}
                  className=""
                >
                  {copyMessage || "Copy"}
                </button>
                <button
                  onClick={handleDownloadResource}
                  disabled={!generatedContent}
                  className=""
                >
                  Download
                </button>
              </div>
            </div>
            <textarea value={generatedContent} readOnly className=""></textarea>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
