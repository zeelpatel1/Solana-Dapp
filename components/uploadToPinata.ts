const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_API_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

export const uploadImageAndMetadata = async (
  imageFile: File,
  name: string,
  symbol: string,
  description: string
) => {
  const formData = new FormData();
  formData.append("file", imageFile);

  const imageRes = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      pinata_api_key: PINATA_API_KEY ?? "",
      pinata_secret_api_key: PINATA_SECRET_API_KEY ?? "",
    },
    body: formData,
  });

  if (!imageRes.ok) {
    const err = await imageRes.text();
    console.error(err);
    throw new Error("Failed to upload image to Pinata");
  }

  const imageData = await imageRes.json();
  const imageCID = imageData.IpfsHash;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${imageCID}`;

  const metaData = {
    name,
    symbol,
    description,
    image: imageURI,
  };

  const metadataRes = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
    method: "POST",
    body: JSON.stringify(metaData),
    headers: {
      "Content-Type": "application/json",
      pinata_api_key: PINATA_API_KEY ?? "",
      pinata_secret_api_key: PINATA_SECRET_API_KEY ?? "",
    },
  });

  if (!metadataRes.ok) {
    const err = await metadataRes.text();
    console.error(err);
    throw new Error("Failed to upload metadata to Pinata");
  }

  const metadataData = await metadataRes.json();
  const metadataCID = metadataData.IpfsHash;
  const metadataURI = `https://gateway.pinata.cloud/ipfs/${metadataCID}`;

  return { imageURI, metadataURI };
};
