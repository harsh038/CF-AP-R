import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/common/Sidebar";
import Login from "./pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import UsersPage from "./pages/users/UsersPage";
import AddEditUserPage from "./pages/users/AddEditUserPage";
import CollegesPage from "./pages/colleges/CollegesPage";
import AddEditCollegePage from "./pages/colleges/AddEditCollegePage";
import CountryPage from "./pages/countrys/CountryPage";
import AddEditCountryPage from "./pages/countrys/AddEditCountryPage";
import AddEditStatePage from "./pages/states/AddEditStatePage";
import StatesPage from "./pages/states/StatesPage";
import CityPage from "./pages/citys/CitysPage";
import AddEditCityPage from "./pages/citys/AddEditCityPage";
import CollegeDetailsPage from "./pages/colleges/CollegeDetailsPage";
import CoursesPage from "./pages/courses/CoursesPage";
import AddEditCoursePage from "./pages/courses/AddEditCoursesPage";
import CollegeCoursePage from "./pages/collegeCourses/CollegeCoursePage";
import CollegeCourseDetailsPage from "./pages/collegeCourses/CollegeCourseDetailsPage";
import AddEditCollegeCoursePage from "./pages/collegeCourses/AddEditCollegeCoursePage";
import OverviewPage from "./pages/overview/OverviewPage";
import BranchesPage from "./pages/branches/BranchesPage";
import BranchDetailsPage from "./pages/branches/BranchDetailsPage";
import AddEditBranchPage from "./pages/branches/AddEditBranchPage";

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const showSidebar = isAuthenticated && location.pathname !== "/login";

  return (
    <div className="flex h-screen bg-black text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-0" />
      </div>

      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${showSidebar ? "ml-0" : ""}`}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/overviewpage" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />

          <Route path="/users" element={<ProtectedRoute><UsersPage /></ProtectedRoute>} />
          <Route path="/addedituser" element={<ProtectedRoute><AddEditUserPage /></ProtectedRoute>} />
          <Route path="/addedituser/:id" element={<ProtectedRoute><AddEditUserPage /></ProtectedRoute>} />

          <Route path="/branches" element={<ProtectedRoute><BranchesPage /></ProtectedRoute>} />
          <Route path="/viewbranchdetail/:id" element={<ProtectedRoute><BranchDetailsPage /></ProtectedRoute>} />
          <Route path="/addeditbranch" element={<ProtectedRoute><AddEditBranchPage /></ProtectedRoute>} />
          <Route path="/addeditbranch/:id" element={<ProtectedRoute><AddEditBranchPage /></ProtectedRoute>} />

          <Route path="/colleges" element={<ProtectedRoute><CollegesPage /></ProtectedRoute>} />
          <Route path="/collegedetails/:id" element={<ProtectedRoute><CollegeDetailsPage /></ProtectedRoute>} />
          <Route path="/addeditcollege" element={<ProtectedRoute><AddEditCollegePage /></ProtectedRoute>} />
          <Route path="/addeditcollege/:id" element={<ProtectedRoute><AddEditCollegePage /></ProtectedRoute>} />

          <Route path="/country" element={<ProtectedRoute><CountryPage /></ProtectedRoute>} />
          <Route path="/addeditcountry" element={<ProtectedRoute><AddEditCountryPage /></ProtectedRoute>} />
          <Route path="/addeditcountry/:id" element={<ProtectedRoute><AddEditCountryPage /></ProtectedRoute>} />

          <Route path="/state" element={<ProtectedRoute><StatesPage /></ProtectedRoute>} />
          <Route path="/addeditstate" element={<ProtectedRoute><AddEditStatePage /></ProtectedRoute>} />
          <Route path="/addeditstate/:id" element={<ProtectedRoute><AddEditStatePage /></ProtectedRoute>} />

          <Route path="/city" element={<ProtectedRoute><CityPage /></ProtectedRoute>} />
          <Route path="/addeditcity" element={<ProtectedRoute><AddEditCityPage /></ProtectedRoute>} />
          <Route path="/addeditcity/:id" element={<ProtectedRoute><AddEditCityPage /></ProtectedRoute>} />

          <Route path="/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
          <Route path="/addeditcourse" element={<ProtectedRoute><AddEditCoursePage /></ProtectedRoute>} />
          <Route path="/addeditcourse/:id" element={<ProtectedRoute><AddEditCoursePage /></ProtectedRoute>} />

          <Route path="/collegecourse" element={<ProtectedRoute><CollegeCoursePage /></ProtectedRoute>} />
          <Route path="/addeditcollegecourse" element={<ProtectedRoute><AddEditCollegeCoursePage /></ProtectedRoute>} />
          <Route path="/addeditcollegecourse/:id" element={<ProtectedRoute><AddEditCollegeCoursePage /></ProtectedRoute>} />
          <Route path="/collegecoursedetails/:id" element={<ProtectedRoute><CollegeCourseDetailsPage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
