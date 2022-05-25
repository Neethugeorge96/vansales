import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { StateService } from '../../../features/state/state.service';
import { DropdownValue } from '../../models/dropdown-value';
import { State } from '../../models/state.model';
import { MasterService } from '../../services/master.service';

@Component({
  selector: 'chef-state-dropdown',
  templateUrl: './state-dropdown.component.html'
})
export class StateDropdownComponent implements OnInit {

  states: State[];

  @Input() initValue: any;
  
  @Output() onReady = new EventEmitter();
  @Output() onChange = new EventEmitter();

  constructor(private masterService: MasterService) {
  }

  ngOnInit(): void {
    if (this.initValue) {
      this.getStates(this.initValue);
    }
  }

  getStates(countryId) {
    this.masterService.getAllStatesByCountry(countryId).subscribe(response => {
      this.states = response;
      if (this.states.length > 0) {
        let state = this.states[0] as State;
        this.onReady.emit(new DropdownValue(state.id.toString(), state.name));
      }
    });
  }

  onSelectChange($event) {
    let value = new DropdownValue($event.target.value, $event.target.options[$event.target.options.selectedIndex].text);
    this.onChange.emit(value);
  }
}
