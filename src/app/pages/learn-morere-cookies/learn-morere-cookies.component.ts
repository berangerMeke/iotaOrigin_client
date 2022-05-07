import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import {AppService} from "../../../utils/app.service";

@Component({
  selector: 'app-learn-morere-cookies',
  templateUrl: './learn-morere-cookies.component.html',
  styleUrls: ['./learn-morere-cookies.component.css']
})
export class LearnMorereCookiesComponent implements OnInit {


  clickEventsubscription: any = Subscription;


  constructor(public router: Router, 
    public appService: AppService,
    public translate: TranslateService) {
        translate.setDefaultLang('en');
        this.clickEventsubscription = this.appService.getClickEvent().subscribe(()=>{
        this.changeLanguage();
    })
     }

  ngOnInit(): void {
  }

  changeLanguage(){ 
    console.log(this.translate.currentLang);
    console.log(localStorage.getItem('lang'));
  }

}
