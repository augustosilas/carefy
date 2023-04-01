export type CreatePatient = {
  name: string
  lastName: string
  disease: string
  birthDate: Date
}

export type UpdatePatient = {
  id: string
  name?: string
  lastName?: string
  disease?: string
  birthDate?: Date
}

export type Patient = {
  id: string
  name: string
  lastName: string
  disease: string
  birthDate: Date
}

export interface IPatientRepository {
  create: (patient: CreatePatient) => Promise<void>
  update: (patient: UpdatePatient) => Promise<void>
  findById: (id: string) => Promise<Patient | undefined>
  delete: (id: string) => Promise<void>
}