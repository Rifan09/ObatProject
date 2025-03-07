const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const medicineRoutes = require('./routes/medicine.route');
const sirekRoutes = require('./routes/sirek.route');
const FAQRoutes = require ('./routes/FAQ.route');
const apotekRoutes = require ('./routes/apotek.route');
const app = express();

// Koneksi MongoDB
mongoose.connect('mongodb://localhost/ehealth', { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json()); // Keep this for JSON parsing

// Body parsing
app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Method override untuk PUT dan DELETE
app.use(methodOverride('_method'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Medicine route
app.use('/medicines', medicineRoutes);

// Sirek route
app.use('/sirek', sirekRoutes);

// FAQ route
app.use('/generalQ', FAQRoutes);

app.use('/apotek', apotekRoutes);

// Halaman utama
app.get('/', (req, res) => {
  res.render('home'); // Pastikan Anda memiliki file home.ejs
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan pada server');
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
