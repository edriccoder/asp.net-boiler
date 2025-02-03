import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  ProductCategoryServiceProxy,
  CreateOrEditProductCategoryDto,
} from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'edit-product.component.html',
})
export class EditProductComponent extends AppComponentBase
  implements OnInit, OnDestroy {
  saving = false;
  id: number;
  product = new CreateOrEditProductCategoryDto();

  @Output() onSave = new EventEmitter<any>();

  private subscriptions: Subscription = new Subscription();

  constructor(
    injector: Injector,
    private _productService: ProductCategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    if (this.id) {
      this._productService.getAll().subscribe({
        next: (result) => {

          const productId = String(this.id);
  
          const product = result.find(p => String(p.id) === productId);
  
          if (product) {
            this.product = product;
          } else {
            this.notify.error(this.l('ProductNotFound'));
            this.bsModalRef.hide();
          }
        },
        error: () => {
          this.notify.error(this.l('FailedToLoadProduct'));
          this.bsModalRef.hide();
        },
      });
    }
  }
  

  save(): void {
    this.saving = true;

    this._productService.createOrEdit(this.product).subscribe({
      next: () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      error: () => {
        this.saving = false;
        this.notify.error(this.l('SaveFailed'));
      },
    });
  }
}
