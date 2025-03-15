import { PutCommand, ScanCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb'
import { ConditionalCheckFailedException } from '@aws-sdk/client-dynamodb'

import { dynamo } from '../config/database'
import { ConflictError } from '../types/errors'

const TABLE_NAME = 'users'

export async function findAllUsers() {
    const command = new ScanCommand({
        TableName: TABLE_NAME,
    })
    const response = await dynamo.send(command)
    return response.Items || []
}

export async function findUserByEmail(email: string) {
    console.log('email', email)
    const command = new GetCommand({
        TableName: TABLE_NAME,
        Key: { email },
    })
    const response = await dynamo.send(command)
    return response.Item || {}
}

export async function createNewUser(name: string, email: string) {
    const command = new PutCommand({
        TableName: TABLE_NAME,
        Item: {
            email: email,
            name: name,
        },
        ConditionExpression: 'attribute_not_exists(email)',
    })

    try {
        const response = await dynamo.send(command)
        return response || {}
    } catch (error) {
        if (error instanceof ConditionalCheckFailedException) {
            throw new ConflictError('User with this email already exists')
        }

        throw error
    }
}

export async function patchUserByEmail(name: string, email: string) {
    const command = new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { email },
        UpdateExpression: 'SET #name = :name',
        ExpressionAttributeNames: {
            '#name': 'name',
        },
        ExpressionAttributeValues: {
            ':name': name,
        },
        ReturnValues: 'ALL_NEW',
    })

    const response = await dynamo.send(command)
    return response.Attributes || {}
}

export async function deleteUserByEmail(email: string) {
    const command = new DeleteCommand({
        TableName: TABLE_NAME,
        Key: { email },
    })

    await dynamo.send(command)
}
