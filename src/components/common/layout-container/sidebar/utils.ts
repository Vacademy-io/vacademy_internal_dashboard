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
    // TODO : create the side bar option for taging
    // {
    //     icon: Scroll,
    //     title: "Assessment Centre",
    //     to: "/assessment",
    //     subItems: [
    //         {
    //             subItem: "Examination",
    //             subItemLink: "/assessment/exam",
    //         },
    //         {
    //             subItem: "Mock Test",
    //             subItemLink: "/assessment/create-assessment/LIVE_QUIZ",
    //         },
    //         {
    //             subItem: "Practice Test",
    //             subItemLink: "/assessment/create-assessment/PRACTICE",
    //         },
    //         {
    //             subItem: "Survey",
    //             subItemLink: "/assessment/create-assessment/SURVEY",
    //         },
    //         {
    //             subItem: "Question Papers",
    //             subItemLink: "/assessment/question-papers",
    //         },
    //     ],
    // },
];
