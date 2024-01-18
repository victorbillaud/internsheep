"use client";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { sendForm } from "./actions";

export default function FormComponent() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  type CustomError = {
    code: string;
    message: string;
  };

  const searchParams = useSearchParams();

  const error = searchParams.get("error") as unknown as CustomError;

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(formRef.current);

    console.log("formData", formData);

    sendForm(formData);
  };

  return (
    <div className="h-screen bg-white">
      <h1 className="text-center font-bold pt-8 mb-4 text-black text-3xl ">
        Formulaire de création
      </h1>

      <div className="flex flex-col max-w-70  mx-auto my-auto ">
        {error && <p className="text-red-500 text-center font-bold mt-4">{error}</p>}

        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Nom de l'entreprise */}
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="companyName" className="text-sm font-medium text-black">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Saisir le nom de l'entreprise"
              className="text-black mr-2 p-2 border border-gray-300 rounded bg-gray-200 focus:outline-none focus:border-blue-500"
              onFocus={() => setFormSubmitted(false)}
            />
          </div>

          {/* mission du stage */}
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="internshipMission" className="text-sm font-medium text-black">
              Mission du stage
            </label>
            <textarea
              id="internshipMission"
              name="mission"
              placeholder="Saisir description de la mission"
              className="text-black  mr-2 p-2 border border-gray-300 bg-gray-200 rounded resize-none focus:outline-none focus:border-blue-500"
              onFocus={() => setFormSubmitted(false)}
            />
          </div>

          {/* Nombre de semaines  */}
          <div className="flex space-x-4 mt-2">
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="numberWeeks" className="text-sm font-medium text-black">
                Nombre de semaines
              </label>
              <input
                type="number"
                id="numberWeeks"
                name="numberWeeks"
                placeholder="Saisir le nombre de semaines"
                className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500 w-full"
                onFocus={() => setFormSubmitted(false)}
              />
            </div>

            {/* Rémunération */}
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="remuneration" className="text-sm font-medium text-black">
                Rémunération
              </label>
              <input
                type="number"
                id="remuneration"
                name="remuneration"
                placeholder="Saisir la rémunération"
                className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500 w-full"
                onFocus={() => setFormSubmitted(false)}
              />
            </div>
          </div>

          {/* Rythme */}
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="rythm" className="text-sm font-medium text-black">
              Rythme
            </label>
            <select
              id="rythm"
              name="rythm"
              className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500"
              onFocus={() => setFormSubmitted(false)}
            >
              <option value="full-time">Temps plein</option>
              <option value="part-time">Temps partiel</option>
            </select>
          </div>

          {/* Date de début */}
          <div className="flex space-x-4 mt-2">
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="startDate" className="text-sm font-medium text-black">
                Date de début
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500 w-100"
                onFocus={() => setFormSubmitted(false)}
              />
            </div>

            {/* Date de fin */}
            <div className="flex flex-col space-y-2 w-1/2">
              <label htmlFor="endDate" className="text-sm font-medium text-black">
                Date de fin
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500 w-100"
                onFocus={() => setFormSubmitted(false)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`mt-4 mb-4 flex flex-col bg-blue-500 text-white font-bold py-2 px-4 rounded m-auto`}
          >
            Soumettre le formulaire
          </button>

          {error && <p className="text-red-500 text-center font-bold mt-4">{error.message}</p>}

          <div>
            {formSubmitted && (
              <p className="text-green-500 text-center font-bold mt-4">
                Le formulaire a bien été envoyé !
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
