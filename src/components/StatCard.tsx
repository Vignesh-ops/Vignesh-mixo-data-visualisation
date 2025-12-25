interface Props {
    title: string;
    value: string | number;
  }
  
  export default function StatCard({ title, value }: Props) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <p className="text-sm text-gray-900">{title}</p>
        <p className="text-xl  text-gray-500  font-semibold">{value}</p>
      </div>
    );
  }
  