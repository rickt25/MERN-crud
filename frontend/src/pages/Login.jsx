import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import AuthLayout from "../layouts/AuthLayout";
import Loading from "../components/Loading";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const { email, password } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess || user) {
      navigate('/dashboard');
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset());
  }, [user, isSuccess, isError, dispatch]);

  function handleChange(e){
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleSubmit(e){
    e.preventDefault();
    dispatch(login({ email, password }));
  }

  if(isLoading){
    return <Loading />;
  }

  return (
    <AuthLayout title="Login Form">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup className="mb-2">
          <Label
            className="me-sm-2"
            for="email"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            placeholder="something@idk.cool"
            type="email"
            value={email}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label
            className="me-sm-2"
            for="password"
          >
            Password
          </Label>
          <Input
            id="password"
            name="password"
            placeholder="don't tell!"
            type="password"
            value={password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button
          block
          type="submit"
          color="primary"
        >
          Sign In
        </Button>
        <p className="mt-2">Have no account yet? <Link to="/register">Register</Link></p>
      </Form>
    </AuthLayout>
  )
}