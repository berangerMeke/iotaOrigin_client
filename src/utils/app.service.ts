import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { ContactSend } from './contact-model'


@Injectable({
  providedIn: 'root'
})
export class AppService {

  contactSend: ContactSend = new ContactSend();

  private subject = new Subject<any>();
  
  sendClickEvent() {
    this.subject.next(void 0);
  }
  getClickEvent(): Observable<any>{ 
  return this.subject.asObservable();
  }




  constructor(public http:HttpClient) { }

  public showHomeIcon(): any{
    if(localStorage.getItem('homeIcone') == 'true'){
      return true;
    }else{
      return false
    }
     
  }


  public getIntro(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'accueils');
  }

  public getApropos(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'a-propos');
  }

  public getService(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'services');
  }

  public getAdvantages(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'avantages');
  }

 public getObjectifs(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'objectifs');
  }

  public getFAQs(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'fa-qs');
  }

  public getDernieresNouvelles(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'dernieres-nouvelles');
  }

  public getFooter(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'footer-sections');
  }

  public getImprints(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'imprints');
  }

  public getPrivacyPolicies(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'privacy-policies');
  }


  public getGoogleAnalyticsID(): Observable<any[]>{
    return this.http.get<any[]>(environment.base_url + 'google-analitcs');
  }

  envoieEmail(email : ContactSend): Observable<any> {
    return this.http.post(environment.base_url+ "account/send-email", email);
  }



}
