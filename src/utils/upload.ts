import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import * as cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.API_CLOUDINARY_NAME,
    api_key: process.env.API_CLOUDINARY_KEY,
    api_secret: process.env.API_CLOUDINARY_SECRET,
});


const createStorage = (folderName:string) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary.v2,
        params: {
            folder: folderName,
            allowed_formats: ["jpg", "png", "jpeg", "webp"],
        },
    }as any);
};

const uploadConfigs = {
    profile: multer({
        storage: createStorage("profile_pictures"),
        limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    }).single("image"),
    gallery: multer({
        storage: createStorage("gallery_images"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).array("images", 10), // Allow up to 10 images
    upload: multer({
        storage: createStorage("uploads"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).single("image"),
    movie: multer({
        storage: createStorage("movie"),
        limits: { fileSize: 5 * 1024 * 1024 },
    }).single("image"),
};


export { uploadConfigs, cloudinary };