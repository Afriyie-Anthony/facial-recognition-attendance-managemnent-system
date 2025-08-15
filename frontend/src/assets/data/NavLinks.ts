import { BarChart2, Users, User, ClipboardList, Settings } from "lucide-react";

export const navLinks = [
  {
    title: "Main",
    menuItems: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: BarChart2,
      },
      {
        label: "Students",
        to: "students",
        icon: Users,
      },
      {
        label: "Teacher",
        to: "teacher",
        icon: User,
      },
      {
        label: "Attendance Records",
        to: "attendance-records",
        icon: ClipboardList,
      },
      {
        label: "Settings",
        to: "settings",
        icon: Settings,
      },
    ],
  },
];
