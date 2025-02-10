import { BarChart2, Book, Building, Building2, DollarSign, Earth, FolderOpenDot, GitGraphIcon, Layers, LucideEarth, LucideSchool, Magnet, MapPin, Menu, RadioReceiverIcon, RectangleVerticalIcon, School, SchoolIcon, Settings, ShoppingBag, ShoppingCart, TrendingUp, User2Icon, UserCheck, Users } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";


const SIDEBAR_ITEMS = [
	{
		name: "Dashboard",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	{ name: "Users", icon: Users, color: "#8B5CF6", href: "/users" },
	{ name: "Colleges", icon:School , color: "#EC4899", href: "/colleges" },
	{ name: "Courses", icon: FolderOpenDot, color: "#10B981", href: "/courses" },
	{ name: "Syllabus", icon:Layers, color: "#F59E0B", href: "/syllabus" },
	{ name: "Country", icon: Earth, color: "#2B8AF6", href: "/country" },
	{ name: "State", icon: GitGraphIcon, color: "#D447FF", href: "/state" },
	{ name: "City", icon: MapPin, color: "#00BFF6", href: "/city" },
	{ name: " College-Wise Courses ", icon: Building2, color: "#3B82F6", href: "/collegecourse" },
	{ name: "Profile", icon:User2Icon, color: "#6EE7B7", href: "/settings" },
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow overflow'>
					{SIDEBAR_ITEMS.map((item) => (
						<Link key={item.href} to={item.href}>
							<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
								<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
								<AnimatePresence>
									{isSidebarOpen && (
										<motion.span
											className='ml-4 whitespace-nowrap'
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2, delay: 0.3 }}
										>
											{item.name}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					))}
				</nav>
			</div>
		</motion.div>
	);
};
export default Sidebar;
