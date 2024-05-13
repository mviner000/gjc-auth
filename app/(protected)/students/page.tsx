
import DemoPage from '@/components/users/demo';
import Students from '@/components/users/students';
import UsersTable from '@/components/users/users-table';

const StudentsPage = () => {
  return (
    <div className='h-full w-full'>
      <UsersTable />
      <Students />
    </div>
  );
};

export default StudentsPage;