import * as bcrypt from 'bcryptjs'
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
        [key: string]: string
    }): Promise<AccountsEntity | null | undefined> {
        const searchParam: string = kwags['email'] || kwags['id']

        if (!searchParam) {
            throw new Error('Invalid input')
        }

        const result = await this.datasource?.manager.findOneBy(
            AccountsEntity,
            kwags,
        )
        return result
    }

    async createUser(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new Error('email or password required')
        }

        const hashedPassword = await hashPassword(password)

        const result = await this.datasource
            ?.createQueryBuilder()
            .insert()
            .into(AccountsEntity)
            .returning('id')
            .values([
                {
                    email: email,
                    password: hashedPassword,
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

async function hashPassword(password: string): Promise<string> {
    const saltRounds: number = JSON.parse(process.env.BCRYPT_SALT!) as number

    const saltValue = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, saltValue)

    return hashedPassword
}

export async function accountHandler(): Promise<Accounts> {
    const account = new Accounts()
    await account.initializeDb()
    return account
}
export default Accounts
