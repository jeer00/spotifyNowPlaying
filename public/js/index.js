import '../socket.io/socket.io.js'
const socket = window.io()

socket.on('spotify/duration', (song) => updateBar(song))
socket.on('spotify/newSong', (song2) => updateSong(song2))



function updateBar (song) {
console.log('HEJ')
const bar = document.querySelector('span')
const current = song.progress
console.log(current)
const totalTime = song.duration
console.log(totalTime)
bar.setAttribute('style', `width: ${(current / totalTime)*100}%`)
  const refreshRate = totalTime / 100
  let number = (current / totalTime) * 100
  console.log('hej')
  
  const interval = setInterval(() => {
    number++
    bar.setAttribute('style', `width: ${number}%`)
    if (number >= 100) {
        clearInterval(interval)
        bar.setAttribute('style', 'width: 100%')

        setTimeout(function(){
            sendSocket()
           }, 1000)

    }
  }, refreshRate)
}

function sendSocket () {

    const msg = {
    type: "message",
    text: 'finnished'
    }
    socket.send(JSON.stringify(msg))
}

function updateSong (song) {
    const img = document.querySelector('img')
    const name = document.querySelector('b')
    const artists = document.querySelector('p')

    img.setAttribute('src', `${song.img.url}`)
    console.log(song.img.url)
    name.textContent = song.name
    artists.textContent = song.artists

    updateBar(song)


}