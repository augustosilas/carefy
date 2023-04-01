import { Router } from 'express'
import { PatientControllers } from './controllers/patient-controller'

const patientRouter = Router()

const patientControllers = new PatientControllers()

patientRouter.post('/patients', patientControllers.create)

export { patientRouter }