const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createRoom = async (hotelId, roomData, ownerId) => {

    // Step 1
    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    // Step 2
    if (hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    // Step 3
    const room = await Room.create({
        ...roomData,
        hotelId,
    });

    return room;
};

const getRoomsByHotel = async (hotelId) => {

    // Check hotel exists
    const hotel = await Hotel.findByPk(hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    // Find all rooms of that hotel
    const rooms = await Room.findAll({
        where: {
            hotelId,
        },
        order: [["roomNumber", "ASC"]],
    });

    return rooms;
};

const getRoomById = async (roomId) => {

    const room = await Room.findByPk(roomId);

    if (!room) {
        throw new Error("Room not found.");
    }

    return room;
};

const updateRoom = async (roomId, roomData, ownerId) => {

    const room = await Room.findByPk(roomId);

    if (!room) {
        throw new Error("Room not found.");
    }

    const hotel = await Hotel.findByPk(room.hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    if (hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    await room.update(roomData);

    return room;
};

const deleteRoom = async (roomId, ownerId) => {

    const room = await Room.findByPk(roomId);

    if (!room) {
        throw new Error("Room not found.");
    }

    const hotel = await Hotel.findByPk(room.hotelId);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    if (hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    await room.destroy();

    return;
};



module.exports = {
    createRoom,
    getRoomsByHotel,
    getRoomById,
    updateRoom,
    deleteRoom,
};