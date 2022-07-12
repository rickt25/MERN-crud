import DashboardLayout from "../layouts/DashboardLayout";
import {
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, reset } from "../features/post/postSlice";
import Loading from "../components/Loading";
import PostForm from "../components/PostForm";
import FormModal from "../components/FormMOdal";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isError, isLoading, isSuccess, message } = useSelector((state) => state.post);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }

    if(isError){
      toast.error(message);
    }

    if(isSuccess){
      toast
    }

    dispatch(getPosts());

    return() => {
      dispatch(reset());
    }
  }, [isError, dispatch]);

  if(isLoading){
    return <Loading />;
  }

  return (
    <>
      <DashboardLayout>
        <Container className="mt-5">
          <Card body color="light" outline>
            <CardBody>
              <Row>
                <Col>
                  <CardTitle tag="h5">Posts</CardTitle>
                  <CardSubtitle className="mb-2 text-muted" tag="h6">
                    This is table containing posts i guess
                  </CardSubtitle>
                </Col>
                <Col className="col-auto">
                  <FormModal color="primary" label="Add New" title="Create Post" formId="createPost">
                    <PostForm id="createPost" />
                  </FormModal>
                </Col>
              </Row>
              <Table striped>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr key={post.id}>
                      <th scope="row" className="text-nowrap" style={{width: "1%"}}>{index+1}</th>
                      <td>{post.title}</td>
                      <td>{post.content}</td>
                      <td className="text-nowrap" style={{width: "1%"}}>
                        <Button color="success" size="sm" className="me-1">Edit</Button>
                        <Button color="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </DashboardLayout>
    </>
  );
}
