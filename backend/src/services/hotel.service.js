const Hotel = require("../models/Hotel");
const createHotel = async (hotelData, ownerId) => {
const { Op } = require("sequelize");

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


//search hotel

const searchHotels = async (query) => {

    const {
        city,
        rating,
        food,
        availability,
    } = query;

    const where = {};

    // City Filter
    if (city) {
        where.city = {
            [Op.iLike]: `%${city}%`,
        };
    }

    // Minimum Rating
    if (rating) {
        where.rating = {
            [Op.gte]: Number(rating),
        };
    }

    // Food Available
    if (food !== undefined) {
        where.food = food === "true";
    }

    // Hotel Available
    if (availability !== undefined) {
        where.availability = availability === "true";
    }

    const hotels = await Hotel.findAll({

        where,

        include: [
            {
                model: Room,
            },
        ],

        order: [
            ["rating", "DESC"],
            ["hotelName", "ASC"],
        ],

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
    searchHotels,
};
