import { getRepository } from "typeorm";
import { IPatientRepository, Patient } from "./patient-repository.interface";
import { PgPatient } from "./entities/patient-entity";

export class PatientRepository implements IPatientRepository {
  async create(patient: Patient): Promise<void> {
    await getRepository(PgPatient).save(patient)
  }
}