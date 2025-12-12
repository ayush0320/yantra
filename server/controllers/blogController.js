import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

export const addBlog = async (req, res) => {
    try {

        // Extract blog details and image file from the request
        const { title, subtitle, description, category, isPublished } = JSON.parse(req. body.blog);
        const imageFile = req.file;

        // Validate required fields
        if (!title || !description || !category || ! imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required!" });
        }

        // Read the image file and convert it to base64
        const fileBuffer = fs. readFileSync(imageFile.path);
        const base64File = fileBuffer.toString('base64');

        // Upload the image to ImageKit
        const response = await imageKit. files.upload({
            file: base64File,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Construct optimized image URL
        const baseUrl = response.url;
        const optimizedImageUrl = baseUrl.replace(
            '/blogs/',
            '/tr:q-auto,f-webp,w-1280/blogs/'
        );

        // Create a new blog entry in the database
        const image = optimizedImageUrl;

        // Save blog to database
        await Blog.create({
            title,
            subtitle,
            description,
            category,
            image,
            isPublished
        });

        // Delete the temporary image file
        fs.unlinkSync(imageFile.path);

        // Send success response
        res.json({ success: true, message: "Blog added successfully!" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}