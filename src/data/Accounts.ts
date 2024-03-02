import { DataSource } from 'typeorm'
import logger from '../logging/logger'
import AccountsEntity from './entities/Accounts'
import PatnerdDatasource, { patnerdDb } from './PatnerdDataSource'

class Accounts {
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

    async findUser(kwags: {
        [key: string]: any
    }): Promise<AccountsEntity | null | undefined> {
        return await this.datasource?.manager.findOneBy(AccountsEntity, {
            [kwags.key]: kwags.value,
        })
    }

    async createUser(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new Error('email or password required')
        }
        const result = await this.datasource
            ?.createQueryBuilder()
            .insert()
            .into(AccountsEntity)
            .returning('id')
            .values([
                {
                    email: email,
                    password: password,
                },
            ])
            .execute()

        if (!result) {
            throw new Error(
                'Expected find or create customer funcion not to return null.',
            )
        }
        return result.identifiers[0].id
    }

    async destroy(): Promise<void> {
        await this.datasource?.destroy()
    }
}

export default Accounts
