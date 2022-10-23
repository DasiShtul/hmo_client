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

{
  //^קומפוננטה שמחזירה דיאלוג של הוספת לקוח
}
const AddPatient = (props) => {
  const {allPatients, open} = props;

  const [inputs, setInputs] = useState({
    FirstName: "",
    LastName: "",
    DateOfBirth: null,
    HouseNumber: null,
    MobilePhone: "",
    Phone: "",
    City: "",
    Street: "",
  });

  // useEffect(() => {
  //   if(open)
  //   setInputs(
  //     (prevState) => {
  //       return {
  //         ...prevState,
  //         ID:
  //           (allPatients[allPatients.length - 1].ID || 0 ) + 1,
  //           //^עשיתי שיוסיף לו מזהה ברירת מחדל לפי המספר של המזהה האחרון במערך +1, אם המערך ריק - המזהה יהיה אחד
  //       };
  //     }
  //   );
  // }, [open]);

  const handleInputChange = (e) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    console.log("New Patient to add:", inputs);
      let taskPromise = await axios.post("https://localhost:44315/api/HMO/AddNewPatient/"+inputs);
      let data = await taskPromise.data;
      console.log(data);      
    
    props.handleClose(); //^סגירה אחרי שההוספה התבצעה.
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>לקוח חדש</DialogTitle>
        <Divider />
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              textAlign: "center",
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              {/* {
                //^ לא שמתי בסוף שיכניס מזהה כי יש מזהה ברירת מחדל
              }
              <TextField
                id="ID"
                label="מזהה"
                type="number"
                onChange={handleInputChange}
              /> */}
              <TextField
                id="FirstName"
                label="שם פרטי"
                type="text"
                onChange={handleInputChange}
              />
              <TextField
                id="LastName"
                label="שם משפחה"
                type="text"
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="DateOfBirth"
                label="תאריך לידה"
                type="date"
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="MobilePhone"
                label="טלפון נייד"
                type="number"
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="Phone"
                label="טלפון"
                type="number"
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="City"
                label="עיר"
                type="text"
                onChange={handleInputChange}
              />
              <TextField
                id="Street"
                label="רחוב"
                type="text"
                onChange={handleInputChange}
              />{" "}
              <TextField
                id="HouseNumber"
                label="מספר בית"
                type="number"
                onChange={handleInputChange}
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions sx={{ margin: "auto" }}>
          <Button
            sx={{ marginRight: "10px" }}
            variant="outlined"
            onClick={props.handleClose}
          >
            ביטול
          </Button>
          <Button
            sx={{ marginRight: "10px" }}
            variant="contained"
            type="submit"
            onClick={handleSubmitChanges}
          >
            הוספה
          </Button>
        </DialogActions>
        <br />
      </Dialog>
    </div>
  );
};
export default AddPatient;
