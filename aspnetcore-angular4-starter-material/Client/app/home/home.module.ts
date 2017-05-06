import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HomeComponent } from './home.component';
import { routing } from './home.routes';

import { MaterialModule } from '@angular/material';
import { MdInputModule } from '@angular/material';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        MaterialModule.forRoot(),
        MdInputModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
