import { FilterPhysicalComponent } from './content/filter-physical/filter-physical.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './content/home/home.component';
import { PaymentComponent } from './payment/payment.component';
import { ContentComponent } from './content/content.component';

export const routes: Routes = [
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: '', component: ContentComponent,
        children: [
            {path: '', redirectTo: 'filter', pathMatch: 'full'},  
            {path: 'home', component: HomeComponent},
            {path: 'payment', component: PaymentComponent},
            {path: 'filter', component: FilterPhysicalComponent},
        ]
    },
];
