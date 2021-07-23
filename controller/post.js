const Post = require('../models/post');

module.exports = {
    async getAllPost(req, res) {
        try {
            const post = await Post.find({}).populate("user", { name: 1 });
            res.status(200).send(post);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async getParticularPost(req, res) {
        try {
            const post = await Post.findById(req.params.postId).populate("user", { name: 1 });
            res.status(200).send(post);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async addPost(req, res) {
        try {
            const post = new Post({ ...req.body, user: req.user._id });
            newPost = await post.save();
            res.status(201).send(newPost)
        }
        catch {
            res.status(500).send("Internal Server Error");
        }
    },
    async deletePost(req, res) {
        try {
            const { postId } = req.params;
            await Post.findByIdAndDelete(postId);
            res.status(200).json({ msg: `Post ${postId} deleted` });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async editPost(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findOneAndUpdate(
                { _id: postId },
                {
                    $set: { ...req.body },
                },
                { new: true }
            );
            res.status(200).json({ post });
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    },
    async likePost(req,res){
        try{
            const post=await Post.findById(req.params.id);
            if(!post.likes.includes(req.user._id)){
                await post.updateOne({$push:{likes:req.user._id}});
                res.status(200).send(post);
            }
            else{
                await post.updateOne({$pull:{likes:req.user._id}});
                res.status(200).send(post);
            }
        }
        catch(err){
            console.log(err);
        }
    }
}