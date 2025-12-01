import httpService from "./httpService";

export const getAllFlights = async () => {
    const res = await httpService.get("/flights");
    return res.data;
}
export const getFlightDetails = async (id) => {
    const res = await httpService.get(`/flights/${id}`);
    return res.data;
}

export const changeFlightStatus = async (id, body) => {
    const res = await httpService.put(`/flights/status/${id}`, body);
    return res.data;
}


export const getDeleteFlight = async (id) => {
    const res = await httpService.delete(`/flights/${id}`);
    return res.data;
}
export const createFlight = async (body) => {
    const res = await httpService.post(`/flights`, body);

    return res.data;
}

export const updateFlight = async (Id, body) => {
    const res = await httpService.put(`/flights/${Id}`, body);

    return res.data;
}