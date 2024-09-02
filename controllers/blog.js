const Blog = require("../models/blog")
const Comment = require("../models/comment")

const handleAddNewBlog = (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
}

const handlePostBlog = async (req, res) => {
    const { title, body } = req.body
    const coverImageURL = req.file ? `/uploads/${req.file.filename}` : '';
    console.log(req.file)
    try {
        const blog = await Blog.create({
            body,
            title,
            createdBy: req.user._id,
            coverImageURL
        });
        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const handleViewSingleBlog=async(req,res)=>{
    const blog=await Blog.findById(req.params.id).populate('createdBy')
    const comments=await Comment.find({ blogId: req.params.id }).populate('createdBy')
    return res.render('blog',{
        user: req.user,
        blog,
        comments
    })
}

const handleCreateComment=async(req,res)=>{
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createdBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
}

module.exports = {
    handleAddNewBlog,
    handlePostBlog,
    handleViewSingleBlog,
    handleCreateComment
}