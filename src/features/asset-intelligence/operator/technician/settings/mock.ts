import { TechnicianSettingsData } from '../types';

export const getTechnicianSettingsData = async (): Promise<TechnicianSettingsData> => {
  return {
    mainSettings: [
      { id: 'org-info', title: 'ข้อมูลหน่วยงาน', description: 'จัดการข้อมูลหน่วยงาน ที่อยู่ และข้อมูลการติดต่อ', icon: 'Building2', colorClass: 'text-blue-600', bgClass: 'bg-blue-50' },
      { id: 'users-roles', title: 'ผู้ใช้งานและสิทธิ์', description: 'จัดการผู้ใช้งาน บทบาท และสิทธิ์การเข้าถึงระบบ', icon: 'Users', colorClass: 'text-emerald-600', bgClass: 'bg-emerald-50' },
      { id: 'notifications', title: 'การแจ้งเตือน', description: 'ตั้งค่าการแจ้งเตือนช่องทางและความถี่ในการแจ้งเตือน', icon: 'Bell', colorClass: 'text-purple-600', bgClass: 'bg-purple-50' },
      { id: 'system-settings', title: 'ตั้งค่าระบบ', description: 'ตั้งค่าการทำงานทั่วไปของระบบและการแสดงผล', icon: 'FileText', colorClass: 'text-amber-600', bgClass: 'bg-amber-50' },
      { id: 'backup', title: 'สำรองข้อมูล', description: 'จัดการการสำรองข้อมูลและกู้คืนข้อมูล', icon: 'CloudUpload', colorClass: 'text-teal-600', bgClass: 'bg-teal-50' },
    ],
    generalConfig: {
      language: 'ไทย',
      timezone: '(GMT+07:00) กรุงเทพฯ',
      dateFormat: '31/12/2567 (วว/ดด/ปปปป)',
      timeFormat: '24 ชั่วโมง (13:30)',
      currency: 'บาท (THB)',
      themeColor: 'blue',
      defaultPage: 'หน้าหลัก',
      itemsPerPage: '10 รายการ'
    },
    recentActivities: [
      { id: 'act-1', action: 'เพิ่มผู้ใช้งานใหม่', user: 'โดย สมชาย ช่างเทคนิค', date: '20 พ.ค. 2567', time: '14:25', icon: 'UserPlus', iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
    ],
    systemInfo: {
      version: 'CityZen v2.6.0',
      database: 'PostgreSQL 14.8',
      storageUsed: 128.45,
      storageTotal: 500,
      storageUnit: 'GB',
      lastBackup: '20 พ.ค. 2567 02:30 น.',
      lastUpdate: '15 พ.ค. 2567 11:20 น.'
    }
  };
};
