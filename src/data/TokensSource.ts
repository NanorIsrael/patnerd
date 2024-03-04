import { DataSource } from 'typeorm'

import logger from '../logging/logger'
import PatnerdDatasource, { patnerdDb } from './PatnerdDataSource'
import TokenEntity from './entities/Tokens'


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

	async createTokens(sessionId: string, accountId: string): Promise<void> {
		if (!sessionId || !accountId) {
            throw new Error('sessionId or accountId required')
        }


        const result = await this.datasource
            ?.createQueryBuilder()
            .insert()
            .into(TokenEntity)
            .returning('id')
            .values([
                {
                    session_id: sessionId,
                    account_id: accountId,
                },
            ])
            .execute()

        if (!result) {
            throw new Error(
                'Expected find or customer funcion not to return null.',
            )
        }
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
