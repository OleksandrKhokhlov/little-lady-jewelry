"use client";

import { updateProdukt } from "@/app/api";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { ImageUploader } from "./imageUploader";
import toast from "react-hot-toast";
import { Button } from "./button";

interface AdminProductEditorProps {
  product: {
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
  };
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

export const AdminProductEditor: React.FC<AdminProductEditorProps> = ({
  product,
}) => {
  const [initialImages, setInitialImages] = useState<string[]>(
    product.images?.map((img) => img.url),
  );
  const {
    name,
    price,
    quantity,
    video,
    type,
    material,
    insert,
    weight,
    dimensions = {},
  } = product;

  const initialValues: FormValues = {
    name,
    price,
    quantity,
    video: video || "",
    type,
    material,
    insert,
    weight,
    width: dimensions.width || 0,
    height: dimensions.height || 0,
    images: initialImages,
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-2 rounded-lg shadow-md border border-gray-100">
      <Formik<FormValues>
        initialValues={initialValues}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const { width, height, images, ...rest } = values;
            const payload: any = {
              ...rest,
              dimensions: {
                width,
                height,
              },
            };

            if (JSON.stringify(initialImages) !== JSON.stringify(images)) {
              payload.images = images;
            }
            await updateProdukt(product._id, payload);
            toast.success("Продукт успішно оновлено!");
          } catch (error) {
            console.error(error);
            toast.error("Сталася помилка під час оновлення продукту.");
          } finally {
            setSubmitting(false);
          }
        }}
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
              text={isSubmitting ? "Збереження..." : "Зберегти зміни"}
              disabled={isSubmitting}
              className="w-[150px] h-[30px] mx-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
