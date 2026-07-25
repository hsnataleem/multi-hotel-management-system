const User = require("./User");
const Hotel = require("./Hotel");
const Room = require("./Room")
const Booking = require("./Booking");

// Relationships

User.hasMany(Hotel, {
    foreignKey: "ownerId",
    onDelete: "CASCADE",
});

Hotel.belongsTo(User, {
    foreignKey: "ownerId",
});

Hotel.hasMany(Room,{
    foreignKey:"hotelId",
    onDelete:"CASCADE"
});

Room.belongsTo(Hotel,{
    foreignKey:"hotelId"
});

User.hasMany(Booking, {
    foreignKey: "customerId",
    onDelete: "CASCADE",
});

Booking.belongsTo(User, {
    foreignKey: "customerId",
});

Room.hasMany(Booking, {
    foreignKey: "roomId",
    onDelete: "CASCADE",
});

Booking.belongsTo(Room, {
    foreignKey: "roomId",
});


module.exports = {
    User,
    Hotel,
    Room,
    Booking,
};