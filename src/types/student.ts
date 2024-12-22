export interface Student {
  id: string;
  name: string;
  cohort: string;
  courses: string[];
  dateJoined: string;
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface StudentState {
  students: Student[];
  academicYear: string;
  selectedCourse: string;
  loading: boolean;
  error: string | null;
}