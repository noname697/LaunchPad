import { Navigate, Route, Routes } from "react-router";
import PublicRoute from "./routes/PublicRoute";
import Login from "./views/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./views/Dashboard";
import NewProject from "./views/NewProject";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" replace />} />

      <Route element={<PublicRoute />}>
        <Route path="/auth/login" element={<Login />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/new" element={<NewProject />} />
      </Route>
    </Routes>
  );
};

export default App;
