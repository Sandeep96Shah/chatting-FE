import { io } from "socket.io-client";
import  jwt_decode from 'jwt-decode';
import { privateMessage } from "../actions";

export const handleConnect = (name, id, dispatch, from, to) => {
    const socket = io("http://13.233.24.54:8000/", { transports : ['websocket'] });
    socket.on('connect', () => {
      socket.emit('joinroom',
            {
                userName: name,
                chatRoom : id, 
            });
            socket.on('user-joined',function(data)
            {
                //console.log('a user joined Here',data);
            })
            socket.on('receive_message', function(data){
                const token = localStorage.getItem('token');
                const user = jwt_decode(token);
                if(user._id === data.from){
                    const receive = {
                        msg : data.message,
                        user_id : from,
                    }
                }else{
                    const receive = {
                        msg : data.message,
                        user_id : to,
                    }
                    dispatch(privateMessage(to));
                }
            })
           
    })
}

export const handleSendMessage = (msg,id,name, from) => {
    const socket = io("http://13.233.24.54:8000/", { transports : ['websocket'] });
    socket.emit('send_message', {
        message: msg,
        name: name,
        chatRoom: id,
        from,
    });
}