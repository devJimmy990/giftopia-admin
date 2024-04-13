type OrderModel = {
    isEditingStatus: boolean
    _id: string,
    userId: string,
    products: ProductOrderModel[],
    status: string,
    isEditing: boolean = false,
    tempStatus: string = '';
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