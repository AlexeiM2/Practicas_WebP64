const { Schema, model } = require("mongoose");

const gastoSchema = new Schema({
  tipo: { type: String, required: true },
  ruc: { type: String, required: true },
  valor: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true }
}, {
  timestamps: true
});

module.exports = model('Gasto', gastoSchema);
