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

export const INITIAL_STATUS = { uploading: false };

export const RECIPE_SCHEMA = Yup.object().shape({
  photo: Yup.string(),
  title: Yup.string().min(3, "Title too short!").max(50, "Title too long!").required("Required"),
  source: Yup.string(),
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

export const MAIN_INGREDIENT_OPTIONS = [
  { label: "Beans", value: "beans" },
  { label: "Beef", value: "beef" },
  { label: "Cheese", value: "cheese" },
  { label: "Chicken", value: "chicken" },
  { label: "Chocolate", value: "chocolate" },
  { label: "Eggs", value: "eggs" },
  { label: "Fish", value: "fish" },
  { label: "Fruit", value: "fruit" },
  { label: "Lamb", value: "lamb" },
  { label: "Milk", value: "milk" },
  { label: "Pasta", value: "pasta" },
  { label: "Pork", value: "pork" },
  { label: "Rice & Grains", value: "rice-grains" },
  { label: "Tomato", value: "tomato" },
  { label: "Vegetables", value: "vegetables" }
];

export const TAGS_OPTIONS = [
  { label: "Bread", value: "Bread" },
  { label: "Breakfast", value: "Breakfast" },
  { label: "Cheap", value: "Cheap" },
  { label: "Chicken", value: "Chicken" },
  { label: "Dessert", value: "Dessert" },
  { label: "Dinner", value: "Dinner" },
  { label: "Easy", value: "Easy" },
  { label: "Freezer", value: "Freezer" },
  { label: "Freezes well", value: "Freezes well" },
  { label: "Healthy", value: "Healthy" },
  { label: "Kid-friendly", value: "Kid-friendly" },
  { label: "Lunch", value: "Lunch" },
  { label: "Oven-baked", value: "Oven-baked" },
  { label: "Pasta", value: "Pasta" },
  { label: "Quick", value: "Quick" },
  { label: "Snack", value: "Snack" },
  { label: "Soup", value: "Soup" },
  { label: "Steamed", value: "Steamed" }
];
