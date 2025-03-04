"use client";
import { SetStateAction, useState } from "react";
import { Container } from "./components/shared/container";
import { FiltrPopUp } from "./components/shared/filtrPopUp";
import { Hero } from "./components/shared/hero";

export default function Home() {
  const [selectedValue, setSelectedValue] = useState("Всі");

  return (
    <>
      <Hero width={428} height={252} />
      <Container>
        <FiltrPopUp
          selectedValue={selectedValue}
          handleChange={(e: { target: { value: SetStateAction<string> } }) =>
            setSelectedValue(e.target.value)
          }
        />
      </Container>
    </>
  );
}
