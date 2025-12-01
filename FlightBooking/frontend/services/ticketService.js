import httpService from "./httpService";

export const getAlltickets = async () => {
    const res = await httpService.get("/ticket");
    return res.data;
}

export const getTicket = async (id) => {
    const res = await httpService.get(`/ticket/${id}`);
    return res.data;
}
export const getDeleteTicket = async (id) => {
    const res = await httpService.delete(`/ticket/${id}`);
    return res.data;
}

export const createTicket = async (body) => {
    try {
        const res = await httpService.post(`/ticket`, body);
        return res.data;
    } catch (err) {
        return err.response?.data || { success: false, message: "Something went wrong" };
    }
};
