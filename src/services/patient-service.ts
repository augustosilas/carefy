import { AppError } from "../app-error";
import { IPatientRepository } from "../infra/patient-repository.interface";
import { CreatePatient, FindAllParams, IPatientServices, Patient, UpdatePatient } from "./patient-interface";

export class PatientServices implements IPatientServices {
  constructor(private readonly patientRepository: IPatientRepository) { }

  async create(patient: CreatePatient): Promise<void> {
    const requiredFields = ['name', 'lastName', 'birthDate', 'disease']

    requiredFields.forEach(requiredField => {
      if (!Reflect.has(patient, requiredField))
        throw new AppError(`missing field: ${requiredField}`)
    })

    if (patient.birthDate && new Date(patient.birthDate) > new Date()) {
      throw new AppError('birthdate cannot be greater than the current date')
    }

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

  async delete(id: string): Promise<void> {
    if (!id) throw new AppError('missing field: id')

    const patient = await this.patientRepository.findById(id)
    if (!patient) throw new AppError('patient not found', 404)

    await this.patientRepository.delete(id)
  }

  async findAll(params: FindAllParams): Promise<Patient[]> {
    return await this.patientRepository.findAll(params)
  }

}