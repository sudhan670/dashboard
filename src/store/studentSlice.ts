import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Student, StudentState } from '../types/student';
import { supabase } from '../lib/supabase';
import { mapDatabaseToStudent, mapStudentToDatabase } from '../utils/mappers';

const initialState: StudentState = {
  students: [],
  academicYear: 'AY 2024-25',
  selectedCourse: 'CBSE 9',
  loading: false,
  error: null,
};

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data.map(mapDatabaseToStudent);
  }
);

export const addStudent = createAsyncThunk(
  'students/addStudent',
  async (student: Omit<Student, 'id'>) => {
    const dbStudent = mapStudentToDatabase(student);
    const { data, error } = await supabase
      .from('students')
      .insert([dbStudent])
      .select()
      .single();

    if (error) throw error;
    return mapDatabaseToStudent(data);
  }
);

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setAcademicYear: (state, action: PayloadAction<string>) => {
      state.academicYear = action.payload;
    },
    setSelectedCourse: (state, action: PayloadAction<string>) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch students';
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.unshift(action.payload);
      });
  },
});

export const { setAcademicYear, setSelectedCourse } = studentSlice.actions;
export default studentSlice.reducer;