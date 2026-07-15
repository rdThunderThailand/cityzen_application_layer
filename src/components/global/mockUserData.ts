export interface UserProfile {
    displayName: string;
    role: string;
    profileImg: string;
    companyName: string;
    companyLogo: string;
}

export const managerUser: UserProfile = {
    displayName: "คุณสมชาย วงษ์เจริญ",
    role: "เจ้าหน้าที่ดูแลระบบ",
    profileImg: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
};

export const executiveUser: UserProfile = {
    displayName: "ผู้ว่าราชการจังหวัดภูเก็ต",
    role: "ผู้ว่าราชการจังหวัดภูเก็ต",
    profileImg: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
}

export const operatorUser: UserProfile = {
    displayName: "คุณสมหญิง ใจดี",
    role: "เจ้าหน้าที่ปฏิบัติการ",
    profileImg: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
}