const socket = io('http://localhost:8000');

let userName;
var chats = document.querySelector(".chats")
var usersList = document.querySelector(".users-List")
var usersCount = document.querySelector(".users-Count")
var usermsg = document.querySelector('#messageInp');
var sendmsg = document.querySelector('#sendmsg');


do{
    userName = prompt("enter your Name to join");
}while(!userName)
console.log(userName);

socket.emit('new-user-joined', userName);

socket.on('user-joined',(socket_name)=>{
    userJoinLeft(socket_name,'joined');
});

function userJoinLeft(name,status){
    console.log(name,status);
    let div = document.createElement("div");
    div.classList.add('user-join')
    let content=`<p><b>${name}</b> ${status} the chat</p>`;
    div.innerHTML=content;
    chats.appendChild(div);

}
socket.on('user-disconnected',(user)=>{
    userJoinLeft(user,'left')
});

socket.on('user-List',(users)=>{
    users_List.innerHTML="";
    users_arr =Object.values(users);
    for ( i = 0;i<users_arr.length;i++) {
        const element = users_arr[i];
        
    }
})
    
sendmsg.addEventListener('click',()=>{
    let data = {
    user :userName,
    msg:usermsg.value
    }
    if(usermsg.value != ''){
    appendMassage(data,'outgoing')
    socket.emit('message',data);
    usermsg.value = '';
    }
    
})
    
socket.on('message', (data) => {
    console.log(data);
    appendMassage(data, 'incomming')
})
    
function appendMassage(data, status) {
    let div = document.createElement('div');
    let addcal = ('outgoing' == status) ? 'right' : 'left'
    console.log(data);
    let content = `<div class="message ${addcal}"> ${data.user} : ${ data.msg }</div>`
    div.innerHTML = content;
    chats.appendChild(div)
    chats.scrollTop=chats.scrollHeight;
}
    

