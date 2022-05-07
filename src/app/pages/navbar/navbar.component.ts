import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AppService} from '../../../utils/app.service'
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dropDownStyle: any;

  showHomeIcone : any;

  lang_en = true;
  lang_fr = false;
  lang_ger = false;
  lang_sw = false;
  lan: any;


  constructor(public router: Router, 
              public appService: AppService, 
              private translate: TranslateService) { }

  ngOnInit(): void {

    this.lan = localStorage.getItem('lang');

    if(!localStorage.getItem('lang')){
      this.translate.setDefaultLang('en');
    }else{
      this.translate.use(this.lan);
    }
    
    this.choixLangue(this.lan);
  
    this.showHomeIcone = localStorage.getItem('homeIcone');
    console.log(this.translate.currentLang);
  }


  goToHome(){
    this.router.navigate(['/home'], { fragment: 'intro' })
    .then(() => {
     window.location.reload();
    });
  }

  choixLangue(langue : any){
    if(langue == "fr"){
      this.translate.use('fr');
      localStorage.setItem('lang', 'fr');
      this.lang_fr = true;
      this.lang_en = false;
      this.lang_ger = false;
      this.lang_sw = false;
    } else if(langue == "en"){
      this.translate.use('en');
      localStorage.setItem('lang', 'en');
      this.lang_fr = false;
      this.lang_en = true;
      this.lang_ger = false;
      this.lang_sw = false;
    } else if(langue == "ger"){
      this.translate.use('ger'); 
      localStorage.setItem('lang', 'ger');
      this.lang_fr = false;
      this.lang_en = false;
      this.lang_ger = true;
      this.lang_sw = false;          
    }else if(langue == "sw"){
      this.translate.use('sw'); 
      localStorage.setItem('lang', 'sw');
      this.lang_fr = false;
      this.lang_en = false;
      this.lang_ger = false; 
      this.lang_sw = true;         
    }


    this.appService.sendClickEvent();
  //  console.log(this.translate.currentLang);


  }

}
