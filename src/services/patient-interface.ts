export type Patient = {
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

export interface IPatientServices {
  create: (patient: Patient) => Promise<void>
  update: (patient: UpdatePatient) => Promise<void>
}