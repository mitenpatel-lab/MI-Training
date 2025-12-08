import httpService from "./httpService";

export const getAllUsers = async () => {
    const res = await httpService.get("/getalluser");
    console.log(res.data)
    return res.data;
}

// export const getUser = async (id) => {
//     const res = await httpService.get(`/User/${id}`);
//     return res.data;
// }
export const getDeleteUser = async (id) => {
    const res = await httpService.delete(`/getalluser/${id}`);
    return res.data;
}

// export const createUser = async (body) => {
//     try {
//         const res = await httpService.post(`/User`, body);
//         return res.data;
//     } catch (err) {
//         return err.response?.data || { success: false, message: "Something went wrong" };
//     }
// };
// export const updateUser = async (Id, body) => {
//     const res = await httpService.put(`/User/${Id}`, body);
//     return res.data;
// }