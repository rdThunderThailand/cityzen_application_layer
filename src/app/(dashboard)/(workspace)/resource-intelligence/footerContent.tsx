import Button from "@/components/basic/Button";
import { FooterProps } from "@/components/global/Footer";
import { Calendar, ChevronRight, CircleAlert, Megaphone, Send, SquarePen, UserRoundPlus } from "lucide-react";
import Link from "next/link";

const footerContent: FooterProps['content'] = () => {
    return (
        <div className="flex justify-between w-full items-center">
            <div className="flex gap-3 items-center w-full">
                <h1 className="font-bold text-[14px] text-black mr-3">ทางลัดสำหรับวันนี้</h1>
                <Button className="border border-gray-200  text-gray-500 bg-white rounded-lg w-fit text-[13px] px-3 py-1.5"><SquarePen className="w-5 h-5" /> สร้างข้อความใหม่</Button>
                <Button className="border border-gray-200 text-gray-500 bg-white rounded-lg w-fit text-[13px] px-3 py-1.5"><Send className="w-5 h-5" /> ส่งข้อความด่วน</Button>
                <Button className="border border-gray-200 text-gray-500 bg-white rounded-lg w-fit text-[13px] px-3 py-1.5"><CircleAlert className="w-5 h-5" /> แจ้งเตือนฉุกเฉิน</Button>
                <Button className="border border-gray-200 rounded-lg text-gray-500 bg-white w-fit text-[13px] px-3 py-1.5"><Calendar className="w-5 h-5" /> นักหมายประชุม</Button>
            </div>
            <Link
                href="/resource-intelligence/executive/decision"
                className="rounded-lg text-white bg-[#0166FF] hover:bg-[#0055d4] transition-colors w-fit text-[13px] px-3 py-1.5 whitespace-nowrap flex items-center gap-1 shrink-0 font-medium select-none cursor-pointer"
            >
                ไปหน้า Decision <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    )
}

export { footerContent }