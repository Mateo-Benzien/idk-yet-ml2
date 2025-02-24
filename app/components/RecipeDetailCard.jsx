"use client"

import { useState } from "react";
import Image from 'next/image';

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const RecipeDetailCard = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images[0]);

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
        <Image
    src={selectedImage}
    alt={recipe.title}
    width={540} // Define the width directly in the component
    height={403} // Define the height directly in the component
    className="rounded-lg object-cover"
/>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {recipe.images.map((image, index) => (
            <Image
    key={index}
    src={image}
    alt={`Thumbnail ${index}`}
    width={64} // Set width to 64px (16 * 4) for the thumbnail
    height={64} // Set height to 64px
    className={`rounded-md cursor-pointer object-cover ${
        selectedImage === image ? "border-2 border-gray-800" : ""
    }`}
    onClick={() => setSelectedImage(image)}
/>
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{recipe.title}</h1>

        <div className="flex flex-wrap gap-2 my-4">
          {recipe.tags &&
            recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        <p className="text-lg italic text-gray-600 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "any occasion"}.
        </p>

        <div className="text-lg text-gray-800 space-y-2">
          <p>
            <strong>Prep Time:</strong> {formatTime(recipe.prep)}
          </p>
          <p>
            <strong>Cook Time:</strong> {formatTime(recipe.cook)}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings} servings
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(recipe.published).toLocaleDateString()}
          </p>
        </div>

        <ul className="grid grid-cols-3 mt-10 border-b-2">
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "ingredients" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </li>
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "instructions" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </li>
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "nutrition" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition
          </li>
        </ul>

        <div className="mt-6">
          {activeTab === "ingredients" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.ingredients).map(
                  ([ingredient, quantity], index) => (
                    <li key={index}>
                      {ingredient}: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : activeTab === "instructions" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ul className="list-disc pl-6 text-gray-700">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="recipe-nutrition">
              <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Calories: {recipe.nutrition.calories}</li>
                <li>Fat: {recipe.nutrition.fat}g</li>
                <li>Saturated Fat: {recipe.nutrition.saturated}g</li>
                <li>Sodium: {recipe.nutrition.sodium}mg</li>
                <li>Carbohydrates: {recipe.nutrition.carbohydrates}g</li>
                <li>Fiber: {recipe.nutrition.fiber}g</li>
                <li>Sugar: {recipe.nutrition.sugar}g</li>
                <li>Protein: {recipe.nutrition.protein}g</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;
