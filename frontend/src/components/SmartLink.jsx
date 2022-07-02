import {
  Link,
  useMatch,
  useResolvedPath,
} from "react-router-dom";

export default function SmartLink({ children, to, className, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div>
      <Link to={to} className={className + (match ? " active" : "")} {...props}>
        {children}
      </Link>
      
    </div>
  );
}