// import { json } from 'express/lib/response'
import fetch from 'node-fetch'
export class HomeController {
   async index(req, res, next) {

    // Get the access-token
    async function getViewData() {
    const basic = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
   
        const response = await fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basic}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: process.env.REFRESH_TOKEN
        })
        }) 
        
        const jsonData = await response.json()
        
        const  accessToken = jsonData.access_token
    
        // get the current-song playing
        const data = await fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
    
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
 
  const nowPlaying = await data.json()
  return {
    name: nowPlaying.item.name,
    artists: nowPlaying.item.artists[0].name,
    img: nowPlaying.item.album.images[0],
    duration: nowPlaying.item.duration_ms,
    progress: nowPlaying.progress_ms
  }
  
    }
    
    const viewData = await getViewData()
   
   res.render('home/index',  {viewData} ) 

   // Ugly, will fix later
   setTimeout(function(){
    res.io.emit('spotify/duration', viewData)
   }, 1000)



   res.io.on('connection', (socket) => {
    socket.on('message', async function (event) {
      res.io.emit('spotify/newSong',  await getViewData() )
    })
  })
 
  
    

    }
    
}