const axios = require('axios');

module.exports.getApotek = (req, res) => {
    try {
        res.render('place-obat/Apotek', { result: null, error: null });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Cari apotek berdasarkan lokasi (latitude, longitude)
module.exports.getApotekTerdekat = async (req, res) => {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
        return res.status(400).json({ error: 'Latitude dan Longitude diperlukan!' });
    }

    try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=pharmacy&bounded=1&viewbox=${lng-0.05},${lat-0.05},${lng+0.05},${lat+0.05}`;

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Gagal mengambil data apotek' })
    }
};