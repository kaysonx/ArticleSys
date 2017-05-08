let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PostSchema = new Schema(
    {
        name: {type: String},
        content: {type: String}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Post', PostSchema);