import { Elysia } from 'elysia'
import { staticPlugin } from '@elysiajs/static'
//
import * as routes from './routes'
import { error, logger } from './middlewares'
import { connectDB } from './config'

// Create Elysia instance
const app = new Elysia()

// Config MongoDB
connectDB()

// Middlewares
app.use(logger())
app.use(error())
app.use(staticPlugin())

// Root Routes
app.get('/', () => 'Welcome to our API')

// User Routes [/v1/users]
app.use(routes.userRoutes)

// Start the server
app.listen(Bun.env.PORT || 9000)

console.log(
  `🚀 Server is running at: http://${app.server?.hostname}:${app.server?.port}`
)
