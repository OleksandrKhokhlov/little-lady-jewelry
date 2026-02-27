"use client";

import { Container } from "@/components";

export default function DeliveryAndPaymentPage() {
  return (
    <Container tag="section">
      <h1 className="text-xl sr-only">Доставка та оплата</h1>
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-1">1. Оплата:</h2>
        <ul className="space-y-2 [&>li]:ml-2 [&>li]:relative [&>li]:pl-2 [&>li::before]:content-[''] [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-2 [&>li::before]:h-1 [&>li::before]:w-1 [&>li::before]:rounded-full [&>li::before]:bg-[var(--accent-color)]  ">
          <li>повна оплата;</li>
          <li>післяплата у відділенні пошти з попереднім авансом 100 грн.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-1">2. Доставка:</h2>
        <p className="ml-2 mb-2">
          здійснюється протягом 1-3 робочих днів після внесення оплати або
          авансу;
        </p>
        <ul className="space-y-2 [&>li]:ml-2 [&>li]:relative [&>li]:pl-2 [&>li::before]:content-[''] [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-2 [&>li::before]:h-1 [&>li::before]:w-1 [&>li::before]:rounded-full [&>li::before]:bg-[var(--accent-color)]  ">
          <li>новою поштою (до віллілення або поштомату);</li>
          <li>укрпоштою.</li>
        </ul>
      </section>
      <section className="mb-6">
        <h2 className="text-lg font-medium mb-1">3. Обмін та повернення.</h2>
        <p className="indent-4 mb-2">
          Відповідно до ЗУ «Про захист прав споживачів», ювелірні
          вироби належної якості обміну та поверненню не підлягають.
        </p>
        <p className="mb-2">
          У разі виявлення виробничого браку або дефекту ви маєте право на:
        </p>
        <ul className="space-y-2 [&>li]:ml-2 [&>li]:relative [&>li]:pl-2 [&>li::before]:content-[''] [&>li::before]:absolute [&>li::before]:left-0 [&>li::before]:top-2 [&>li::before]:h-1 [&>li::before]:w-1 [&>li::before]:rounded-full [&>li::before]:bg-[var(--accent-color)]  ">
          <li>безкоштовний ремонт;</li>
          <li>заміну виробу;</li>
          <li>повернення коштів.</li>
        </ul>
      </section>
    </Container>
  );
}
