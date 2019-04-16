import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { CustomersList } from '../models/customerlists';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { environment } from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class CustomerListsService {

  private getCustomerListUrl = '';

  constructor(private http: HttpClient) { // , private header: HttpHeaders
    if (environment.dataFromAPI_JSON && environment.getCustomerLists !== '') {
      this.getCustomerListUrl = environment.dpsAPI + environment.getCustomerLists;
    } else {
      this.getCustomerListUrl = 'assets/data/customerlists.json';
    }
    console.log('Data From = ' + this.getCustomerListUrl);
  }

  public getCustomers(): Observable<CustomersList[]> {
      return this.http.get<CustomersList[]>(this.getCustomerListUrl)
        .catch(this.errorHandler);
  }

  errorHandler(error: HttpErrorResponse) { return Observable.throwError(error.message); }

}
