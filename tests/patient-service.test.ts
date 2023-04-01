import { AppError } from "../src/app-error"
import { CreatePatient, FindAllParams, IPatientRepository, Patient, UpdatePatient } from "../src/infra/patient-repository.interface"
import { PatientServices } from "../src/services/patient-service"

describe('PatientService', () => {

  describe('CreatePatient', () => {
    class PatientRepositoryStub implements IPatientRepository {
      async create(patient: CreatePatient): Promise<void> {

      }
      async update(patient: UpdatePatient): Promise<void> {

      }
      async findById(id: string): Promise<Patient | undefined> {
        return undefined
      }
      async delete(id: string): Promise<void> {

      }
      async findAll(params: FindAllParams): Promise<Patient[] | []> {
        return []
      }
    }
    test('should throw if name is not provided', async () => {
      const mockPatientWithoutName = {
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)
      const promise = sut.create(mockPatientWithoutName as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: name'))
    })
  })
})