import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton.jsx";

function Error() {
  const error = useRouteError();

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.message}</p>
      <LinkButton>&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
