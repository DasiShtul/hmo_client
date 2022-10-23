import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import "./ShowPatientDetails.css";
import axios from "axios";

{
  //^קומפוננטה שמחזירה דיאלוג של מחיקה
}
const DeletePatient = (props) => {
  const patient = props.patient;


  const handleSubmitDelete = async() =>{
    
    console.log("Patient to delete:", props.patient);
      let taskPromise = await axios.delete("https://localhost:44315/api/HMO/DeletePatients/"+patient.ID);
      let data = await taskPromise.data;
      console.log(data);
    
    props.handleClose();
  }

  return (
    <>
      {patient && (
        <div>
          <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"האם אתה בטוח?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
               האם אתה בטוח שברצונך למחוק לקוח זה?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={props.handleClose}>ביטול</Button>
                <button  className="delete" onClick={handleSubmitDelete}>מחיקה</button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
};

export default DeletePatient;
