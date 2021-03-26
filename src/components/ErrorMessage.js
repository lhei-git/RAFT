import React, { useContext } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { InputsContext } from './../context/InputsContext';
// import CloseIcon from '@material-ui/icons/Close';

const ErrorMessage = (props) => {
  const {inputs} = useContext(InputsContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    // clean up
    inputs.errorMessage = "";
    props.setOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={props.open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={props.message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                style={{ fontSize: "2rem", verticalAlign: "0rem" }}
              />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
};

export default ErrorMessage;
