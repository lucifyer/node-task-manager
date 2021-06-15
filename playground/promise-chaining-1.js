require('../src/db/mongoose')
const User = require('../src/models/user')

// PROMISE CHAINING
// User.findByIdAndUpdate('60c7a13b9fd7d022ae00a5f4', { age: 20 })
//     .then((user) => {
//         console.log(user)
//         return User.countDocuments({ age: 20})
//     }).then((count) =>
//         console.log(count)
//     ).catch((error) => {
//         console.log(error)
//     })

// ASYNC AND AWAIT
const updateAgeAndCount = async(id, age) => {
    await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count;
}

updateAgeAndCount('60c7a13b9fd7d022ae00a5f4', 23)
    .then((count) => console.log(count))
    .catch((e) => console.log(e))
