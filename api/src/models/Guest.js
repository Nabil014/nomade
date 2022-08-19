const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestSchema = new Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, min: 6 },
  cellPhone: { type: String },
  dni: { type: String },
  country: { type: String },
  picture: { type: String },
  booking: [{ type: Schema.ObjectId, ref: "Booking" }, ],
  reviews: [{ type: Schema.ObjectId, ref: "GuestReview", }, ],
  birthDate: { type: Date }
});


GuestSchema.methods.setImgUrl = function setImgUrl (filename) {
  this.picture = "http://localhost:3001/files/uploads/" + filename
}


const model = mongoose.model("Guest", GuestSchema);
module.exports = model;
