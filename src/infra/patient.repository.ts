import { getRepository } from "typeorm";
import { IPatientRepository, CreatePatient, Patient, UpdatePatient, FindAllParams } from "./patient-repository.interface";
import { PgPatient } from "./entities/patient-entity";

export class PatientRepository implements IPatientRepository {
  async create(patient: CreatePatient): Promise<void> {
    await getRepository(PgPatient).save(patient)
  }

  async update({ id, ...patient }: UpdatePatient): Promise<void> {
    await getRepository(PgPatient).update(id, { ...patient, updatedAt: new Date() })
  }

  async findById(id: string): Promise<Patient | undefined> {
    return await getRepository(PgPatient)
      .findOne({
        where: { id },
        select: ['id', 'name', 'lastName', 'birthDate', 'disease']
      })
  }

  async delete(id: string): Promise<void> {
    await getRepository(PgPatient).delete(id)
  }

  async findAll({ page = 0, limit = 10 }: FindAllParams): Promise<Patient[] | []> {
    return await getRepository(PgPatient)
      .find({
        take: limit,
        skip: page,
        order: { createdAt: 'DESC' }
      })
  }
}