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
import './ShowPatientDetails.css'
{
  //^קומפוננטה שמחזירה דיאלוג של פרטים
}
const ShowPatientDetails = (props) => {
  const patient = props.patient;
  const vaccination=props.vaccination;
  const statusCOVID19=props.statusCOVID19;

  function IsVaccination(props) {
    const isVaccination = props.isVaccination;
    if (isVaccination?.PatientId==patient?.ID) {
      return  <li><b>חיסון מספר {isVaccination?.VaccinatioNumber}:</b>{isVaccination?.VaccinationDate}</li>
          
    }
  }
  function IsPositive(props) {
    const isPositive = props.isPositive;
    
    if (isPositive?.PatientId==patient?.ID) {
      
      return (<> <li><b>חיובי לקורונה בתאריך:</b>{isPositive?.Positive}</li>
            <li><b>תאריך החלמה:</b>{isPositive?.Recovery}</li>              

      </>)
                      
      
    }
  }
  return (
    <>
       
        <div>
          <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>פרטי לקוח</DialogTitle>
            <Divider />
            <DialogContent sx={{paddingRight: '30px',paddingLeft: '50px'}}>
              <div>
                    <Avatar sx={{float:'right', bgcolor: "#61dafb", color: "grey" }}>
                    <PersonIcon />
                    </Avatar>
                    <h2>{patient?.FirstName + ' ' + patient?.LastName}</h2>
                
                <ul className="details-list">
                  <li> <b>מזהה:</b>{patient?.ID}</li>

                  {//^לא עובד בכל הפורמטים, רק בפורמט של דייט טיים }
}                 
{/* <li><b>תאריך לידה:</b> {patient?.DateOfBirth?.getDate()+'/'+patient?.DateOfBirth?.getMonth()+'/'+patient?.DateOfBirth?.getYear()}</li>  */}

                   <li><b>תאריך לידה:</b> {patient?.DateOfBirth?.toString()}</li> 
                  <li> <b>כתובת: </b>{patient?.Street +' '+patient?.HouseNumber+', '+patient?.City}</li>
                  <li><b> טלפון: </b>{patient?.Phone}</li>
                  <li> <b>טלפון נייד: </b>{patient?.MobilePhone}</li>
                  {statusCOVID19?.map((s) => {
                 
                  return <IsPositive isPositive={s} />}
                  
                  )}    
                 {vaccination?.map((v) => {
                  
                    console.log(v) 
                    return <IsVaccination isVaccination={v} />})}    
                </ul>
              </div>
            </DialogContent>
            <DialogActions sx={{ margin: "auto" }}>
              <Button variant="outlined" onClick={props.handleClose}>
                סגירה
              </Button>
            </DialogActions>
            <br />
          </Dialog>
        </div>
      
    </>
  );
};

export default ShowPatientDetails;
