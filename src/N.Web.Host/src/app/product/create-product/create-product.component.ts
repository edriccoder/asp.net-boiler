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
  PermissionDto,
  CreateOrEditProductCategoryDto,
} from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'create-product.component.html',
})
export class CreateProductDialog extends AppComponentBase implements OnInit, OnDestroy {
  saving = false;
  productCategory = new CreateOrEditProductCategoryDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  private subscriptions: Subscription = new Subscription();

  constructor(
    injector: Injector,
    private _productService: ProductCategoryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._productService
      .getAll()
      .subscribe((result: CreateOrEditProductCategoryDto[]) => {
        this.permissions = result.map(item => ({
          name: item.name || '',
          displayName: item.name || '' 
        } as PermissionDto));
        this.setInitialPermissionsStatus();
      });
  }
  

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setInitialPermissionsStatus(): void {
    this.permissions.forEach((item) => {
      this.checkedPermissionsMap[item.name] = this.defaultPermissionCheckedStatus;
    });
  }

  onPermissionChange(permission: PermissionDto, $event: Event): void {
    const input = $event.target as HTMLInputElement;
    this.checkedPermissionsMap[permission.name] = input.checked;
  }

  getCheckedPermissions(): string[] {
    return Object.keys(this.checkedPermissionsMap).filter(
      (key) => this.checkedPermissionsMap[key]
    );
  }

  save(): void {
    this.saving = true;
  
    const productCategory = new CreateOrEditProductCategoryDto();
    productCategory.init(this.productCategory);
    productCategory.grantedPermissions = this.getCheckedPermissions();
  
    this._productService.createOrEdit(productCategory).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
  
}
