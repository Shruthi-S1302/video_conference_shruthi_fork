import React,{useContext} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '350px',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
      alignSelf: 'center'
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      padding: '10px',
      border: '2px solid black',
      margin: '10px',
    },
  }));

const VideoPlayer = () => {
    const { name,call,stream,callAccepted,callEnded,myVideo,userVideo } = useContext(SocketContext);
    const classes = useStyles();
  return (
          <Grid container className={classes.gridContainer}>
              {stream &&  (
                    <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                        <video playsInline muted className={classes.video}  ref={myVideo}/>
                    </Grid>
                </Paper>
              )}
               {
                   callAccepted && !callEnded && (
                    <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                        <video playsInline muted className={classes.video} ref={userVideo}/>
                    </Grid>
                </Paper> 
                   )
               }
    </Grid>
  )
}

export default VideoPlayer