// 'use strict';
import {main} from '../src/app'

describe('Tests index', function () {

    it('has no name', async () => {
        const result = main();

        console.log(result);

        expect(result.statusCode).toBe(200);

        expect(result.body).toBe("hello world");
    });

    it('has name parameter', async () => {
        const name = 'John Doe'
        const result = main(name);

        console.log(result);

        expect(result.statusCode).toBe(200);

        expect(result.body).toBe(`hello ${name}`);
    });
});
