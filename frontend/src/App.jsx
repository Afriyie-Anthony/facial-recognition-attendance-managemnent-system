import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import TakeAttendance from "./pages/TakeAttendance";
import TeacherMainLayout from "./components/teacher/layout.tsx/MainLayout";
import TeachersDashboard from "./pages/teacher/Dashboard";
import Students from "./pages/teacher/Students";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TakeAttendance />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<TeacherMainLayout />}>
          <Route index element={<TeachersDashboard />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
