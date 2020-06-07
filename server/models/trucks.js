const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const truckSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique:1,
        maxLength: 100
    },
    description: {
        required: true,
        type: String,
        maxLength: 100000
    },
    price: {
        required: true,
        type: Number,
        maxLength:255
    },
    brand: {
        type: String,
        required: true,
        maxLength: 1000
    },
    driver: {
        required: true,
        type: String,
        maxLength: 1000
    },
    available: {
        required: true,
        type: Boolean
    },
    trucktype: {
        type: String,
        required:true,
        maxLength: 1000
    },
    capacity: {
        required: true,
        type: Number
    },
    publish: {
        required: true,
        type: Boolean
    },
    images: {
        type: Array,
        default: []
    },
    comments:{
        type: Array,
        default:[]
    }

},{timeStamps:true});

const Trucks = mongoose.model('Trucks',truckSchema);
module.exports = { Trucks }