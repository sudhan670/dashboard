import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Navbar from './components/Navbar';
import StudentTable from './components/StudentTable';
import AddStudentModal from './components/AddStudentModal';
import AuthWrapper from './components/AuthWrapper';
import { UserPlus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { fetchStudents } from './store/studentSlice';
import { supabase } from './lib/supabase';

function AppContent() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [session, setSession] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      dispatch(fetchStudents());
    }
  }, [dispatch, session]);

  if (!session) {
    return <AuthWrapper />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <MobileNav />
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <h1 className="text-2xl font-semibold text-gray-900">Students</h1>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                Add New Student
              </button>
            </div>
            <StudentTable />
            <AddStudentModal
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;