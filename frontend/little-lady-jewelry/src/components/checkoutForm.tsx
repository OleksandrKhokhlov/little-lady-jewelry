"use client";

import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik";
import { Button } from "./button";
import { CustomRadioButton, PhoneField, TownField } from ".";
import { submitOrder } from "@/app/api";
import { useProduktContext } from "@/lib";
import { CheckoutFormSchema } from "@/app/schemas";
import { CheckoutFormProps, CheckoutFormValues } from "@/types";

export const CheckoutForm = ({ counts, totalPrice }: CheckoutFormProps) => {
  const { setProdukts, inCart, deleteFromCart } = useProduktContext();
  const initialValues: CheckoutFormValues = {
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
    <div className="m-auto md:max-w-lg">
      <h2 className="text-[16px] justify-between border-b-2 border-[var(--accent-color)]">
        Оформлення замовлення
      </h2>
      <Formik<CheckoutFormValues>
        initialValues={initialValues}
        validationSchema={CheckoutFormSchema}
        onSubmit={async (
          values: CheckoutFormValues,
          { setSubmitting, resetForm }: FormikHelpers<CheckoutFormValues>,
        ) => {
          try {
            await submitOrder(values);
            Object.entries(counts).map(([id, quantity]) => {
              setProdukts((prevProdukts) =>
                prevProdukts.map((produkt) =>
                  produkt._id === id
                    ? { ...produkt, quantity: produkt.quantity - quantity }
                    : produkt,
                ),
              );
            });
            resetForm();

            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
            if (Object.keys(counts).length === inCart.length) {
              localStorage.removeItem("inCart");
              return;
            }
            inCart.forEach((id) => {
              if (counts[id]) deleteFromCart(id);
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
            <div className="mt-2 flex flex-wrap justify-between">
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
                  {({ field }: FieldProps<CheckoutFormValues["delivery"]>) => (
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
              className="w-full"
              autoComplete="off"
              spellCheck={false}
              rows={3}
            />
            <div className="mt-2">
              <h3 className=" text-[16px]">Оплата</h3>
              <div className="mt-1 flex flex-col">
                <Field name="payment">
                  {({ field }: FieldProps<CheckoutFormValues["payment"]>) => (
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
              className="block mt-3 m-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] disabled:opacity-50"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
