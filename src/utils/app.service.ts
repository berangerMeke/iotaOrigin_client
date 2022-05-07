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







  // envoieEmail(email :Contact): Observable<any> {
  //   return this.http.post(environment.base_url+ "email", email);
  // }


  envoieEmail(email : ContactSend): Observable<any> {
    return this.http.post(environment.base_url+ "account/send-email", email);
  }

  











// public getCurrentUser(login): Observable<any>{
//     return this.http.get<any>(environment.base_url+ "users/"+login);
// }


// public getCategories(): Observable<Category[]>{
//     return this.http.get<Category[]>(environment.base_url + "categories");  
// }

// public getCategorieById(id): Observable<Category[]>{
//     return this.http.get<Category[]>(environment.base_url + "categories/"+id);  
// }

// public postCategorie(categorie): Observable<any> {
//     return this.http.post(environment.base_url+ "categories", categorie);
// }

// public updateCategorie(categorie): Observable<any>{
//     return this.http.put(environment.base_url + "categories/", categorie);  
// }

// public deleteCategorie(id): Observable<any>{
//     return this.http.delete(environment.base_url + "categories/"+id);  
// }

// public getProducts(): Observable<Product[]>{        
//     return this.http.get<Product[]>(environment.base_url + "produits");
// }


// public getProductById(id): Observable<Product>{
//     return this.http.get<Product>(environment.base_url+ "produits/"+id);
// }

// public getAllProductsOfCategorie(id): Observable<Product[]>{        
//     return this.http.get<Product[]>(environment.base_url + "allProduitsOfCategorie/"+id);
// }

// public postProduct(produit): Observable<any> {
//     return this.http.post(environment.base_url+ "produits", produit);
// }

// public updateProduct(product): Observable<any>{
//     return this.http.put(environment.base_url + "produits/", product);  
// }

// public deleteProduct(id): Observable<any>{
//     return this.http.delete(environment.base_url + "produits/"+id);  
// }

// public postLivreur(livreur): Observable<any> {
//     return this.http.post(environment.base_url+ "devenirLivreur",livreur);
// }

// public getBanners(): Observable<any[]>{
//     return this.http.get<any[]>(environment.base_url + 'banners.json');
// }

// public postCommandeData(data): Observable<any> {
//     return this.http.post(environment.base_url+ "newCommande", data);
// } 

// public postRegisterUser(UserData): Observable<any> {
//     return this.http.post(environment.base_url+ "createOrUpdateUtilisateur", UserData);
// }



}
