import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { insertPost, reset, updatePost } from "../features/post/postSlice";

export default function PostForm({ formType, post }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: post.title || "",
    content: post.content || ""
  });
  const { title, content } = form;

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    if(!validateForm()){
      return false;
    }
    if(formType === "add"){
      dispatch(insertPost({ title, content }));
    }else if(formType === "edit"){
      dispatch(updatePost({
        post: { title, content }, 
        id: post.id
      }));
    }
  }

  function validateForm(){
    if(!title || !content){
      alert("Form is invalid");
      return false;
    }
    return true;
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} id="postForm">
      <FormGroup className="mb-2">
        <Label className="me-sm-2" for="title">
          Title
        </Label>
        <Input
          id="title"
          name="title"
          placeholder="Some title"
          type="text"
          value={title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup className="mb-2">
        <Label className="me-sm-2" for="content">
          Content
        </Label>
        <Input
          id="content"
          name="content"
          placeholder="What is the content today?"
          type="text"
          value={content}
          onChange={handleChange}
        />
      </FormGroup>
    </Form>
  );
}
