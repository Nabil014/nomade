const multer = require("multer")
const path = require('path');

const storage = multer.diskStorage({
    // destination: function (req , res ,cb) {
        // cb(null, "public/files/uploads")
    // }
    destination: path.join(__dirname, 'public/files/uploads')
    ,
    filename: function(req,file,cb) {
        cb(null , `${file.fieldname}-${Date.now()}.png`)
    }
})

const upload = multer({storage})


module.exports = upload