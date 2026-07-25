const { createRoom, getRoomsByHotel, getRoomById, updateRoom, deleteRoom } = require("../services/room.service");

const addRoom = async (req, res) => {

    try {

        const room = await createRoom(
            req.params.hotelId,
            req.body,
            req.user.id
        );

        res.status(201).json({
            success: true,
            message: "Room created successfully.",
            data: room,
        });

    } catch (error) {

        if (error.message === "Forbidden") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to add rooms to this hotel.",
            });
        }

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};


const getRooms = async (req, res) => {

    try {

        const rooms = await getRoomsByHotel(
            req.params.hotelId
        );

        res.status(200).json({
            success: true,
            count: rooms.length,
            data: rooms,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

const getRoom = async (req, res) => {

    try {

        const room = await getRoomById(req.params.roomId);

        res.status(200).json({
            success: true,
            data: room,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

const editRoom = async (req, res) => {

    try {

        const room = await updateRoom(
            req.params.roomId,
            req.body,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Room updated successfully.",
            data: room,
        });

    } catch (error) {

        if (error.message === "Forbidden") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this room.",
            });
        }

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

const removeRoom = async (req, res) => {

    try {

        await deleteRoom(
            req.params.roomId,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Room deleted successfully.",
        });

    } catch (error) {

        if (error.message === "Forbidden") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this room.",
            });
        }

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    addRoom,
    getRooms,
    getRoom,
    editRoom,
    removeRoom,
};