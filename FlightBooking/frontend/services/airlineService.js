import httpService from "./httpService";

export const getAllAirlines = async () => {
    const res = await httpService.get("/airline");
    return res.data;
}

export const getAirline = async (id) => {
    const res = await httpService.get(`/airline/${id}`);
    return res.data;
}
export const getDeleteAirline = async (id) => {
    const res = await httpService.delete(`/airline/${id}`);
    return res.data;
}

export const createAirline = async (body) => {
    try {
        const res = await httpService.post(`/airline`, body);
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Something went wrong" };
    }
};
export const updateAirline = async (Id, body) => {
    const res = await httpService.put(`/airline/${Id}`, body);
    return res.data;
}