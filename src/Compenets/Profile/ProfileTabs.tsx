import { FaUser, FaLock, FaTrash } from "react-icons/fa";

interface IProps {
  activeTab: string;
  setActiveTab: (tab: "profile" | "security" | "danger") => void;
}

const ProfileTabs = ({ activeTab, setActiveTab }: IProps) => {
  const tabs = [
    { id: "profile", label: "Profile Info", icon: FaUser, color: "#3B8D90" },
    { id: "security", label: "Security", icon: FaLock, color: "#3B8D90" },
    { id: "danger", label: "Delete ", icon: FaTrash, color: "#3B8D90" },
  ];

  return (
    <div className="flex border-b border-gray-300">
      {tabs.map(({ id, label, icon: Icon, color }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id as "profile" | "security" | "danger")}
          className={`flex-1 py-3 sm:py-4 px-2 sm:px-4 md:px-6 border-b-2 transition-all duration-300 ${
            activeTab === id
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
          style={{
            borderColor: activeTab === id ? color : "transparent",
            color: activeTab === id ? color : "",
          }}
        >
          <div className="flex flex-col gap-1.5 sm:gap-2 items-center justify-center">
            <Icon className="text-base sm:text-lg md:text-xl" />
            <span className="text-xs sm:text-sm md:text-base whitespace-nowrap">
              {label}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;