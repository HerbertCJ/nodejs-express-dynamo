import * as userRepository from '../repositories/user.repository'

export async function getUsers() {
    return await userRepository.findAllUsers()
}

export async function getUserByEmail(email: string) {
    return await userRepository.findUserByEmail(email)
}

export async function createUser(name: string, email: string) {
    return await userRepository.createNewUser(name, email)
}

export async function updateUserByEmail(email: string, name: string) {
    return await userRepository.patchUserByEmail(email, name)
}

export async function deleteUserByEmail(email: string) {
    return await userRepository.deleteUserByEmail(email)
}