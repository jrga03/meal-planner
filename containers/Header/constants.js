import React from "react";
import RestaurantIcon from "@material-ui/icons/Restaurant";
// import AppsIcon from "@material-ui/icons/Apps";
// import DateRangeIcon from "@material-ui/icons/DateRange";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export const APP_NAME = "Meal Planner";

export const NAVIGATION_ITEMS = [
  {
    title: "Cook",
    items: [
      // TODO:
      // {
      //   Icon: (props) => <AppsIcon { ...props } />,
      //   primary: "Categories",
      //   href: "/categories"
      // },
      // TODO:
      {
        Icon: (props) => <RestaurantIcon { ...props } />,
        primary: "Recipes",
        href: "/recipes"
      },
      {
        Icon: (props) => <AddCircleIcon { ...props } />,
        primary: "Add a Recipe"
      }
    ]
  },
  // TODO:
  // {
  //   title: "Plan",
  //   items: [
  //     {
  //       Icon: (props) => <DateRangeIcon { ...props } />,
  //       primary: "Plan Meals",
  //       href: "/plan"
  //     }
  //   ]
  // }
  // TODO:
];
