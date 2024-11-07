import { Product } from "@/lib/types";
import axios from "axios";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import Pica from "pica";
import { revalidatePath } from "next/cache";

const s3 = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: "AKIAZ7SAK74ISMZCPNI4",
    secretAccessKey: "uuTy2V1sUPDQZN1BGjze30div04dJVr",
  },
});

export async function upload({
  name,
  description,
  price,
  stock,
  imagefiles,
  variants,
}: {
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  stock: Product["stock"];
  imagefiles: File[];
  variants: Product["variants"];
}) {
  try {
    console.log("Before imageupload");
    const response = await imageUpload({ imagefiles });
    if (!response.status) {
      return { status: false, message: response.message };
    }
    const images = response.data;
    const res = await axios.post("http://localhost:6969/add", {
      name,
      description,
      price: parseFloat(price.toString()),
      stock: parseInt(stock.toString()),
      images,
      variants,
    });
    revalidatePath("/");
    return { status: res.data.status, message: res.data.message };
  } catch (error) {
    return { status: false, message: error };
  }
}

const imageUpload = async ({ imagefiles }: { imagefiles: File[] }) => {
  try {
    const pica = Pica();
    const resizedImages = await Promise.all(
      imagefiles.map(async (file) => {
        // Create an offscreen canvas to resize the image
        const img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        await img.decode();

        // Resize the image using Pica
        const canvas = document.createElement("canvas");
        canvas.width = 500;
        canvas.height = 500;

        await pica.resize(img, canvas);

        // Convert canvas to Blob
        const blob = await pica.toBlob(canvas, "image/jpeg");

        // Generate a unique filename
        const imageKey = `uploads/${uuidv4()}.jpg`;

        // Upload to S3
        const command = new PutObjectCommand({
          Bucket: "my-nextjs-ecom-bucket",
          Key: imageKey,
          Body: blob,
          ContentType: "image/jpeg",
        });

        const res = await s3.send(command);
        console.log("response: ", res);
        return `https://my-nextjs-ecom-bucket.s3.eu-north-1.amazonaws.com/${imageKey}`;
      })
    );
    console.log("Images: ---- :", resizedImages);

    return {
      status: true,
      message: "Images uploaded to S3 successfully!",
      data: resizedImages,
    };
  } catch (error) {
    return { status: false, message: error };
  }
};
