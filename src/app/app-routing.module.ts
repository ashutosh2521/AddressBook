import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './contactDetail/contactDetail.component';
import { ContactEditComponent } from './contactEdit/contactEdit.component';
import { ContactListComponent } from './contactList/contactList.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ContactListComponent,
        children: [
          {
            path: 'contactdetail/:id',
            component: ContactDetailComponent,
          },
          {
            path: 'add',
            component: ContactEditComponent,
          },
          {
            path: 'update/:id',
            component: ContactEditComponent,
          },
        ],
      },
    ],
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
