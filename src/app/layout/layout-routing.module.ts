import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'userRegistration', pathMatch: 'full' },
            { path: 'userRegistration', component: UserRegistrationComponent },
            { path: 'userDetails', component: UserDetailsComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
