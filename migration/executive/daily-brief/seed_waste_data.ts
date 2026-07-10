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
        date: new Date()
    },
    {
        title: "ภารกิจที่ต้องติดตาม",
        value: 11,
        unit: "ภารกิจ",
        icon: FileCheckCorner,
        subtitle: "ครบกำหนด 3 ภารกิจ",
        date: new Date()
    },
]