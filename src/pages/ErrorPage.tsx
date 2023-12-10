import React from "react";
import { useRouteError } from "react-router-dom";

type ErrorType = { statusText?: string; message?: string };

export const ErrorPage = () => {
  const error = useRouteError() as ErrorType;
  return (
    <>
      <h1>AN UNEXPECTED ERROR OCCURED</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
};
