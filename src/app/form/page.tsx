// formComponent.tsx
import dynamic from "next/dynamic";
import React from "react";

const FormComponent = dynamic(() => import("./form"), {ssr: false});

export default function FormPage() {
  return (
    <div>
      <FormComponent />
    </div>
  );
}
