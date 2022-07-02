import SmartLink from "../components/SmartLink"
import { Navbar as NavbarWrapper, Collapse, Nav, NavbarBrand, NavbarText, NavbarToggler, NavItem, Button } from "reactstrap";
import logo from "../assets/images/apple-logo.png";

export default function Navbar() {
  return (
    <>
      <div>
        <NavbarWrapper color="light" expand="md" light>
          <NavbarBrand href="/">
            <img className="brandlogo" src={logo} alt="Logo" />
          </NavbarBrand>
          <NavbarToggler onClick={function noRefCheck() {}} />
          <Collapse navbar>
            <Nav className="me-auto" navbar>
              <NavItem className="ms-4 mx-2">
                <SmartLink className="nav-link" to="/dashboard">Posts</SmartLink>
              </NavItem>
              <NavItem className="mx-2">
                <SmartLink className="nav-link" to="/">Others</SmartLink>
              </NavItem>
            </Nav>
            <NavbarText>
              <Button color="danger" outline>Logout</Button>
            </NavbarText>
          </Collapse>
        </NavbarWrapper>
      </div>
    </>
  );
}
