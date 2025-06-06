import { Building, MapPin, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import { useState } from "react";
import CityTable from "./CitysTable";

const CityPage = () => {
  const [cityStats, setCityStats] = useState(0);

  const updateCityStats = (total) => {
    setCityStats(total);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Cities" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Cities"
            icon={Building}
            value={cityStats}
            color="#6366F1"
          />
          <StatCard
            name="New Cities Today"
            icon={MapPin}
            value={2222}
            color="#10B981"
          />
          <StatCard
            name="Active Users"
            icon={UserCheck}
            value="Soon!"
            color="#F59E0B"
          />
          <StatCard
            name="Churn Rate"
            icon={UserX}
            value="Soon!"
            color="#EF4444"
          />
        </motion.div>

        <CityTable updateCityStats={updateCityStats} />
      </main>
    </div>
  );
};

export default CityPage;
