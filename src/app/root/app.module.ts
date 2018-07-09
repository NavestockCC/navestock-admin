/* Angular Modules */
import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';



/* Angular Components */
import { AppComponent } from './app.component';
import {BannerComponent} from '../banner/banner.component';
import {SideNaveCcomponent} from '../sidenav/sidenave-component';
import {HomeComponent} from '../home/home.component';
import {MenuComponent} from '../menu/menu.component';


/* Navestock Modules */
import {RouterRoutingModule} from '../router/router-routing.module';
import { MatchModule } from '../matches/match.module';
import {NavestockMaterialModule} from './match.material.module'


/**
 * Firebase Imports
 */
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    SideNaveCcomponent,
    HomeComponent,
    MenuComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    RouterRoutingModule,
    AngularFirestoreModule,
    MatchModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NavestockMaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
