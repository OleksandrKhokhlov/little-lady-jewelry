"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./icon";
import { compressImg } from "@/lib/compressImg";

interface ImageUploaderProps {
  onImageChange: (images: string[]) => void;
  initialImages?: string[];
}

export const ImageUploader = ({
  onImageChange,
  initialImages = [],
}: ImageUploaderProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>(
    () => initialImages,
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    try {
      const compressedImages = await Promise.all(
        files.map((file) => compressImg(file)),
      );
      
      setPreviewImages((prevImages) => {
        const updated = [...prevImages, ...compressedImages];
        onImageChange(updated);
        return updated;
      });
    } catch (error) {
      console.error("Error uploading/comoressing images:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    setPreviewImages((prevImages) => {
      const updated = prevImages.filter((_, i) => i !== index);
      onImageChange(updated);
      return updated;
    });
  };

  return (
    <div className="flex flex-wrap gap-3">
      {previewImages.length > 0 ? (
        previewImages.map((image, index) => (
          <div
            key={index}
            className="size-[90px] relative rounded-md overflow-hidden"
          >
            <Image
              src={image}
              alt={`Фото ${index + 1}`}
              fill
              className="object-cover"
              priority
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 hover:scale-110 transition-transform"
            >
              <Icon
                iconId="icon-Cross"
                className="size-[15px] fill-[var(--accent-color)]"
              />
            </button>
          </div>
        ))
      ) : (
        <p className="w-full text-gray-500 text-sm">Фото не додані</p>
      )}

      <label className="size-[90px] border-2 border-dashed shed border-gray-300 flex flex-col items-center justify-center text-gray-400 text-sm cursor-pointer hover:border-[var(--accent-color)] transition">
        <span>+</span>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />
      </label>
    </div>
  );
};
