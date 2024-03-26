import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IProduct } from '../../../types/product';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-modal-update-price',
  templateUrl: './modal-update-price.component.html',
  styleUrl: './modal-update-price.component.css'
})

export class ModalUpdatePriceComponent {
  constructor
    (private fb: NonNullableFormBuilder,
      private producService: ProductService,
      private notification: NzNotificationService,
    ) { }

  ngOnInit() {
  }

  @Input() isVisible: boolean = false;
  @Output() isVisibleChange: EventEmitter<void> = new EventEmitter<void>();
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  handleCloseModal() {
    this.closeModal.emit();
  }

  handleSetIsVisisble() {
    this.isVisibleChange.emit();
    this.validateForm.setValue({ priceFloor: this.productItem.floorPrice })
  }

  @Input() productItem: IProduct = {
    id: 0,
    nameProduct: "",
    quantityProduct: 0,
    expiredDate: "",
    provider: "",
    unit: "",
    origin: "",
    avatar: "",
    codeProduct: "",
    description: "",
    providePrice: 0,
    floorPrice: 1,
    phoneProvider: "",
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productItem'] && !changes['productItem'].firstChange) {
      console.log('productItem changed:', changes['productItem'].currentValue);
      this.validateForm.setValue({
        priceFloor: this.productItem.floorPrice
      })
    }
  }

  validateForm: FormGroup<{ priceFloor: FormControl<number> }> = this.fb.group({
    priceFloor: [this.productItem.floorPrice, [Validators.required]],
  })

  handleUpdatePrice() {
    if (this.validateForm.value.priceFloor !== undefined)
      if (this.validateForm.value.priceFloor == this.productItem.floorPrice) {
        this.handleSetIsVisisble();
      } else {
        console.log(this.validateForm.value.priceFloor, "TYPE");
        this.producService.updateProductWareHouse(this.productItem, this.validateForm.value.priceFloor).subscribe({
          next: (v) => {
            if (v.status == false) {
              this.notification.create("error", `${v.message}`, "");
            } else {
              this.notification.create("success", `${v.message}`, "");
              this.handleCloseModal();
            }
          },
          error: (error) => {
            console.log(error.error.messageError)
            error.error.messageError.map((e: string) => {
              this.notification.create("error", `${e}`, "");
            })
          }
        })
      }
  }

  // formatPrice(event: any) {
  //   let value: string | null = event.target.value;
  //   value = value || '0';
  //   value = value.replace(/\D/g, '');
  //   if (!isNaN(Number(value))) {
  //     event.target.value = Number(value).toLocaleString('vnd');
  //   }
  // }

  formatPrice(event: any) {
    let value: string | null = event.target.value;
    value = value || '0';
    value = value.replace(/\D/g, '');
    if (!isNaN(Number(value))) {
      const formattedValue = Number(value).toLocaleString('en-US', {maximumFractionDigits: 0});
      event.target.value = value.endsWith('.') ? value : formattedValue;
    }
  }
}
