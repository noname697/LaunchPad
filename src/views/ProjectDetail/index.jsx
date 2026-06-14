import { Link, useNavigate, useParams } from "react-router";
import { getProjectById, removeProject } from "../../utils/storage";
import { useState } from "react";
import {
  getGenerateResources,
  getResourcesFileName,
} from "../../utils/generators";
import { downloadTextFile } from "../../utils/downloadFile";
import Button from "../../components/Button";

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
      <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
        <section className="max-w-2xl mx-auto">
          <Link
            to="/dashboard"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            ← Back to dashboard
          </Link>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-8">
            <h1 className="text-3xl font-bold mb-3">Project not found</h1>

            <p className="text-slate-400">
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
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <section className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition"
          >
            ← Back to dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mt-6">
            <div>
              <span className="inline-block text-xs text-cyan-400 hover:text-cyan-300 transition">
                {project.type}
              </span>

              <h1 className="text-4xl font-bold mb-3">{project.name}</h1>

              <p className="text-slate-400 max-w-2xl">
                {project.shortDescription}
              </p>
            </div>

            <button
              onClick={handleDeleteProject}
              className="rounded-xl border border-red-500/40 text-red-400 px-5 py-3 font-semibold hover:bg-red-500/10 transition"
            >
              Delete project
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <aside className="space-y-6">
            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Project info</h2>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-slate-500 mb-1">Status</p>
                  <p className="text-slate-300">{project.status}</p>
                </div>

                <div>
                  <p className="text-slate-500 mb-1">GitHub</p>

                  {project.githubLink ? (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 break-all"
                    >
                      {project.githubLink}
                    </a>
                  ) : (
                    <p className="text-slate-300">Not added</p>
                  )}
                </div>

                <div>
                  <p className="text-slate-500 mb-1">Demo</p>
                  {project.demoLink ? (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 break-all"
                    >
                      {project.demoLink}
                    </a>
                  ) : (
                    <p className="text-slate-300">Not added</p>
                  )}
                </div>

                <div>
                  <p className="text-slate-500 mb-2">Technologies</p>

                  {technologies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((technologie) => (
                        <span
                          key={technologie}
                          className="text-xs rounded-full bg-slate-950 border border-slate-700 px-3 py-1 text-slate-300"
                        >
                          {technologie}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-300">Not specified</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Generate resources</h2>

              <div className="space-y-3">
                {selectedGenerators.map((generator) => (
                  <button
                    key={generator}
                    onClick={() => setSelectedResource(generator)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition ${selectedResource === generator ? "border-cyan-400 bg-cyan-400/10 text-cyan-300" : "border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-400"}`}
                  >
                    {generator}
                  </button>
                ))}
              </div>
            </section>
          </aside>

          <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
              <div>
                <p className="text-sm text-cyan-400 mb-1">Generated resource</p>

                <h2 className="text-2xl font-semibold">
                  {selectedResource || "Select a resource"}
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyResource}
                  disabled={!generatedContent}
                  className="rounded-xl border border-slate-700 text-slate-300 font-semibold px-5 py-3 hover:border-cyan-400 hover:text-cyan-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {copyMessage || "Copy"}
                </button>
                <Button
                  onClick={handleDownloadResource}
                  disabled={!generatedContent}
                  classes="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </Button>
              </div>
            </div>
            <textarea
              value={generatedContent}
              readOnly
              className="w-full min-h-127.5 resize-none rounded-xl bg-slate-950 border border-slate-700 p-5 text-sm text-slate-200 outline-none font-mono leading-6"
            />
          </section>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
