import { Container, Row, Col, Card, CardBody, CardTitle, Nav } from "reactstrap";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <Container>
        {children}
      </Container>
    </>
  );
}
