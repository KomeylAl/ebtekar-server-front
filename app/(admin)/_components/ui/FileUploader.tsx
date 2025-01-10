import { useState } from "react";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
  images: any;
}

export default function FileUploader({ onFilesSelected, images }: FileUploaderProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const imageUrls = imageFiles.map((file) => URL.createObjectURL(file));

    setSelectedImages(imageUrls);
    onFilesSelected(imageFiles);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <label
        htmlFor="file-input"
        className="w-52 h-52 flex items-center justify-center border-2 border-dashed border-green-500 rounded-lg bg-gray-50 text-green-500 cursor-pointer hover:bg-green-500 hover:text-white transition"
      >
        انتخاب تصاویر
      </label>
      <input
        type="file"
        id="file-input"
        accept="image/png, image/jpeg, image/webp"
        multiple
        max={4}
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {selectedImages.length ? selectedImages.map((image, index) => (
          <div key={index} className="w-24 h-24 border rounded overflow-hidden">
            <img
              src={image}
              alt={`Selected ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        )) : images.map((image: any, index: any) => (
         <div key={index} className="w-24 h-24 border rounded overflow-hidden">
            <img
              src={image.img_path}
              alt={`Selected ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
