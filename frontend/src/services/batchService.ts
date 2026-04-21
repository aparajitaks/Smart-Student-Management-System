import api from './api';

export interface Batch {
  _id: string;
  name: string;
  year: number;
  capacity: number;
  students: string[];
}

export interface Student {
  _id: string;
  name: string;
  rollNumber: string;
  batch?: string;
}

export const batchService = {
  async getAllBatches() {
    const response = await api.get('/batches');
    return response.data.data.batches as Batch[];
  },

  async searchStudents(query: string) {
    const response = await api.get(`/students/search?q=${query}`);
    return response.data.data.students as Student[];
  },

  async transferStudent(studentId: string, fromBatchId: string, toBatchId: string) {
    const response = await api.post('/batches/transfer', {
      studentId,
      fromBatchId,
      toBatchId
    });
    return response.data;
  }
};
