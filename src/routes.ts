import { Router } from 'express'
import { PatientControllers } from './controllers/patient-controller'

const patientRouter = Router()

const patientControllers = new PatientControllers()

patientRouter.post('/patients', patientControllers.create)
patientRouter.patch('/patients/:id', patientControllers.update)
patientRouter.delete('/patients/:id', patientControllers.delete)
patientRouter.get('/patients', patientControllers.findAll)

export { patientRouter }