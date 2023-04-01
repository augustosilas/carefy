import { Request, Response } from 'express'
import { PatientRepository } from '../infra/patient.repository'
import { PatientServices } from '../services/patient-service'
import { AppError } from '../app-error'

export class PatientControllers {
  private patientServices: PatientServices

  constructor() {
    this.patientServices = new PatientServices(new PatientRepository())
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, lastName, disease, birthDate } = request.body

      await this.patientServices.create({ name, lastName, disease, birthDate })

      return response.status(201).send()
    } catch (error) {
      console.log(error)

      if (error instanceof AppError)
        return response.status(error.statusCode).json({ message: error.message })

      return response.status(500).json({ message: 'internal server error' })
    }
  }

  update = async (request: Request, response: Response): Promise<Response> => {
    try {
      const id = request.params.id
      const partialPatient = request.body

      await this.patientServices.update({ id, ...partialPatient })

      return response.status(200).send()
    } catch (error) {
      console.log(error)

      if (error instanceof AppError)
        return response.status(error.statusCode).json({ message: error.message })

      return response.status(500).json({ message: 'internal server error' })
    }
  }
}