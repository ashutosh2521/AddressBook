import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactListComponent } from './contactList/contactList.component';
import { ContactDetailComponent } from './contactDetail/contactDetail.component';

import { ContactService } from './services/contact.service';

import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ContactEditComponent } from './contactEdit/contactEdit.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    ContactListComponent,
    ContactDetailComponent,
    HomeComponent,
    ContactEditComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ContactService],
  bootstrap: [AppComponent],
})
export class AppModule {}
