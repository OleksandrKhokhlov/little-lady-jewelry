import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "./button";
import * as Yup from "yup";
import { CustomRadioButton, PhoneField, TownField } from ".";
import { submitOrder, updateQuantity } from "@/app/api";
import { useProduktContext } from "@/lib";

interface Values {
  counts: Record<string, number>;
  totalPrice: number;
  firstName: string;
  lastName: string;
  telephone: string;
  delivery: "Нова пошта" | "Укрпошта";
  town: string;
  warehouse: string;
  comment?: string;
  payment: "При отриманні" | "Онлайн";
}

interface CheckoutFormProps {
  counts: Record<string, number>;
  totalPrice: number;
}

const CheckoutFormSchema = Yup.object().shape({
  firstName: Yup.string().required("Обов\u0027язкове поле"),
  lastName: Yup.string().required("Обов\u0027язкове поле"),
  telephone: Yup.string()
    .required("Обов\u0027язкове поле")
    .matches(/^\+380\d{9}$/, "Некоректний номер телефону")
    .length(13, "Номер телефону має бути 13 символів"),
  delivery: Yup.string()
    .oneOf(["Нова пошта", "Укрпошта"])
    .required("Обов\u0027язкове поле"),
  town: Yup.string().required("Обов\u0027язкове поле"),
  warehouse: Yup.string().required("Обов\u0027язкове поле"),
  comment: Yup.string().max(300, "Comment is too long"),
  payment: Yup.string()
    .oneOf(["При отриманні", "Онлайн"])
    .required("Обов\u0027язкове поле"),
});

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  counts,
  totalPrice,
}) => {
  const { inCart, deleteFromCart } = useProduktContext();
  const initialValues: Values = {
    counts: counts || {},
    totalPrice: totalPrice || 0,
    firstName: "",
    lastName: "",
    telephone: "",
    delivery: "Нова пошта",
    town: "",
    warehouse: "",
    comment: "",
    payment: "При отриманні",
  };

  return (
    <>
      <h2 className="text-[16px] justify-between border-b-2 border-[var(--accent-color)]">
        Оформлення замовлення
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={CheckoutFormSchema}
        onSubmit={async (
          values: Values,
          { setSubmitting }: FormikHelpers<Values>,
        ) => {
          try {
            await submitOrder(values);
            await Promise.all(
              Object.entries(counts).map(async ([id, quantity]) => {
                await updateQuantity(id, quantity);
              }),
            );

            values = initialValues;
            window.location.href = "/";
            if (counts.length === inCart.length) {
              localStorage.removeItem("inCart");
              return;
            }
            inCart.forEach((id) => {
              if (Object.entries(counts).find(([key]) => key === id))
                deleteFromCart(id);
            });
          } catch (error) {
            console.error("Error submitting order:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form
            className="m-auto w-[calc(100%-10px)] [&>div>div>input]:form-input [&>textarea]:form-input [&>div>div]:w-[calc(50%-4px)]"
            autoComplete="off"
          >
            <div className="mt-1 flex flex-wrap justify-between gap-y-1">
              <div className="flex flex-col relative pb-3">
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder={`Ім\u0027я`}
                />
                {errors.firstName && touched.firstName ? (
                  <span className="text-[10px] text-red-500 absolute bottom-0">
                    {errors.firstName}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col relative pb-3">
                <Field id="lastName" name="lastName" placeholder="Призвіще" />
                {errors.lastName && touched.lastName ? (
                  <span className="text-[10px] text-red-500 absolute bottom-0">
                    {errors.lastName}
                  </span>
                ) : null}
              </div>
              <PhoneField />
            </div>
            <div>
              <h3 className="text-[16px]">Доставка</h3>
              <div className="mt-1 flex flex-col">
                <Field name="delivery">
                  {({ field }: { field: any }) => (
                    <>
                      <CustomRadioButton
                        name="delivery"
                        value="Нова пошта"
                        label="Нова пошта"
                        checked={field.value === "Нова пошта"}
                        onChange={field.onChange}
                      />
                      <CustomRadioButton
                        name="delivery"
                        value="Укрпошта"
                        label="Укрпошта"
                        checked={field.value === "Укрпошта"}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                </Field>
              </div>
            </div>
            <TownField />
            <Field
              id="comment"
              name="comment"
              as="textarea"
              placeholder="Коментарій"
              className="w-full mt-1"
              rows={3}
            />
            <div>
              <h3 className=" text-[16px]">Оплата</h3>
              <div className="mt-1 flex flex-col">
                <Field name="payment">
                  {({ field }: { field: any }) => (
                    <>
                      <CustomRadioButton
                        name="payment"
                        value="При отриманні"
                        label="При отриманні"
                        checked={field.value === "При отриманні"}
                        onChange={field.onChange}
                      />
                      <CustomRadioButton
                        name="payment"
                        value="Онлайн"
                        label="Онлайн"
                        checked={field.value === "Онлайн"}
                        onChange={field.onChange}
                      />
                    </>
                  )}
                </Field>
              </div>
            </div>
            <div className="mt-4 flex justify-between items-end border-b-2 border-[var(--accent-color)]">
              <p>До сплати: </p>
              <p>{totalPrice} грн</p>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || Object.keys(errors).length > 0}
              text={
                Object.keys(errors).length > 0
                  ? `Заповніть обов'язкові поля`
                  : "Замовити"
              }
              className="block mt-2 m-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] disabled:opacity-50"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
