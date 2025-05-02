import React from "react";



const InventoryTable = () => {
  return (
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
<table className="w-full text-sm text-left rtl:text-right  dark:text-white ">
    <thead className="text-xs text-gray-700 uppercase dark:text-white">
        <tr className="border-b border-gray-300">
            <th scope="col" className="px-6 py-3 w-1/2 bg-gray-50 dark:bg-gray-800 border-gray-300 border-b">
                品名
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 dark:bg-gray-900 border-x border-gray-300 border-b">
                数量
            </th>
            <th scope="col" className="px-6 py-3 w-1/4 bg-gray-50 dark:bg-gray-800 border-gray-300 border-b">
                単価
            </th>
        </tr>
    </thead>
    <tbody>
        <tr className="border-b border-gray-300 dark:border-gray-500">
            <th scope="row" className="px-6 py-4 font-medium  bg-gray-50 dark:text-white dark:bg-gray-800">
                りんごりんごりんごりんごりんごりんごりんごりんご
            </th>
            <td className="px-6 py-4 dark:bg-gray-900 border-x border-gray-300">
                5
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                300
            </td>
        </tr>
        <tr className="border-b border-gray-300 dark:border-gray-500">
            <th scope="row" className="px-6 py-4 font-medium   bg-gray-50 dark:text-white dark:bg-gray-800">
                肉
            </th>
            <td className="px-6 py-4 dark:bg-gray-900 border-x border-gray-300">
                10
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                1500
            </td>
        </tr>
        <tr className="border-b border-gray-300 dark:border-gray-500">
            <th scope="row" className="px-6 py-4 font-medium   bg-gray-50 dark:text-white dark:bg-gray-800">
                くま
            </th>
            <td className="px-6 py-4 dark:bg-gray-900 border-x border-gray-300">
                1
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                500
            </td>
        </tr>
        <tr className="border-b border-gray-300 dark:border-gray-500">
            <th scope="row" className="px-6 py-4 font-medium   bg-gray-50 dark:text-white dark:bg-gray-800">
                きゃべつ
            </th>
            <td className="px-6 py-4 dark:bg-gray-900 border-x border-gray-300">
                3
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                300
            </td>
        </tr>
        <tr>
            <th scope="row" className="px-6 py-4 font-medium   bg-gray-50 dark:text-white dark:bg-gray-800">
                米
            </th>
            <td className="px-6 py-4 dark:bg-gray-900 border-x border-gray-300">
                300
            </td>
            <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">
                3000
            </td>
        </tr>
    </tbody>
</table>
</div>

  );
};

export default InventoryTable;
