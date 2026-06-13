const USER_KEY = "launchpad_user";
const PROJECTS_KEY = "launchpad_projects";

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);

  if (!user) return null;

  return JSON.parse(user);
};

export const saveUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const getProjects = () => {
  const projects = localStorage.getItem(PROJECTS_KEY);

  if (!projects) return [];

  return JSON.parse(projects);
};

export const saveProject = (project) => {
  const projects = getProjects();

  const updateProjects = [project, ...projects];

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updateProjects));
};

export const removeProject = (projectId) => {
  const projects = getProjects();

  const updateProjects = projects.filter((project) => project.id !== projectId);

  localStorage.setItem(PROJECTS_KEY, JSON.stringify(updateProjects));
};
