import Order from "../models/order.js";
import { isCustomer } from "./userController.js";

export async function createOrder(req, res) {

    if (!isCustomer(req)) {
        res.json({
            message: "please login as customer to add order"
        })
    return
    }

    try {
        const lastOrder = await Order.find().sort
        ({ date: -1 }).limit(1)

        let orderId 

        if (lastOrder.length == 0) {
            orderId = "CBC001";
        } else {
           const currentOrderId = lastOrder[0].orderId
            

            const numberString = currentOrderId.replace("CBC", "")

            const number = parseInt(numberString)

            const newnumber = (number + 1).toString().padStart(4, "0");

            orderId = "CBC" + newnumber
              
        }

        const newOrderData = req.body;
        newOrderData.orderId = orderId;
        newOrderData.email = req.user.email;

        const order = new Order(newOrderData)

        await order.save()
         
        res.json({
            message: "Order created"
        })



    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getOrders(req, res) {

try {
    const orders = await Order.find()
    res.json(orders)
} catch (error) {
    res.status(500).json({ message: error.message });   

}
}
