"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import MenuItemForm from "@/components/MenuItemForm";
import { getCurrentUser } from "@/lib/auth";

const NewMenuItemPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      if (!user) {
        router.push("/admin/login");
      }
    };
    checkAuth();
  }, [router]);

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
          Add New Menu Item
        </h2>
        <MenuItemForm />
      </div>
    </div>
  );
};

export default NewMenuItemPage;
