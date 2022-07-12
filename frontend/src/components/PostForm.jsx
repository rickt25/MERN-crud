import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, FormGroup, Input, Label } from "reactstrap";
import { insertPost, reset } from "../features/post/postSlice";

export default function PostForm({ id }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    content: ""
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
    validateForm();
    dispatch(insertPost({ title, content }));
    dispatch(reset());
  }

  function validateForm(){
    if(!title || !content){
      alert("Form is invalid");
      return false;
    }
    return true;
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e)} id={id}>
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
