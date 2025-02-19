import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Sidebar from "./components/common/Sidebar";
import UsersPage from "./pages/users/UsersPage";
import AddEditUserPage from "./pages/users/AddEditUserPage";
import SyllabusPage from "./pages/syllabus/SyllabusPage";
import AddEditSyllabusPage from "./pages/syllabus/AddEditSyllabusPage";
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

function App() {
  return (
    <div className="flex h-screen bg-black text-gray-100 overflow-hidden">
      {/* BG */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />
      <Toaster />
      <Routes>
        <Route path="/" element={<OverviewPage />} />

        <Route path="/users" element={<UsersPage />} />
        <Route path="/addedituser" element={<AddEditUserPage />} />
        <Route path="/addedituser/:id" element={<AddEditUserPage />} />

        <Route path="/branches" element={<BranchesPage />} />
        <Route path="/viewbranchdetail/:id" element={<BranchDetailsPage />} />

        <Route path="/addeditsyllabus" element={<AddEditSyllabusPage />} />
        <Route path="/addeditsyllabus/:id" element={<AddEditSyllabusPage />} />

        <Route path="/colleges" element={<CollegesPage />} />
        <Route path="/collegedetails/:id" element={<CollegeDetailsPage />} />
        <Route path="/addeditcollege" element={<AddEditCollegePage />} />
        <Route path="/addeditcollege/:id" element={<AddEditCollegePage />} />
        <Route path="/viewcollege" element={<CollegeDetailsPage />} />

        <Route path="/country" element={<CountryPage />} />
        <Route path="/addeditcountry" element={<AddEditCountryPage />} />
        <Route path="/addeditcountry/:id" element={<AddEditCountryPage />} />

        <Route path="/state" element={<StatesPage />} />
        <Route path="/addeditstate" element={<AddEditStatePage />} />
        <Route path="/addeditstate/:id" element={<AddEditStatePage />} />

        <Route path="/city" element={<CityPage />} />
        <Route path="/addeditcity" element={<AddEditCityPage />} />
        <Route path="/addeditcity/:id" element={<AddEditCityPage />} />

        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/addeditcourse" element={<AddEditCoursePage />} />
        <Route path="/addeditcourse/:id" element={<AddEditCoursePage />} />

        <Route path="/collegecourse" element={<CollegeCoursePage />} />
        <Route
          path="/addeditcollegecourse/:id"
          element={<AddEditCollegeCoursePage />}
        />
        <Route
          path="/addeditcollegecourse"
          element={<AddEditCollegeCoursePage />}
        />
        <Route
          path="/collegecoursedetails/:id"
          element={<CollegeCourseDetailsPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
