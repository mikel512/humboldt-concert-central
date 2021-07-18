import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { ApiAuthorizationModule } from '../api-authorization/api-authorization.module';
import { AuthorizeGuard } from '../api-authorization/authorize.guard';
import { AuthorizeInterceptor } from '../api-authorization/authorize.interceptor';
import { SplashComponent } from './home/splash/splash.component';
import { CitiesMenuComponent } from './home/cities-menu/cities-menu.component';
import { CityComponent } from './home/cities-menu/city/city.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    SplashComponent,
    CitiesMenuComponent,
    CityComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', 
        component: HomeComponent, 
        pathMatch: 'full' 
      },
      { path: 'counter', component: CounterComponent },
      { path: 'venues/:city', loadChildren: () => import('./venues-page/venues-page.module').then(m => m.VenuesPageModule) },
      { path: ':city', loadChildren: () => import('./event-page/event-page.module').then(m => m.EventPageModule) },
      { path: 'events/:eventId', loadChildren: () => import('./event-detail/event-detail.module').then(m => m.EventDetailModule) },
      { path: 'venue-detail/:venueId', loadChildren: () => import('./venue-detail/venue-detail.module').then(m => m.VenueDetailModule) },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
