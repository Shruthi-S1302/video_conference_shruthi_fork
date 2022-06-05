import React, { useContext } from 'react';
import { Button} from '@material-ui/core';
import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const {answerCall, call, callAccepted} = useContext(SocketContext);
  return (
    <>
    {call.isReceivedCall && !callAccepted && (
            <div style={{display: 'flex', justifyContent: "center"}}>
                <h4>{call.name} is calling:  </h4>
                <Button variant="contained"  onClick={answerCall} style= {{background:"#9800DA", marginLeft: "2%"}}>
                    <span style={{color: "white"}}>Answer</span>
                </Button>
            </div>
    )}
    </>
  )
}

export default Notifications