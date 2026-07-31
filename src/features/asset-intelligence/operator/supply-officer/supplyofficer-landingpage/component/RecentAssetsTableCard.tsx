"use client"

import { MoreHorizontal } from "lucide-react"

import { recentAssetsData } from "../mock/recentAssetsData"

export function RecentAssetsTableCard() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
      <h2 className="text-sm font-semibold text-gray-900">ครุภัณฑ์ที่เพิ่มล่าสุด</h2>
      <div className="mt-1 overflow-x-auto">
        <table className="w-full min-w-180 text-left text-xs">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] text-gray-400">
              <th className="pb-1 font-medium">รหัสครุภัณฑ์</th>
              <th className="pb-1 font-medium">ชื่อครุภัณฑ์</th>
              <th className="pb-1 font-medium">ประเภท</th>
              <th className="pb-1 font-medium">วันที่รับเข้า</th>
              <th className="pb-1 text-right font-medium">มูลค่า (บาท)</th>
              <th className="pb-1 font-medium">สถานะ</th>
              <th className="pb-1 text-right font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentAssetsData.map((asset) => (
              <tr key={asset.id}>
                <td className="truncate py-1 font-medium text-blue-600">{asset.assetCode}</td>
                <td className="max-w-40 truncate py-1 text-gray-600">{asset.assetName}</td>
                <td className="truncate py-1 text-gray-600">{asset.category}</td>
                <td className="whitespace-nowrap py-1 text-gray-600">{asset.receivedDate}</td>
                <td className="py-1 text-right text-gray-900">
                  {asset.value.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-1">
                  <span className="whitespace-nowrap rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
                    {asset.status}
                  </span>
                </td>
                <td className="py-1 text-right">
                  <button
                    type="button"
                    aria-label="จัดการ"
                    className="rounded-full p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
