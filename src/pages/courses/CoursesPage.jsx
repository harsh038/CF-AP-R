import { BookOpenIcon, Clock, PlusCircle, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import CoursesTable from "./CoursesTable";

const courseStats = {
  totalCourses: 125,
  longestDuration: "4 years",
  recentlyAdded: 10,
};

const CoursesPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Courses" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Courses"
            icon={BookOpenIcon}
            value={courseStats.totalCourses}
            color="#6366F1"
          />
          <StatCard
            name="Longest Duration"
            icon={Clock}
            value={courseStats.longestDuration}
            color="#10B981"
          />
          <StatCard
            name="Recently Added"
            icon={PlusCircle}
            value={courseStats.recentlyAdded}
            color="#F59E0B"
          />
        </motion.div>

        <CoursesTable />
      </main>
    </div>
  );
};
export default CoursesPage;
