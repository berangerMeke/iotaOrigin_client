import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgcCookieConsentModule, NgcCookieConsentConfig} from 'ngx-cookieconsent'; 
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';


import {environment} from '../environments/environment';
import {AppInterceptor} from '../utils/app-interceptor'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './pages/accueil/accueil.component';
import { AnimateImageComponent } from './pages/accueil/animate-image/animate-image.component';
import { LegalComponent } from './pages/legal/legal.component';
import { ConfidentialiteComponent } from './pages/confidentialite/confidentialite.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { PagesComponent } from './pages/pages/pages.component';
import { LearnMorereCookiesComponent } from './pages/learn-morere-cookies/learn-morere-cookies.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



const cookieConfig: NgcCookieConsentConfig = {
  "cookie": {
    "domain": 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  position: 'bottom-left',
  palette: {
    popup: {
      background: '#ffffff',
      text: '#1f2122',
      link: '#1f2122'
    },
    button: {
      background: '#002850',
      text: '#ffffff',
      border: 'transparent'
    }
  },
  theme: 'classic',
  type: 'opt-out',
  content: { 
    message : 'We use cookies on our website to give you the most relevant experience by remembering your preferences and repeat visits. By clicking “Accept”, you consent to the use of ALL the cookies.',
    dismiss : 'Got it!',
    deny : 'Deny cookies',
    link : 'Learn more',
    href : 'https://policies.google.com/technologies/cookies',
    policy : 'Cookie Policy'
  }
};


export function translateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    AnimateImageComponent,
    LegalComponent,
    ConfidentialiteComponent,
    NavbarComponent,
    FooterComponent,
    PagesComponent,
    LearnMorereCookiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    SlickCarouselModule,
    FormsModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxGoogleAnalyticsModule.forRoot(environment.ga),
    NgxGoogleAnalyticsRouterModule.forRoot({ include: [ '/page-*' ] }),
    NgcCookieConsentModule.forRoot(cookieConfig),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: translateHttpLoaderFactory,
          deps: [HttpClient],
      }
    }),
    NgbModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
