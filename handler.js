"use strict";

module.exports.createOrder = async (event) => {
  const body = JSON.parse(event.body);
  const order = orderManager.createOrder(body);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Order created!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
