import { Wallet, Trash2, Recycle, Cloud, Sprout, TriangleAlert, FileCheckCorner, ShieldPlus, ChartLine, Plane, UsersRound } from 'lucide-react';

export const wasteData = [
    {
        title: "เหตุการณ์สำคัญ",
        value: 2,
        unit: "เรื่อง",
        icon: TriangleAlert,
        subValue: 10,
        subUnit: "%",
        positiveData: false, //ถ้าเพิ่มจะเป็นสีแดง ลูกศรขึ้น
        classNameForIcon: 'bg-rose-50 text-rose-500',
        date: new Date()
    },
    {
        title: "ประชาชนได้รับผลกระทบ",
        value: 842.35,
        unit: "kg",
        icon: UsersRound,
        subValue: -7.47,
        subUnit: "%",
        positiveData: false,
        classNameForIcon: 'bg-orange-50 text-orange-500',
        date: new Date()
    },
    {
        title: "นักท่องเที่ยววันนี้",
        value: 87.8,
        unit: "%",
        icon: Plane,
        subValue: 17,
        subUnit: "%",
        positiveData: true, //ถ้าเพิ่มจะเป็นสีเขียว ลูกศรขึ้น
        classNameForIcon: 'bg-yellow-50 text-yellow-500',
        date: new Date()
    },
    {
        title: "ผลกระทบเชิงบวก (มูลค่า)",
        value: 532.4,
        unit: "kg",
        icon: ChartLine,
        subValue: 10.2,
        subUnit: "%",
        positiveData: true,
        classNameForIcon: 'bg-emerald-50 text-emerald-500',
        date: new Date()
    },
    {
        title: "ความพร้อมรับมือ",
        value: 340.2,
        unit: "kg",
        icon: ShieldPlus,
        subValue: 12.5,
        subUnit: "%",
        positiveData: false,
        classNameForIcon: 'bg-blue-50 text-blue-500',
        date: new Date()
    },
    {
        title: "ภารกิจที่ต้องติดตาม",
        value: 11,
        unit: "ภารกิจ",
        icon: FileCheckCorner,
        subtitle: "ครบกำหนด 3 ภารกิจ",
        classNameForIcon: 'bg-purple-50 text-purple-500',
        date: new Date()
    },
]