import * as bcrypt from 'bcryptjs';
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
        [key: string]: string | number
    }): Promise<AccountsEntity | null | undefined> {
        return await this.datasource?.manager.findOneBy(AccountsEntity, {
            [kwags.key]: kwags.value,
        })
    }

    async createUser(email: string, password: string): Promise<string> {
        if (!email || !password) {
            throw new Error('email or password required')
        }

		const hashedPassword = await hashPassword(password);
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

	// Generate a salt
	const saltRounds = 10;
	const salt = await bcrypt.genSalt(saltRounds)

	// Hash the password with 0the generated salt
	return await bcrypt.hash(password, salt)
}

export default Accounts
