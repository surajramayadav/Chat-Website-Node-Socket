const express = require('express')
const app = express()
const http = require('http').createServer(app)

// const PORT = process.env.PORT || 3000
const path=require('path')
const PORT =process.env.PORT || 5000

http.listen(PORT,()=>{
    console.log(`Listeneing on Port ${PORT}`)
})

// const __dirname = path.resolve();
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
})

const io=require('socket.io')(http)
io.on("connection",(socket)=>{
    console.log("conneceted")

    socket.on('message',(msg)=>{
        // console.log(msg)
        socket.broadcast.emit('message',msg)
    })
})