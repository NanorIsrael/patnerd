import Accounts from '../src/data/Accounts'

describe('Tests datasource', function () {
    let accounts: Accounts

    beforeAll(async () => {
        accounts = new Accounts()
        await accounts.initializeDb()
    })

    afterEach(async () => {
        await accounts.destroy()
    })
    it('pings the database', async () => {
        // act
        const userId = await accounts.createUser(
            'nanor@gmail.com',
            'nanor@gmail.com',
        )
        const result = await accounts.findUser({ email: 'nanor@gmail.com' })
        // assert
        expect(result?.id).toStrictEqual(userId)
    })
})
