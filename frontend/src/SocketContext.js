import React, {createContext, useRef, useState, useEffect} from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';


const SocketContext = createContext();

const socket = io('https://video-conf002.herokuapp.com/');

const ContextProvider = ({children}) => {

    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState({});
    const [to, setTo] = useState('');
    const [callAccepted,setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
            myVideo.current.play();
        });

        socket.on('me', (id) => {setMe(id)});
        socket.on('calluser', ({from, name: callerName, signal}) => {
        setCall({isReceivedCall:true, from, name: callerName, signal});
        });
        socket.on('leaveself',()=>{leaveSelf(),
        console.log("leaveself triggered")});
    }, []);
    
    const answerCall = () => {
        setCallAccepted(true);
        
        const peer = new Peer({initiator: false, trickle: false, stream});

        
        
        peer.on('signal',data => {
            socket.emit('answercall', {signal: data, to: call.from, from: name});
            
            
        });

        peer.on('stream', currentStream =>{
            userVideo.current.srcObject = currentStream;
            userVideo.current.play();
        });

        peer.signal(call.signal);
        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({initiator: true, trickle: false, stream});
        setTo(id);
        peer.on('signal',data => {
            socket.emit('calluser', {userToCall: id, signalData: data, from: me, name});
        });

        peer.on('stream', currentStream=>{
            userVideo.current.srcObject = currentStream;
            userVideo.current.play();
        });

        socket.on('callaccepted', ({signal,from})=>{
            console.log("call accepted");
            setCall({name:from});
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        if(call.isReceivedCall){
            socket.emit('leftcall',call.from);
        }
        else{
            socket.emit('leftcall',to);
        }
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }
    const leaveSelf = () => {
        console.log("leaveself called")
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    return(
        <SocketContext.Provider value={{ stream, me, call, callAccepted, callEnded, name, myVideo, userVideo, connectionRef, setName, callUser, leaveCall, answerCall}}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider,SocketContext};