import { ConnectionOptions } from 'typeorm'
import { PgPatient } from './entities/patient-entity'

export const pgConfig = {
  type: 'postgres',
  url: process.env.DB_URL,
  logging: !!(process.env.DB_SYNCHRONIZE === 'true'),
  synchronize: !!(process.env.DB_LOGGING === 'true'),
  entities: [PgPatient]
} as ConnectionOptions