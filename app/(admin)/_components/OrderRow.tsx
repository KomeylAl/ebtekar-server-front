import React from "react";

interface OrderRowProps {
  data: any;
}

const OrderRow = ({ data }: OrderRowProps) => {
  const date = new Date(data.created_at);
  const jalali_date = date.toLocaleDateString("fa-IR");

  return (
    <div className="w-full bg-white p-6 rounded-md">
      <div className="flex items-center justify-between">
        <p className="text-blue-500">{data.id}</p>
        <h2 className="text-blue-500">{data.name}</h2>
        <p>{data.phone}</p>
        <p className="max-w-72 text-justify">{data.description}</p>
        <p>{jalali_date}</p>
      </div>
    </div>
  );
};

export default OrderRow;
