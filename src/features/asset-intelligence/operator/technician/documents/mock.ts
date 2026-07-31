import { TechnicianDocumentItem } from '../types';

export const getTechnicianDocuments = async (): Promise<TechnicianDocumentItem[]> => {
  return [
    { documentName: 'คู่มือการใช้งาน เครื่องปรับอากาศ แบบแขวน', documentSubtext: 'รุ่น WO-6705', category: 'คู่มือการใช้งาน', equipment: 'เครื่องปรับอากาศ', equipmentSubtext: 'แบบแขวน', fileType: 'PDF', lastUpdatedDate: '20 พ.ค. 2567', lastUpdatedTime: '14:25 น.', fileSize: '2.45 MB' },
    { documentName: 'คู่มือซ่อมบำรุง เครื่องปรับอากาศ', documentSubtext: 'รุ่น WO-6705', category: 'คู่มือซ่อมบำรุง', equipment: 'เครื่องปรับอากาศ', equipmentSubtext: 'แบบแขวน', fileType: 'PDF', lastUpdatedDate: '18 พ.ค. 2567', lastUpdatedTime: '10:30 น.', fileSize: '5.12 MB' },
  ];
};
