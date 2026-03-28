"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm";
import { MenuItem, getMenuItem } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";

const EditMenuItemPage = () => {
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }

      if (id) {
        try {
          const item = await getMenuItem(Number(id));
          setMenuItem(item);
        } catch (error) {
          console.error("Failed to fetch menu item");
          router.push("/admin/menu");
        }
      }
      setLoading(false);
    };

    init();
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center animate-background-pan">
      <div className="max-w-xl w-full p-8 space-y-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-2xl">
        <h2
          className="text-3xl font-bold text-center"
          style={{
            background: "var(--gradient)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Edit Menu Item
        </h2>
        {menuItem ? <MenuItemForm menuItem={menuItem} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default EditMenuItemPage;
