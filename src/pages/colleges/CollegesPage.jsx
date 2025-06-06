import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import CollegesTable from "./CollegesTable";

const collegeStats = {
  totalCollege: 152845,
  newCollegeToday: 243,
  activeCollege: 98520,
  churnRate: "2.4%",
};

const CollegePage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Colleges" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total College"
            icon={UsersIcon}
            value={collegeStats.totalCollege.toLocaleString()}
            color="#6366F1"
          />
          <StatCard
            name="New Users Today"
            icon={UserPlus}
            value={collegeStats.newCollegeToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={collegeStats.activeCollege.toLocaleString()}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={collegeStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <CollegesTable />
      </main>
    </div>
  );
};
export default CollegePage;
