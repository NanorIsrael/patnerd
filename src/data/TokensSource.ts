import { DataSource } from 'typeorm'

import logger from '../logging/logger'
import PatnerdDatasource, { patnerdDb } from './PatnerdDataSource'
import TokenEntity from './entities/Tokens'
import { UserTokens } from './dtos/tokens'

class Tokens {
    private db: Promise<PatnerdDatasource>
    private datasource?: DataSource

    constructor() {
        this.db = patnerdDb()
    }

    async initializeDb(): Promise<void> {
        try {
            const db = await this.db
            await db.initialize()
            this.datasource = db.datasource
        } catch (error) {
            // Handle initialization errors
            logger.error('Error initializing database:', error)
            throw error // Rethrow error to propagate it
        }
    }

    async findToken(kwags: {
        [key: string]: string
    }): Promise<TokenEntity | null | undefined> {
        const searchParam: string = kwags['account_id'] || kwags['reset_token']

        if (!searchParam) {
            throw new Error('Invalid token')
        }

        const result = await this.datasource?.manager.findOneBy(
            TokenEntity,
            kwags,
        )
        return result
    }

    async deleteToken(kwags: { [key: string]: string }): Promise<void> {
        const searchParam: string = kwags['account_id'] || kwags['reset_token']

        if (!searchParam) {
            throw new Error('Invalid token')
        }

        await this.datasource?.manager.delete(TokenEntity, kwags)
    }

    async createTokens(accountId: string): Promise<UserTokens> {
        if (!accountId) {
            throw new Error('account id required')
        }
        const session_id = await this.findToken({ account_id: accountId })
        if (session_id) {
            await this.deleteToken({ account_id: accountId })
        }

        const result = await this.datasource
            ?.createQueryBuilder()
            .insert()
            .into(TokenEntity)
            .returning('session_id')
            .values([
                {
                    account_id: accountId,
                },
            ])
            .execute()

        if (!result) {
            throw new Error(
                'Expected find or create tokens funcion not to return null.',
            )
        }
        return result.identifiers[0] as UserTokens
    }

    async destroy(): Promise<void> {
        await this.datasource?.destroy()
    }
}

export async function tokensHandler(): Promise<Tokens> {
    const tokens = new Tokens()
    await tokens.initializeDb()
    return tokens
}
export default Tokens
