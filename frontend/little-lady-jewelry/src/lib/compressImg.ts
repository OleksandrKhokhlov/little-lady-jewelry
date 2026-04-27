export const compressImg = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BUTES = MAX_SIZE_MB * 1024 * 1024;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const result = event.target?.result as string;

      if (file.size <= MAX_SIZE_BUTES) {
        return resolve(result);
      }

      const img = new window.Image();
      img.src = result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx?.drawImage(img, 0, 0, width, height);
        }

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.92);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (error) => reject(error);
  });
};
