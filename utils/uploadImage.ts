export const addImage = async (imageUrl : any) => {
  try {
    const formData = new FormData();
    formData.append('file', imageUrl);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_SECRET || '');

    const fetchImage = await fetch('https://api.cloudinary.com/v1_1/dz6309zzc/image/upload', {
      method: 'POST',
      body: formData,
    });
    const data = await fetchImage.json();
    return data.secure_url;
  } catch (err) {
    console.error('Error uploading image:', err);
    return null;
  }
};
