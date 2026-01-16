import { Routes, Route, Navigate } from "react-router-dom";
import { adminRoutes } from "./routes/admin.routes";

function App() {
  return (
    <Routes>
      {adminRoutes}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}

export default App;
