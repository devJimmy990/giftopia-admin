import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CategoryComponent } from '../components/category/category.component';
import { ProductComponent } from '../components/product/product.component';
import { OrderComponent } from '../components/order/order.component';
import { TicketComponent } from '../components/ticket/ticket.component';
import { UserComponent } from '../components/user/user.component';
import { HomeComponent } from '../components/home/home.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    // { path: "/product", component: ProductComponent },
    // { path: "/category", component: CategoryComponent },
    // { path: "/order", component: OrderComponent },
    // { path: "/ticket", component: TicketComponent },
    // { path: "/user", component: UserComponent },
    // { path: "/**", component: DashboardComponent },
];

/*
/"
/product
/category
/order
/ticket
/user

*/