import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5050/api/Course")
      .then((res) => res.json())
      .then((data) => setCourses(data))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-soky py-25 px-4 md:px-16">
        <h2 className="text-3xl font-bold text-black mb-8 text-center">
          Explore Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.courseID}
              className="bg-slate-950 rounded-2xl shadow-xl p-6 border border-slate-700 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="text-blue-400" size={22} />
                  <h3 className="text-lg font-semibold text-white">
                    {course.name}
                  </h3>
                </div>
                <span className="text-sm bg-blue-800 text-white px-3 py-1 rounded-full">
                  {course.duration}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseList;
