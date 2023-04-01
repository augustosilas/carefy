export type Patient = {
  name: string
  lastName: string
  disease: string
  birthDate: Date
}

export interface IPatientServices {
  create: (patient: Patient) => Promise<void>
}