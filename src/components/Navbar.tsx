import React from 'react';
import { Search, Bell, MessageSquare, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setAcademicYear, setSelectedCourse } from '../store/studentSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const { academicYear, selectedCourse } = useSelector(
    (state: RootState) => state.students
  );

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <select
                  value={academicYear}
                  onChange={e => dispatch(setAcademicYear(e.target.value))}
                  className="appearance-none bg-transparent pr-8 pl-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                >
                  <option>AY 2024-25</option>
                  <option>AY 2023-24</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
              </div>
              <div className="relative ml-4">
                <select
                  value={selectedCourse}
                  onChange={e => dispatch(setSelectedCourse(e.target.value))}
                  className="appearance-none bg-transparent pr-8 pl-3 py-2 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                >
                  <option>CBSE 9</option>
                  <option>CBSE 9 Math</option>
                  <option>CBSE 9 Science</option>
                </select>
                <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MessageSquare className="h-6 w-6 text-gray-600" />
            </button>
            
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Bell className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-3">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <span className="text-gray-700">John Doe</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;