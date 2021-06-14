const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// Creating a GUID
// const id = new ObjectID()
// console.log('id', id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    }
    const db = client.db(databaseName)

    // 1. CREATE
    // Insert One, similary InsertMany provid an array of objects
    // db.collection('users').insertOne({
    //     name: 'zeus',
    //     age: 01
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })
    //Insert Many
    // db.collection('tasks').insertMany([{
    //     description: 'Node course',
    //     completed: false,
    //     priority: 2,
    // }, {
    //     description: 'DS',
    //     completed: false,
    //     priority: 2,
    // }, {
    //     description: 'recharge phone',
    //     completed: true,
    //     priority: 2,
    // }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(result.ops)
    // })

    // 2. READ
    // findOne finds the first match
    // db.collection('users').findOne({_id: ObjectID('60a54e8c88ffcd9c2336e4cd')}, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch')
    //     }
    //     console.log('User', user)
    // })

    // find returns a cursor which can be used to traverse the array, convert to array, find count
    // db.collection('users').find({age: 1}).toArray((error, users) => {
    //     console.log('usrs', users)
    // })

    // 3. UPDATE
    // updateOne to update one
    // db.collection('users').updateOne(
    //     { _id: ObjectID('60a54dbca1e3a79bf7a8271e') },
    //     {
            // $set: {
            //     name: 'Karl'
            // }
    //         $inc: {
    //             age: 21,
    //         }
    //     }
    // ).then(response => {
    //     console.log('response', response.modifiedCount)
    // }).catch(error => {
    //     console.log(error)
    // })

    // update Many
    // db.collection('tasks').updateMany( {
    //     completed: false,
    // }, {
    //     $set: {
    //         completed: true,
    //     }
    // }).then(response => {
    //     console.log(response.modifiedCount)
    // }).catch(error => {
    //     console.log('error', error)
    // })

    // 4. DELETE
    // Similar deleteOne and deleteMany
    // db.collection('users').deleteMany({
    //     age: 0
    // }).then(response => {
    //     console.log(response.deletedCount)
    // }).catch(error => {
    //     console.log('error', error)
    // })

    // db.collection('tasks').deleteMany()

})