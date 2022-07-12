import axiosApi from '../../config/axios.js';

class PostService{
  async getPosts(){
    const response = await axiosApi.get("/posts");
    return response.data;
  }

  async findPost(id){
    const response = await axiosApi.get("/posts" + id);
    return response.data;
  }

  async insertPost(post){
    const response = await axiosApi.post("/posts", {
      title: post.title,
      content: post.content
    })
    return response.data;
  }

  async updatePost(post, id){
    const response = await axiosApi.put("/posts/" + id, {
      title: post.title,
      content: post.content
    })
    return response.data;
  }

  async deletePost(id){
    const response = await axiosApi.delete("/posts/" + id);
    return response.data;
  }
}

const postService = new PostService();
export default postService;

