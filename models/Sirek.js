const mongoose = require('mongoose');

const sirekSchema = new mongoose.Schema({
  Kategori: { 
    type: String, 
    required: true 
  },
  Indikasi: { 
    type: [String], // Daftar indikasi penggunaan obat
    required: true 
  },
  Kontraindikasi: { 
    type: [String], // Daftar kondisi yang tidak dianjurkan menggunakan obat ini
    required: true
  }
});

// Membuat model Medicine
const Sirek = mongoose.model('Sirek', sirekSchema);

module.exports = Sirek;