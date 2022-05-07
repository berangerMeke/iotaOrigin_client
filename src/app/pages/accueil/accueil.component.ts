import { Component, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from "../../../utils/app.service"
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from '../../../utils/contact-model';
import { ContactSend } from '../../../utils/contact-model';
import {DernieresNouvelles} from '../../../utils/model';
// import { NgForm } from '@angular/forms'


 declare var $ : any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [DernieresNouvelles]
})

export class AccueilComponent implements OnInit {

    clickEventsubscription: any = Subscription;
    introDatas : any = [];
    aProposDatas : any = [];
    serviceDatas : any = [];
    advantagesDatas : any = [];
    objectifsDatas : any = [];
    FAQsDatas : any = [];
    dernieresNouvellesDatas : any = [];
    footerDatas : any = [];
    form: any = FormGroup;
    contacForm : any;

    closed = true;
    isContactSuccess = false;
    isContactFormErrror = false;
    isConnectionError = false;
    

    contact: Contact = new Contact();
    contactSend: ContactSend = new ContactSend();

   


    langue: any;

  constructor(public translate: TranslateService,
        public router: Router, 
        public formBuilder: FormBuilder,
        public ngbConfig: NgbConfig,
        public appService: AppService) 
        { 
        ngbConfig.animation = false;
        translate.setDefaultLang('en');
        this.clickEventsubscription = this.appService.getClickEvent().subscribe(()=>{
        this.changeLanguage();
        })
    }

  ngOnInit(): void {
    
    this.contacForm = this.formBuilder.group({
      name: ["", Validators.required ],
      email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ],
      topic: ["", Validators.required ],
      message: ["", Validators.required ]
    });

    localStorage.setItem('homeIcone', 'false');

    this.getIntro();
    this.getApropos();
    this.getService();
    this.getAdvantages();
    this.getObjectifs();
    this.getFAQs();
    this.getDernieresNouvelles();
    this.getFooter();
    this.animation();
    this.carousel();

    var btn = $('.back-to-top');

    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            btn.addClass('show');
        } else {
            btn.removeClass('show');
        }
    });

    btn.on('click', function(e:any) {
        e.preventDefault();
        $('html, body').animate({scrollTop:0}, '300');
    });

    this.scrollNavigetion();

  }


  animation (){

    function isElementInViewport(el:any) {
      if (el.style.display === 'none') {
          return false;
      }
      const rect = el.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document. documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document. documentElement.clientWidth)
      );
  }

  function isAnyPartOfElementInViewport(el: any) {

      const rect = el.getBoundingClientRect();
      // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

      const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
      const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

      return (vertInView && horInView);
  }

  function animateOnScroll(elementsToAnim: any, animationClasses: any) {
      window.onscroll = function(event){
          event.preventDefault();
          elementsToAnim.forEach((elt: any) => {
              if(isAnyPartOfElementInViewport(elt)) {
                  animationClasses.forEach((animClass: any) => {
                      if(elt.classList.contains(animClass)) {
                          elt.classList.remove(animClass);
                      }
                      elt.classList.add(animClass);
                  });
              }
          });
      };
      
  }

  const elementsToAnim = document.querySelectorAll('[class*="anim-elt-"]');
  const animationClasses = ['animate__animated', 'animate__fadeInUp'];

  animateOnScroll(elementsToAnim, animationClasses);

  }
        
  
  carousel(){
    $(document).ready(function() {
      $("#news-slider").owlCarousel({
        items:4,
        itemsDesktop:[1199,2],
        itemsDesktopSmall:[980,2],
        itemsMobile:[600,1],
        pagination:false,
        navigationText:false,
        autoPlay:true
    });

      // $("#team-slider").owlCarousel({
      //     items:4,
      //     nav: true,
      //     navText: ['<div class="nav-button owl-prev">‹</div>', '<div class="nav-button owl-next">›</div>'],
      //     itemsDesktop:[1199,2],
      //     itemsDesktopSmall:[980,2],
      //     itemsMobile:[600,1],
      //     pagination:true,
      //     navigationText:false,
      //     dots: true,
      //     autoPlay:true
      // });
  });

  }


  getIntro() {
    this.appService.getIntro().subscribe(data =>{     
      console.log(data); 
      this.introDatas = data;
     // this.changeLanguage();
    });
  }

  getApropos(){
    this.appService.getApropos().subscribe(data =>{     
      console.log(data); 
      this.aProposDatas = data;
      this.changeLanguage();
    });
  }

  getService(){
    this.appService.getService().subscribe(data =>{     
      this.serviceDatas = data;
      console.log(this.serviceDatas); 
     // this.changeLanguage();
    });
  }

  getAdvantages(){
    this.appService.getAdvantages().subscribe(data =>{     
      this.advantagesDatas = data;
      console.log(this.advantagesDatas); 
     // this.changeLanguage();
    });
  }

  getObjectifs(){
    this.appService.getObjectifs().subscribe(data =>{     
      this.objectifsDatas = data;
      console.log(this.objectifsDatas); 
     // this.changeLanguage();
    });
  }
  

  getFAQs(){
    this.appService.getFAQs().subscribe(data =>{     
      this.FAQsDatas = data;
      console.log(this.FAQsDatas); 
     // this.changeLanguage();
    });
  }

  getDernieresNouvelles(){
    this.appService.getDernieresNouvelles().subscribe(data =>{     
      this.dernieresNouvellesDatas = data;
      console.log(this.dernieresNouvellesDatas); 

      // this.changeLanguage();
    });
  }

  getFooter(){
    this.appService.getFooter().subscribe(data =>{     
      this.footerDatas = data;
      console.log(this.footerDatas); 
     // this.changeLanguage();
    });
  }

  changeLanguage(){ 
    console.log(this.translate.currentLang);
    console.log(localStorage.getItem('lang'));
  }


  goToLegal(){
    this.router.navigate(['/imprim'], { fragment: 'imprint'} )
    .then(() => {
     window.location.reload();
    });
  }

  goToConfidentialite(){
    this.router.navigate(['/policy'], { fragment: 'privacy-policy'} )
    .then(() => {
     window.location.reload();
    });
  }



  scrollNavigetion(){
    $('section').scrollIndicatorBullets();

  }


  onSubmit() {

    this.isContactSuccess = false;
    this.isContactFormErrror = true;
    this.closed = true;
    this.isConnectionError = false;

    if(this.contacForm.valid){

    this.isContactFormErrror = false;
    this.isConnectionError = false;

    this.contactSend.destinaire = this.contacForm.value.email;
    this.contactSend.object = this.contacForm.value.topic;
    this.contactSend.message = this.contacForm.value.name + " :  " + this.contacForm.value.message;
    this.contactSend.Multipart = true;
    this.contactSend.Html = true;

    console.log(this.contactSend);

      this.appService.envoieEmail(this.contactSend).subscribe({
        next: (data) => {
          console.log(data)
          this.contacForm.reset();
          this.isContactSuccess = true;
        },
        error: (error) => {
          console.log(error);
          this.isConnectionError = true;
        }
      });
    
    }

 
  }


  fermer(){
    this.closed = false;
  }


}
