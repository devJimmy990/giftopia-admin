type OrderModel = {
    _id: string,
    userId: string,
    products: ProductOrderModel[],
    status: string,
}


type ProductOrderModel = { 
    _id: string, 
    name: string, 
    price: number, 
    image: string, 
    quantity: number, 
    discount: number, 
    soldQuantity: number 
}