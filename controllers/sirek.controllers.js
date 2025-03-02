const axios = require('axios');

// Halaman Sirek
module.exports.getSirek = async (req, res) => {
    try {
        res.render('SiRek/Sirekform', { result: null, error: null });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Proses rekomendasi
module.exports.createSirek = async (req, res) => {
    const { Indikasi, Kontraindikasi } = req.body;

    if (!Indikasi || !Kontraindikasi) {
        return res.render('SiRek/viewSirek', { error: 'Indikasi dan Kontraindikasi harus diisi!', result: null });
    }

    try {
        const response = await axios.post('http://localhost:5000/predict', 
            { Indikasi, Kontraindikasi },
            { headers: { 'Content-Type': 'application/json' } }
        );

        console.log("Response dari Flask:", response.data); // Debugging

        // Pastikan hasil prediksi adalah array
        let predictions = response.data.predictions;
        if (!Array.isArray(predictions)) {
            predictions = [predictions]; // Ubah menjadi array jika bukan
        }

        res.render('SiRek/viewSirek', { result: predictions, error: null });

    } catch (error) {
        console.error('Error connecting to Flask API:', error);
        res.render('SiRek/viewSirek', { error: 'Terjadi kesalahan saat menghubungi Flask API.', result: null });
    }
};
