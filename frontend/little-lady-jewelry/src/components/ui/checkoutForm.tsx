import React from "react";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Button } from "../ui";
import * as Yup from "yup";
import { CustomRadioButton } from "../shared";

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
    .matches(/^\+380\d{9}$/, "Введіть коректний номер у форматі +380XXXXXXXXX")
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
      <h2 className="justify-between border-b-2 border-[var(--accent-color)]">
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
        {({ errors, touched }) => (
          <Form>
            <Field id="firstName" name="firstName" placeholder={`Ім\u0027я`} />
            {errors.firstName && touched.firstName ? (
              <div className="text-red-500">{errors.firstName}</div>
            ) : null}
            <Field id="lastName" name="lastName" placeholder="Призвіще" />
            {errors.lastName && touched.lastName ? (
              <div className="text-red-500">{errors.lastName}</div>
            ) : null}
            <Field
              id="telephone"
              name="telephone"
              placeholder="+380XXXXXXXXX"
            />
            {errors.telephone && touched.telephone ? (
              <div className="text-red-500">{errors.telephone}</div>
            ) : null}
            <div>
              <h3>Доставка</h3>
              <div className="space-y-2">
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
            <Field
              id="settlementArea"
              name="settlementArea"
              placeholder="Область"
            />
            {errors.settlementArea && touched.settlementArea ? (
              <div className="text-red-500">{errors.settlementArea}</div>
            ) : null}
            <Field id="town" name="town" placeholder="Населений пункт" />
            {errors.town && touched.town ? (
              <div className="text-red-500">{errors.town}</div>
            ) : null}
            <Field
              id="branchNumber"
              name="branchNumber"
              placeholder="Номер відділення"
            />
            {errors.branchNumber && touched.branchNumber ? (
              <div className="text-red-500">{errors.branchNumber}</div>
            ) : null}
            <Field id="comment" name="comment" placeholder="Коментарій" />
            <div>
              <h3>Оплата</h3>
              <div className="space-y-2">
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
            <div className="flex justify-between items-end border-b-2 border-[var(--accent-color)]">
              <p>До сплати: </p>
              <p>{totalPrice} грн</p>
            </div>
            <Button
              type="submit"
              text="Перейти до оплати"
              onClick={(e) => console.log(e)}
              className="mt-4 bg-[var(--accent-color)] text-white font-[400] rounded-md text-[12px] p-1 w-[50%] mr-auto ml-auto"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};
