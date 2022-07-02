import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import './AuthLayout.css';

export default function AuthLayout({ title, children }) {
  return (
    <>
      <div className="auth">
        <Container>
          <Row>
            <Col/>
            <Col>
              <Card className="p-4">
                <CardBody>
                  <CardTitle tag="h5" className="text-center mb-2">
                    {title}
                  </CardTitle>
                  {children}
                </CardBody>
              </Card>
            </Col>
            <Col/>
          </Row>
        </Container>
      </div>
    </>
  );
}
