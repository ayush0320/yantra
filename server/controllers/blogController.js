import fs from 'fs';
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

// Controller to add a new blog
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

// Controller to get all published blogs
export const getAllBlogs = async (req, res) => {
    try{
        const blogs = await Blog.find({isPublished: true});
        res.json({success: true, blogs});
    } catch(error){
        res.json({success: false, message: error.message});
    }
}

// Controller to get a blog by its ID
export const getBlogsById = async (req, res) => {
    try{
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.json({success: false, message: "Blog not found!"});
        }
        res.json({success: true, blog});

    } catch(error){
        res.json({success: false, message: error.message});
    }
}

// Controller to delete a blog by its ID
export const deleteBlogsById = async (req, res) => {
    try{
        const { blogId } = req.params;
        const blog = await Blog.findByIdAndDelete(blogId);

        // Delete associated comments
        await Comment.deleteMany({ blog: blogId });

        if(!blog){
            return res.json({success: false, message: "Blog not found!"});
        }
        res.json({success: true, message: "Blog deleted successfully!"});

    } catch(error){
        res.json({success: false, message: error.message});
    }
}

// Controller to toggle publish status of a blog by its ID
export const togglePublishBlogById = async (req, res) => {
    try{

        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog publish status updated"});

    } catch(error){
        res.json({success: false, message: error.message});
    }
}

// Controller to add a comment to a blog
export const addComment = async (req, res) => {
    try {
        const { blog, name, content } = req.body;
        await Comment.create({
            blog,
            name,
            content
        });
        res.json({ success: true, message: "Comment added" });
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Controller to get approved comments for a blog
export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    }
    catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + 'Generate a blog content for this topic in simple language.')
        res.json({ success: true, content });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}