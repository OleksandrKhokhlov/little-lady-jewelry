"use client";

import { addProdukt, updateProdukt } from "@/app/api";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ImageUploader } from "./imageUploader";
import toast from "react-hot-toast";
import { Button } from "./button";

interface ProductDetails {
  _id: string;
  name: string;
  images: Array<{ public_id: string; url: string }>;
  video?: string;
  price: number;
  type:
    | "пусети на заглушках"
    | "пусети на закрутках"
    | "англійський замок"
    | "конго";
  material: string;
  insert: string;
  weight: number;
  dimensions: {
    height?: number;
    width?: number;
  };
  quantity: number;
}

interface AdminProductEditorProps {
  product?: ProductDetails;
}

interface FormValues {
  name: string;
  price: number;
  quantity: number;
  video?: string;
  type:
    | "пусети на заглушках"
    | "пусети на закрутках"
    | "англійський замок"
    | "конго";
  material: string;
  insert: string;
  weight: number;
  width: number;
  height: number;
  images: string[];
}

const DEFAULT_PRODUCT_VALUES = {
  name: "",
  price: 0,
  quantity: 0,
  video: "",
  type: "пусети на заглушках" as const,
  material: "",
  insert: "",
  weight: 0,
  width: 0,
  height: 0,
  images: [] as string[],
};

export const AdminProductEditor: React.FC<AdminProductEditorProps> = ({
  product,
}) => {
  const isEditMode = !!product?._id;
  const initialImagesUrls = product?.images?.map((img) => img.url) || [];
  const [initialImages] = useState<string[]>(initialImagesUrls);

  const initialValues: FormValues = {
    name: product?.name || DEFAULT_PRODUCT_VALUES.name,
    price: product?.price || DEFAULT_PRODUCT_VALUES.price,
    quantity: product?.quantity || DEFAULT_PRODUCT_VALUES.quantity,
    video: product?.video || DEFAULT_PRODUCT_VALUES.video,
    type: product?.type || DEFAULT_PRODUCT_VALUES.type,
    material: product?.material || DEFAULT_PRODUCT_VALUES.material,
    insert: product?.insert || DEFAULT_PRODUCT_VALUES.insert,
    weight: product?.weight || DEFAULT_PRODUCT_VALUES.weight,
    width: product?.dimensions?.width || DEFAULT_PRODUCT_VALUES.width,
    height: product?.dimensions?.height || DEFAULT_PRODUCT_VALUES.height,
    images: initialImages,
  };

  const formTitle = isEditMode
    ? `Редагування продукту: ${product?.name}`
    : "Створення нового продукту";

  const buttonText = isEditMode ? "Зберегти зміни" : "Створити продукт";

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: any,
  ) => {
    try {
      const { width, height, images, ...rest } = values;
      const payload: any = {
        ...rest,
        dimensions: {
          width,
          height,
        },
        images,
      };

      if (isEditMode && product?._id) {
        const payloadToUpdate: any = { ...payload };
        if (JSON.stringify(initialImagesUrls) === JSON.stringify(images)) {
          delete payloadToUpdate.images;
        }
        await updateProdukt(product._id, payloadToUpdate);
        toast.success("Продукт успішно оновлено!");
      } else {
        await addProdukt(payload);
        toast.success("Продукт успішно створено!");
        resetForm({ values: DEFAULT_PRODUCT_VALUES });
      }
    } catch (error) {
      console.error(error);
      toast.error(
        isEditMode
          ? "Сталася помилка під час оновлення продукту."
          : "Сталася помилка під час створення продукту.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-2 rounded-lg shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-center">{formTitle}</h2>
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="flex flex-col gap-1">
            <label className="flex flex-col text-sm text-center mx-auto">
              Назва:
              <Field name="name" className="form-input " />
            </label>
            <ImageUploader
              initialImages={values.images}
              onImageChange={(imgs) => setFieldValue("images", imgs)}
            />
            <div className="flex justify-between">
              <label className="flex flex-col text-sm w-[48%]">
                Відео (URL):
                <Field name="video" className="form-input" />
              </label>
              <label className="flex flex-col text-sm w-[48%]">
                Ціна:
                <Field type="number" name="price" className="form-input " />
              </label>
            </div>
            <div className="flex justify-between">
              <label className="flex flex-col text-sm w-[48%]">
                Кількість:
                <Field type="number" name="quantity" className="form-input" />
              </label>
              <label className="flex flex-col text-sm w-[48%]">
                Матеріал:
                <Field name="material" className="form-input" />
              </label>
            </div>
            <div className="flex justify-between">
              <label className="flex flex-col text-sm w-[48%]">
                Вага:
                <Field type="number" name="weight" className="form-input" />
              </label>
              <label className="flex flex-col text-sm w-[48%]">
                Вставка:
                <Field name="insert" className="form-input" />
              </label>
            </div>
            <div className="flex justify-between">
              <label className="flex flex-col text-sm w-[48%]">
                Ширина:
                <Field type="number" name="width" className="form-input" />
              </label>
              <label className="flex flex-col text-sm w-[48%]">
                Висота:
                <Field type="number" name="height" className="form-input" />
              </label>
            </div>
            <label className="flex flex-col text-sm">
              Тип застібки:
              <Field as="select" name="type" className="form-input">
                <option value="пусети на заглушках">Пусети на заглушках</option>
                <option value="пусети на закрутках">Пусети на закрутках</option>
                <option value="англійський замок">Англійський замок</option>
                <option value="конго">Конго</option>
              </Field>
            </label>
            <Button
              type="submit"
              text={isSubmitting ? "Збереження..." : buttonText}
              disabled={isSubmitting}
              className="w-[150px] h-[30px] mx-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
