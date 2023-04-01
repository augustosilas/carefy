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

    test('should throw if lastName is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)
      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: lastName'))
    })

    test('should throw if birthDate is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        disease: 'any_disease'
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)
      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: birthDate'))
    })

    test('should throw if disease is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3)
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)
      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: disease'))
    })

    test('should throw if date of birth is greater than the current day', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2023, 10, 20),
        disease: 'any_disease'
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)
      const promise = sut.create(mockPatient)
      await expect(promise).rejects.toEqual(new AppError('birthdate cannot be greater than the current date'))
    })

    test('should call PatientRepository with correct values', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 10, 20),
        disease: 'any_disease'
      }

      const patientRepositoryStub = new PatientRepositoryStub()
      const sut = new PatientServices(patientRepositoryStub)

      const createSpy = jest.spyOn(patientRepositoryStub, 'create')

      await sut.create(mockPatient)
      expect(createSpy).toHaveBeenCalledWith(mockPatient)
    })
  })
})