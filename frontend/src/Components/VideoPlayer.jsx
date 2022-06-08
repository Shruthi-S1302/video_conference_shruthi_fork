import React,{useContext} from 'react';
import {Grid, Typography, Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import { SocketContext } from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      width: '95vw',
    },
    alignSelf: 'center'
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'row',
    },
  },
  paper: {
    padding: '10px',
    margin: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: "46%",
    aspectRatio: 1
  },
}));

const VideoPlayer = () => {
    const { name,call,stream,callAccepted,callEnded,myVideo,userVideo } = useContext(SocketContext);
    const classes = useStyles();
  return (
          <Grid container className={classes.gridContainer}>
            {
                   callAccepted && !callEnded && (
                    <Paper className={classes.paper} style={{background: 'transparent'}} elevation={0}>
                    <Grid item xs={12} md={12}>
                    <Typography variant="h6" gutterBottom style={{color: "white"}}>{call.name || 'Name'}</Typography>
                        <video playsInline className={classes.video}  ref={userVideo} style={{borderRadius: "7px"}}/>
                    </Grid>
                </Paper>
                   )
               }
              {myVideo &&  (
                    <Paper className={classes.paper} style={{background: 'transparent'}} elevation={0}>
                    <Grid item xs={12} md={12}>
                    <Typography variant="h6" gutterBottom style={{color: "white"}}>{name || 'Name'}</Typography>
                        <video playsInline className={classes.video}  ref={myVideo} muted style={{borderRadius: "7px"}}/>
                    </Grid>
                </Paper>
              )}
    </Grid>
  )
}

export default VideoPlayer