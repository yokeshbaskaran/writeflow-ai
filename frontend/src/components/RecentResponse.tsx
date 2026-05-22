import { PiEye } from "react-icons/pi";
import { BiCopy } from "react-icons/bi";
import { IoTrashOutline } from "react-icons/io5";

const RecentResponse = () => {
  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-border-strong bg-bg-hover shadow-sm">
        <table className="min-w-full divide-y divide-border-strong">
          {/* Headings  */}
          <thead className="bg-bg">
            <tr className="divide-x divide-border-strong">
              <th className="px-1 py-4 text-center text-sm font-bold text-primary">
                Title
              </th>
              <th className="px-3 text-center text-sm font-bold text-primary">
                Type
              </th>
              <th className="px-1 max-md:hidden text-center text-sm font-bold text-primary">
                Words
              </th>
              <th className="max-md:hidden text-center text-sm font-bold text-primary">
                Created
              </th>
              <th className="text-center text-sm font-bold text-primary">
                Actions
              </th>
            </tr>
          </thead>

          {/* Responses  */}
          <tbody className="divide-y divide-border-strong bg-bg">
            <tr className="transition bg-bg hover:bg-bg-hover">
              <td className="px-2 py-5 text-center">
                <p className="font-normal text-text text-center">
                  Benefits of AI
                </p>
              </td>

              <td className="px-4 py-4 text-center">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Blog Post
                </span>
              </td>

              <td className="max-md:hidden px-2 py-4 text-center text-sm">
                610
              </td>

              <td className="max-md:hidden px-2 py-4 text-center text-sm text-text-muted">
                6 mins ago
              </td>

              <td>
                <div className="flex items-center justify-center gap-2">
                  <button className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-blue-600 cursor-pointer">
                    <PiEye size={17} />
                  </button>

                  <button className="border border-border rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-green-600 cursor-pointer">
                    <BiCopy size={19} />
                  </button>

                  <button className="border border-border rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 cursor-pointer">
                    <IoTrashOutline size={19} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RecentResponse;
