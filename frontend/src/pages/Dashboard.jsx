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
import { useSelector } from "react-redux";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user]);

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
                  <Button className="px-4" color="primary">Add New</Button>
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
                  <tr>
                    <th scope="row" className="text-nowrap" style={{width: "1%"}}>1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td className="text-nowrap" style={{width: "1%"}}>
                      <Button color="success" size="sm" className="me-1">Edit</Button>
                      <Button color="danger" size="sm">Delete</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Container>
      </DashboardLayout>
    </>
  );
}
