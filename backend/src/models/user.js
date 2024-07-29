const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: {type:String,required:true},
  password: {type:String,required:true},
  gasto: [{ type: Schema.Types.ObjectId, ref: "gasto" }]
  
},{
    timestamps: true
});

module.exports = model('user', userSchema);
