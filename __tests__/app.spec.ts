// 'use strict';
import { main } from '../src/app'
import PatnerdDataSource, { patnerdDb } from '../src/data/PatnerdDataSource'

describe('Tests index', function () {
    it('has no name', async () => {
        const result = main()

        expect(result.statusCode).toBe(200)

        expect(result.body).toBe('hello world')
    })

    it('has name parameter', async () => {
        const name = 'John Doe'
        const result = main(name)

        expect(result.statusCode).toBe(200)

        expect(result.body).toBe(`hello ${name}`)
    })
})

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
