import PatnerdDataSource, { patnerdDb } from './data/PatnerdDataSource'

async function truncateTables(datasource: PatnerdDataSource) {
    await datasource.datasource
        .createQueryRunner()
        .query('TRUNCATE accounts CASCADE')
}

beforeEach(async () => {
    process.env.BCRYPT_SALT = '10'
    const db = await patnerdDb()
    await db.initialize()
    await truncateTables(db)
    await db.destroy()
})
