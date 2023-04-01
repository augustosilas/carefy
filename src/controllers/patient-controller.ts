import { Request, Response } from 'express'
import { PatientRepository } from '../infra/patient.repository'
import { PatientServices } from '../services/patient-service'

export class PatientControllers {
  private patientServices: PatientServices

  constructor() {
    this.patientServices = new PatientServices(new PatientRepository())
  }

  public create = async (request: Request, response: Response): Promise<Response> => {
    try {
      const { name, lastName, disease, birthDate } = request.body

      await this.patientServices.create({ name, lastName, disease, birthDate })

      return response.status(201).send()
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error })
    }
  }
}