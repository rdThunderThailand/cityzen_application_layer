export interface UserProfile {
    name: string;
    role: string;
    profileImg: string;
    companyName: string;
    companyLogo: string;
}

export const defaultUser: UserProfile = {
    name: "สมชาย รักดี",
    role: "เจ้าหน้าที่ดูแลระบบ",
    profileImg: "https://api.dicebear.com/7.x/adventurer/svg?seed=Somchai",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
};

