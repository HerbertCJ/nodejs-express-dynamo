import { NextFunction, Request, Response } from 'express'
import * as userService from '../services/user.service'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getUsers()
        res.status(200).json({ data: users })
    } catch (error) {
        next(error)
    }
}

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email
    try {
        const user = await userService.getUserByEmail(email)
        res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, email } = req.body
    try {
        const user = await userService.createUser(name, email)
        res.status(201).json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const updateUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const name = req.body.name
    const email = req.params.email
    try {
        const user = await userService.updateUserByEmail(name, email)
        res.status(200).json({ data: user })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email
    try {
        await userService.deleteUserByEmail(email)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}
