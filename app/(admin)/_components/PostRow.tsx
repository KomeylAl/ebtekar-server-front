'use client'

import ConfirmDialog from "@/utils/ui/ConfirmDialog";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface PostRowProps {
  data: any;
  onDelete: () => void;
}

const PostRow = ({ data, onDelete }: PostRowProps) => {

  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);

  const router = useRouter()

  const handleDelete = async () => {
    setDeleting(true)
    await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}posts/${data.id}/delete`)
    .then(function (response) {
      if (response.status === 200) {
        toast.success('مطلب با موفقت حذف شد')
        onDelete();
      } else {
        toast.error('خطا در حذف مطلب')
      }
    })
    .catch(function (error) {
      console.log(error)
      toast.error('خطا در حذف مطلب')
    })
    .finally(() => {
      setDeleting(false)
      setDialogOpen(false)
    })
  }

  return (
    <div className="w-full bg-white p-6 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-blue-500">{data.id}</p>
        <h2 className="">{data.title}</h2>
        <p>{data.slug}</p>
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
            className="bg-rose-500 text-white rounded-md px-6 py-2">
            حذف مطلب
          </button>
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
