"use client";

import ConfirmDialog from "@/utils/ui/ConfirmDialog";
import axios from "axios";
import { getCookie } from "cookies-next";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PostCatItemProps {
  data: any;
  onDelete: () => void;
}

const PostCatItem = ({ data, onDelete }: PostCatItemProps) => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const userToken = getCookie("token");

  const handleDelete = async () => {
    setDeleting(true);
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}post/categories/${data.id}/delete`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("دسته با موفقت حذف شد");
          onDelete();
        } else {
          toast.error("خطا در حذف دسته");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در حذف دسته");
      })
      .finally(() => {
        setDeleting(false);
        setDialogOpen(false);
      });
  };

  return (
    <div className="w-full p-4 bg-white rounded-md flex items-center justify-between mb-3">
      <div className="flex gap-3 items-center">
        <p>{data.id}</p>
        <p>{data.title}</p>
      </div>
      <div className="flex gap-3 items-center">
        <Link
          href={`/dashboard/posts/categories/edit/${data.id}`}
          className="bg-blue-500 text-white rounded-md px-6 py-2"
        >
          ویرایش دسته
        </Link>
        <button
          onClick={() => setDialogOpen(true)}
          className="bg-rose-500 text-white rounded-md px-6 py-2"
        >
          حذف دسته
        </button>
      </div>
      <ConfirmDialog
        isLoading={isDeleting}
        onCancel={() => setDialogOpen(false)}
        onConfirm={handleDelete}
        open={isDialogOpen}
      />
    </div>
  );
};

export default PostCatItem;
