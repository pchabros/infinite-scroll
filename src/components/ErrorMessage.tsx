import { FC } from "react";
import { Alert } from "@mui/material";

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error }) => {
  const formattedError =
    error === "There is nothing here" ? "No data found!" : error;
  return (
    <Alert
      variant="outlined"
      severity="error"
      sx={{ marginY: 5, marginX: "auto", maxWidth: 500 }}
    >
      {formattedError}
    </Alert>
  );
};

export default ErrorMessage;
