
import {AppBar, Typography} from '@material-ui/core';
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
    border: '2px solid black',

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
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
  <AppBar className={classes.appBar} position="static" color="inherit">
    <Typography variant="h4" align="center">
      Video Conference
    </Typography>
  </AppBar>
  <VideoPlayer/>
  <Options>
    <Notifications/>
  </Options>
</div>
  );
}

export default App;
