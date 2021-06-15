require('../src/db/mongoose')
const Task = require('../src/models/task')

// PROMISE CHAINING
// Task.findByIdAndDelete('60c8e5700c085328f11e274a')
//     .then(() => {
//         return Task.countDocuments({ completed: false})
//     }).then((count) =>
//         console.log(count)
//     ).catch((error) => {
//         console.log(error)
//     })

// ASYNC AND AWAIT
const deleteTaskAndCount = async(id) => {
    await Task.findByIdAndDelete(id)
    const count = Task.countDocuments({ completed: false })
    return count
}

deleteTaskAndCount('60c8ee7bc05cf82a4d5dcd56')
    .then((count) => console.log(count))
    .catch((e) => console.log(e))