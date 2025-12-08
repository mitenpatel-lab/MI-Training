const ticketService = require('../services/ticketService');

exports.createTicket = async (req, res) => {

    try {
        const ticketbooking = await ticketService.createTicket(req.user.username, req.body);
        if (ticketbooking)
            res.status(200).json({
                success: true,
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}

exports.getAllTickets = async (req, res) => {
    try {
        const ticketbooking = await ticketService.getAllTickets(req.user.username);
        if (ticketbooking)
            res.status(200).json({
                success: true,
                ticketbooking
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}

exports.deleteTicket = async (req, res) => {

    try {
        let updateflights = await ticketService.deleteTicket(req.params.Id);
        if (updateflights) {
            return res.status(200).json({ message: "Removed successfully", status: 200 });
        }
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
}

exports.getTicketDetails = async (req, res) => {
    try {
        const getTicketDetails = await ticketService.getTicketDetails(req.params)

        if (getTicketDetails)
            res.status(200).json({
                success: true,
                getTicketDetails
            });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Failed to book ticket " + e.message,
            error: e.message
        });
    }
}
