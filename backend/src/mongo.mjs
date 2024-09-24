import { MongoClient } from "mongodb";
const uri = "mongodb://localhost:27017";

export async function connectToMongo(dbName, collectionName) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connecté à MongoDB");
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('Erreur de connexion à MongoDB:', error);
    throw error;
  }
}

export function findUserByEmail(collection, email) {
  console.log(collection.findOne({email}))
  return collection.findOne({email});
}

export function insertUser(collection, user) {
  return collection.insertOne(user);
}

export function findAllTasks(collection) {
  return collection.find({}).toArray();
}

export function postTask(collection, data){
  return collection.insertOne(data)
}

export function deleteAllTasks(collection) {
  return collection.deleteMany({})
}
