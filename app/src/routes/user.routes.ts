import { Router } from 'express'

import * as controller from '../controllers/user.controller'
import { validateEmailParam, validateUserInput } from '../middlewares/user-validate'

const router = Router()

router.get('/', controller.getAllUsers)
router.get('/:email', validateEmailParam, controller.getUserByEmail)
router.post('/', validateUserInput, controller.createUser)
router.patch('/:email', validateEmailParam, controller.updateUserByEmail)
router.delete('/:email', validateEmailParam, controller.deleteUser)

export default router
