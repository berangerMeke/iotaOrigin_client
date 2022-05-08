import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AppService} from "../../../utils/app.service";
import { Contact } from '../../../utils/contact-model';
import { ContactSend } from '../../../utils/contact-model';

declare var $ : any;


@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {

    clickEventsubscription: any = Subscription;
    footerDatas : any = [];
    imprintsDatas : any = [];
    contact: Contact = new Contact();
    contactSend: ContactSend = new ContactSend();

    form: any = FormGroup;
    contacForm : any;

    closed = true;
    isContactSuccess = false;
    isContactFormErrror = false;
    isConnectionError = false;


  constructor(public router: Router, 
            public appService: AppService,
            public formBuilder: FormBuilder,
            public translate: TranslateService) {
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

    this.getImprints();
    this.getFooter();

    localStorage.setItem('homeIcone', 'true');

    this.animation();

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
 
        window.scroll(0,0);

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
  

  scrollNavigetion(){
    $('section').scrollIndicatorBullets();

  }


  goToConfidentialite(){
    this.router.navigate(['/policy'], { fragment: 'privacy-policy'} )
    .then(() => {
     window.location.reload();
    });
  }
  
  getFooter(){
    this.appService.getFooter().subscribe(data =>{     
      this.footerDatas = data;
     // console.log(this.footerDatas); 
      this.changeLanguage();
    });
  }

  getImprints(){
    this.appService.getImprints().subscribe(data =>{     
        this.imprintsDatas = data;
       // console.log(this.imprintsDatas); 
        this.changeLanguage();
    });
  }

  changeLanguage(){ 
    // console.log(this.translate.currentLang);
    // console.log(localStorage.getItem('lang'));
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

   // console.log(this.contactSend);

      this.appService.envoieEmail(this.contactSend).subscribe({
        next: (data) => {
         // console.log(data)
          this.contacForm.reset();
          this.isContactSuccess = true;
        },
        error: (error) => {
        //  console.log(error);
          this.isConnectionError = true;
        }
      });
    
    }

 
  }

}
