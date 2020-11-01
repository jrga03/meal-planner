/**
 * Constants
 */

// Use only common ingredients as main ingredients
const MAIN_INGREDIENTS = ["beef", "chicken", "fish", "lamb", "pork"];

const COMMON_INGREDIENT_UNITS = [
  "teaspoons", "teaspoon", "tsp.", "tsp",
  "tablespoons", "tablespoon", "tbl.", "tbl", "tbs.", "tbs", "tbsp.", "tbsp",
  "fluid ounce", "fl oz", "fl. oz.",
  "gills", "gill",
  "cups", "cup", "c",
  "pints", "pint", "p.", "p", "pt.", "pt", "fl. pt.", "fl pt",
  "quarts", "quart", "qt.", "q.", "fl. qt.", "qt", "q", "fl qt",
  "gallons", "gallon", "gal.", "gal",
  "milliliters", "milliliter", "millilitres", "millilitre", "cc.", "cc", "mL", "ml",
  "liters", "liter", "litres", "litre", "L", "l",
  "pounds", "pound", "lbs.", "lbs", "lb.", "lb",
  "ounces", "ounce", "oz.", "oz",
  "milligrams", "milligrammes", "milligram", "milligramme", "mg.", "mg",
  "grams", "grammes", "gram", "gramme", "g.", "g",
  "kilograms", "kilogrammes", "kilogram", "kilogramme", "kilos", "kilo", "kgs.", "kg.", "kgs", "kg",
  "pinch", "cloves", "clove", "strips", "strip"
];

const FRACTION_MAPPING = {
  188: "1/4",
  189: "1/2",
  190: "3/4",
  8528: "1/7",
  8529: "1/9",
  8530: "1/10",
  8531: "1/3",
  8532: "2/3",
  8533: "1/5",
  8534: "2/5",
  8535: "3/5",
  8536: "4/5",
  8537: "1/6",
  8538: "5/6",
  8539: "1/8",
  8540: "3/8",
  8541: "5/8",
  8542: "7/8"
};

/**
 * Convert duration string to readable format
 * @param {string} duration - ISO 8601 duration format
 * @see https://en.wikipedia.org/wiki/ISO_8601#Durations
 * @returns {{ hours: number, minutes: number }} duration
 */
function parseDuration(duration = "") {
  const regexp = new RegExp(
    /(P((?<year>\d+)Y)?((?<month>\d+)M)?((?<week>\d+)W)?((?<day>\d+)D)?)?(T((?<hour>\d+)H)?((?<minute>\d+)M)?((?<second>\d+)S)?)?/
  );
  const {
    groups: { year, month, week, day, hour, minute }
  } = duration.match(regexp);

  let hours = parseInt(hour, 10) || 0;

  if (year) hours += parseInt(year || 0, 10) * 8760;
  if (month) hours += parseInt(month || 0, 10) * 730;
  if (week) hours += parseInt(week || 0, 10) * 168;
  if (day) hours += parseInt(day || 0, 10) * 24;

  return {
    hours,
    minutes: minute || 0
  };
}

/**
 * Generate instructions from an array of instructions
 * @param {object[]|string} instructions
 * @param {string} instructions.text - Instructions text
 * @returns {string} Instructions as text
 */
function generateInstructionsString(instructions = []) {
  if (typeof instructions === "string") {
    return instructions;
  }

  return instructions
    .reduce((str, instruction) => {
      return str.concat(instruction.text).concat("\n\n");
    }, "")
    .trim();
}

/**
 * Format recipe tags
 * @param {string|string[]} tags
 * @returns {string[]}
 */
function formatRecipeTags(tags = []) {
  if (typeof tags === "string") {
    return [tags.toLowerCase()];
  }

  return tags.map((tag) => tag.toLowerCase());
}

/**
 * Guess main ingredient from list of ingredients
 * @param {string|string[]} ingredients
 */
function getMainIngredient(ingredients = []) {
  if (typeof ingredients === "string") {
    const match = MAIN_INGREDIENTS.find((main) => ingredients.includes(main));
    return match || "";
  }

  const match = MAIN_INGREDIENTS.find((main) => ingredients.some((ingredient) => ingredient.includes(main)));
  return match || "";
}

