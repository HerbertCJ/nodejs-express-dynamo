import Joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequestError } from '../../types/errors'

const emailSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'The provided email is invalid',
        'any.required': 'The email is required',
    }),
})

const userInputSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.email': 'The provided email is invalid',
        'any.required': 'The email is required',
    }),
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'The name must be at least 3 characters long',
        'string.max': 'The name must be at most 20 characters long',
        'any.required': 'The name is required',
    }),
}).options({ abortEarly: false })

const validateEmailParam = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = emailSchema.validate({ email: req.params.email })

    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(', ')
        next(new BadRequestError(errorMessage))
    }

    next()
}

const validateUserInput = (req: Request, res: Response, next: NextFunction): void => {
    const { error } = userInputSchema.validate({ email: req.body.email, name: req.body.name })

    if (error) {
        const errorMessage = error.details.map((err) => err.message).join(', ')
        console.log('error', error)
        next(new BadRequestError(errorMessage))
    }

    next()
}

export { validateEmailParam, validateUserInput }
