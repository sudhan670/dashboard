import { Student } from '../types/student';
import { Database } from '../types/supabase';

type DatabaseStudent = Database['public']['Tables']['students']['Row'];

export function mapDatabaseToStudent(dbStudent: DatabaseStudent): Student {
  return {
    id: dbStudent.id,
    name: dbStudent.name,
    cohort: dbStudent.cohort,
    courses: dbStudent.courses,
    dateJoined: dbStudent.date_joined,
    lastLogin: dbStudent.last_login,
    status: dbStudent.status,
  };
}

export function mapStudentToDatabase(
  student: Omit<Student, 'id'>
): Omit<DatabaseStudent, 'id' | 'created_at'> {
  return {
    name: student.name,
    cohort: student.cohort,
    courses: student.courses,
    date_joined: student.dateJoined,
    last_login: student.lastLogin,
    status: student.status,
  };
}