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
      margin: '10px',
    },
  }));

const VideoPlayer = () => {
    const { name,call,stream,callAccepted,callEnded,myVideo,userVideo } = useContext(SocketContext);
    const classes = useStyles();
  return (
          <Grid container className={classes.gridContainer}>
              {myVideo &&  (
                    <Paper className={classes.paper} style={{background: 'transparent'}}>
                    <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom style={{color: "white"}}>{name || 'Name'}</Typography>
                        <video playsInline className={classes.video}  ref={myVideo} muted style={{borderRadius: "7px"}}/>
                    </Grid>
                </Paper>
              )}
               {
                   callAccepted && !callEnded && (
                    <Paper className={classes.paper} style={{background: 'transparent'}}>
                    <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom style={{color: "white"}}>{call.name || 'Name'}</Typography>
                        <video playsInline className={classes.video}  ref={userVideo} style={{borderRadius: "7px"}}/>
                    </Grid>
                </Paper>
                   )
               }
    </Grid>
  )
}

export default VideoPlayer