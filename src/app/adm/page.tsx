"use client";
import { UploadCloud } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [downloadURL, setDownloadURL] = useState<string>("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  return (
    <div className="bg-black relative min-h-full w-full text-white">
      <div className="w-full h-full grid sm:grid-rows-4 sm:grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 gap-4 p-4">
        <div className="col-span-1 row-span-1 border border-white rounded-lg w-full h-full flex flex-col items-center justify-center relative">
          <div className="rounded-lg border-white border border-dashed w-1/2 h-24 mx-auto my-auto cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="h-full     w-full rounded-lg mx-auto cursor-pointer bg-transparent text-transparent opacity-0"
              placeholder="upload image here"
            />
            <UploadCloud size={36} className="absolute top-[25%] right-[44%]" />
            <p className="absolute w-full h-4 bottom-4 text-[8px] text-center leading-tight font-sans">
              Drop or Click to Upload Image
            </p>
          </div>

          {/* <button
            onClick={() => {}}
            className="mt-4 ml-auto mr-2 p-2 bg-blue-500 text-white rounded"
          >
            Upload to Firebase
          </button> */}
          {downloadURL && (
            <div className="mt-4">
              <p>Download URL:</p>
              <a
                href={downloadURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300"
              >
                {downloadURL}
              </a>
            </div>
          )}
        </div>
        <div className="col-span-1 row-span-1 border border-white w-full h-full flex items-center justify-center">
          Section 2
          {selectedImage && (
            <div className="w-full bg-red-900 min-h-32 aspect-square h-full flex items-center justify-center">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
        <div className="col-span-1 row-span-1 border border-white w-full h-full flex items-center justify-center">
          Section 3
        </div>
        <div className="col-span-1 row-span-1 border border-white w-full h-full flex items-center justify-center">
          Section 4
        </div>
      </div>
    </div>
  );
}
