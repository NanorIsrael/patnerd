// import * as chai from 'chai'
// import chaiHttp from 'chai-http'

import Accounts from '../src/data/Accounts'
// import sever from '../src/server'

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
