import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import SmartLink from "../components/SmartLink"
import { Navbar as NavbarWrapper, Collapse, Nav, NavbarBrand, NavbarText, NavbarToggler, NavItem, Button } from "reactstrap";
import logo from "../assets/images/apple-logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

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
              <Button color="danger" onClick={handleLogout} outline>Logout</Button>
            </NavbarText>
          </Collapse>
        </NavbarWrapper>
      </div>
    </>
  );
}
