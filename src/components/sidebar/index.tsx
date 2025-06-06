import { ExitIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Logo from "@/assets/logo-icon.svg"; 
import Dashboard from "@/assets/dashboard-icon.svg"; 
import Courses from "@/assets/course-icon.svg"; 
import Users_Management from "@/assets/user_management-icon.svg"; 
import System_Analystic from "@/assets/analystic-icon.svg";
import Logout from "@/assets/logout-icon.svg";


export default function Sidebar() {
  const SIDEBAR_ITEMS_CONSTANTS = [
    { name: "Dashboard", icon: Dashboard },
    { name: "Courses", icon: Courses },
    { name: "Users Management", icon: Users_Management },
    { name: "System Analystic", icon: System_Analystic },
  ];
  return (
    <div className="w-[248px] h-screen bg-[var(--background-color-1)] text-black flex flex-col justify-between p-4">
      {/* Top section */}
      <div>
        {/* Logo */}
        <div className="mb-4 h-[50px] mt-2">
          <Image src={Logo} alt="Logo" width={100} height={100} />
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {SIDEBAR_ITEMS_CONSTANTS.map((item, index) => (
            <li
              key={index}
              className="flex items-center gap-2  py-3 hover:bg-gray-800 rounded cursor-pointer border-b border-gray-300 text-[14px]"
            >
              <span>
                <Image className="text-red" src={item.icon} alt={item.name} width={30} height={30} />
              </span>
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout at bottom */}
      <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded cursor-pointer">
        <ExitIcon />
        <span><Image src={Logout} alt="Logout" width={20} height={20}></Image></span>
      </div>
    </div>
  );
}
