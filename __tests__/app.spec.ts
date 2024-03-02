// 'use strict';
import { main } from '../src/app'
import PatnerdDataSource, { patnerdDb } from '../src/data/PatnerdDataSource'

describe('Tests datasource', function () {
    let datasource: PatnerdDataSource

    beforeAll(async () => {
        datasource = await patnerdDb()
        await datasource.initialize()
    })

    afterEach(async () => {
        await datasource.destroy()
    })
    it('pings the database', async () => {
        // act
        const result = await datasource.ping()
        // assert
        expect(result).toStrictEqual([{ '?column?': 1 }])
    })
})
