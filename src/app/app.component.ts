import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {AppService} from "../utils/app.service"
import { NavigationEnd, Router } from '@angular/router';
import {environment} from '../environments/environment';
//  import {
//   NgcCookieConsentService,
//   NgcNoCookieLawEvent,
//   NgcInitializeEvent,
//   NgcStatusChangeEvent,
//   NgcCookieConsentConfig
// } from "ngx-cookieconsent";

import { Subscription } from "rxjs";

// import { RouterExtService } from "./services/routerurlstate.service";

declare const gtag: Function;

declare var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

   //keep refs to subscriptions to be able to unsubscribe later

  //  private popupOpenSubscription: any = Subscription;
  //  private popupCloseSubscription: any =  Subscription;
  //  private initializeSubscription: any =  Subscription;
  //  private statusChangeSubscription: any =  Subscription;
  //  private revokeChoiceSubscription: any =  Subscription;
  //  private noCookieLawSubscription: any =  Subscription;

  googleAnalytics : any = [];

// pour cookiebot
  cookieContent: any;
  localStorageContent: any;
  sessionStorageContent: any;
//--------------------------------Z

   
 
  clickEventsubscription: any = Subscription;

  title = 'iotaOrigin';

  lang_fr = true;
  lang_en = false;
  lang_ger = false;

  constructor(private translate: TranslateService, 
       // private ccService: NgcCookieConsentService,
      //  private _cookieBotService: NgxCookiebotService,
        public router: Router,
        private appService: AppService) {

        translate.setDefaultLang('en');
        this.clickEventsubscription = this.appService.getClickEvent().subscribe(()=>{
        this.changeLanguage();
        });

        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            gtag('config', environment.ga, { 'page_path': event.urlAfterRedirects });
          }      
        })


      // pour cookiebot
        document.cookie = 'Cookie-Inhalt';
        localStorage.setItem('1', 'LocalStorage-Inhalt');
        sessionStorage.setItem('1', 'sessionStorage-Inhalt');

        this.cookieContent = document.cookie;
        this.localStorageContent = localStorage.getItem('1');
        this.sessionStorageContent = sessionStorage.getItem('1');

        // console.log(this.cookieContent);
        // console.log(this.localStorageContent);
        // console.log(this.sessionStorageContent);
       // -------------------------------------------- 



               }


  handleClickSound() {
    let x = <HTMLVideoElement>document.getElementById("myAudio");
    x.play();
  }           


  ngOnInit(): void {

    this.getGoogleAnalyticsID();

    this.translate.addLangs(['en', 'fr','ger','sw']);
    this.translate.setDefaultLang('sw');
    

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(this.translate.currentLang);

   // this.initCookieConsentDialog();

    // this.translate//
    // .get(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy'])
    // .subscribe(data => {

    //   this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
    //   // Override default messages with the translated ones
    //   this.ccService.getConfig().content!.header = data['cookie.header'];    
    //   this.ccService.getConfig().content!.message = data['cookie.message'];
    //   this.ccService.getConfig().content!.dismiss = data['cookie.dismiss'];
    //   this.ccService.getConfig().content!.allow = data['cookie.allow'];
    //   this.ccService.getConfig().content!.deny = data['cookie.deny'];
    //   this.ccService.getConfig().content!.link = data['cookie.link'];
    //   this.ccService.getConfig().content!.policy = data['cookie.policy'];      

    //   this.ccService.destroy(); // remove previous cookie bar (with default messages)
    //   this.ccService.init(this.ccService.getConfig()); // update config with translated messages
    // });  



  // // subscribe to cookieconsent observables to react to main events
  // this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(() => {
  //   // you can use this.ccService.getConfig() to do stuff...
  // });

  // this.popupCloseSubscription = this.ccService.popupClose$.subscribe(() => {
  //   // you can use this.ccService.getConfig() to do stuff...
  // });

  // this.initializeSubscription = this.ccService.initialize$.subscribe(
  //   (event: NgcInitializeEvent) => {
  //     // you can use this.ccService.getConfig() to do stuff...
  //   }
  // );

  // this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
  //   (event: NgcStatusChangeEvent) => {
  //     // you can use this.ccService.getConfig() to do stuff...
  //   }
  // );

  // this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
  //   () => {
  //     // you can use this.ccService.getConfig() to do stuff...
  //   }
  // );

  // this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
  //   (event: NgcNoCookieLawEvent) => {
  //     // you can use this.ccService.getConfig() to do stuff...
  //   }
  // );  

    this.translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
    

  }




  choixLangue(langue : any){
  //  console.log(langue);
    if(langue == "Français"){
      this.translate.use('fr');
      this.lang_fr = true;
      this.lang_en = false;
      this.lang_ger = false;
    } else if(langue == "English"){
      this.translate.use('en');
      this.lang_fr = false;
      this.lang_en = true;
      this.lang_ger = false;
    } else if(langue == "Deutsch"){
      this.lang_fr = false;
      this.lang_en = false;
      this.lang_ger = true;
      this.translate.use('ger');
    }
  }




  // ngOnDestroy() {
  //   // unsubscribe to cookieconsent observables to prevent memory leaks
  //   this.popupOpenSubscription.unsubscribe();
  //   this.popupCloseSubscription.unsubscribe();
  //   this.initializeSubscription.unsubscribe();
  //   this.statusChangeSubscription.unsubscribe();
  //   this.revokeChoiceSubscription.unsubscribe();
  //   this.noCookieLawSubscription.unsubscribe();
  // }


  changeLanguage(){ 
    // console.log(this.translate.currentLang);
    // console.log(localStorage.getItem('lang'));
  }



  // public initCookieConsentDialog(): void {
  //   this.translate.get(['cookie.header', 'cookie.message', 'cookie.deny', 'cookie.dismiss', 'cookie.allow', 'cookie.link', 'cookie.policy']).subscribe(data => {
  //     const existingConfig = this.ccService.getConfig();
  //     const newConfig = {
  //       ...existingConfig,
  //       content: {
  //         header: data['cookie.header'],
  //         message: data['cookie.message'],
  //         deny: data['cookie.deny'],
  //         dismiss: data['cookie.dismiss'],
  //         allow: data['cookie.allow'],      
  //         link: data['cookie.link'],
  //         policy: data['cookie.policy']
  //       },
  //       cookie: {
  //         domain: 'localhost'
  //       },
  //     } as NgcCookieConsentConfig
  //     this.ccService.destroy();
  //     this.ccService.init(newConfig);
  //   });
  // }



  getGoogleAnalyticsID(){
    this.appService.getGoogleAnalyticsID().subscribe(data =>{     
     // console.log(data); 
      this.googleAnalytics = data;
      localStorage.setItem('googleAnalyticsID', JSON.stringify({id: this.googleAnalytics[0].googleAnalyticsID}))
      
     
      // this.googleAnalyticsId = this.googleAnalytics[0].googleAnalyticsID;
    });
  }



}
