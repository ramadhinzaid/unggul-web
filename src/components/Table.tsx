import Lottie from "lottie-react";
import empty from "./../assets/empty.json";

export default function Table({
  headers,
  items,
}: {
  headers: string[];
  items: React.ReactElement[];
}) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {headers.map((header, id) => (
            <th
              key={id}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.length === 0 ? (
          <tr>
            <td colSpan={headers.length + 1}>
              <Lottie
                className="justify-self-center"
                animationData={empty}
                loop={false}
                style={{ width: 150 }}
              />
            </td>
          </tr>
        ) : (
          items
        )}
      </tbody>
    </table>
  );
}

export function TableItem({
  data,
  onDelete,
  onEdit,
}: {
  data: string[];
  onDelete?: () => void;
  onEdit?: () => void;
}) {
  return (
    <tr>
      {data.map((item, idx) => (
        <td
          key={idx}
          className={`px-6 py-4 whitespace-nowrap text-sm ${
            idx == 0 ? "font-medium" : ""
          } text-gray-900`}
        >
          {item}
        </td>
      ))}

      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={onEdit}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="ml-4 text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
