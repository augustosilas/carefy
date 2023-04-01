import { AppError } from "../src/app-error"
import { CreatePatient, FindAllParams, IPatientRepository, Patient, UpdatePatient } from "../src/infra/patient-repository.interface"
import { PatientServices } from "../src/services/patient-service"

describe('PatientService', () => {
  const mockPatient = () => (
    {
      id: 'any_id',
      name: 'any_name',
      lastName: 'any_last_name',
      disease: 'any_disease',
      birthDate: new Date(2022, 5, 3)
    })

  const mockPatients = () => ([
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
    mockPatient(),
  ])

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
      return mockPatients()
    }
  }

  let sut: PatientServices
  let patientRepositoryStub: PatientRepositoryStub
  beforeEach(() => {
    patientRepositoryStub = new PatientRepositoryStub()
    sut = new PatientServices(patientRepositoryStub)
  })


  describe('CreatePatient', () => {
    test('should throw if name is not provided', async () => {
      const mockPatientWithoutName = {
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const promise = sut.create(mockPatientWithoutName as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: name'))
    })

    test('should throw if lastName is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        birthDate: new Date(1995, 5, 3),
        disease: 'any_disease'
      }

      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: lastName'))
    })

    test('should throw if birthDate is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        disease: 'any_disease'
      }

      const promise = sut.create(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('missing field: birthDate'))
    })

    test('should throw if disease is not provided', async () => {
      const mockPatient = {
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(1995, 5, 3)
      }

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
      const findByIdSpy = jest.spyOn(patientRepositoryStub, 'findById')

      await sut.update(mockPatient as any)
      expect(findByIdSpy).toHaveBeenCalledWith('any_id')
    })

    test('should throw if patient is not found', async () => {
      const mockPatient = {
        id: 'invalid_id',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 5, 3),
        disease: 'any_disease'
      }
      jest.spyOn(patientRepositoryStub, 'findById').mockReturnValue(Promise.resolve(undefined))

      const promise = sut.update(mockPatient as any)
      await expect(promise).rejects.toEqual(new AppError('patient not found', 404))
    })

    test('should call patientRepository.update with correct values', async () => {
      const mockPatient = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 5, 3),
        disease: 'any_disease'
      }
      const findByIdSpy = jest.spyOn(patientRepositoryStub, 'update')

      await sut.update(mockPatient as any)
      expect(findByIdSpy).toHaveBeenCalledWith(mockPatient)
    })

    test('should throw if PatientRepository throws', async () => {
      const mockPatient = {
        id: 'any_id',
        name: 'any_name',
        lastName: 'any_last_name',
        birthDate: new Date(2022, 10, 20),
        disease: 'any_disease'
      }

      jest.spyOn(patientRepositoryStub, 'findById').mockImplementation(() => { throw new Error() })

      const result = sut.update(mockPatient)
      expect(result).rejects.toThrow(new Error())
    })
  })

  describe('DeletePatient', () => {
    test('should throw if id is not provided', async () => {
      const id = ''

      const promise = sut.delete(id)
      await expect(promise).rejects.toEqual(new AppError('missing field: id'))
    })

    test('should call patientRepository.findById with correct values', async () => {
      const id = 'any_id'
      const findByIdSpy = jest.spyOn(patientRepositoryStub, 'findById')

      await sut.delete(id)
      expect(findByIdSpy).toHaveBeenCalledWith('any_id')
    })

    test('should throw if patient is not found', async () => {
      const id = 'invalid_id'
      jest.spyOn(patientRepositoryStub, 'findById').mockReturnValue(Promise.resolve(undefined))

      const promise = sut.delete(id)
      await expect(promise).rejects.toEqual(new AppError('patient not found', 404))
    })

    test('should call patientRepository.delete with correct id', async () => {
      const id = 'any_id'
      const deleteSpy = jest.spyOn(patientRepositoryStub, 'delete')

      await sut.delete(id)
      expect(deleteSpy).toHaveBeenCalledWith(id)
    })

    test('should throw if PatientRepository throws', async () => {
      const id = 'any_id'

      jest.spyOn(patientRepositoryStub, 'findById').mockImplementation(() => { throw new Error() })

      const result = sut.delete(id)
      expect(result).rejects.toThrow(new Error())
    })
  })

  describe('FindAllPatients', () => {
    test('should call patientRepository.findAll with correct values', async () => {
      const params = {
        page: 0,
        limit: 10
      }
      const findAllSpy = jest.spyOn(patientRepositoryStub, 'findAll')

      await sut.findAll(params)
      expect(findAllSpy).toHaveBeenCalledWith(params)
    })

    test('should return patients on success', async () => {
      const params = {
        page: 0,
        limit: 10
      }

      const result = await sut.findAll(params)
      expect(result).toEqual(mockPatients())
    })

    test('should throw if PatientRepository throws', async () => {
      const params = {
        page: 0,
        limit: 10
      }

      jest.spyOn(patientRepositoryStub, 'findAll').mockImplementation(() => { throw new Error() })

      const result = sut.findAll(params)
      expect(result).rejects.toThrow(new Error())
    })
  })
})