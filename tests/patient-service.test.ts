import { AppError } from "../src/app-error"
import { CreatePatient, FindAllParams, IPatientRepository, Patient, UpdatePatient } from "../src/infra/patient-repository.interface"
import { PatientServices } from "../src/services/patient-service"

describe('PatientService', () => {
  class PatientRepositoryStub implements IPatientRepository {
    async create(patient: CreatePatient): Promise<void> {

    }
    async update(patient: UpdatePatient): Promise<void> {

    }
    async findById(id: string): Promise<Patient | undefined> {
      return Promise.resolve({
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_last_name',
        disease: 'any_disease',
        birthDate: new Date(2022, 5, 3)
      })
    }
    async delete(id: string): Promise<void> {

    }
    async findAll(params: FindAllParams): Promise<Patient[] | []> {
      return []
    }
  }

  const makeSut = () => {
    const patientRepositoryStub = new PatientRepositoryStub()
    const sut = new PatientServices(patientRepositoryStub)

    return {
      sut,
      patientRepositoryStub
    }
  }

  describe('CreatePatient', () => {
    test('should throw if name is not provided', async () => {
      const mockPatientWithoutName = {
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const { sut } = makeSut()

      const promise = sut.create(mockPatientWithoutName as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: name'))
    })

    test('should throw if lastName is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const { sut } = makeSut()

      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: lastName'))
    })

    test('should throw if birthDate is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        disease: 'any_disease'
      }

      const { sut } = makeSut()

      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: birthDate'))
    })

    test('should throw if disease is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3)
      }

      const { sut } = makeSut()

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

      const { sut } = makeSut()

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

      const { sut, patientRepositoryStub } = makeSut()

      const createSpy = jest.spyOn(patientRepositoryStub, 'create')

      await sut.create(mockPatient)
      expect(createSpy).toHaveBeenCalledWith(mockPatient)
    })

    test('should throw if PatientRepository throws', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 10, 20),
        disease: 'any_disease'
      }

      const { sut, patientRepositoryStub } = makeSut()

      jest.spyOn(patientRepositoryStub, 'create').mockImplementation(() => { throw new Error() })

      const result = sut.create(mockPatient)
      expect(result).rejects.toThrow(new Error())
    })
  })

  describe('UdpatePatient', () => {
    test('should throw if patient id is not provided', async () => {
      const mockPatient = {
        id: '',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 5, 3),
        disease: 'any_disease'
      }

      const { sut } = makeSut()

      const promise = sut.update(mockPatient as any)
      expect(promise).rejects.toEqual(new AppError('missing field: id'))
    })

    test('should throw if date of birth is greater than the current day', async () => {
      const mockPatient = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2024, 5, 3),
        disease: 'any_disease'
      }

      const { sut } = makeSut()

      const promise = sut.update(mockPatient as any)
      expect(promise).rejects.toEqual(new AppError('birthdate cannot be greater than the current date'))
    })

    test('should call patientRepository.findById with correct values', async () => {
      const mockPatient = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 5, 3),
        disease: 'any_disease'
      }

      const { sut, patientRepositoryStub } = makeSut()
      const findByIdSpy = jest.spyOn(patientRepositoryStub, 'findById')

      await sut.update(mockPatient as any)
      expect(findByIdSpy).toHaveBeenCalledWith('any_id')
    })
  })
})