import {
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {
  CommandClickEventArgs,
  CommandColumnService,
  CommandModel,
  EditService,
  EditSettingsModel,
  GridComponent,
  PageService,
  SaveEventArgs,
  ToolbarItems,
  ToolbarService,
} from "@syncfusion/ej2-angular-grids";
import { DialogUtility } from "@syncfusion/ej2-popups";
import { ToasterServiceService } from "src/app/core/services/toaster-service.service";
import { SaleType } from "src/app/models/common/types/sale-type.enum";
import {
  dropDownformatter,
  enumSelector,
} from "src/app/shared/utils/common.functions";
import { LocationService } from "../../location/location.service";
import { Customer, StatusTypes } from "../customer.model";
import { CustomerService } from "../customer.service";
import { MapsAPILoader } from "@agm/core";
import { Tooltip } from "@syncfusion/ej2-angular-popups";
import { SyncfusionHelperService } from "src/app/shared/services/syncfusion-helper.service";
import { CustomerStatus } from "../customer.model";
import { PriceService } from "../../price/price.service";
import { ItemGrouppingService } from "../../item-groupping/item-groupping.service";
import { HttpParams } from "@angular/common/http";
import { duplicateNameValidator } from "src/app/shared/utils/validators.functions";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  providers: [PageService, EditService, ToolbarService, CommandColumnService],
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  searchForm: FormGroup;
  showSalesTypeClearBtn: boolean = false;
  showCustomerClearBtn: boolean = false;

  customerList: Customer[];
  priceList: any[];
  itemGroupingList: any[];
  currencies: any[];
  cities: any[];
  locations: any[];
  latitude: any;
  longitude: any;
  geoLocationName: string;
  creditTermplaceholder: string = "";
  creditLimitplaceholder: string = "";
  customerStatuses = enumSelector(CustomerStatus);
  customerStatusesenum = CustomerStatus;

  @ViewChild("grid", { static: true }) grid: GridComponent;
  @ViewChild("search") searchElementRef: ElementRef;

  customerView: any;
  alreadyUsed: { codes: string[]; names: string[] } = {
    codes: [],
    names: [],
  };
  @ViewChild("content") modelPopup: any;
  submitClicked: boolean;
  public DialogObj;
  saleTypes = SaleType;
  saleTypesenum = enumSelector(SaleType);

  activeStatusEnum = enumSelector(StatusTypes);
  activeStatusEnumView = StatusTypes;
  constructor(
    private toastr: ToasterServiceService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private locationService: LocationService,
    private MapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public syncfusionHelperService: SyncfusionHelperService,
    public priceService: PriceService,
    public itemGroupingService: ItemGrouppingService
  ) {}

  get customerCode() {
    return this.customerForm.get("customerCode");
  }
  get code() {
    return this.customerForm.get("code");
  }
  get customerName() {
    return this.customerForm.get("customerName");
  }
  get companyName() {
    return this.customerForm.get("companyName");
  }
  get email() {
    return this.customerForm.get("email");
  }
  get address() {
    return this.customerForm.get("address");
  }
  get cityId() {
    return this.customerForm.get("cityId");
  }
  get zipCode() {
    return this.customerForm.get("zipCode");
  }
  get phoneNumber() {
    return this.customerForm.get("phoneNumber");
  }
  get mobileNumber() {
    return this.customerForm.get("mobileNumber");
  }
  get locationId() {
    return this.customerForm.get("locationId");
  }
  get geoLocation() {
    return this.customerForm.get("geoLocation");
  }
  get contactPerson() {
    return this.customerForm.get("contactPerson");
  }
  get contactPersonMobile() {
    return this.customerForm.get("contactPersonMobile");
  }
  get contactPersonEmail() {
    return this.customerForm.get("contactPersonEmail");
  }

  get saleTypeId() {
    if (this.customerForm.get("saleTypeId").value == 2) {
      this.creditTermplaceholder = "";
      this.creditLimitplaceholder = "";
      this.customerForm.get("creditTerm").patchValue("");
      this.customerForm.get("creditLimit").patchValue("");
      this.customerForm.get("creditTerm").disable();
      this.customerForm.get("creditLimit").disable();
      this.customerForm.get("creditTerm").clearValidators();
      this.customerForm.get("creditLimit").clearValidators();
    } else {
      this.customerForm.get("creditTerm").enable();
      this.customerForm.get("creditLimit").enable();
      this.creditTermplaceholder = "Credit Term";
      this.creditLimitplaceholder = "Credit Limit";
      if (this.customerForm.get("saleTypeId").value) {
        this.customerForm.get("creditTerm").setValidators(Validators.required);
        this.customerForm.get("creditLimit").setValidators(Validators.required);
      }
    }
    return this.customerForm.get("saleTypeId");
  }
  get creditTerm() {
    return this.customerForm.get("creditTerm");
  }
  get creditLimit() {
    return this.customerForm.get("creditLimit");
  }
  get balanceAmount() {
    return this.customerForm.get("balanceAmount");
  }
  get activeStatus() {
    return this.customerForm.get("activeStatus");
  }
  get currencyID() {
    return this.customerForm.get("currencyID");
  }
  get vatNumber() {
    return this.customerForm.get("vatNumber");
  }
  get customerStatus() {
    return this.customerForm.get("customerStatus");
  }
  get priceListCode() {
    return this.customerForm.get("priceListMasterId");
  }

  get saleType() {
    return this.searchForm.get("saleTypeId");
  }
  get customer() {
    return this.searchForm.get("customerStatus");
  }

  ngOnInit(): void {
    this.searchForm = this.createSearchForm();
    this.getCustomerList();
    this.getCurrencies();
    this.getCities();
    this.getPriceList();
    this.getItemGroupingList();
  }

  getCustomerList() {
    let params = new HttpParams();
    params = params.append(
      "saleTypeId",
      this.searchForm.controls["saleTypeId"].value
        ? this.searchForm.controls["saleTypeId"].value
        : 0
    );
    params = params.append(
      "customerStatus",
      this.searchForm.controls["customerStatus"].value
        ? this.searchForm.controls["customerStatus"].value
        : 0
    );

    this.customerService.getAll(params).subscribe(
      (result) => {
        this.customerList = result;
        this.alreadyUsed = {
          codes: result.map((data) => data["code"].toLowerCase()),
          names: result.map((data) => data["customerName"].toLowerCase()),
        };
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the customer list");
      }
    );
  }

  getCurrencies() {
    this.customerService.getCurrencies().subscribe(
      (result) => {
        this.currencies = result;
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch currencies");
      }
    );
  }

  getCities() {
    this.customerService.getCities().subscribe(
      (result) => {
        this.cities = result;
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch cities");
      }
    );
  }

  getLocations() {
    this.locations = [];
    this.customerService.getLocationsbycity(this.cityId.value).subscribe(
      (result) => {
        this.customerForm.controls["locationId"].enable();
        this.customerForm.patchValue({ locationId: this.locationId.value });
        this.locations = result;
      },
      (error) => {
        this.toastr.showErrorMessage("Unable to fetch locations");
      }
    );
  }

  getPriceList() {
    this.priceService.getAll().subscribe(
      (result) => {
        this.priceList = result.filter((x) => x.isActive == true);
        console.log(this.priceList);
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Price list");
      }
    );
  }

  getItemGroupingList() {
    this.itemGroupingService.getAll().subscribe(
      (result) => {
        this.itemGroupingList = dropDownformatter(result, "code", "name");
      },
      (error) => {
        console.error(error);
        this.toastr.showErrorMessage("Unable to fetch the Item Grouping list");
      }
    );
  }

  findAdress() {
    this.MapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement
      );
      if (this.latitude) {
        this.searchElementRef.nativeElement.value = this.geoLocationName;
        // let geocoder = new google.maps.Geocoder();
        // let latlng = new google.maps.LatLng(this.latitude, this.longitude);
        // geocoder.geocode({ location: latlng }, (results) => {
        //   this.searchElementRef.nativeElement.value =
        //     results[0].formatted_address;
        // });
      }
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // some details
          // this.AddaddressForm.patchValue({
          //   city: "",
          //   state: "",
          //   countryCode: "",
          //   zipCode: "",
          // });
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // place.address_components.map((item) => {
          //   if (item.types[0] == 'administrative_area_level_2')
          //     this.AddaddressForm.patchValue({ city: item.long_name });
          //   if (item.types[0] == 'administrative_area_level_1')
          //     this.AddaddressForm.patchValue({ state: item.long_name });
          //   if (item.types[0] == 'country')
          //     this.AddaddressForm.patchValue({ countryCode: item.long_name });
          //   if (item.types[0] == 'postal_code')
          //     this.AddaddressForm.patchValue({ zipCode: item.long_name });
          // });
          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.geoLocationName = this.searchElementRef.nativeElement.value;
        });
      });
    });
  }

  createFormGroup(customerData?: any): FormGroup {
    return this.formBuilder.group({
      id: [!customerData ? 0 : customerData.id],

      customerCode: [
        {
          value: customerData ? customerData.customerCode : "",
          disabled: true,
        },
        [],
      ],
      code: [
        customerData ? customerData.code : "",
        [
          Validators.required,
          Validators.pattern(/^\S*$/),
          duplicateNameValidator(
            this.alreadyUsed.codes.filter(
              (code) => code !== (customerData?.code || "").toLowerCase()
            )
          ),
        ],
      ],
      customerName: [
        customerData ? customerData.customerName : "",
        [
          Validators.required,
          Validators.maxLength(255),
          // Validators.pattern("^([A-Za-z0-9 ])*"),
        ],
      ],
      companyName: [
        customerData ? customerData.companyName : "",
        [
          Validators.required,
          Validators.pattern("^([A-Za-z0-9 ])*"),
          Validators.maxLength(255),
        ],
      ],
      email: [
        customerData ? customerData.email : "",
        [
          Validators.pattern(
            /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/
          ),
        ],
      ],
      address: [
        customerData ? customerData.address : "",
        Validators.maxLength(64),
      ],
      cityId: [customerData ? customerData.cityId : "", Validators.required],
      zipCode: [
        customerData ? customerData.zipCode : "",
        [Validators.max(9999999999), Validators.min(1)],
      ],
      phoneNumber: [customerData ? customerData.phoneNumber : ""],
      mobileNumber: [customerData ? customerData.mobileNumber : ""],
      locationId: [
        { value: customerData ? customerData.locationId : "", disabled: true },
        Validators.required,
      ],
      geoLocation: [customerData ? customerData.geoLocation : ""],
      contactPerson: [
        customerData ? customerData.contactPerson : "",
        Validators.maxLength(36),
      ],
      contactPersonMobile: [
        customerData ? customerData.contactPersonMobile : "",
      ],
      contactPersonEmail: [
        customerData ? customerData.contactPersonEmail : "",
        Validators.pattern(
          /^[\w%\+\-]+(\.[\w%\+\-]+)*@[\w%\+\-]+(\.[\w%\+\-]+)+$/
        ),
        // Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/),
      ],
      saleTypeId: [
        customerData ? customerData.saleTypeId : "",
        Validators.required,
      ],
      creditTerm: [
        customerData ? customerData.creditTerm : "",
        [Validators.max(999), Validators.min(1)],
      ],
      creditLimit: [
        customerData ? customerData.creditLimit : "",
        Validators.max(9999999999),
      ],
      balanceAmount: [
        {
          value: customerData ? customerData.balanceAmount : "",
          disabled: true,
        },
      ],
      activeStatus: [
        customerData ? customerData.activeStatus : "",
        Validators.required,
      ],
      currencyID: [
        customerData ? customerData.currencyID : "",
        Validators.required,
      ],
      vatNumber: [
        customerData ? customerData.vatNumber : "",
        [
          // Validators.required,
          Validators.maxLength(15),
          Validators.pattern(/0*[1-9a-zA-z][0-9a-zA-z]*(\.[0-9a-zA-z]+)?/),
        ],
      ],
      customerStatus: [
        customerData ? customerData.customerStatus : "",
        Validators.required,
      ],
      priceListMasterId: [
        customerData ? customerData.priceListMasterId : "",
        Validators.required,
      ],
      itemGroupingId: [customerData ? customerData.itemGroupingId : ""],
    });
  }

  createSearchForm() {
    return this.formBuilder.group({
      saleTypeId: [""],
      customerStatus: [""],
    });
  }

  searchData() {
    this.submitClicked = true;
    if (this.searchForm.valid) {
      this.getCustomerList();
    }
  }

  resetSearch() {
    this.searchForm.reset();
    // this.searchForm.controls.customerId.setValue(null)
    this.searchForm.markAsPristine();
    this.searchForm.markAsUntouched();

    this.customerList = [];
  }

  commandClick(args: CommandClickEventArgs): void {
    if (args.commandColumn.buttonOption.content === "View") {
      console.log("view", args.rowData);
      this.customerView = args.rowData;
      this.open(this.modelPopup);
    }
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title", size: "xl" })
      .result.then(
        () => {},
        () => {}
      );
  }

  actionComplete(args) {
    if (args.requestType === "beginEdit" || args.requestType === "add") {
      var cancelBtn =
        args.dialog.element.querySelector(".e-footer-content").children[1];
      if (cancelBtn) {
        cancelBtn.style.background = "grey";
        cancelBtn.style.color = "white";
      }
      args.dialog.headerEle.style.color = "#0366d6";
      args.dialog.width = "50%";
      const dialog = args.dialog;
      dialog.header =
        args.requestType === "beginEdit"
          ? "Edit Customer Details "
          : "Add Customer Details";
    }
  }

  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === "add") {
      this.submitClicked = false;
      this.latitude = 0;
      this.longitude = 0;
      this.geoLocationName = null;
      this.customerForm = this.createFormGroup();
      setTimeout(() => {
        this.findAdress();
      }, 500);
    }
    if (args.requestType === "beginEdit") {
      this.submitClicked = false;
      this.customerForm = this.createFormGroup();
      this.customerService.getById(args.rowData).subscribe((result: any) => {
        this.latitude = result.latitude;
        this.longitude = result.logitude;
        this.geoLocationName = result.geoLocation;
        this.customerForm = this.createFormGroup(result);
        this.findAdress();
      });
    }
    if (args.requestType === "save") {
      args.cancel = true;
      this.submitClicked = true;
      if (this.customerForm.valid) {
        const insertdata = this.customerForm.getRawValue();
        insertdata.isArchived = false;
        delete insertdata.geoLocation;
        insertdata.latitude = this.latitude;
        insertdata.logitude = this.longitude;
        insertdata.geoLocation = this.geoLocationName;
        if (!insertdata.id) {
          this.customerService.add(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage("Customer added successfully!");
                this.grid.closeEdit();
                this.getCustomerList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to add customer details");
            }
          );
        } else {
          this.customerService.update(insertdata).subscribe(
            (res) => {
              if (res) {
                this.toastr.showSuccessMessage(
                  "Customer updated successfully!"
                );
                this.grid.closeEdit();
                this.getCustomerList();
              }
            },
            (error) => {
              console.error("err", error);
              this.toastr.showErrorMessage("Unable to update customer details");
            }
          );
        }
      } else {
        args.cancel = true;
      }
    } else if (args.requestType === "delete") {
      args.cancel = true;
      this.onOpenDialogDelete(args.data);
    }
  }

  public onOpenDialogDelete = function (data: any): void {
    const [{ id, code, ...remainingData }, ...others] = data;
    this.DialogObj = DialogUtility.confirm({
      title: "Customer",
      content: `Are you sure you want to delete Customer <span style="color:red;font-weight:bold"> ${code} </span>?`,
      okButton: { text: "OK", click: this.okClickDelete.bind(this, id) },
      showCloseIcon: true,
      closeOnEscape: true,
      animationSettings: { effect: "Zoom" },
    });
  };

  okClickDelete(id): void {
    this.customerService.delete(id).subscribe(
      (res) => {
        if (res) {
          res == -129
            ? this.toastr.showWarningMessage("Customer already used!")
            : this.toastr.showSuccessMessage("Customer deleted successfully!");
          this.DialogObj.hide();
          this.getCustomerList();
        }
      },
      (error) => {
        console.error("err", error);
        this.toastr.showErrorMessage("Unable to delete the Customer Details");
        this.DialogObj.hide();
      }
    );
  }

  // headerCellInfo(args) {
  //   if (
  //     args.cell.column.field === "companyName" ||
  //     args.cell.column.field === "phoneNumber" ||
  //     args.cell.column.field === "mobileNumber" ||
  //     args.cell.column.field === "zipCode" ||
  //     args.cell.column.field === "creditTerm" ||
  //     args.cell.column.field === "creditLimit" ||
  //     args.cell.column.field === "balanceAmount" ||
  //     args.cell.column.headerText === "Sales Type"
  //   ) {
  //     const toolcontent = args.cell.column.headerText;
  //     const tooltip: Tooltip = new Tooltip({
  //       content: toolcontent,
  //     });
  //     tooltip.appendTo(args.node);
  //   }
  // }
}
