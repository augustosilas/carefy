export type CreatePatient = {
  name: string
  lastName: string
  disease: string
  birthDate: Date
}

export type Patient = {
  id: string
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

export type FindAllParams = {
  page?: number
  limit?: number
}

export interface IPatientServices {
  create: (patient: CreatePatient) => Promise<void>
  update: (patient: UpdatePatient) => Promise<void>
  delete: (id: string) => Promise<void>
  findAll: (params: FindAllParams) => Promise<Patient[]>
}