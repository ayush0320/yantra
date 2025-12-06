import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

export const addBlog = async (req, res) => {
    try {

        // Parse blog data from request body
        const { title, subtitle, description, category, image, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all required fields are present
        if( !title || !description || !category || !imageFile || isPublished) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Read image file buffer
        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload image to ImageKit
        const response = await imageKit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs/"
        });

        // Optimize through ImageKit URL transformations
        const optimizedImageUrl = imageKit.url({
            src: response.url,
            transformation: [
                {   quality: "auto",  // Auto quality based on viewer's device
                    format: "webp", // Convert to WebP format
                    width: "1280", // Resize width to 1280px
                }
            ]
        });

        // Prepare blog data with optimized image URL
        const imageData = {
            url: optimizedImageUrl,
            imageKitId: response.fileId
        };

        // Save blog to database
        await Blog.create({
            title,
            subtitle,
            description,
            category,
            image: imageData,
            isPublished
        });

        res.json({ success: true, message: "Blog added successfully!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}