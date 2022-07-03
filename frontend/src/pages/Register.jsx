import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import AuthLayout from "../layouts/AuthLayout";
import Loading from "../components/Loading";

export default function Login() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const { name, email, password, confirm_password } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess || user) {
      navigate("/dashboard");
    }
    if (isError) {
      toast.error(message);
    }
    dispatch(reset);
  }, [user, isSuccess, isError, dispatch]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register({ name, email, password, confirm_password }));
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthLayout title="Register Form">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup className="mb-2">
          <Label className="me-sm-2" for="name">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="john doe"
            type="text"
            value={name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup className="mb-2">
          <Label className="me-sm-2" for="email">
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
          <Label className="me-sm-2" for="password">
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
        <FormGroup className="mb-2">
          <Label className="me-sm-2" for="confirm_password">
            Confirm Password
          </Label>
          <Input
            id="confirm_password"
            name="confirm_password"
            placeholder="don't tell!"
            type="password"
            value={confirm_password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button block type="submit" color="primary">
          Sign Up
        </Button>
        <p className="mt-2">
          Already have an account ? <Link to="/">Login</Link>
        </p>
      </Form>
    </AuthLayout>
  );
}
