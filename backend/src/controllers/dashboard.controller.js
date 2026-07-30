const {
    ownerDashboard,
    adminDashboard,
} = require("../services/dashboard.service");

const ownerStats = async (req, res) => {

    try {

        const dashboard = await ownerDashboard(req.user.id);

        res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const adminStats = async (req, res) => {

    try {

        const dashboard = await adminDashboard();

        res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    ownerStats,
    adminStats,
};