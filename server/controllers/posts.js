import Post from "../models/Post.js";

/* CREATE */
export const createPost = async(req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post ({
            userId,
            firstName: user.firstName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            like: {},
            comments: []
        })
        await newPost.save();
        const post = await Post.find();
        res.status(201).json(post)

    } catch (err) {
        res.status(409).json({ message: err.message})
    }
} 

/* READ */
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(202).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message})

    }
}

export const getUserPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(202).json(post)
    } catch (err) {
        res.status(404).json({ message: err.message})

    }
}