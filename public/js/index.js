import '../socket.io/socket.io.js'
const socket = window.io()

socket.on('spotify/duration', (song) => updateBar(song))


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
    }
  }, refreshRate)
}