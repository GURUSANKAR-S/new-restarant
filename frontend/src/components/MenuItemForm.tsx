"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  MenuItem,
  Category,
  createMenuItem,
  updateMenuItem,
  getCategories,
} from "@/lib/api";

interface MenuItemFormProps {
  menuItem?: MenuItem;
}

const MenuItemForm = ({ menuItem }: MenuItemFormProps) => {
  const [name, setName] = useState(menuItem?.name || "");
  const [description, setDescription] = useState(menuItem?.description || "");
  const [price, setPrice] = useState(menuItem?.price || 0);
  const [categoryId, setCategoryId] = useState(menuItem?.categoryId || 1);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState(menuItem?.image || "");
  const [categories, setCategories] = useState<Category[]>([]);
  const [availability, setAvailability] = useState(
    menuItem?.availability || true,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const cats = await getCategories();
      setCategories(cats);
    } catch (err) {
      setError("Failed to load categories");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("categoryId", categoryId.toString());
    formData.append("availability", availability.toString());
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      if (menuItem) {
        await updateMenuItem(menuItem.id, formData);
      } else {
        await createMenuItem(formData);
      }
      router.push("/admin/menu");
    } catch (err) {
      setError((err as Error).message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setCurrentImage(url);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="text-sm font-medium text-text-secondary"
        >
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-text-secondary"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="text-sm font-medium text-text-secondary"
        >
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          required
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="categoryId"
          className="text-sm font-medium text-text-secondary"
        >
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(Number(e.target.value))}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="image"
          className="text-sm font-medium text-text-secondary block mb-2"
        >
          {menuItem ? "Update Image (optional)" : "Image"}
        </label>
        {currentImage && (
          <div className="mb-4">
            <img
              src={currentImage}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      </div>

      <div className="flex items-center">
        <input
          id="availability"
          name="availability"
          type="checkbox"
          checked={availability}
          onChange={(e) => setAvailability(e.target.checked as boolean)}
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label
          htmlFor="availability"
          className="ml-2 block text-sm text-text-secondary"
        >
          Available
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-500 p-3 bg-red-50 rounded-md">{error}</p>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {loading ? "Saving..." : menuItem ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
};

export default MenuItemForm;
