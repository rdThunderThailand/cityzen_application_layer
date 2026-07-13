export interface UserProfile {
    name: string;
    role: string;
    profileImg: string;
    companyName: string;
    companyLogo: string;
}

export const defaultUser: UserProfile = {
    name: "คุณสมชาย วงษ์เจริญ",
    role: "เจ้าหน้าที่ดูแลระบบ",
    profileImg: "https://i.pinimg.com/736x/69/a5/60/69a5602fb6377d1fef9bb45e8db9e415.jpg",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
};

