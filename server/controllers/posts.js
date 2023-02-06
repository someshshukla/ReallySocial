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


/* UPDATE */
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        /* getting the post information */
        const post = await Post.findById(id)
        /* checking whether the user liked it or not */
        const isLiked = post.likes.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(post);
    } catch(err) {
        res.status().json({ message: err.message })
    }
}