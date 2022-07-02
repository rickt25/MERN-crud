import { Spinner } from "reactstrap";

export default function Loading() {
  return (
    <div className="loading">
      <Spinner color="primary">
        Loading...
      </Spinner>
    </div>
  )
}