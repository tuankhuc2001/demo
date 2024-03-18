import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { CartService } from '../../../services/cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ICustomer } from '../../../types/customer';

@Component({
  selector: 'app-modal-customer',
  templateUrl: './modal-customer.component.html',
  styleUrl: './modal-customer.component.css'
})
export class ModalCustomerComponent {

  @Input() isVisibleModalAddCustomer: boolean = false;
  @Input() isVisibleCustomer: boolean = false;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  listCustomer: ICustomer[] = [];

  constructor(
    private customerService: CustomerService,
    private cartService: CartService,
    private notification: NzNotificationService,
  ) { }

  private destroyed$ = new Subject();
  textSearch: string = "";
  isVisibleAddCustomer: boolean = false;
  idCart: number = 0;

  createNotification(type: string, content: string): void {
    this.notification.create(
      type,
      `${content}`,
      ''
    );
  }

  handleSearch(value: string) {
    this.customerService.getCustomer(value).subscribe({
      next: (res) => {
        this.listCustomer = res.content.list
        console.log(res)
      },
      error: (error) => {
        this.createNotification('error', error)
      }
    })
  }

  ngOnInit(): void {
    this.customerService.getSearchInput().pipe(takeUntil(this.destroyed$), debounceTime(1000)).subscribe({
      next: value => {
        this.handleSearch(value)
      }
    })
  }

  getCustomer(): void {
    this.customerService
      .getSearchInput()
      .pipe(takeUntil(this.destroyed$), debounceTime(1000))
      .subscribe({
        next: (value) => {
          this.textSearch = value
          this.handleSearch(value);
        },
      });
  }

  handleUpdateCartCustomer(customer: ICustomer) {
    this.cartService.updateCart(this.idCart,customer).subscribe(() => {

    });
  }

  displayNone: {} = {
    display: 'none',
  }

  displayBlock: {} = {
    display: 'block'
  }

  heightModalData: {} = {
    height: '50vh'
  }

  heightModalNoData: {} = {
    height: '20vh'
  }

  customerItem: ICustomer = {
    id: 0,
    nameCustomer: "",
    phoneCustomer: "",
    address: "",
  }

  handleOpenAddCustomer() {
    this.isVisibleAddCustomer = true;
  }

  handleCloseModalAddCustomer() {
    this.isVisibleAddCustomer = false;
    this.handleGetCustomer();
  }

  handleGetCustomer() {
    this.customerService.getCustomer(this.textSearch).subscribe(
      {
        next: (v) => {
          if (v.status == false) {
            this.notification.create('error', `${v.message}`, '')
          } else {
            this.listCustomer = v.content.list
          }
        }
      }
    )
  }

  handleOpenModalCustomer() {
    this.closeModal.emit();
  }
}


