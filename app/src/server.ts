import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import appRouter from './routes'
import errorHandlerMiddleware from './middlewares/global-error-handler'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(appRouter)
app.use(errorHandlerMiddleware())

process.on('SIGTERM', async () => {
    console.info('[express] SIGTERM received')

    console.info('[express] cleaning up')
    await new Promise((resolve) => setTimeout(resolve, 100))

    console.info('[express] exiting')
    process.exit(0)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
