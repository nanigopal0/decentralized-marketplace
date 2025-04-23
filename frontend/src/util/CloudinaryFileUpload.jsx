export const handleFileUpload = async (productImage) => {
    console.log(productImage);
    const data = new FormData();
    data.append("file", productImage);
    data.append("upload_preset", "Banner_Upload");
    data.append("cloud_name", "dckahd0gz");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dckahd0gz/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const uploadedImageURL = await res.json();
    console.log(uploadedImageURL.url);
    return uploadedImageURL.url;
  };