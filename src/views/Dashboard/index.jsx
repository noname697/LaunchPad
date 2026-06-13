import { useNavigate } from "react-router";
import { getUser, removeUser } from "../../utils/storage";
import Button from "../../components/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    removeUser();
    navigate("/auth/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <header className="max-h-5xl mx-auto flex items-center justify-between mb-10">
        <div>
          <p className="text-sm text-cyan-400 mb-1">LaunchApp</p>

          <h1 className="text-3xl font-bold">Hello, {user.name}</h1>
        </div>

        <Button variant="secondary" onClick={handleLogout}>
          Logout
        </Button>

      </header>

      <section className="max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <h2 className="text-2xl font-semibold mb-3">Your Projects</h2>

          <p className="text-slate-400 mb-6">
            Soon, your saved projects will appear here.
          </p>
          <Button>Create new project</Button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
