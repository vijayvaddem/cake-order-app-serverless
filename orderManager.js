"use strict";
const uuidv1 = require("uuid/v1");
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const kinesis = new AWS.Kinesis();

const TABLE_NAME = process.env.orderTableName;
const STREAM_NAME = process.env.orderStreamName;

module.exports.createOrder = (body) => {
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

module.exports.placeNewOrder = (order) => {
  //save order in the table
  return saveNewOrder(order).then(() => {
    // push to stream
    placeOrderInStream(order)

  });
};

function saveNewOrder(order) {
  const params = {
    TableName: TABLE_NAME,
    Item: order,
  };

  return dynamo.put(params).promise();
}

function placeOrderInStream (order) {
  const params = {
    Data: JSON.stringify(order);
    PartitionKey: order.orderId,
    StreamName: STREAM_NAME,

  }
return kinesis.putRecord(params).promise();
}