/**
 * Format recipe ingredients
 * @param {string[]} ingredients
 * @returns {object[]}
 */
function parseIngredients(ingredients = []) {
  try {
    return ingredients.map((_ingredient) => {
      let note = "";
      let withoutNote = _ingredient;
      const commaIndex = _ingredient.indexOf(",");
      if (commaIndex > -1) {
        note = _ingredient.slice(commaIndex + 1).trim();
        withoutNote = _ingredient.slice(0, commaIndex);
      }

      const parensRegex = new RegExp(/\((?<additionalNote>.+)\)/);
      if (parensRegex.test(withoutNote)) {
        const {
          groups: { additionalNote }
        } = withoutNote.match(parensRegex);
        note = `${additionalNote}${note ? ", " : ""}${note}`;
        withoutNote = withoutNote.replace(parensRegex, "").replace(/\s{2,}/g, " ");
      }

      // convert numbers to fractions
      const withoutNoteParsedAndSplit = withoutNote
        .split(/\s|,/)
        .map((item) => FRACTION_MAPPING[item.charCodeAt()] || item);
      const unitIndex = withoutNoteParsedAndSplit.findIndex((word) => COMMON_INGREDIENT_UNITS.includes(word));

      let unit = "";
      let amount = "";
      let ingredient = "";
      if (unitIndex > -1) {
        amount = withoutNoteParsedAndSplit.slice(0, unitIndex).join(" ");
        unit = withoutNoteParsedAndSplit[unitIndex];
        ingredient = withoutNoteParsedAndSplit.slice(unitIndex + 1).join(" ");
      } else {
        const joined = withoutNoteParsedAndSplit.join(" ").replace(/\s,/g, ",");
        const amountIngredientRegexp = new RegExp(
          /(?<parsedAmount>\d+\s\d+\/\d+|\d+\/\d+|\d+)?(?<parsedIngredient>.+)/
        );
        const {
          groups: { parsedAmount, parsedIngredient }
        } = joined.match(amountIngredientRegexp);
        amount = (parsedAmount || "").trim();
        ingredient = (parsedIngredient || "").trim();
      }

      return {
        note,
        unit,
        amount,
        ingredient
      };
    });
  } catch (error) {
    console.log("Error in parseIngredients", error);
    return [];
  }
}

/**
 * Get recipe URL
 * @param {object|string} imageData
 * @returns {string}
 */
function getRecipePhoto(imageData) {
  if (typeof imageData === "string") {
    return imageData || "";
  }

  if (imageData?.["@type"] === "ImageObject") {
    return imageData?.url || "";
  }

  return "";
}

/**
 * Get source
 * @param {string|object} recipe
 * @returns {string}
 */
function getSource(recipe) {
  if (recipe.mainEntityOfPage) {
    return recipe.mainEntityOfPage;
  }

  if (Array.isArray(recipe?.isPartOf)) {
    const webPage = recipe.isPartOf.find((data) => data?.["@type"] === "WebPage");
    return webPage?.url || "";
  }

  if (recipe?.isPartOf?.["@type"] === "WebPage") {
    return recipe?.isPartOf?.url || "";
  }
}

/**
 * Check if Recipe type
 * @param {object} object
 * @returns {boolean}
 */
export function isRecipeType(object) {
  return object?.["@type"] === "Recipe";
}

/**
 * Extract recipe data
 * @param {object} recipe - Recipe data
 * @returns {object}
 */
export function extractRecipeInitialValues(recipe = {}) {
  return {
    photo: getRecipePhoto(recipe.image),
    title: recipe.name || "",
    source: getSource(recipe),
    description: recipe.description || "",
    "prep-hours": `${parseDuration(recipe.prepTime).hours}`,
    "prep-minutes": `${parseDuration(recipe.prepTime).minutes}`,
    "cook-hours": `${parseDuration(recipe.cookTime).hours}`,
    "cook-minutes": `${parseDuration(recipe.cookTime).minutes}`,
    ingredients: parseIngredients(recipe.recipeIngredient),
    "prep-notes": [],
    directions: generateInstructionsString(recipe.recipeInstructions),
    "main-ingredient": getMainIngredient(recipe.recipeIngredient),
    tags: formatRecipeTags(recipe.recipeCategory)
  };
}
