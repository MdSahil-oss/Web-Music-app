// Song Data
let songLoad = document.getElementById('songLoad');
let songData = {
    "0" : {
        "name" : "Bijli Bijli Hardy Shandu",
        "minutes" : 2,
        "seconds" : 48
    },
    "1" : {
        "name" : "Bansuri Hum Do Hamare Do",
        "minutes" : 2,
        "seconds" : 44
    },
    "2" : {
        "name" : "Kill Chori Ash king",
        "minutes" : 3,
        "seconds" : 09
    },
    "3" : {
        "name" : "O Yaara Dil Lagana",
        "minutes" : 3,
        "seconds" : 34
    }
}

let intervalSetter ;
let playing = false;
var audio
var prevSong
let playSong = function(fName){
    
    if(!playing){
        audio = new Audio(`../SONG/${fName}.mp3`);
        playing = true;
    }
    else if(fName == prevSong)
    {
        audio.pause()
        clearInterval(intervalSetter)
        audio = new Audio(``);
        playing = false;
        console.log("paused")
    }
    else{
        audio.pause()
        audio = new Audio(`../SONG/${fName}.mp3`);
        // playing = true;
    }
    
    
    if(playing){
        // setTimeout((()=>{
        //     audio.pause()
        //     console.log("Stopped Music")
        //     document.getElementsByTagName('footer').style.color = "rgb(192, 187, 187)"
        // }),songData[`${fName}`]['minutes']*60+songData[`${fName}`]['seconds'])


        audio.play()
        playing = true
        console.log(`Playing ${fName}.mp3`)
        let minutesString ;
        let secondsString ;
        if(songData[fName]["minutes"]<10){
            minutesString = `0${songData[fName]["minutes"]}`
        }
        else{
            minutesString = `${songData[fName]["minutes"]}`
        }
        if(songData[fName]["seconds"]<10){
            secondsString = `0${songData[fName]["seconds"]}`
        }
        else{
            secondsString = `${songData[fName]["seconds"]}`
        }
        let timing = songData[`${fName}`]["minutes"]*60 + songData[`${fName}`]["seconds"]
        document.getElementById('endTime').innerText = `${minutesString}:${secondsString}`
        document.getElementById('songName').innerText = 
        `${songData[fName]["name"]}`
        document.getElementById('endTime').style.color = "white"
        document.getElementById('startTime').style.color = "white"
        document.getElementById('songName').style.color = 'white';
        intervalSetter = setInterval(()=>{
            
            let load  = 100 * audio.currentTime/timing;
            songLoad.style.width = `${load}%`
            let curMinStr ;
            let curSecStr ;
            if(Math.floor(audio.currentTime/60)<10){
                curMinStr = `0${Math.floor(audio.currentTime/60)}`
            }
            else{
                curMinStr = `${Math.floor(audio.currentTime/60)}`
            }
            if(Math.floor(audio.currentTime%60)<10){
                curSecStr = `0${Math.floor(audio.currentTime%60)}`
            }
            else{
                curSecStr = `${Math.floor(audio.currentTime%60)}`
            }
            document.getElementById('startTime').innerText = `${curMinStr}:${curSecStr}`
            
            if(load >= 100){
                clearInterval(intervalSetter)
            }
        },1000)
        
    }
    prevSong = fName
}



let songs = document.getElementsByClassName('song')
songs = Array.from(songs);
songs.forEach((element,index)=>{
    element.addEventListener('click',(e)=>{
        e.preventDefault()
        playSong(index)
    })
})


// ************************Searching-Algorithm***************************
let searchSong = document.getElementById('searchSong');

searchSong.addEventListener('input',(e)=>{
    e.preventDefault()
    let text = searchSong.value;
    
    songs.forEach((element,index)=>{
        let para = element.firstElementChild.lastElementChild.innerText.replace('-',' ');
        if(para.toLowerCase().includes(text.toLowerCase())){
            element.style.display = 'block'
        }
        else{
            element.style.display = 'none'
        }
    })
})
