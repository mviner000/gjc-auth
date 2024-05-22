import BorrowersTable from '@/components/admin/borrowers-table';

const AcceptBorrowersPage: React.FC = () => {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Book Borrow Request</h1>
      <BorrowersTable />
    </div>
  );
};

export default AcceptBorrowersPage;
