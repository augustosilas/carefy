import { IPatientRepository } from "../infra/patient-repository.interface";
import { IPatientServices, Patient } from "./patient-interface";

export class PatientServices implements IPatientServices {
  constructor(private readonly patientRepository: IPatientRepository) { }

  async create(patient: Patient): Promise<void> {
    const requiredFields = ['name', 'lastName', 'birthDate', 'disease']

    Object.keys(patient).forEach(key => {
      if (!requiredFields.includes(key)) throw new Error(`missing field: ${key}`)
    })

    await this.patientRepository.create(patient)
  }

}