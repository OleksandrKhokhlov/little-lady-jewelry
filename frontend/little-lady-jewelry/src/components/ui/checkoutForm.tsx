import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "../ui";
import * as Yup from "yup";
import { CustomRadioButton, PhoneField } from "../shared";

interface Values {
  counts: Record<string, number>;
  totalPrice: number;
  firstName: string;
  lastName: string;
  telephone: string;
  delivery: "Нова пошта" | "Укрпошта";
  settlementArea: string;
  town: string;
  branchNumber: string;
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
  settlementArea: Yup.string().required("Обов\u0027язкове поле"),
  town: Yup.string().required("Обов\u0027язкове поле"),
  branchNumber: Yup.string().required("Обов\u0027язкове поле"),
  comment: Yup.string().max(300, "Comment is too long"),
  payment: Yup.string()
    .oneOf(["При отриманні", "Онлайн"])
    .required("Обов\u0027язкове поле"),
});

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  counts,
  totalPrice,
}) => {
  const initialValues: Values = {
    counts: counts || {},
    totalPrice: totalPrice || 0,
    firstName: "",
    lastName: "",
    telephone: "",
    delivery: "Нова пошта",
    settlementArea: "",
    town: "",
    branchNumber: "",
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
        onSubmit={(
          values: Values,
          { setSubmitting }: FormikHelpers<Values>,
        ) => {
          setTimeout(() => {
            setSubmitting(false);
            console.log(values);
          }, 500);
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
            <div className="mt-1 flex flex-wrap justify-between gap-y-1">
              <div className="flex flex-col relative pb-3">
                <Field
                  id="settlementArea"
                  name="settlementArea"
                  placeholder="Область"
                />
                {errors.settlementArea && touched.settlementArea ? (
                  <span className="text-[10px] text-red-500 absolute bottom-0">
                    {errors.settlementArea}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col relative pb-3">
                <Field id="town" name="town" placeholder="Населений пункт" />
                {errors.town && touched.town ? (
                  <span className="text-[10px] text-red-500 absolute bottom-0">
                    {errors.town}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-col relative pb-3">
                <Field name="branchNumber">
                  {({ field, form }: { field: any; form: any }) => (
                    <input
                      id="branchNumber"
                      {...field}
                      placeholder={
                        form.values.delivery === "Нова пошта"
                          ? "Номер відділення"
                          : "Індекс"
                      }
                    />
                  )}
                </Field>
                {errors.branchNumber && touched.branchNumber ? (
                  <span className="text-[10px] text-red-500 absolute bottom-0">
                    {errors.branchNumber}
                  </span>
                ) : null}
              </div>
            </div>
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
                  : "Перейти до оплати"
              }
              className="block mt-2 m-auto bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] disabled:opacity-50"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
