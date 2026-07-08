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
    profileImg: "https://0.soompi.io/wp-content/uploads/2020/12/22181327/ong-seong-woo1.jpg",
    companyName: "Smart CityZen",
    companyLogo: "/logo.png",
};

