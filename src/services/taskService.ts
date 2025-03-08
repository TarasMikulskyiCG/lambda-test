import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();
const TABLE_NAME = "TasksTable";

export const getAllTasks = async () => {
  const result = await dynamoDb.scan({ TableName: TABLE_NAME }).promise();
  return result.Items;
};

export const createTask = async (task: { title: string; completed: boolean }) => {
  const newTask = { id: Date.now().toString(), ...task };
  await dynamoDb.put({ TableName: TABLE_NAME, Item: newTask }).promise();
  return newTask;
};

export const getTaskById = async (id: string) => {
  const result = await dynamoDb.get({ TableName: TABLE_NAME, Key: { id } }).promise();
  return result.Item;
};

export const updateTask = async (id: string, data: { title?: string; completed?: boolean }) => {
  await dynamoDb.update({
    TableName: TABLE_NAME,
    Key: { id },
    UpdateExpression: "set title = :title, completed = :completed",
    ExpressionAttributeValues: {
      ":title": data.title,
      ":completed": data.completed,
    },
  }).promise();
  return { id, ...data };
};

export const deleteTask = async (id: string) => {
  await dynamoDb.delete({ TableName: TABLE_NAME, Key: { id } }).promise();
};