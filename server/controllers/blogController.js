import fs from 'fs';
import imageKit from '../configs/imageKit. js';
import Blog from '../models/Blog.js';

export const addBlog = async (req, res) => {
    try {
        console.log('addBlog called');
        
        // Debug ImageKit credentials
        console. log('IMAGEKIT_PUBLIC_KEY:', process.env. IMAGEKIT_PUBLIC_KEY);
        console.log('IMAGEKIT_PRIVATE_KEY:', process.env.IMAGEKIT_PRIVATE_KEY);
        console.log('IMAGEKIT_URL_ENDPOINT:', process.env. IMAGEKIT_URL_ENDPOINT);

        const { title, subtitle, description, category, isPublished } = JSON.parse(req. body. blog);
        const imageFile = req.file;

        if (!title || !description || !category || ! imageFile) {
            return res.status(400).json({ success: false, message:  "All fields are required!" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        console.log('Uploading to ImageKit...');
        
        // Upload image to ImageKit
        const response = await imageKit. upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        console.log('ImageKit response:', response);

        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation: [
                { quality: "auto", format: "webp", width: "1280" }
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({
            title,
            subtitle,
            description,
            category,
            image,
            isPublished
        });

        res.json({ success: true, message: "Blog added successfully!" });

    } catch (error) {
        console.log('Full error:', error);
        console.log('Error message:', error.message);
        res.json({ success: false, message: error.message });
    }
}