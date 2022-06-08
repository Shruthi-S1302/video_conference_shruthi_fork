
import {AppBar, Typography, Container, Paper} from '@material-ui/core';
import VideoPlayer from './Components/VideoPlayer';
import Options from './Components/Options';
import Notifications from './Components/Notifications';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
  appBar: {
    borderRadius: 15,
    margin: '30px 100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '600px',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  image: {
    marginLeft: '15px',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  videochat: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: "60%"
  },
  vidcontent: {
    display: "flex",
    justifyContent: 'center',
    width: "100%",
    height: "60%"
  },
  optioncontent: {
    display: "flex",
    justifyContent: 'center',
    width: "100%",
    height: "40%"
  },
  chatcontent: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '2px solid white',
    width: "40%"
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    width: "100%",
    height: "80vh"
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
  <AppBar className={classes.appBar} position="static" style={{ background: 'transparent', boxShadow: 'none'}}>
  <Typography variant="h4" align="center" style={{color:"white"}}> 
      X
    </Typography>
    <Typography variant="h4" align="center" style={{color:"#FF1B86"}}> 
      Stream
    </Typography>
  </AppBar>
  <Container className={classes.content}>
  <Container className={classes.videochat}>
    <Container className={classes.vidcontent}>
      <VideoPlayer/>
    </Container>
    <Container className={classes.optioncontent}>
    <Options>
  </Options>
    </Container>
  {/*
  */}
  </Container>
  <Paper className={classes.chatcontent}>
    <Notifications/>
  </Paper>
  </Container>
</div>
  );
}

export default App;
