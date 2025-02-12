import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  ProductCategoryServiceProxy,
  CreateOrEditProductCategoryDto,
  CartServiceProxy,
  AddToCartDto,
} from '@shared/service-proxies/service-proxies';
import { CreateProductDialog } from './create-product/create-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { error } from 'console';

class PagedProductRequestDto extends PagedRequestDto {
  keyword: string = '';
}

@Component({
  templateUrl: './product.component.html',
  animations: [appModuleAnimation()],
})
export class ProductComponent extends PagedListingComponentBase<CreateOrEditProductCategoryDto> {
  productCategories: CreateOrEditProductCategoryDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _productService: ProductCategoryServiceProxy,
    private _modalService: BsModalService,
    private _cartService: CartServiceProxy
  ) {
    super(injector);
  }

  list(
    request: PagedProductRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._productService
      .getAll()
      .pipe(finalize(() => finishedCallback()))
      .subscribe({
        next: (result: CreateOrEditProductCategoryDto[]) => {
          this.productCategories = result;
          this.showPaging({ totalCount: result.length, items: result }, pageNumber);
        },
        error: (err) => abp.notify.error('Failed to load product categories'),
      });
  }

  addToCart(product: CreateOrEditProductCategoryDto): void {
    let addToCartDto = new AddToCartDto();
    addToCartDto.productCategoryId = product.id

    this._cartService.addToCart(addToCartDto).subscribe({
      next: result => {
        abp.notify.success("Product added to cart successfully!");
      },
      error: (error) => {
        abp.notify.error("Failed to add product to cart.");
      }

    });
  }

  delete(productCategory: CreateOrEditProductCategoryDto): void {
    abp.message.confirm(
      this.l('ProductDeleteWarningMessage', productCategory.name),
      undefined,
      (isConfirmed: boolean) => {
        if (isConfirmed) {
          this._productService
            .delete(productCategory.id)
            .pipe(finalize(() => abp.notify.success(this.l('SuccessfullyDeleted'))))
            .subscribe({
              next: () => this.refresh(),
              error: (err) => abp.notify.error('Failed to delete product category'),
            });
        }
      }
    );
  }

  createOrEdit(productCategory?: CreateOrEditProductCategoryDto): void {
    this.showCreateOrEditProductCategoryDialog(productCategory);
  }

  private showCreateOrEditProductCategoryDialog(
    productCategory?: CreateOrEditProductCategoryDto
  ): void {
    const initialState = productCategory ? { id: productCategory.id } : undefined;
    const modalComponent = productCategory
      ? EditProductComponent
      : CreateProductDialog;

    const createOrEditDialog: BsModalRef = this._modalService.show(modalComponent as any, {
      class: 'modal-lg',
      initialState,
    });

    createOrEditDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
