import React, { useContext, useState } from 'react';
import {Button, Grid, Container, TextField, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Assignment, Phone, PhoneDisabled} from '@material-ui/icons';

import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  gridContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
  },
  container: {
    width: '100%',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  inner: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
  },
  optionarea: {
    display: "flex",
    justifyContent: 'space-between',
  }
 }));

const Options = () => {
  const {me, callAccepted, name, setName, leaveCall, callEnded, callUser} = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const classes = useStyles();
  return (
    <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
            <form className={classes.root} noValidate autoComplete="off">
            {
                                    callAccepted && !callEnded ? (
                                      <>
                                        <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                                            Hang Up
                                        </Button>
                                      </>
                                    ) : (
                                      <>
                                      <Container className={classes.inner}>
                                      {
                                                !callAccepted && (
                                                  <Grid item xs={12} md={12} className={classes.padding}>
                                              <Typography variant="h7" gutterBottom>Enter a nickname</Typography>
                                              <TextField label="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                              <CopyToClipboard text={me} className={classes.margin} >
                                                  <Button variant="contained" color="primary" startIcon={<Assignment fontSize="large"/>}>
                                                      Copy your ID
                                                  </Button>
                                              </CopyToClipboard>
                                          </Grid>)
                                          }
                                      </Container>
                                      <Container className={classes.inner}>
                                      {
                                                !callAccepted && (
                                                  <Grid item xs={12} md={12} className={classes.padding}>
                                                  <Typography variant="h8" gutterBottom>Make a Call</Typography>
                                                         
                                                       <TextField label="ID to Call" value={idToCall} onChange={(e)=>{setIdToCall(e.target.value)}}/>
                                                       <div className={classes.margin}>
                                                          <Button variant="contained" color="primary" startIcon={<Phone fontSize="large"/>} onClick={()=> {callUser(idToCall)}}>
                                                                  Call
                                                          </Button></div>
                                                      
                                                       </Grid>)
                                          }
                                      </Container>
                                      </>
                                    )
              } 
               
            </form>
        </Paper>
    </Container>
  )
}

export default Options