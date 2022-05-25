import { Component, OnInit } from '@angular/core';
// import { City } from '../../features/city/city.model';
// import { CountryService } from '../../features/country/country.service';
// import { StateService } from '../../features/state/state.service';
// import { CityService } from '../../features/city/city.service';
// import { ControlContainer } from '@angular/forms';
// import { Country } from '../models/country.model';
// import { State } from '../models/state.model';

@Component({
  selector: 'chef-address-form',
  templateUrl: './address-form.component.html'
})
export class AddressFormComponent implements OnInit {

  // countries: Country[];
  // states: State[];
  // cities: City[];

  constructor(
    // public controlContainer: ControlContainer,
    // private countryService: CountryService,
    // private stateService: StateService,
    // private cityService: CityService
    ) { }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    // this.countryService.getAll().subscribe(response => {
    //   this.countries = response;
    //})
  }

  onCountryChange(countryId: number) {
    this.getStates(countryId);
  }

  getStates(countryId: number) {
    // this.stateService.getAllByCountry(countryId).subscribe(response => {
    //   this.states = response;
    // });
  }

  onStateChange(stateId: number) {
    this.getCities(stateId);
  }

  getCities(stateId: number) {
    // this.cityService.getAllByState(stateId).subscribe(response => {
    //   this.cities = response;
    // });
  }
}