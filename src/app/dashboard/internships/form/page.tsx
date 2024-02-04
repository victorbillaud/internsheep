// formComponent.tsx
import dynamic from "next/dynamic";

const FormComponent = dynamic(() => import("./form"), {ssr: false});

export default function FormPage() {
  return (
    <div className="w-full flex flex-col">
      <FormComponent />
    </div>
  );
}
