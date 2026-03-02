export interface CheckoutFormValues {
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

export interface CheckoutFormProps
  extends Pick<CheckoutFormValues, "counts" | "totalPrice"> {}
