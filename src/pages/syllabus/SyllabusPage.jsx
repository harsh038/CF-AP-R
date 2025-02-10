import { FileInput, FileText, UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import SyllabusTable from "../../components/syllabus/SyllabusTable";
import { useState } from "react";

const SyllabusPage = () => {
  const [syllabusStats, setSyllabusStats] = useState({
    totalCount: 0,
    newTodayCount: 0,
  });

  const updateSyllabusStats = (total, newToday) => {
    setSyllabusStats({ totalCount: total, newTodayCount: newToday });
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Syllabus" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        {/* STATS */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Syllabuses"
            icon={FileText}
            value={syllabusStats.totalCount}
            color="#6366F1"
          />
          <StatCard
            name="New Syllabus Today"
            icon={FileInput}
            value={syllabusStats.newTodayCount}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={"Soon!"}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={"Soon!"}
            color="#EF4444"
          />
        </motion.div>

        <SyllabusTable updateSyllabusStats={updateSyllabusStats} />
      </main>
    </div>
  );
};
export default SyllabusPage;
