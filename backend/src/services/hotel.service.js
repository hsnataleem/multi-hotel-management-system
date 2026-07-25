const Hotel = require("../models/Hotel");
const createHotel = async (hotelData, ownerId) => {

    // Create hotel with authenticated owner's ID
    const hotel = await Hotel.create({
        ...hotelData,
        ownerId,
    });

    return hotel;
};

const getAllHotels = async () => {
    const hotels = await Hotel.findAll({
        order: [["createdAt", "DESC"]],
    });

    return hotels;
};

const getHotelById = async (id) => {

    // Find hotel by primary key
    const hotel = await Hotel.findByPk(id);

    // Check if hotel exists
    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    return hotel;
};


// update hotel by id

const updateHotel = async (id, hotelData, ownerId) => {

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    if (hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    await hotel.update(hotelData);

    return hotel;
};


// delete hotel by id

const deleteHotel = async (id, ownerId) => {

    const hotel = await Hotel.findByPk(id);

    if (!hotel) {
        throw new Error("Hotel not found.");
    }

    if (hotel.ownerId !== ownerId) {
        throw new Error("Forbidden");
    }

    await hotel.destroy();

    return;
};

// my hotel by owner id

const getMyHotels = async (ownerId) => {

    const hotels = await Hotel.findAll({
        where: {
            ownerId,
        },
        order: [["createdAt", "DESC"]],
    });

    return hotels;
};

module.exports = {
    createHotel,
    getAllHotels,
    getHotelById,
    updateHotel,
    deleteHotel,
    getMyHotels,
};
