import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/paged-listing-component-base';
import {
  PersonServiceProxy,
  CreateOrEditPersonDto,
} from '@shared/service-proxies/service-proxies';
import { CreatePersonComponent } from './create-person/create-person.component';
import { EditPersonComponent } from './edit-person/edit-person.component';

class PagedPersonRequestDto extends PagedRequestDto {
  keyword: string = '';
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
  animations: [appModuleAnimation()],
})
export class PersonComponent extends PagedListingComponentBase<CreateOrEditPersonDto> {
  person: CreateOrEditPersonDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedPersonRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._personService
      .getAll()
      .pipe(finalize(() => finishedCallback()))
      .subscribe({
        next: (result: CreateOrEditPersonDto[]) => {
          this.person = result;
          this.showPaging({ totalCount: result.length, items: result }, pageNumber);
        },
        error: (err) => abp.notify.error('Failed to load person'),
      });
  }

  delete(person: CreateOrEditPersonDto): void {
    abp.message.confirm(
      this.l('PersonDeleteWarningMessage', person.name),
      undefined,
      (isConfirmed: boolean) => {
        if (isConfirmed) {
          this._personService
            .delete(person.id)
            .pipe(
              finalize(() => {
                abp.notify.info(this.l('SuccessfullyDeleted'));
                this.refresh();
              })
            )
            .subscribe(() => {});
        }
      }
    );
  }

  createOrEdit(person?: CreateOrEditPersonDto): void {
    this.showCreateOrEditPersonDialog(person);
  }

  private showCreateOrEditPersonDialog(person?: CreateOrEditPersonDto): void {
    let createOrEditPersonDialog: BsModalRef;
    if (!person) {
      createOrEditPersonDialog = this._modalService.show(CreatePersonComponent, {
        class: 'modal-lg',
      });
    } else {
      createOrEditPersonDialog = this._modalService.show(EditPersonComponent, {
        class: 'modal-lg',
        initialState: {
          id: person.id,
        },
      });
    }

    createOrEditPersonDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}
