import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthComponent} from './auth/auth.component';
import {HttpClientModule} from '@angular/common/http';
import {RegisterComponent} from './register/register.component';
import {FormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {AgmCoreModule} from '@agm/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [AppComponent, AuthComponent, RegisterComponent, ProfileComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASVFVXcaKUXbXrNQxMnHXhFyzM2koO8Lo'
    }),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
