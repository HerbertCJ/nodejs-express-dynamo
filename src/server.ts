import express from 'express'
import dotenv from 'dotenv'

import appRouter from './routes'
import errorHandlerMiddleware from './middlewares/global-error-handler'

dotenv.config()
const app = express()

app.use(express.json())
app.use(appRouter)
app.use(errorHandlerMiddleware())

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
