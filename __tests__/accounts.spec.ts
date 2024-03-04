// import * as chai from 'chai'
// import chaiHttp from 'chai-http'

import Accounts from '../src/data/AccountSource'
import Tokens from '../src/data/TokensSource'
import { User } from '../src/data/dtos/user'
// import sever from '../src/server'

describe('Tests datasource', function () {
    let accounts: Accounts
    let tokens: Tokens

    beforeEach(async () => {
        accounts = new Accounts()
        await accounts.initializeDb()
        tokens = new Tokens()
        await tokens.initializeDb()
    })

    afterEach(async () => {
        await accounts.destroy()
        await tokens.destroy()
    })
    it('adds new user to the database', async () => {
        // act
        const user: User = await accounts.createUser(
            'nanor@gmail.com',
            'nanor@gmail.com',
        )
        const result = await accounts.findUser({ email: 'nanor@gmail.com' })
        // assert
        expect(result?.id).toStrictEqual(user.id)
    })

    it('adds new user to the database', async () => {
        // act
        const user: User = await accounts.createUser(
            'nanor@gmail.com',
            'nanor@gmail.com',
        )
        const result = await accounts.findUser({ email: 'nanor@gmail.com' })
        // assert
        expect(result?.id).toStrictEqual(user.id)
    })

    it('login user', async () => {
        // act
        const user: User = await accounts.createUser(
            'nanor@gmail.com',
            'nanor@gmail.com',
        )
        const result = await accounts.findUser({ email: user.email })
        expect(result?.id).not.toBeNull()
        //assert
        expect(result?.id).toStrictEqual(user.id)
        const userTokens = await tokens.createTokens(user.id)
        expect(userTokens.session_id).not.toBeNull()
    })

    // chai.use(chaiHttp)
    // chai.should()
    // 	it("integration testing", (done) => {
    // 		chai.request(sever)
    // 		.post('/account')
    // 		.send({email: "nanor@gmail.com", password: "nanor@gmail.com"})
    // 		.end((err, res) => {
    // 			chai.expect(err).to.be.null;
    // 			chai.expect(res).to.have.status(200);
    // 			chai.expect(res.body).to.have.property('message').equal('Success');
    // 			done();
    // 		  });
    // 	})
})
