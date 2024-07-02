import React, { useState } from 'react';
import { addFood } from '../api'; // Adjust the import path as necessary

const AddFood = () => {
  const [foodData, setFoodData] = useState({
    name: '',
    desc: '',
    img: '',
    price_org: '',
    price_mrp: '',
    price_off: '',
    ingredients: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData({
      ...foodData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, desc, img, ingredients, category } = foodData;
      const price = {
        org: parseFloat(foodData.price_org),
        mrp: parseFloat(foodData.price_mrp),
        off: parseInt(foodData.price_off),
      };
      const formData = { name, desc, img, price, ingredients: ingredients.split(','), category: category.split(',') };
      
      const response = await addFood([formData]);
      console.log('Food added:', response.data);
      // Reset form
      setFoodData({
        name: '',
        desc: '',
        img: '',
        price_org: '',
        price_mrp: '',
        price_off: '',
        ingredients: '',
        category: '',
      });
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-8 bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 mt-20 rounded-md shadow-md mx-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Add Food</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="desc"
              value={foodData.desc}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              type="text"
              name="img"
              value={foodData.img}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (Original)</label>
            <input
              type="number"
              name="price_org"
              value={foodData.price_org}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (MRP)</label>
            <input
              type="number"
              name="price_mrp"
              value={foodData.price_mrp}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              name="price_off"
              value={foodData.price_off}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ingredients (comma separated)</label>
            <input
              type="text"
              name="ingredients"
              value={foodData.ingredients}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category (comma separated)</label>
            <input
              type="text"
              name="category"
              value={foodData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
