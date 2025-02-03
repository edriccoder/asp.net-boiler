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
  CreateOrEditPersonDto,
} from '@shared/service-proxies/service-proxies';
import { Subscription } from 'rxjs';
import { AbstractControl } from '@node_modules/@angular/forms';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent extends AppComponentBase 
  implements OnInit, OnDestroy {
  saving = false;
  id: number;
  person = new CreateOrEditPersonDto();

  @Output() onSave = new EventEmitter<any>();

  private subscriptions: Subscription = new Subscription();
  formBuilder: any;

  constructor(
    injector: Injector,
    private _personService: PersonServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    if (this.id) {
      this._personService.getAll().subscribe({
        next: (result) => {

          const personId = String(this.id);
  
          const person = result.find(p => String(p.id) === personId);
  
          if (person) {
            this.person = person;
          } else {
            this.notify.error(this.l('PersonNotFound'));
            this.bsModalRef.hide();
          }
        },
        error: () => {
          this.notify.error(this.l('FailedToLoadPerson'));
          this.bsModalRef.hide();
        }
      });
    }
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
  

  save(): void {
    this.saving = true;
    this._personService.createOrEdit(this.person).subscribe({
      next: () => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      error: () => {
        this.notify.error(this.l('FailedToSavePerson'));
        this.saving = false;
      }
    });
  }
}
