export interface ActivityEventData {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
}

export const eventsData: ActivityEventData[] = [
  {
    id: "1",
    title: "ตรวจรับพัสดุ - เครื่องคอมพิวเตอร์",
    date: "20 พ.ค.",
    startTime: "10.00",
    endTime: "11.00",
    location: "กองยุทธศาสตร์และสารสนเทศ",
  },
]
