const app = require('../app')
const request = require('supertest')
const User = require('../models/user')
const { sendWelcomeEmail, sendCancellationEmail } = require('../utils/emailHelper')

jest.mock('../utils/emailHelper')
sendWelcomeEmail.mockImplementation(() => Promise.resolve())
sendCancellationEmail.mockImplementation(() => Promise.resolve())

// Mocking in one time
// jest.mock('../utils/emailHelper', () => {
//     return {
//         sendWelcomeEmail: () => Promise.resolve(),
//         sendCancellationEmail: () => Promise.resolve()
//     }
// })

beforeEach(async () => {
    await User.deleteMany()
})

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'Ron',
        email: 'ron@weasley.com',
        password: 'Hermoinse@123'
    }).expect(201)
    expect(sendWelcomeEmail).toHaveBeenCalledWith("ron@weasley.com", "Ron")
})