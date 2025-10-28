import { h } from "vue";
import { LayoutGrid } from "lucide-vue-next";

export const apiUrl = import.meta.env.VITE_API_URL;

export const ticketStatus = {
  open: "bg-green-400",
  closed: "bg-red-400",
  in_progress: "bg-yellow-400",
};

export const ticketPriority = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-yellow-200/70 text-yellow-700",
  high: "bg-red-50 text-red-600",
};

// Using Vue's `h()` to render components dynamically instead of JSX
export const sidebarLinks = [
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: h(LayoutGrid, { class: "size-5" }),
  },
];
