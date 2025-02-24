import { FileInput, FileText, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import CountryTable from "./CountryTable";

const countryStats = {
  totalCountrys: 152845,
  newCountrysToday: 243,
  activeCountrys: 98520,
  churnRate: "2.4%",
};

const CountryPage = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Country" />

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
            value={countryStats.totalCountrys}
            color="#6366F1"
          />
          <StatCard
            name="New Syllabus Today"
            icon={FileInput}
            value={countryStats.newCountrysToday}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value={countryStats.activeCountrys}
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value={countryStats.churnRate}
            color="#EF4444"
          />
        </motion.div>

        <CountryTable/>
      </main>
    </div>
  );
};
export default CountryPage;
