import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import axios from "axios";
import { Divider } from "@mui/material";
import { useState, useEffect } from "react";



{//^קומפוננטה שמחזירה דיאלוג של עריכה
}
const EditPatient=(props)=> {
  const { patient, open } = props;
  // const id=props.patient.ID;
  const [inputs, setInputs] = useState();

  useEffect(() => {
    if (open) setInputs(props.patient);
  }, [open]);

  const handleInputChange = (e) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmitChanges = async (e) => {
    console.log(e);
    e.preventDefault();
    console.log("updated inputs:", inputs);
      let taskPromise = await axios.post("https://localhost:44315/api/HMO/UpdatePatient/"+patient.ID+"/"
      +inputs.FirstName+"/"+inputs.LastName+"/"+inputs.City+"/"+inputs.Street+"/"+inputs.HouseNumber+"/"+inputs.Phone
      +"/"+inputs.MobilePhone+"/"+inputs.DateOfBirth);
      let data = await taskPromise.data;
      console.log(data);
      
    
    props.handleClose();//סגירה אחרי שהעדכון התבצע
  };

  return (
    <div>
      <Dialog  open={props.open} onClose={props.handleClose} >
        <DialogTitle>עריכת לקוח</DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              textAlign: 'center'
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="FirstName"
                label="שם פרטי"
                type="text"
                defaultValue={patient?.FirstName}
                onChange={handleInputChange}
              />
              <TextField
                id="LastName"
                label="שם משפחה"
                type="text"
                defaultValue={patient?.LastName}
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="DateOfBirth"
                label="תאריך לידה"
                type="datetime"
                defaultValue={patient?.DateOfBirth}
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="MobilePhone"
                label="טלפון נייד"
                type="number"
                defaultValue={patient?.MobilePhone}
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="Phone"
                label="טלפון"
                type="number"
                defaultValue={patient?.Phone}
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="City"
                label="עיר"
                type="text"
                defaultValue={patient?.City}
                onChange={handleInputChange}
              />
              <TextField
                id="Street"
                label="רחוב"
                type="text"
                defaultValue={patient?.Street}
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="HouseNumber"
                label="מספר בית"
                type="number"
                defaultValue={patient?.HouseNumber}
                onChange={handleInputChange}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{margin:'auto' }}>
          <Button sx={{marginRight:'10px'}} variant='outlined'onClick={props.handleClose}>ביטול</Button>
          <Button sx={{marginRight:'10px'}} variant='contained' type="submit" onClick={handleSubmitChanges}>
            שמירת שינויים
          </Button>
        </DialogActions>
          <br/>
         
      </Dialog>
    </div>
  );
}
export default EditPatient;
