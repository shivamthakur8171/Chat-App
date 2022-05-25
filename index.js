const express = require("express");
const app = express();
const http = require('http').createServer(app);

const port = process.env.PORT || 8000

http.listen(port , () =>{
    console.log(`listening  on the port ${port}`);
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req ,res) =>{
    res.sendFile(__dirname + '/index.html');
});

// socket

const io = require('socket.io')(http);

const users ={};

io.on('connection', socket =>{
    socket.on('new-user-joined', userName =>{
        // console.log("new user",userName);
        users[socket.id] = userName;
        socket.broadcast.emit('user-joined', userName);
    });
    socket.on("disconnect", () => {
        socket.broadcast.emit('user-disconnected', user = users[socket.id])
        delete users[socket.id];
        io.emit("user-List", users);
    })
    socket.on('message', (data) => {
        socket.broadcast.emit('message', { user: data.user, msg: data.msg })
    })
    
})






