const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server,{
    cors: {
        origin: "*",
        methods: ["GET","POST"]
    }
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/",(req,res) => {
    res.send("Server up and running!");
});

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit('me',socket.id);
    socket.on('disconnect',()=> {
        //issue
        socket.broadcast.emit("callended");
    });
    socket.on('calluser', ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit('calluser',{signal:signalData,from,name});
    });
    socket.on('answercall', ({signal,to,from}) => {
        io.to(to).emit('callaccepted', {signal,from});
    });
    socket.on('leftcall',(data)=>{
        console.log('leftcall trigger');
        console.log(data);
        io.to(data).emit('leaveself');
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));