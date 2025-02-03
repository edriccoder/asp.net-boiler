import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { NgModel, ValidationErrors, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
  PersonServiceProxy,
  PermissionDto,
  CreateOrEditPersonDto,
} from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-person',
  templateUrl: './create-person.component.html',
  styleUrls: ['./create-person.component.css']
})
export class CreatePersonComponent extends AppComponentBase implements OnInit, OnDestroy {
  saving = false;
  person = new CreateOrEditPersonDto();
  permissions: PermissionDto[] = [];
  checkedPermissionsMap: { [key: string]: boolean } = {};
  defaultPermissionCheckedStatus = true;

  @Output() onSave = new EventEmitter<any>();

  private subscriptions: Subscription = new Subscription();

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._personService
      .getAll()
      .subscribe((result: CreateOrEditPersonDto[]) => {
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

  validateEmail(emailModel: NgModel): void {
    const email = emailModel.value;
    if (email && email.length > 0) {
      const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
      const valid = emailPattern.test(email);
      if (!valid) {
        emailModel.control.setErrors({ invalidEmail: true });
      } else {
        emailModel.control.setErrors(null);
      }
    }
  }

  setInitialPermissionsStatus(): void {
    this.permissions.forEach((item) => {
      this.checkedPermissionsMap[item.name] = this.defaultPermissionCheckedStatus;
    });
  }

  save(): void {
    this.saving = true;

    this._personService
      .createOrEdit(this.person)
      .subscribe(() => {
        this.saving = false;
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      });
  }

}
