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
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, deletePost ,reset } from "../features/post/postSlice";
import Loading from "../components/Loading";
import PostForm from "../components/PostForm";
import FormModal from "../components/FormModal";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [modal, setModal] = useState({
    isOpen: false,
    title: ""
  });
  const [formType, setFormType] = useState("");
  const [post, setPost] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { posts, isError, isLoading, isSuccess, message } = useSelector((state) => state.post);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    if(isError){ toast.error(message); }
    if(isSuccess){ toast.success(message); }
    dispatch(getPosts());
    return() => {
      dispatch(reset());
    }
  }, [user, isError, message, dispatch]);

  function handleAdd(){
    setFormType("add");
    setPost({});
    setModal({
      isOpen: true,
      title: "Add Post",
    });
  }

  function handleEdit(id){
    setFormType("edit");
    setPost(posts.find((post) => post.id === id));
    setModal({
      isOpen: true,
      title: "Edit Post"
    });
  }

  function handleDelete(id){
    dispatch(deletePost(id));
  }

  function toggleModal(){
    setModal(prevState => ({
      ...prevState,
      isOpen: !prevState.isOpen
    }));
  }

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
                  <Button color="primary" onClick={handleAdd}>
                    Add Post
                  </Button>
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
                        <Button color="success" size="sm" className="me-1" onClick={() => handleEdit(post.id)}>Edit</Button>
                        <Button color="danger" size="sm" onClick={() => handleDelete(post.id)}>Delete</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
        <FormModal isOpen={modal.isOpen} title={modal.title} id="postForm" toggleModal={toggleModal}>
          <PostForm formType={formType} post={post} />
        </FormModal>
      </DashboardLayout>
    </>
  );
}
