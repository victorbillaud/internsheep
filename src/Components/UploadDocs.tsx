"use client"
import React, {ChangeEvent, DragEvent, useState} from "react";

export default function UploadDocs(){

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = function(e: DragEvent<HTMLDivElement>) {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

  const handleChange = function(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFiles(files.concat(Array.from(e.target.files)));
    }
  };

  const handleDrop = function(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFiles(files.concat(Array.from(e.dataTransfer.files)));
    }
  };

  const deleteDoc = function(index: number){
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  }

  return (
    <div onDragEnter={handleDrag} onDragOver={handleDrag} onDragLeave={handleDrag} onDrop={handleDrop} onSubmit={(e) => e.preventDefault()}>
      <input
        onChange={handleChange}
        type="file"
        id="input-file-upload"
        multiple={true}
        accept=".pdf, .jpg, .jpeg, .png, .txt"
        hidden={true}
      />
      {files.map((file, index) => (
        <div key={index} className="flex flex-1">
          <p className="flex-1 bg-white text-black px-2 py-4">{file.name}</p>
          <button onClick={()=>{deleteDoc(index)}} className="bg-red-500 px-3 py-1 rounded">Supprimer</button>
        </div>
      ))}
      <label id="label-file-upload" htmlFor="input-file-upload">
        <div className="flex flex-col justify-center">
          <p className={`${dragActive ? 'bg-white' : "bg-gray-300"} text-black p-20`}>Drag and drop your file here</p>
          <button className="bg-red-500 px-3 py-1 rounded">Upload a file</button>
        </div>
      </label>
    </div>
  )

}