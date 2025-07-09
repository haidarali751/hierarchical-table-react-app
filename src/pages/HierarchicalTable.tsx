import { Table } from "../components/Table";

const HierarchicalTable = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-8">
      <h1 className="font-bold mb-6 px-4">
        Hierarchical Table
      </h1>
      <Table />
    </div>
  );
};

export default HierarchicalTable;
