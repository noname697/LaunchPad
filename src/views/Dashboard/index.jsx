import { removeUser } from "../../utils/storage";

const Dashboard = ({ user, onLogout }) => {
  const handleLogout = () => {
    removeUser();
    onLogout();
  };

  return (
    <main className="">
      <header className="">
        <div>
          <p className="">LaunchApp</p>

          <h1 className="">Hello, {user.name}</h1>
        </div>

        <button className="" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="">
        <div className="">
          <h2 className="">Your Projects</h2>

          <p className="">Soon, your saved projects will appear here.</p>

          <button className="">Create new project</button>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
