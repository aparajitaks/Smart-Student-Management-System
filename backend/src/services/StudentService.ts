import { StudentRepository } from '../repositories/StudentRepository';

export class StudentService {
  private studentRepo: StudentRepository;

  constructor() {
    this.studentRepo = new StudentRepository();
  }

  async searchStudents(query: string) {
    if (!query) return [];
    return await this.studentRepo.search(query);
  }
}
