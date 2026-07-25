const { createHotel, getAllHotels, getHotelById } = require("../services/hotel.service");

const addHotel = async (req, res) => {
    try {
        // Hotel data comes from request body
        const hotelData = req.body;

        // Owner ID comes from authenticated user
        const ownerId = req.user.id;

        // Create hotel
        const hotel = await createHotel(hotelData, ownerId);

        res.status(201).json({
            success: true,
            message: "Hotel created successfully.",
            data: hotel,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
// get all hotels
const getHotels = async (req, res) => {
    try {
        const hotels = await getAllHotels();

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getHotel = async (req, res) => {
    try {

        const { id } = req.params;

        const hotel = await getHotelById(id);

        res.status(200).json({
            success: true,
            data: hotel,
        });

    } catch (error) {

        res.status(404).json({
            success: false,
            message: error.message,
        });

    }
}; 


// update hotel

const updateHotelController = async (req, res) => {
    try {

        const hotel = await updateHotel(
            req.params.id,
            req.body,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Hotel updated successfully.",
            data: hotel,
        });

    } catch (error) {

        if (error.message === "Forbidden") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this hotel.",
            });
        }

        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};


// delete hotelcontroller

const deleteHotelController = async (req, res) => {
    try {

        await deleteHotel(
            req.params.id,
            req.user.id
        );

        res.status(200).json({
            success: true,
            message: "Hotel deleted successfully.",
        });

    } catch (error) {

        if (error.message === "Forbidden") {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to delete this hotel.",
            });
        }

        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

const myHotels = async (req, res) => {

    try {

        const hotels = await getMyHotels(req.user.id);

        res.status(200).json({
            success: true,
            count: hotels.length,
            data: hotels,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addHotel,
    getHotels,
    getHotel,
    updateHotelController,
    deleteHotelController,
    myHotels,
};