import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { CountryMaster } from '../models/country-master.model';
import { State } from '../models/state.model';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class MasterService {
  public http: HttpClient;

  constructor(http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.http = http;
  }

  getAllMasterCountries() {
    return this.http.get<CountryMaster[]>(this.baseUrl + 'master/getAllCountries').pipe(map(response => response));
  }

  getAllMasterCurrencies() {
    return this.http.get<CountryMaster[]>(this.baseUrl + 'master/getAllCurrencies').pipe(map(response => response));
  }

  getAllStatesByCountry(countryId: number) {
    return this.http.get<State[]>(this.baseUrl + 'state/getAllByCountry/' + countryId).pipe(map(response => response));
  }

  getAllCountries() {
    return this.http.get<Country[]>(this.baseUrl + 'country/getAll').pipe(map(response => response));
  }
}
