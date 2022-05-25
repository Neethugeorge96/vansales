import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { ToasterServiceService } from 'src/app/core/services/toaster-service.service';
import { SyncfusionHelperService } from 'src/app/shared/services/syncfusion-helper.service';
import { StockToVanViewModel } from '../stocktovan.model';
import { StocktovanService } from '../stocktovan.service';

@Component({
  selector: 'app-remarks-from-excel',
  templateUrl: './remarks-from-excel.component.html'

})
export class RemarksFromExcelComponent implements OnInit {
  @ViewChild("grid", { static: true }) grid: GridComponent;

  remarksList: StockToVanViewModel[];
  saveBtnDisabled: boolean;
  cancelBtnDisabled: boolean;

  constructor(
    private stockToVanService: StocktovanService,
    public syncfusionHelperService: SyncfusionHelperService,
    public activatedRoute: ActivatedRoute,
    private toastr: ToasterServiceService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.getExcelRemarks();
  }

  getExcelRemarks() {
    this.remarksList = this.stockToVanService.getRemarks();
    let checkRemarks = this.remarksList
    console.log("exceldata",checkRemarks);

    let checkVal = false;


    for (let i in checkRemarks) {
      if (checkRemarks[i].systemRemarks != 'Verified Successfully') {

        checkVal = true;
        break;
      }
    }
    if (checkVal == true) {
      this.saveBtnDisabled = true;
    }
    else {
      this.cancelBtnDisabled = true;
    }
  }

  Save() {
    this.stockToVanService.add(this.remarksList).subscribe(res => {
      if (res) {


        this.toastr.showSuccessMessage("Data saved succesfully");
        this.router.navigate(['/stock-to-van/add']);

      }
    },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("unable to send data");
      });

  }

  Clear() {
    this.router.navigate(['/stock-to-van/add']);
  }

}
