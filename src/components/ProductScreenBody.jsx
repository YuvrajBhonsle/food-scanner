import { FiCoffee } from "react-icons/fi";
import {BsFillClipboard2DataFill} from "react-icons/bs"
import {MdDescription, MdFoodBank} from "react-icons/md"
import {GiMuscleUp} from "react-icons/gi"
import { useState } from "react";
import React from "react";
import ClassificationSection from "./Classification";
import NutritionSection from "./Nutrients";
import IngredientsSection from "./Ingredients";
import DescriptionSection from "./Description";

const ProductScreenBody = ({
  barcodeValue,
  image,
  productName,
  brandName,
  servingSize,
  weight,
  country,
  category,
  ingredients,
  nutritionDataGram,
  nutritionData,
  labels,
}) => {
  const [display, setDisplay] = useState("Classification");

  const labelsArray = labels?.split(",");

  // const parseIngredients = (ingredientString) => {
  //   const regex = /([^,(]+(?: \([^)]+\))?)(?: \(([^)]+)\))?/g;
  //   const ingredientsArray = [];
  //   let match;

  //   while ((match = regex.exec(ingredientString))) {
  //     const [, ingredientName, value] = match;
  //     const processedValue = value ? value.replace(/,\s*/g, ', ') : 'N/A';
  //     ingredientsArray.push({
  //       name: ingredientName.trim(),
  //       value: processedValue,
  //     });
  //   }

  //   return ingredientsArray;
  // };

  // const ingredientsList = ingredients.split(/,(?!\s*$)(?![^(]*\))/).map(item => {
  //   const [key, ...values] = item.split(/\(([^)]*)\)/);
  //   const value = values.length > 0 ? values.join('') : 'N/A';
  //   return { key: key.trim(), value };
  // });

  const ingredientsList = ingredients
    ?.split(/,(?!\s*$)(?![^(]*\))/)
    .map((item) => {
      const [key, ...values] = item.split(/\(([^)]*)\)/);
      let value = values.length > 0 ? values.join("") : "N/A";
      if (value.includes("(") && !value.includes(")")) {
        // Add a closing parenthesis to the value if it contains an open parenthesis but no closing parenthesis
        value += ")";
      }
      return { key: key.trim(), value };
    });

  // const ingredientsList = parseIngredients(ingredients);

  // Filter out the nutriments with "_100g" in their key and have a value other than 0
  const filteredNutriments = Object.entries(nutritionData)?.filter(
    ([key, value]) => key.includes("_100g") && value !== 0
  );

  return (
    <section className="mt-3 max-w-full overflow-scroll">
      <main className="flex justify-center gap-4 sm:gap-8">
        <div
          onClick={() => setDisplay("Classification")}
          className={`flex flex-col items-center cursor-pointer pb-1 ${
            display === "Classification"
              ? "border-b border-black"
              : "border-none"
          }`}
        >
          <BsFillClipboard2DataFill style={{ fontSize: "2rem", color: display === "Classification" ? "#808080" : "black" }} />
          <h1 className="text-sm">Classification</h1>
        </div>
        <div
          onClick={() => setDisplay("Description")}
          className={`flex flex-col items-center cursor-pointer pb-1 ${
            display === "Description" ? "border-b border-black" : "border-none"
          }`}
        >
          <MdDescription style={{ fontSize: "2rem", color: display === "Description" ? "#808080" : "black" }} />
          <h1 className="text-sm">Description</h1>
        </div>
        <div
          onClick={() => setDisplay("Ingredients")}
          className={`flex flex-col items-center cursor-pointer pb-1 ${
            display === "Ingredients" ? "border-b border-black" : "border-none"
          }`}
        >
          <MdFoodBank style={{ fontSize: "2rem", color: display === "Ingredients" ? "#808080" : "black" }} />
          <h1 className="text-sm">Ingredients</h1>
        </div>
        <div
          onClick={() => setDisplay("Nutrition")}
          className={`flex flex-col items-center cursor-pointer pb-1 ${
            display === "Nutrition" ? "border-b border-black" : "border-none"
          }`}
        >
          <GiMuscleUp style={{ fontSize: "2rem", color: display === "Nutrition" ? "#808080" : "black" }} />
          <h1 className="text-sm">Nutrition</h1>
        </div>
      </main>

      <div className="max-w-full py-2">
        {display === "Classification" && (
          <ClassificationSection labelsArray={labelsArray} />
        )}
        {display === "Description" && (
          <DescriptionSection
            brandName={brandName}
            weight={weight}
            country={country}
            category={category}
          />
        )}
        {display === "Ingredients" && (
          <IngredientsSection ingredientsList={ingredientsList} />
        )}
        {display === "Nutrition" && (
          <NutritionSection
            filteredNutriments={filteredNutriments}
            nutritionDataGram={nutritionDataGram}
          />
        )}
      </div>
    </section>
  );
};

export default ProductScreenBody;
