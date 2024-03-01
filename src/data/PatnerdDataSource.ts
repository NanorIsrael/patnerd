import { DataSource } from 'typeorm'
import logger from '../logging/logger'

class PatnerdDatasource {
    datasource: DataSource

    constructor(
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
    ) {
        this.datasource = new DataSource({
            type: 'postgres',
            host,
            port,
            username,
            password,
            database,
            logging: false,

            entities: [],
        })
    }

    async initialize() {
        await this.datasource.initialize()
    }

    async destroy() {
        await this.datasource.destroy()
    }
    async ping() {
        const result = await this.datasource
            .createQueryRunner()
            .query('SELECT 1')
        logger.info('Ping result returned', result)
        return result
    }
}

export const patnerdDb = async (): Promise<PatnerdDatasource> => {
    if (process.env.NODE_ENV === 'test') {
        // unit testing
        return new PatnerdDatasource(
            '127.0.0.1',
            5432,
            'postgres',
            'postgres',
            'patnerd',
        )
    } else {
        const rdsConnection = (await fetchDBSecrets()) as RDSSecrets
        return new PatnerdDatasource(
            rdsConnection.host,
            rdsConnection.port,
            rdsConnection.username,
            rdsConnection.password,
            rdsConnection.dbInstanceIdentifier,
        )
    }
}

interface RDSSecrets {
    host: 'patnerdrds'
    port: 5432
    username: 'admin'
    password: 'admin'
    dbInstanceIdentifier: 'patnerd'
}

async function fetchDBSecrets(): Promise<RDSSecrets> {
    return new Promise((resolve) => {
        resolve({
            host: 'patnerdrds',
            port: 5432,
            username: 'admin',
            password: 'admin',
            dbInstanceIdentifier: 'patnerd',
        })
    })
}

export default PatnerdDatasource
