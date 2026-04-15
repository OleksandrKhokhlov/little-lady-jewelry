"use client";

import { addProdukt, updateProdukt } from "@/app/api";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { ImageUploader } from "./imageUploader";
import toast from "react-hot-toast";
import { Button } from "./button";
import { useProduktContext } from "@/lib";
import { FormValues, ProductImage, ProductPayload, Produkt } from "@/types";
import { LockTypeValues } from "@/constants";
import { useRouter } from "next/navigation";

interface AdminProductEditorProps {
  product?: Produkt;
}

const DEFAULT_PRODUCT_VALUES = {
  name: "",
  price: 0,
  quantity: 0,
  video: "",
  type: "пусети на заглушках" as LockTypeValues,
  material: "",
  insert: "",
  weight: 0,
  width: 0,
  height: 0,
  images: [] as string[],
};

export const AdminProductEditor = ({ product }: AdminProductEditorProps) => {
  const isEditMode = !!product?._id;
  const initialImages = product?.images || [];
  const { setProdukts } = useProduktContext();
  const router = useRouter();

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
    images: initialImages.map((img: ProductImage | string) =>
      typeof img === "string" ? img : (img as ProductImage).url,
    ),
  };

  const buttonText = isEditMode ? "Зберегти зміни" : "Створити продукт";

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>,
  ) => {
    try {
      const { width, height, images, ...rest } = values;

      const payload: ProductPayload = {
        ...rest,
        dimensions: {
          width,
          height,
        },
        images: images,
      };

      if (isEditMode && product?._id) {
        const payloadToUpdate: Partial<ProductPayload> = { ...payload };

        if (
          JSON.stringify(
            initialImages.map((img) =>
              typeof img === "string" ? img : (img as ProductImage).url,
            ),
          ) === JSON.stringify(images)
        ) {
          delete payloadToUpdate.images;
        }
        const updatedProduct = await updateProdukt(
          product._id,
          payloadToUpdate,
        );
        if (updatedProduct) {
          setProdukts((prev) =>
            prev.map((p) => (p._id === product._id ? updatedProduct : p)),
          );
          toast.success("Продукт успішно оновлено!");
          router.push("/admin/products");
        }
      } else {
        const createdProduct = await addProdukt(payload);
        if (createdProduct) {
          setProdukts((prev) => [...prev, createdProduct]);
        }

        toast.success("Продукт успішно створено!");
        resetForm();
        router.push("/admin/products");
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
    <div className="max-w-lg mx-auto h-[90vh] bg-white p-2 rounded-lg shadow-md border border-gray-100 overflow-y-auto">
      <Formik<FormValues> initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue, isSubmitting }) => {
          const handleImageChange = (images: string[]) => {
            setFieldValue("images", images);
          };

          return (
            <Form className="flex flex-col gap-1">
              <label className="flex flex-col text-sm text-center mx-auto">
                Назва:
                <Field name="name" className="form-input mb-2" />
              </label>
              <ImageUploader
                initialImages={values.images}
                onImageChange={handleImageChange}
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
                  <option value="пусети на заглушках">
                    Пусети на заглушках
                  </option>
                  <option value="пусети на закрутках">
                    Пусети на закрутках
                  </option>
                  <option value="англійський замок">Англійський замок</option>
                  <option value="конго">Конго</option>
                </Field>
              </label>
              <Button
                type="submit"
                text={isSubmitting ? "Збереження..." : buttonText}
                disabled={isSubmitting}
                className="w-[150px] h-[30px] mt-3 mx-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
