import { AppError } from "../app-error";
import { IPatientRepository } from "../infra/patient-repository.interface";
import { IPatientServices, Patient, UpdatePatient } from "./patient-interface";

export class PatientServices implements IPatientServices {
  constructor(private readonly patientRepository: IPatientRepository) { }

  async create(patient: Patient): Promise<void> {
    const requiredFields = ['name', 'lastName', 'birthDate', 'disease']

    Object.keys(patient).forEach(key => {
      if (!requiredFields.includes(key)) throw new Error(`missing field: ${key}`)
    })

    await this.patientRepository.create(patient)
  }

  async update(patient: UpdatePatient): Promise<void> {
    if (!patient.id) throw new AppError('missing field: id')

    if (patient.birthDate && new Date(patient.birthDate) > new Date()) {
      throw new AppError('birthdate cannot be greater than the current date')
    }

    const findedPatient = await this.patientRepository.findById(patient.id)
    if (!findedPatient) throw new AppError('patient not found', 404)

    await this.patientRepository.update(patient)
  }

}