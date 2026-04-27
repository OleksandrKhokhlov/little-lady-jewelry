"use client";

import Image from "next/image";
import { Icon } from "./icon";

interface ImageUploaderProps {
  onImageChange: (images: string[]) => void;
  initialImages?: string[];
}

export const ImageUploader = ({
  onImageChange,
  initialImages = [],
}: ImageUploaderProps) => {
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    try {
      const base64Promises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = (error) => reject(error);
        });
      });

      const newImages = await Promise.all(base64Promises);

      onImageChange([...initialImages, ...newImages]);
      e.target.value = '';
    } catch (error) {
      console.error("Error reading files:", error);
    }
  };

  const handleRemoveImage = (index: number) => {
    onImageChange(initialImages.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-wrap gap-3">
      {initialImages.length > 0 ? (
        initialImages.map((image, index) => (
          <div
            key={index}
            className="size-[90px] relative rounded-md overflow-hidden"
          >
            <Image
              src={image}
              alt={`Фото ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              unoptimized
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
