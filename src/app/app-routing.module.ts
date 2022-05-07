import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PagesComponent} from './pages/pages/pages.component';
import {AccueilComponent} from './pages/accueil/accueil.component';
import {ConfidentialiteComponent} from './pages/confidentialite/confidentialite.component';
import {LegalComponent} from './pages/legal/legal.component';
import {LearnMorereCookiesComponent} from './pages/learn-morere-cookies/learn-morere-cookies.component';

const routes: Routes = [
  
  { 
    path: '', 
      component: PagesComponent, children: [
        { path: '', component: AccueilComponent },
        { path: 'home', component: AccueilComponent },
        { path: 'index', component: AccueilComponent},
        { path: 'imprim', component: LegalComponent }, 
        { path: 'policy', component: ConfidentialiteComponent },
        { path: 'learn-more-cookies', component: LearnMorereCookiesComponent }      
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
