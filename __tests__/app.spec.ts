// 'use strict';
import {main} from '../src/app'

describe('Tests index', function () {

    it('main has no name', async () => {
        const result = main();

        console.log(result);

        expect(result.statusCode).toBe(200);

        expect(result.body).toBe("hello world");
    });
});
