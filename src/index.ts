import 'dotenv/config'
import express from 'express'
import { createConnection } from 'typeorm'
import { pgConfig } from './infra/pg-config'

const app = express()
const PORT = process.env.PORT

createConnection(pgConfig)
  .then(_ => console.log('connected database'))
  .catch(console.log)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))