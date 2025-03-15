import { Router } from 'express'

import usersRouter from './user.routes'

const router = Router()

router.get('/health', (_, res) => {
    res.json({ message: 'api is healthy', now: new Date().toISOString() })
})

router.use('/users', usersRouter)

router.use((req, res) => {
    res.status(404).json({ message: `Route not found ${req.method} ${req.path}` })
})

export default router
