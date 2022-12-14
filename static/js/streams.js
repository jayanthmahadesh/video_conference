const APP_ID ='405129d2bcc045cebe849116ce78009d'
const CHANNEL='main'
const TOKEN = '007eJxTYNBcuvv7/zM1rqcVE3beWeT35snkiTeChRgDFvDGLedgmu6iwJBkaJCYlmpqkWZpYGmSZGqQZGqYamBgaZlqlpiYYmFqqhw9M7khkJHh9O04RkYGCATxWRhyEzPzGBgAjhIfyA=='
console.log('stream.js connected asdfasdf;kjasd;lf')
const client = AgoraRTC.createClient({mode:'rtc',codec:'vp8'})
let localTracks = []
let remoteUsers ={}

let joinAndDisplayLocalStream = async ()=>{
    client.on('user-published',handleUserJoined)
    client.on('user-left',handleUserLeft)
    UID = await client.join(APP_ID,CHANNEL,TOKEN,null)
    // console.log(UID)
    localTracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    let player = ` <div class="video-container" id="user-container-${UID}">
                    <div class="username-wrapper"><span class='username'>my name</span></div>
                    <div class="video-player" id= 'user-${UID}'></div>
                </div>`
              
    document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)


    localTracks[1].play(`user-${UID}`)
    await client.publish([localTracks[0],localTracks[1]])
    
}
let handleUserJoined = async(user,mediaType)=>{
    remoteUsers[user.uid]=user
    await client.subscribe(user,mediaType)
    if(mediaType==='video'){
        let player = document.getElementById(`user-container-${user.uid}`)
        if(player!=null){
            player.remove()

        }
        player = ` <div class="video-container" id="user-container-${user.uid}">
        <div class="username-wrapper"><span class='username'>my name</span></div>
        <div class="video-player" id= 'user-${user.uid}'></div>
          </div>`
       
document.getElementById('video-streams').insertAdjacentHTML('beforeend',player)
    user.videoTrack.play(`user-${user.uid}`)
}
if(mediaType==='audio'){
    user.audioTrack.play()
}
}
let handleUserLeft = async (user)=>{
    delete remoteUsers[user.uid]
    document.getElementById(`user-container-${user.uid}`).remove()
}
let leaveAndRemoveLocalStream = async()=>{
    console.log('its comming here')

    for(let i=0;localTracks.length>i;i++){
        localTracks[i].stop();
        localTracks[i].close();
    }
    await client.leave()
    window.open('/','_self')

}
joinAndDisplayLocalStream()
document.getElementById("leave-btn").addEventListener('click',leaveAndRemoveLocalStream)
