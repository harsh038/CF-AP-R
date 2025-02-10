import { UserCheck, UserPlus, UsersIcon, UserX } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../../components/common/Header";
import StatCard from "../../components/common/StatCard";
import CollegeCourseTable from "../../components/collegeCourses/CollegeCourseTable";


const CollegeCourseStats = {
	totalCollegeCourse: 152845,
	newCollegeCourseToday: 243,
	activeCollegeCourse: 98520,
	churnRate: "2.4%",
};

const CollegeCoursePage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='College-Courses' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard
						name='Total CollegeWiseCourse'
						icon={UsersIcon}
						value={CollegeCourseStats.totalCollegeCourse.toLocaleString()}
						color='#6366F1'
					/>
					<StatCard name='New CollegeWiseCourse Today' icon={UserPlus} value={CollegeCourseStats.newCollegeToday} color='#10B981' />
					<StatCard
						name='Active Users'
						icon={UserCheck}
						value={CollegeCourseStats.activeCollegeCourse.toLocaleString()}
						color='#F59E0B'
					/>
					<StatCard name='Churn Rate' icon={UserX} value={CollegeCourseStats.churnRate} color='#EF4444' />
				</motion.div>

				<CollegeCourseTable/>				
			</main>
		</div>
	);
};
export default CollegeCoursePage;
