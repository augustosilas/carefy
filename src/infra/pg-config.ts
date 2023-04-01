import { ConnectionOptions } from 'typeorm'

export const pgConfig = {
  type: 'postgres',
  url: process.env.DB_URL,
  logging: process.env.DB_DB_SYNCHRONIZE,
  synchronize: process.env.DB_DB_LOGGING
} as ConnectionOptions