export class GeneralMethods {
    static CastCategories = (param: any) =>
        (param["data"] as CategoryModel[]);

    static CastProducts = (param: any) =>
        (param["data"] as ProductModel[]);

    static CastSingleProduct = (param: any) =>
        (param["data"] as ProductModel);

    static CastReviews = (param: any) =>
        (param["data"] as ReviewModel[]);

    static CastUsers = (param: any) =>
        (param["data"] as UserModel[]);

    static CastUser = (param: any) =>
        (param["data"] as UserModel);

    static CastCart = (param: any) =>
        (param["data"] as CartModel);

    static CastTickets = (param: any) =>
        (param["data"] as TicketModel[]);

    static CastOrders = (param: any) =>
        (param["data"] as OrderModel[]);

}