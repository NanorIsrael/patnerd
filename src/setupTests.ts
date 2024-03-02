import PatnerdDataSource, { patnerdDb } from './data/PatnerdDataSource'

async function truncateTables(datasource: PatnerdDataSource) {
    await datasource.datasource
        .createQueryRunner()
        .query('TRUNCATE accounts CASCADE')
}

beforeEach(async () => {
    const db = await patnerdDb()
    await db.initialize()
    await truncateTables(db)
    await db.destroy()
})
