/**
 * The starting point of the application.
 *
 * @author Jesper Eriksson
 * @version 1.0.0
 */

 import express from 'express'
 import expressLayouts from 'express-ejs-layouts'
 import logger from 'morgan'
 import { dirname, join } from 'node:path'
 import { fileURLToPath } from 'node:url'
 import { router } from './routes/router.js'
 // import { connectDB } from './config/mongoose.js'
 import session from 'express-session'
 import helmet from 'helmet'
 import { createServer } from 'node:http'
 import { Server } from 'socket.io'
 
 
 // await connectDB()
 // Get the path of the current module's directory.
 const directoryFullName = dirname(fileURLToPath(import.meta.url))
 
 // Set the base URL to use for all relative URLs in a document.
 const baseURL = process.env.BASE_URL || '/'
 
 // Create Express application.
 const app = express()
 app.use(helmet.
   contentSecurityPolicy(
     { directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(), 'img-src': ['self', 'https://**.spotify.com'] } })) 
 const httpServer = createServer(app)
 
   // Not necessary, but nice to log when a user connects/disconnects.
   
 
 
 // Set up a morgan logger using the dev format for log entries.
 app.use(logger('dev'))
 
 // View engine setup.
 app.set('view engine', 'ejs')
 app.set('views', join(directoryFullName, 'views'))
 app.set('views', 'src/views')
 app.use(expressLayouts)
 app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))
 
 // Parse requests of the content type application/x-www-form-urlencoded.
 // Populates the request object with a body object (req.body).
 app.use(express.urlencoded({ extended: false }))
 app.use(express.json())
 // Serve static files.
 app.use(express.static(join(directoryFullName, '..', 'public')))
 
 // Middleware to be executed before the routes.
 app.use((req, res, next) => {
 
   // Pass the base URL to the views.
   res.locals.baseURL = baseURL

 

   next()
 })
 
 // Register routes.
 app.use('/', router)
 
 
 
 // Error handler.
 app.use(function (err, req, res, next) {
   res
     .status(err.status || 500)
     .send(err.message || 'Internal Server Error')
 })
 httpServer.listen(process.env.PORT, () => {
   console.log(`Server running at http://localhost:${process.env.PORT}`)
   console.log('Press Ctrl-C to terminate...')
 })
 
 
 // Starts the HTTP server listening for connections.
 
 