let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        title: {type: String},
        content: {type: String},
        image: {type: String}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);