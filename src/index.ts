import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { createConnection } from 'typeorm'
import { pgConfig } from './infra/pg-config'
import { patientRouter } from './routes'

const app = express()
const PORT = process.env.PORT

createConnection(pgConfig)
  .then(_ => {
    app.use(cors())
    app.use(express.json())
    app.use(patientRouter)
  })
  .catch(console.log)

app.listen(PORT, () => console.log(`server running on port ${PORT}`))