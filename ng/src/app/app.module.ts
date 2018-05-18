import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule, MatGridListModule, MatInputModule, MatSelectModule, MatToolbarModule} from "@angular/material";
import {AppService} from "./app.service";


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSelectModule,
        MatGridListModule,
        MatToolbarModule,
        MatButtonModule
    ],
    providers: [
        AppService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
