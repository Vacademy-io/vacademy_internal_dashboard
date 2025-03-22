import { SidebarItemsType } from "@/types/layout-container-types";
import { House, Scroll } from "@phosphor-icons/react";

export const SidebarItemsData: SidebarItemsType[] = [
    {
        icon: House,
        title: "Dashboard",
        to: "/dashboard",
    },
    {
        icon: Scroll,
        title: "Question Papers",
        to: "/question-papers",
    },
];
