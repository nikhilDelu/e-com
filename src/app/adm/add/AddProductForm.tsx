"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { ChangeEvent, useState } from "react";
import { upload } from "./action";
import { Delete, Trash, UploadCloud } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Image from "next/image";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([""]);
  const [variants, setVariants] = useState([{ color: "", size: "" }]);
  const [imagefiles, setImagefiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const addVariant = () => {
    setVariants([...variants, { color: "", size: "" }]);
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index][field as keyof (typeof newVariants)[number]] = value;
    setVariants(newVariants);
  };

  const clearForm = () => {
    setDetails("");
    setPrice(0);
    setStock(0);
    setName("");
    setImages([""]);
    setVariants([{ color: "", size: "" }]);
    setImagefiles([]);
    setSelectedImages([]);
  };

  const add = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents form refresh
    setLoading(true);

    if (!name || !details || price === "" || stock === "") {
      alert("All fields are required!");
      setLoading(false);
      return;
    }

    try {
      upload({
        name,
        description: details,
        price,
        stock,
        variants,
        imagefiles,
      }).then((res) => {
        console.log("uploaded?: ", res);
      });
    } catch (error) {
      console.log("Error while adding product:", error);
    } finally {
      clearForm();
      setLoading(false);
    }
  };
  const handleImageChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImages((images) => [...images, URL.createObjectURL(file)]);
      setImagefiles((files) => [...files, file]);
    }
  };
  const clearImageList = () => {
    const confirmed = window.confirm("Clear Selected Images?");
    if (confirmed) {
      setImagefiles([]);
      setSelectedImages([]);
    }
  };

  return (
    <div className="container bg-black text-white text-center">
      <div className="text-center pt-2">Add Product</div>
      <form onSubmit={add} className="p-4 mx-auto">
        <div className="grid lg:grid-cols-2 lg:grid-rows-2 sm:grid-cols-1 sm:grid-rows-4 gap-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm w-12 text-start">Name</span>
            <input
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
              type="text"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm w-12 text-start">Details</span>
            <input
              required={true}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
              type="text"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm w-12 text-start">Price</span>
            <input
              required={true}
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
              type="number"
            />
          </div>

          <div className="flex items-center justify-between gap-2">
            <span className="text-sm w-12 text-start">Stock</span>
            <input
              required={true}
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
              type="number"
            />
          </div>

          {/* Variants */}
          <div className="flex flex-col gap-2">
            <span className="text-sm w-12 text-start">Variants</span>
            {variants.map((variant, index) => (
              <div key={index} className="flex gap-2">
                <input
                  required
                  type="color"
                  placeholder="Color"
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                  className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
                />
                <select
                  required
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                  className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
                >
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="S"
                  >
                    S
                  </option>
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="M"
                  >
                    M
                  </option>
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="L"
                  >
                    L
                  </option>
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="XL"
                  >
                    XL
                  </option>
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="XXL"
                  >
                    XXL
                  </option>
                  <option
                    className=" bg-black text-white hover:bg-white/5 rounded-lg mx-1"
                    value="XXXL"
                  >
                    XXXL
                  </option>
                </select>
              </div>
            ))}
            {variants[0].color}
            <Button type="button" onClick={addVariant} className="mt-2">
              Add Variant
            </Button>
          </div>

          {/* Images */}
          <div className="flex flex-col gap-2">
            <hr />
            <h1 className="text-lg font-bold font-mono text-center w-full">
              Images
            </h1>

            <ScrollArea className="h-32 w-full mx-auto max-w-lg border rounded-lg relative">
              <div className="flex h-full items-center justify-center space-x-4">
                {selectedImages && selectedImages.length > 0 ? (
                  selectedImages.map((url, index) => (
                    <Image
                      src={url}
                      alt="preview of selected image here"
                      height={100}
                      width={100}
                      className="object-cover h-24 w-20 rounded-lg"
                    />
                  ))
                ) : (
                  <p className="text-xs font-sans my-auto mx-auto px-4  p-1 rounded-lg underline">
                    Empty 📪
                  </p>
                )}
              </div>

              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="w-full max-w-lg mb-4 mx-auto">
              <button
                onClick={clearImageList}
                className="bg-red-600 text-sm rounded-lg px-4 p-1 flex gap-2 ml-auto"
              >
                <Trash size={18} />
                CLEAR
              </button>
            </div>

            {images.map((image, index) => (
              // <div key={index} className="flex gap-2">
              //   <input
              //     placeholder="Image URL"
              //     value={image}
              //     onChange={(e) => handleImageChange(index, e.target.value)}
              //     className="focus:outline-none w-full border-b border-white bg-transparent text-sm font-mono"
              //     type="text"
              //   />
              // </div>
              <div className="rounded-lg border-white border border-dashed w-full max-w-lg h-32 mx-auto my-auto cursor-pointer relative ">
                <input
                  key={index}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChangeLocal(e)}
                  className="h-full w-full rounded-lg mx-auto cursor-pointer bg-transparent text-transparent opacity-0"
                  placeholder="upload image here"
                />
                <UploadCloud
                  size={36}
                  className="absolute top-[25%] right-[44%]"
                />
                <p className="absolute w-full h-4 bottom-4 text-[8px] text-center leading-tight font-sans">
                  Drop or Click to Upload Image
                </p>
              </div>
            ))}

            {/* <Button type="button" onClick={addImageField} className="mt-2">
              Add Image
            </Button> */}
          </div>
        </div>
        <Button onClick={add} type="submit" disabled={loading} className="mt-4">
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
}
