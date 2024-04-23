import { Routes } from '@angular/router';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { CategoryComponent } from '../components/category/category.component';
import { ProductComponent } from '../components/product/product.component';
import { OrderComponent } from '../components/order/order.component';
import { TicketComponent } from '../components/ticket/ticket.component';
import { UserComponent } from '../components/user/user.component';
import { SettingsComponent } from '../components/settings/settings.component';
import { TermsConditionsComponent } from '../components/terms-conditions/terms-conditions.component';
import { ErrorComponent } from '../components/error/error.component';
import { SalesComponent } from '../components/sales/sales.component';

export const routes: Routes = [
    { path: "user", component: UserComponent },
    { path: "", component: DashboardComponent },
    { path: "sales", component: SalesComponent },
    { path: "order", component: OrderComponent },
    { path: "ticket", component: TicketComponent },
    { path: "home", component: DashboardComponent },
    { path: "product", component: ProductComponent },
    { path: "category", component: CategoryComponent },
    { path: "settings", component: SettingsComponent },
    { path: "dashboard", component: DashboardComponent },
    { path: "terms", component: TermsConditionsComponent },
    { path: "**", component: ErrorComponent },
];

/*
/"
/product
/category
/order
/ticket
/user

*/