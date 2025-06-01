import {
  BarChart2,
  Building2,
  Earth,
  FolderOpenDot,
  GitGraphIcon,
  Layers,
  MapPin,
  School,
  User2Icon,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS = [
  {
    name: "Dashboard",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin",
  },
  { name: "Users", icon: Users, color: "#8B5CF6", href: "/admin/users" },
  { name: "Colleges", icon: School, color: "#EC4899", href: "/admin/colleges" },
  {
    name: "Courses",
    icon: FolderOpenDot,
    color: "#10B981",
    href: "/admin/courses",
  },
  { name: "Branches", icon: Layers, color: "#F59E0B", href: "/admin/branches" },
  { name: "Country", icon: Earth, color: "#2B8AF6", href: "/admin/country" },
  { name: "State", icon: GitGraphIcon, color: "#D447FF", href: "/admin/state" },
  { name: "City", icon: MapPin, color: "#00BFF6", href: "/admin/city" },
  {
    name: " College-Wise Courses ",
    icon: Building2,
    color: "#3B82F6",
    href: "/admin/collegecourse",
  },
  {
    name: "Profile",
    icon: User2Icon,
    color: "#6EE7B7",
    href: "/admin/dashboard",
  },
];

const Sidebar = () => {
  return (
    <div className="fixed z-10 h-screen w-64 bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
      <nav className="mt-8 flex-grow overflow-y-auto">
        {SIDEBAR_ITEMS.map((item) => (
          <Link key={item.href} to={item.href}>
            <div className="flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
              <item.icon
                size={20}
                style={{ color: item.color, minWidth: "20px" }}
              />
              <span className="ml-4 whitespace-nowrap">{item.name}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
