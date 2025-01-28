"use client";

import ConfirmDialog from "@/utils/ui/ConfirmDialog";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import hero from "@/app/images/hero.jpg";

interface PostRowProps {
  data: any;
  onDelete: () => void;
}

const PostRow = ({ data, onDelete }: PostRowProps) => {
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  const router = useRouter();

  const handleDelete = async () => {
    setDeleting(true);
    await axios
      .delete(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/${data.id}/delete`
      )
      .then(function (response) {
        if (response.status === 200) {
          toast.success("مطلب با موفقت حذف شد");
          onDelete();
        } else {
          toast.error("خطا در حذف مطلب");
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("خطا در حذف مطلب");
      })
      .finally(() => {
        setDeleting(false);
        setDialogOpen(false);
      });
  };

  return (
    <div className="w-full bg-white p-6 rounded-md">
      <div className="flex flex-col items-start gap-3">
        <div className="flex items-center gap-3">
          {!data.img_path ? (
            <Image
              src={hero}
              alt=""
              width={100}
              height={100}
              className="w-20 h-20 rounded-md object-cover"
            />
          ) : (
            <img
              src={data.img_path}
              alt=""
              className="w-20 h-20 rounded-md object-cover"
            />
          )}
          <div>
            <h2 className="font-semibold">{data.title}</h2>
            <p className="mt-2 text-gray-600">{data.slug}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <p>{data.category}</p>
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/posts/edit/${data.slug}`}
              className="bg-blue-500 text-white rounded-md px-6 py-2"
            >
              ویرایش مطلب
            </Link>
            <button
              onClick={() => setDialogOpen(true)}
              className="bg-rose-500 text-white rounded-md px-6 py-2"
            >
              حذف مطلب
            </button>
          </div>
        </div>
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

export default PostRow;
