import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Login, Dashboard } from "./Forms";
import ProtectedRoute from "./context/ProtectedRoute";
import OverviewPage from "./pages/overview/OverviewPage";
// import UserHomePage from "./UserHomePage";
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
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/overview" element={<OverviewPage />} />

                {/* Admin-Only Routes */}
                <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                  <Route path="/admin/users" element={<UsersPage />} />
                  <Route
                    path="/admin/addedituser"
                    element={<AddEditUserPage />}
                  />
                  <Route
                    path="/admin/addedituser/:id"
                    element={<AddEditUserPage />}
                  />

                  <Route path="/admin/branches" element={<BranchesPage />} />
                  <Route
                    path="/admin/viewbranchdetail/:id"
                    element={<BranchDetailsPage />}
                  />
                  <Route
                    path="/admin/addeditbranch"
                    element={<AddEditBranchPage />}
                  />
                  <Route
                    path="/admin/addeditbranch/:id"
                    element={<AddEditBranchPage />}
                  />

                  <Route path="/admin/colleges" element={<CollegesPage />} />
                  <Route
                    path="/admin/collegedetails/:id"
                    element={<CollegeDetailsPage />}
                  />
                  <Route
                    path="/admin/addeditcollege"
                    element={<AddEditCollegePage />}
                  />
                  <Route
                    path="/admin/addeditcollege/:id"
                    element={<AddEditCollegePage />}
                  />

                  <Route path="/admin/country" element={<CountryPage />} />
                  <Route
                    path="/admin/addeditcountry"
                    element={<AddEditCountryPage />}
                  />
                  <Route
                    path="/admin/addeditcountry/:id"
                    element={<AddEditCountryPage />}
                  />

                  <Route path="/admin/state" element={<StatesPage />} />
                  <Route
                    path="/admin/addeditstate"
                    element={<AddEditStatePage />}
                  />
                  <Route
                    path="/admin/addeditstate/:id"
                    element={<AddEditStatePage />}
                  />

                  <Route path="/admin/city" element={<CityPage />} />
                  <Route
                    path="/admin/addeditcity"
                    element={<AddEditCityPage />}
                  />
                  <Route
                    path="/admin/addeditcity/:id"
                    element={<AddEditCityPage />}
                  />

                  <Route path="/admin/courses" element={<CoursesPage />} />
                  <Route
                    path="/admin/addeditcourse"
                    element={<AddEditCoursesPage />}
                  />
                  <Route
                    path="/admin/addeditcourse/:id"
                    element={<AddEditCoursesPage />}
                  />

                  <Route
                    path="/admin/collegecourse"
                    element={<CollegeCoursePage />}
                  />
                  <Route
                    path="/admin/addeditcollegecourse"
                    element={<AddEditCollegeCoursePage />}
                  />
                  <Route
                    path="/admin/addeditcollegecourse/:id"
                    element={<AddEditCollegeCoursePage />}
                  />
                  <Route
                    path="/admin/collegecoursedetails/:id"
                    element={<CollegeCourseDetailsPage />}
                  />
                </Route>
              </>
            )}

            {/* User Homepage (Different UI for Users) */}
            {/* <Route path="/dashboard" element={<UserHomePage />} /> */}
          </Route>

          {/* Shared Routes (Admin and User) */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
