import * as Yup from "yup";

export const INITIAL_VALUES = {
  photo: "",
  title: "",
  source: "",
  description: "",
  "prep-hours": "",
  "prep-minutes": "",
  "cook-hours": "",
  "cook-minutes": "",
  ingredients: [
    {
      amount: "",
      unit: "",
      ingredient: "",
      note: ""
    }
  ],
  "prep-notes": [],
  directions: "",
  "main-ingredient": "",
  tags: []
};

export const RECIPE_SCHEMA = Yup.object().shape({
  photo: Yup.string(),
  title: Yup.string().min(3, "Title too short!").max(50, "Title too long!").required("Required"),
  source: Yup.string().url("Source must be a URL"),
  description: Yup.string(),
  "prep-hours": Yup.string(),
  "prep-minutes": Yup.string(),
  "cook-hours": Yup.string(),
  "cook-minutes": Yup.string(),
  ingredients: Yup.array().of(
    Yup.object().shape({
      amount: Yup.string(),
      unit: Yup.string(),
      ingredient: Yup.string(),
      note: Yup.string()
    })
  ),
  "prep-notes": Yup.array().of(
    Yup.object().shape({
      time: Yup.number(),
      note: Yup.string()
    })
  ),
  directions: Yup.string(),
  "main-ingredient": Yup.string().required("Required"),
  tags: Yup.array().of(Yup.string())
});

export const PREP_TIME_OPTIONS = [
  { label: "The day itself", value: 0 },
  { label: "1 day before", value: 1 },
  { label: "2 days before", value: 2 },
  { label: "3 days before", value: 3 },
  { label: "4 days before", value: 4 },
  { label: "5 days before", value: 5 },
  { label: "6 days before", value: 6 },
  { label: "1 week before", value: 7 }
];

export const PREP_TIME_MAPPING = PREP_TIME_OPTIONS.reduce((acc, cur) => {
  acc[cur.value] = cur.label;
  return acc;
}, {});

export const MAIN_CATEGORY_OPTIONS = [
  { label: "Pork", value: "pork" },
  { label: "Chicken", value: "chicken" },
  { label: "Beef", value: "beef" },
  { label: "Fish", value: "fish" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Pasta", value: "pasta" },
  { label: "Soup", value: "soup" },
  { label: "Eggs", value: "eggs" },
  { label: "Rice & Grains", value: "rice-grains" },
  { label: "Sauce", value: "sauce" },
  { label: "Beverage", value: "beverage" },
  { label: "Fruit", value: "fruit" },
  { label: "Lamb", value: "lamb" },
  { label: "Others", value: "others" }
];

export const TAGS_OPTIONS = [
  "Bread",
  "Breakfast",
  "Cheap",
  "Chicken",
  "Dessert",
  "Dinner",
  "Easy",
  "Freezer",
  "Freezes well",
  "Healthy",
  "Kid-friendly",
  "Lunch",
  "Oven-baked",
  "Pasta",
  "Quick",
  "Snack",
  "Soup",
  "Steamed"
];

export const IMPORT_STATUSES = {
  NONE: "none",
  UNFETCHED: "unfetched",
  FETCHING: "fetching",
  DONE: "done"
};
