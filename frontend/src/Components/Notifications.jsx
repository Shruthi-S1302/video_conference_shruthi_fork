import React, { useContext } from 'react';
import { Button} from '@material-ui/core';
import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const {answerCall, call, callAccepted, calling,leaveCall} = useContext(SocketContext);
  return (
    <>
    {call.isReceivedCall && !callAccepted && (
            <div style={{display: 'flex', justifyContent: "center"}}>
                <h4>{call.name} is calling:  </h4>
                <Button variant="contained"  onClick={answerCall} style= {{background:"#9800DA", marginLeft: "2%"}}>
                    <span style={{color: "white"}}>Answer</span>
                </Button>
                <Button variant="contained"  onClick={leaveCall} style= {{background:"red", marginLeft: "2%"}}>
                    <span style={{color: "white"}}>Reject</span>
                </Button>
            </div>
    )}
    {calling && (
            <div style={{display: 'flex', justifyContent: "center"}}>
                <h4>Calling...  </h4>
            </div>
    )}
    </>
  )
}

export default Notifications