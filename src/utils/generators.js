const formatTechnologies = (technologies) => {
  if (!technologies || technologies.length === 0) {
    return "- Not specified";
  }

  return technologies.map((technologie) => `-${technologie}`).join("\n");
};

const formatLinks = (project) => {
  const links = [];

  if (project.githubLink) {
    links.push(`- GitHub: ${project.githubLink}`);
  }

  if (project.demoLink) {
    links.push(`- Demo: ${project.demoLink}`);
  }

  if (links.length === 0) {
    return "- Not specified";
  }

  return links.join("\n");
};

const createReadme = (project) => {
  return `# ${project.name}

    ## About

    ${project.shortDescription}

    ## Project Type

    ${project.type}

    ## Project Goal

    ${project.goal || "This project was created to make a repetitive workflow smoother and easier."}

    ## Technologies Used

    ${formatTechnologies(project.technologies)}

    ## Links

    ${formatLinks(project)}

    ## How to Run

    ~~~bash
    npm install
    npm run dev
    ~~~

    ## Challenges

    ${project.challenges || "Write about the main challenges you faced while building this project."}

    ## What I Learned

    ${project.learned || "Write about what you learned while developing this project."}

    ## AI Usage

    This project used IA assistence for planning, documentation, and debugging support.
    `;
};

const createGithubDescription = (project) => {
  const techText =
    project.technologies && project.technologies.length > 0
      ? `Built with ${project.technologies.join(", ")}.`
      : "";

  return `${project.shortDescription}${techText}`;
};

const createDevLog = (project) => {
  return `# DevLog - ${project.name}
    
    Today I worked on ${project.name}, a ${project.type.toLowerCase()} project focused on improving quality of life by making a repetitive workflow smoother.

    I added the main project information, organized the submission details, and prepared the selected generation resources.

    ## Progress

    - Project type: ${project.type}
    - Technologies: ${project.technologies && project.technologies.length === 0 ? project.technologies.join(", ") : "Not specified"}
    - Selected resources: ${project.selectedGenerators.join(", ")}

    ## Challenges

    ${project.challenges || "The main challenge was organizing the project flow in a simple and useful way."}

    ## What I Learned

    ${project.learned || "I learned more about building practical tools that save time in repeated tasks."}
    `;
};

const createChecklist = (project) => {
  return `# Submission Checklist - ${project.name}
    
    ## Basic Information

    - [ ] Project has a clear name
    - [ ] Project has a short description
    - [ ] Project type is selected
    - [ ] Technologies are listed

    ## Links

    - [ ] GitHub repository is public
    - [ ] Demo link works
    - [ ] Screenshots or preview images were added

    ## Documentation
    - [ ] README.md is completed
    - [ ] Installation instruction are clear
    - [ ] Features are described
    - [ ] Challenges are explained
    - [ ] What I learned is included

    ## Final Submission
    - [ ] DevLog is written
    - [ ] AI Usage Statement is included if needed
    - [ ] Submission text is ready
    - [ ] Project was tested before submitting
    `;
};

const createAiUsageStatement = (project) => {
  return `# AI Usage Statement - ${project.name}
    AI tools were used during the development of ${project.name} to help planning, documentation, write support, and debugging ideas.

    The project idea, implementation decisions, code adaptation, testing, and final project direction were revised handled by the developer.
    `;
};

const createSubmissionText = (project) => {
  return `# ${project.name}
    
    ## What did you make?

    I made ${project.name}, a ${project.type.toLowerCase()} project that helps make life smoother by reducing repetitive work.

    ${project.shortDescription}

    ## What was challenging?

    ${project.challenges || "The most challenging part was organizing the project flow and making the tool simple enough to be useful."}

    ## What are you proud of?

    I am proud that this project solves a real workflow problem and can save time whenever someone needs to prepare a project submission.

    ## What should people know so they can test it?

    ${project.demoLink ? `Demo: ${project.demoLink}` : "The project can be tested locally by installing the dependencies and running the development server."}
    
    ${project.githubLink ? `GitHub: ${project.githubLink}` : ""}
    `;
};

export const getGenerateResources = (project, resourceType) => {
  const generators = {
    README: createReadme,
    "GitHub Description": createGithubDescription,
    DevLog: createDevLog,
    CheckList: createChecklist,
    "AI Usage Statement": createAiUsageStatement,
    "Submission Text": createSubmissionText,
  };

  const generator = generators[resourceType];

  if (!generator) {
    return "";
  }

  return generator(project);
};

export const getResourcesFileName = (project, resourceType) => {
  const projectSlug = project.name
    .toLowerCase()
    .replaceAll(" ", "-")
    .replace(/[^a-z0-9-]/g, "");

    const fileNames = {
        README: "README.md",
        "GitHub Description": `${projectSlug}-github-description.txt`,
        DevLog: `${projectSlug}-devlog.md`,
        Checklist: `${projectSlug}-checklist.md`,
        "AI Usage Statement": `${projectSlug}-ai-usage.md`,
        "Submission Text": `${projectSlug}-submission.md`
    }

    return fileNames[resourceType] || `${projectSlug}.txt`
};
