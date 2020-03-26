import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// External Modules
import { ReactiveFormsModule } from '@angular/forms';

// Angular Meterial Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserHomeComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
