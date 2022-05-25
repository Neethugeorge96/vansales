import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Country } from '../../models/country.model';
import { DropdownValue } from '../../models/dropdown-value';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'chef-country-dropdown',
  templateUrl: './country-dropdown.component.html'
})
export class CountryDropdownComponent implements OnInit {

  countries: Country[];

  @Output() onReady = new EventEmitter();
  @Output() onChange = new EventEmitter();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries() {
    this.masterService.getAllCountries().subscribe(response => {
      this.countries = response;
      if (this.countries.length > 0) {
        let country = this.countries[0] as Country;
        this.onReady.emit(new DropdownValue(country.id.toString(), country.name));
      }
    });
  }

  onSelectChange($event) {
    let value = new DropdownValue($event.target.value, $event.target.options[$event.target.options.selectedIndex].text);
    this.onChange.emit(value);
  }
}
