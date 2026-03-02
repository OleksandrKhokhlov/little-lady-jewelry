import * as Yup from "yup";

export const CheckoutFormSchema = Yup.object().shape({
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
