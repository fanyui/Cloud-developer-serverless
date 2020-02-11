import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
 import * as AWS from 'aws-sdk'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'
import { generateUploadUrl } from '../../logicLayer/todo'

const docClient = new AWS.DynamoDB.DocumentClient()

const todosTable = process.env.TODOS_TABLE
const logger = createLogger('Todo')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  logger.info(" Processing event for generating signed url", event)

  const todoId = event.pathParameters.todoId
  const userId = getUserId(event);
  // TODO: Return a presigned URL to upload a file for a TODO item with the provided id

  //check if todo item exists
  const validTodoId = await todoExists(userId, todoId)

  if (!validTodoId) {
    logger.error("No todo found with id ", todoId)
    return {
      statusCode: 404,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: 'Todo item does not exist'
      })
    }
  }

  let url = await generateUploadUrl(userId, todoId)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl: url
    })
  }

}


export async function todoExists(userId: string, todoId: string) {

  const result = await docClient
    .get({
      TableName: todosTable,
      Key: {
        userId: userId,
        todoId: todoId
      }
    })
    .promise()

  return !!result.Item
}