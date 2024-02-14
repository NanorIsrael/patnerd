// 'use strict';
import { main } from '../src/app'

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
