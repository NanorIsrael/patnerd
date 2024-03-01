import PatnerdDataSource, { patnerdDb } from './data/PatnerdDataSource'

async function truncateTables(datasource: PatnerdDataSource) {
    await datasource.datasource
        .createQueryRunner()
        .query(
            'TRUNCATE customer, addresses, households, orders, demographic_survey, shopify_circuit_breaker CASCADE',
        )
}

beforeEach(async () => {
    console.log('---------->')
    const db = await patnerdDb()
    await db.initialize()
    // await truncateTables(db)
    await db.destroy()
})
