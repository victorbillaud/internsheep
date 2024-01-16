"use client";
import {useEffect, useState} from "react";
import form from "./page";
import {sendForm} from "../actions";
import UploadDocs from "@/Components/UploadDocs";

export default function FormComponent() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isNotFormValid, setIsNotFormValid] = useState(true);

  const [formData, setFormData] = useState({
    companyName: "",
    mission: "",
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    rythm: "full-time",
    numberWeeks: 0,
    remuneration: 0
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = event.target;

    // Vérifier si la valeur peut être convertie en nombre
    const parsedValue = !isNaN(Number(value)) ? Number(value) : value;

    setFormData({...formData, [name]: parsedValue});
    validateForm();
  };

  const validateForm = () => {
    // Validation du formulaire
    if (
      !formData.companyName ||
      !formData.mission ||
      !formData.rythm ||
      formData.numberWeeks <= 0 ||
      formData.remuneration <= 0 ||
      !formData.startDate ||
      !formData.endDate
    ) {
      setIsNotFormValid(true);
    } else {
      setIsNotFormValid(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validation du formulaire
    validateForm();

    if (formSubmitted) {
      return;
    }
    if (isNotFormValid) {
      return; // Arrêter l'envoi du formulaire si invalide
    }

    try {
      await sendForm(formData);
      resetForm();
      setFormSubmitted(true);
      setError(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormSubmitted(false);
    }
  };

  const resetForm = () => {
    setFormData({
      companyName: "",
      mission: "",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      rythm: "full-time",
      numberWeeks: 0,
      remuneration: 0
    });
    setFormSubmitted(true);
  };

  return (
    <div className="h-screen bg-white">
      <h1 className="text-center font-bold pt-8 mb-4 text-black text-3xl ">
        Fomulaire de création
      </h1>
      <UploadDocs />

      <div className="flex flex-col max-w-70  mx-auto my-auto ">
        <form onSubmit={handleSubmit}>
          {/* Nom de l'entreprise */}
          <div className="flex flex-col space-y-2 mt-2">
            <label htmlFor="companyName" className="text-sm font-medium text-black">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
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
              value={formData.mission}
              onChange={handleChange}
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
                value={formData.numberWeeks}
                onChange={handleChange}
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
                value={formData.remuneration}
                onChange={handleChange}
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
              value={formData.rythm}
              onChange={handleChange}
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
                value={formData.startDate}
                onChange={handleChange}
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
                value={formData.endDate}
                onChange={handleChange}
                className="text-black p-2 border border-gray-300 bg-gray-200 rounded focus:outline-none focus:border-blue-500 w-100"
                onFocus={() => setFormSubmitted(false)}
              />
            </div>
          </div>

          <button
            type="submit"
            className={`mt-4 mb-4 flex flex-col bg-blue-500 text-white font-bold py-2 px-4 rounded m-auto ${
              isNotFormValid ? "opacity-50 cursor-not-allowed bg-blue-200 " : "hover:bg-blue-700"
            }`}
            disabled={isNotFormValid}
          >
            Soumettre le formulaire
          </button>

          {isNotFormValid && (
            <p className="text-red-500 text-center font-bold mt-4">
              Le formulaire n'est pas rempli correctement. Veuillez remplir tous les champs.
            </p>
          )}

          <div>
            {formSubmitted && (
              <p className="text-green-500 text-center font-bold mt-4">
                Le formulaire a bien été envoyé !
              </p>
            )}

            {error && (
              <p className="text-red-500 text-center font-bold mt-4">
                Il y a eu une erreur lors de l'envoi du formulaire
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
