import type { DropdownOption } from '@/components/basic/Dropdown';

export const periodFilterOptions: DropdownOption[] = [
  { value: 'w0', label: '11 ก.ค. 2567 - 18 ก.ค. 2567' },
  { value: 'w1', label: '4 ก.ค. 2567 - 11 ก.ค. 2567' },
  { value: 'm0', label: 'กรกฎาคม 2567' },
];

export const compareFilterOptions: DropdownOption[] = [
  { value: 'prev_period', label: 'ช่วงเวลาก่อนหน้า (4 - 10 ก.ค. 2567)' },
  { value: 'prev_month', label: 'เดือนก่อนหน้า' },
  { value: 'prev_year', label: 'ปีก่อนหน้า' },
];

export const dimensionFilterOptions: DropdownOption[] = [
  { value: 'province', label: 'ภาพรวมจังหวัด' },
  { value: 'district', label: 'รายอำเภอ' },
  { value: 'sector', label: 'รายภาคส่วน' },
];

export const outcomeFilterDefaults = {
  period: 'w0',
  compare: 'prev_period',
  dimension: 'province',
};
