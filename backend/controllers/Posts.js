import Post from "../models/PostModel.js";

const getPosts = async(_, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Fetching data failed'
    })
  }
}

const insertPost = async(req, res) => {
  const { title, content } = req.body;
  if(!title || !content){
    return res.status(400).json({
      message: 'Failed to create post'
    })
  }

  try {
    const post = await Post.create({
      title: title, 
      content: content
    })
    res.json({
      post: post,
      message: 'Success create post'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Storing data failed'
    })
  }
}

const findPost = async (req, res) => {
  const { id } = req.params;

  try{
    const post = await Post.findByPk(id);
    if(post === null){
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Fetching data failed'
    })
  }
}

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try{
    const post = await Post.findByPk(id);
    if(post === null){
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    await Post.update({ 
      title: title, 
      content: content 
    }, {
      where: {
        id: id
      }
    });

    return res.json({
      post: post,
      message: 'Success update post'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Fetching data failed'
    })
  }
}

const deletePost = async (req,res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try{
    const post = await Post.findByPk(id);
    if(post === null){
      return res.status(404).json({
        message: 'Post not found'
      });
    }

    await Post.destroy({
      where: {
        id: id
      }
    });

    return res.json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Fetching data failed'
    })
  }
}

export default { getPosts, insertPost, findPost, updatePost, deletePost };