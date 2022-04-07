import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DesyAngularModule } from 'desy-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutorListComponent } from './autor-list/autor-list.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { LibroListComponent } from './libro-list/libro-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AutorListComponent,
    CategoriaListComponent,
    LibroListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DesyAngularModule, 
    BrowserAnimationsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
