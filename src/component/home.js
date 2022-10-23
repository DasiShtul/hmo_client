import React from "react";
// import React, { useRef, useEffect, useState } from 'react'
import {} from "./home.css";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {
  ListItemAvatar,
  ListItemText,
  List,
  ListItem,
  Avatar,
  Divider,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import EditPatient from "./EditPatient";
import ShowPatientDetails from "./ShowPatientDetails";
import DeletePatient from "./DeletePatient";
import AddPatient from "./AddPatient";



export default () => {
  //     const [open, setOpen] = React.useState(false);
  //     const theme = useTheme();
  //     const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [current, setCurrent] = React.useState(null);

  const handleOpenEdit = (a) => {
    setCurrent(a);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDetails = (a) => {
    setCurrent(a);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const handleOpenDelete = (a) => {
    setCurrent(a);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const [statusCOVID19_tbl, setStatusCOVID19_tbl] = React.useState(null);
  const fetchDataStatusCOVID19 = async () => {
    let taskPromise = await axios.get("https://localhost:44315/api/HMO/GetAllStatusCOVID19");
    let data = await taskPromise.data;
    console.log(data);
    setStatusCOVID19_tbl(data);
  };

  const [vaccination_tbl, setVaccination_tbl] = React.useState(null);
  const fetchDataVaccination = async () => {
    let taskPromise = await axios.get("https://localhost:44315/api/HMO/GetAllVaccinations");
    let data = await taskPromise.data;
    console.log(data);
    setVaccination_tbl(data);
  };
  const [patients_tbl, setPatients_tbl] = React.useState(null);
  const fetchData = async () => {
    let taskPromise = await axios.get("https://localhost:44315/api/HMO/GetAllPatients");
    let data = await taskPromise.data;
    console.log(data);
    setPatients_tbl(data);
  };
  React.useEffect(()=>{
    fetchData()
    fetchDataVaccination()
    fetchDataStatusCOVID19()
  },
    //^זה הבקשת שרת! אל תשכחי להחזיר את זה מההערה
    // () => async () => {
    //   let taskPromise = await axios.get(
    //     "https://localhost:44315/api/HMO/GetAllPatients"
    //   );
    //   let data = await taskPromise.data;
    //   console.log(data);
    //   setPatients_tbl(data);
    // },
    []
  );

  return (
    <div className="home">
      <h1> מאגר נתוני קורונה</h1>
      <Divider />
      <div className="list">
        <List sx={{ pt: 0 }}>
          {patients_tbl?.map((p) => (
            <div key ={p.ID}>       
              <ListItem
                sx={{
                  "&:hover": {
                    background: " rgba(225, 222, 222, 0.601)",
                  },
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#61dafb", color: "grey" }}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  onClick={() => handleOpenDetails(p)}
                  sx={{
                    textAlign: "right",
                    "&:hover": {
                      cursor: "pointer",
                      color: " rgba(177, 24, 24, 0.69)",
                    },
                  }}
                  primary={p?.FirstName + " " + p?.LastName}
                />

                <div className="edit" onClick={() => handleOpenEdit(p)}>
                  <EditIcon />
                </div>
                <button className="delete" onClick={() => handleOpenDelete(p)}>
                  מחיקה
                </button>
              </ListItem>
            </div>
          ))}
        </List>

        {
          //^דיאלוג של פרטים
        }
        <ShowPatientDetails
          patient={current}
          vaccination={vaccination_tbl}
          statusCOVID19={statusCOVID19_tbl}
          open={openDetails}
          handleClickOpen={handleOpenDetails}
          handleClose={handleCloseDetails}
        />
        {
          //^דיאלוג של עריכה
        }
        <EditPatient
          patient={current}
          open={openEdit}
          handleClickOpen={handleOpenEdit}
          handleClose={handleCloseEdit}
        />
        {
          //^דיאלוג של מחיקה
        }
        <DeletePatient
          patient={current}
          open={openDelete}
          handleClickOpen={handleOpenDelete}
          handleClose={handleCloseDelete}
        />
       {
          //^דיאלוג של הוספה
        }
         {patients_tbl && <AddPatient
          allPatients={patients_tbl}
          open={openAdd}
          handleClickOpen={handleOpenAdd}
          handleClose={handleCloseAdd}
        />}
      </div>
      <Divider />
      <ListItem autoFocus button onClick={handleOpenAdd}>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ textAlign: "right" }} primary="הוספת לקוח חדש" />
      </ListItem>
    </div>
  );
};
