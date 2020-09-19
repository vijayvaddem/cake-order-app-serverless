"use strict";
const uuidv1 = require("uuid/v1");

module.export.createOrder = (body) => {
  const order = {
    orderId: uuidv1(),
    name: body.name,
    address: body.address,
    productId: body.productId,
    quantity: body.quantity,
    orderDate: Date.now(),
    event_type: "order_place",
  };
  return order;
};

module.export.placeNewOrder = (order) => {
  //save order in the table
  // push to stream
};
