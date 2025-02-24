import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login, Dashboard } from "./Forms";
import ProtectedRoute from "./context/ProtectedRoute";
import Dashboard from "./Forms/Dashboard";
import OverviewPage from "./pages/overview/OverviewPage";
import UserHomePage from "./UserHomePage";
import Sidebar from "./components/Sidebar";
import {
  BranchesPage,
  AddEditBranchPage,
  BranchDetailsPage,
} from "./pages/branches";
import { CityPage, AddEditCityPage } from "./pages/citys";
import {
  CollegeCoursePage,
  AddEditCollegeCoursePage,
  CollegeCourseDetailsPage,
} from "./pages/collegeCourses";
import {
  CollegesPage,
  AddEditCollegePage,
  CollegeDetailsPage,
} from "./pages/colleges";
import { CountryPage, AddEditCountryPage } from "./pages/countrys";
import { CoursesPage, AddEditCoursesPage } from "./pages/courses";
import { StatesPage, AddEditStatePage } from "./pages/states";
import { UsersPage, AddEditUserPage } from "./pages/users";

function App() {
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // Get user data

  // Show sidebar only for Admin users
  const showSidebar =
    isAuthenticated && user?.role === "Admin" && location.pathname !== "/login";

  return (
    <div className="flex h-screen bg-black text-gray-100 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-10" />
      </div>

      {/* Sidebar (Only for Admin) */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div className={`flex-1 overflow-y-auto ${showSidebar ? "ml-0" : ""}`}>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            {/* Admin Dashboard */}
            {user?.role === "Admin" && (
              <>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/overviewpage" element={<OverviewPage />} />

                {/* Admin-Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/addedituser" element={<AddEditUserPage />} />
                  <Route
                    path="/addedituser/:id"
                    element={<AddEditUserPage />}
                  />

                  <Route path="/branches" element={<BranchesPage />} />
                  <Route
                    path="/viewbranchdetail/:id"
                    element={<BranchDetailsPage />}
                  />
                  <Route
                    path="/addeditbranch"
                    element={<AddEditBranchPage />}
                  />
                  <Route
                    path="/addeditbranch/:id"
                    element={<AddEditBranchPage />}
                  />

                  <Route path="/colleges" element={<CollegesPage />} />
                  <Route
                    path="/collegedetails/:id"
                    element={<CollegeDetailsPage />}
                  />
                  <Route
                    path="/addeditcollege"
                    element={<AddEditCollegePage />}
                  />
                  <Route
                    path="/addeditcollege/:id"
                    element={<AddEditCollegePage />}
                  />

                  <Route path="/country" element={<CountryPage />} />
                  <Route
                    path="/addeditcountry"
                    element={<AddEditCountryPage />}
                  />
                  <Route
                    path="/addeditcountry/:id"
                    element={<AddEditCountryPage />}
                  />

                  <Route path="/state" element={<StatesPage />} />
                  <Route path="/addeditstate" element={<AddEditStatePage />} />
                  <Route
                    path="/addeditstate/:id"
                    element={<AddEditStatePage />}
                  />

                  <Route path="/city" element={<CityPage />} />
                  <Route path="/addeditcity" element={<AddEditCityPage />} />
                  <Route
                    path="/addeditcity/:id"
                    element={<AddEditCityPage />}
                  />

                  <Route path="/courses" element={<CoursesPage />} />
                  <Route
                    path="/addeditcourse"
                    element={<AddEditCoursesPage />}
                  />
                  <Route
                    path="/addeditcourse/:id"
                    element={<AddEditCoursesPage />}
                  />

                  <Route
                    path="/collegecourse"
                    element={<CollegeCoursePage />}
                  />
                  <Route
                    path="/addeditcollegecourse"
                    element={<AddEditCollegeCoursePage />}
                  />
                  <Route
                    path="/addeditcollegecourse/:id"
                    element={<AddEditCollegeCoursePage />}
                  />
                  <Route
                    path="/collegecoursedetails/:id"
                    element={<CollegeCourseDetailsPage />}
                  />
                </Route>
              </>
            )}

            {/* User Homepage (Different UI for Users) */}
            <Route path="/dashboard" element={<UserHomePage />} />
          </Route>

          {/* Shared Routes (Admin and User) */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
