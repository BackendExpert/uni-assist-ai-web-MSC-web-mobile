import {
    BiSolidDashboard,
    BiBuildings,
    BiShield,
    BiSolidMegaphone,
} from "react-icons/bi";

import {
    FaUsers,
    FaUserShield,
    FaClipboardList,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaSchool,
    FaBook,
    FaCalendarAlt,
    FaUserCheck,
    FaTasks,
    FaClipboardCheck,
    FaChartLine,
    FaChartBar,
    FaFileAlt,
    FaBullhorn,
    FaEnvelope,
    FaBell,
    FaBuilding,
    FaGraduationCap,
    FaCreditCard,
    FaRobot
} from "react-icons/fa";

import {
    MdBusiness,
    MdWorkspacePremium,
    MdSecurity,
    MdSettings,
    MdHistory,
    MdAssessment,
    MdPeople,
    MdAdminPanelSettings,
    MdFolder,
    MdFactCheck,
} from "react-icons/md";
import { BsDatabaseFillGear } from "react-icons/bs";


export const Admin = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "System",
        items: [
            {
                name: "System Management",
                icon: <BiBuildings />,
                submenu: [
                    {
                        name: "Platform users",
                        link: "/dashboard/platfrom-users",
                    },
                    {
                        name: "Create Platform user",
                        link: "/dashboard/user/create",
                    },
                ],
            },
            {
                name: "Chatbot Management",
                icon: <FaRobot />,
                submenu: [
                    {
                        name: "Chatbot Data",
                        link: "/dashboard/website/chatbot",
                    },
                    {
                        name: "Add New Document",
                        link: "/dashboard/website/create-system-files",
                    },
                ],
            },
            {
                name: "Announcements Management",
                icon: <BiSolidMegaphone />,
                submenu: [
                    {
                        name: "Announcements",
                        link: "/dashboard/announcements/manage",
                    },
                    {
                        name: "Add New Document",
                        link: "/dashboard/announcement/create",
                    },
                ],
            },
        ],
    },
    {
        section: "other",
        items: [
            {
                name: "Resource Management",
                icon: <BsDatabaseFillGear />,
                submenu: [
                    {
                        name: "Resources",
                        link: "/dashboard/resources",
                    },
                    {
                        name: "Create New  Resource",
                        link: "/dashboard/resource/create",
                    },
                    {
                        name: "Bookmarked Resource",
                        link: "/dashboard/resource/bookmarked",
                    },
                    {
                        name: "Start AI Chatting",
                        link: "/dashboard/resource/chat-assist",
                    },
                ],
            },
        ],
    },
    {
        section: "Plans",
        items: [
            {
                name: "Plans Management",
                icon: <MdFactCheck />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New  Plan",
                        link: "/dashboard/Plan/create",
                    },
                ],
            },
        ],
    },
    {
        section: "Security",
        items: [
            {
                name: "Security Management",
                icon: <MdSecurity />,
                submenu: [
                    {
                        name: "Login history",
                        link: "/dashboard/security/login-history",
                    },
                    {
                        name: "Audit Logs",
                        link: "/dashboard/security/audit-logs",
                    },
                ],
            },
        ],
    },
];


export const studentMenu = [
    {
        section: "Main",
        items: [
            {
                name: "Dashboard",
                link: "/dashboard",
                icon: <BiSolidDashboard />,
            },
        ],
    },
    {
        section: "Main",
        items: [
            {
                name: "Announcements",
                icon: <BiSolidMegaphone />,
                submenu: [
                    {
                        name: "Announcements",
                        link: "/dashboard/my-announcements",
                    },
                ],
            },
        ],
    },
    {
        section: "Resource",
        items: [
            {
                name: "Resource Management",
                icon: <BsDatabaseFillGear />,
                submenu: [
                    {
                        name: "Resources",
                        link: "/dashboard/resources",
                    },
                    {
                        name: "Create New  Resource",
                        link: "/dashboard/resource/create",
                    },
                    {
                        name: "Bookmarked Resource",
                        link: "/dashboard/resource/bookmarked",
                    },
                    {
                        name: "Start AI Chatting",
                        link: "/dashboard/resource/chat-assist",
                    },
                ],
            },
        ],
    },
    {
        section: "Plans",
        items: [
            {
                name: "Plans Management",
                icon: <MdFactCheck />,
                submenu: [
                    {
                        name: "Plans",
                        link: "/dashboard/plans",
                    },
                    {
                        name: "Create New  Plan",
                        link: "/dashboard/Plan/create",
                    },
                ],
            },
        ],
    },
];

export const menus = {
    admin: Admin,
    student: studentMenu,
};