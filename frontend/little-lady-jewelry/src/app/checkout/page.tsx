"use client";

import { Container } from "@/components";
import { CheckoutForm } from "@/components/checkoutForm";
import { useSearchParams } from "next/navigation";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const counts = JSON.parse(
    decodeURIComponent(searchParams.get("counts") || "{}"),
  );
  const totalPrice = parseFloat(searchParams.get("totalPrice") || "0");

  return (
    <Container tag="section">
      <CheckoutForm counts={counts} totalPrice={totalPrice} />
    </Container>
  );
}
