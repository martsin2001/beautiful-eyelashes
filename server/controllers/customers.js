const express = require('express');
const Customer = require('../models/customers');

module.exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).send(customers);
    } catch(e) {
        res.status(404).json('Not found!')
    }
}

module.exports.toBookPlace = async (req, res) => {
    if(req.body.name && req.body.phoneNumber && req.body.orderDate) {
        const newOrder = new Customer({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            orderDate: req.body.orderDate
        });
        try {
            await newOrder.save();
            res.status(201).json('Order sent!');
        } catch(e) {
            res.status(409).json('Order haven"t sent!');
        }
    } else res.status(501).json('Not booked!');
}