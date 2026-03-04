import Image from "next/image";

export const Hero = () => {
  return (
    <Image
      src={"/hero.jpg"}
      alt="Подарунок під ключ"
      width={1280}
      height={648}
      priority
      className="w-full mx-auto object-cover mb-3 md:mb-4"
    />
  );
};
