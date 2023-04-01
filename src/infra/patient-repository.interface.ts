export type Patient = {
  name: string
  lastName: string
  disease: string
  birthDate: Date
}

export interface IPatientRepository {
  create: (patient: Patient) => Promise<void>
}