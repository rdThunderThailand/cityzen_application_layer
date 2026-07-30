"use client"

import { MoreHorizontal } from "lucide-react"

import { recentAssetsData } from "../mock/recentAssetsData"

export function RecentAssetsTableCard() {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-gray-900">ครุภัณฑ์ที่เพิ่มล่าสุด</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-xs text-gray-400">
              <th className="pb-3 font-medium">รหัสครุภัณฑ์</th>
              <th className="pb-3 font-medium">ชื่อครุภัณฑ์</th>
              <th className="pb-3 font-medium">ประเภท</th>
              <th className="pb-3 font-medium">วันที่รับเข้า</th>
              <th className="pb-3 text-right font-medium">มูลค่า (บาท)</th>
              <th className="pb-3 font-medium">สถานะ</th>
              <th className="pb-3 text-right font-medium">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {recentAssetsData.map((asset) => (
              <tr key={asset.id}>
                <td className="py-3 font-medium text-gray-900">{asset.assetCode}</td>
                <td className="py-3 text-gray-600">{asset.assetName}</td>
                <td className="py-3 text-gray-600">{asset.category}</td>
                <td className="py-3 text-gray-600">{asset.receivedDate}</td>
                <td className="py-3 text-right text-gray-900">
                  {asset.value.toLocaleString("th-TH", { minimumFractionDigits: 2 })}
                </td>
                <td className="py-3">
                  <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    {asset.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    aria-label="จัดการ"
                    className="rounded-full p-1.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                  >
                    <MoreHorizontal className="h-4 w-4" />
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
