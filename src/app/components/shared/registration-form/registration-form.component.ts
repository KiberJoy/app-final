import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { PositionModel } from 'src/app/models/position.model';
import { PositionService } from 'src/app/services/position.service';
import { UserCardService } from 'src/app/services/user-card.service';
import { AbstractComponent } from '../../abstract/abstract.component';
import { imageSizeValidation } from '../../../validators/validate-image-size';
import { imageResolutionValidation } from 'src/app/validators/validate-image-resolution';
import { imageTypeValidation } from 'src/app/validators/validate-image-type';



@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
})
export class RegistrationFormComponent extends AbstractComponent implements OnInit {
  public _positions: PositionModel[] = [];
  public _imageUrl: any = '';
  public _firstNameLength: number = 0;
  public _emailLength: number = 0;
  public _phoneNumberLength: number = 0;
  public _isModalVisible = false;
  public _errors = {
    firstName: '',
    email: '',
    phoneNumber: '',
    photo: ''
  }

  constructor(
    private radioButtonService: PositionService,
    private formBuilder: FormBuilder,
    private userService: UserCardService,
    ) {
    super();
  }

  registrationForm: FormGroup = this.formBuilder.group({
    photo: [null,
      [
        Validators.required,
        imageSizeValidation,
        imageResolutionValidation,
        imageTypeValidation
      ],
    ],
    firstName: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60),
      ],
    ],
    email: ['',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern("(?:[a-z0-9!#$%\\&amp;'*+/=?\\^_`{|}~-]+(?:\\.[a-z0-9!#$%\\&amp;'*+/=?\\^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])")
      ]
    ],
    phoneNumber: ['',
      [
        Validators.required,
        Validators.pattern('^[\+]{0,1}380([0-9]{9})$')
      ]
    ],
    position: ['', [Validators.required]]
  })

  get myForm() {
    return this.registrationForm.controls;
  }

  public getFormControlByName(name: string) {
    return this.registrationForm.get(name);
  }

  get positionControl(): FormControl {
    return this.registrationForm.get('position') as FormControl;
  }

  ngOnInit(): void {
    this.radioButtonService.getPositions()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((response) => {
        this._positions = response.positions;
        this.positionControl?.setValue(response.positions[0]);
      })

    this.registrationForm.get('firstName')?.valueChanges.subscribe((value: string) => {
      this._firstNameLength = value?.length ?? 0;

      if(this.myForm.firstName.errors?.required) {
        this._errors.firstName = 'The name field is required';
      } else if(this.myForm.firstName.errors?.minlength) {
        this._errors.firstName = 'The name must be at least 2 characters.';
      } else if(this.myForm.firstName.errors?.maxlength) {
        this._errors.firstName = 'The name must be less than 60 characters.';
      }
    })

    this.registrationForm.get('email')?.valueChanges.subscribe((value: string) => {
      this._emailLength = value?.length ?? 0;

      if( this.myForm.email.errors?.required) {
        this._errors.email = 'The email field is required';
      } else if(this.myForm.email.errors?.minlength) {
        this._errors.email = 'The email must be at least 2 characters.';
      } else if(this.myForm.email.errors?.maxlength) {
        this._errors.email = 'The email must be less than 100 characters.';
      } else if(this.myForm.email.errors?.pattern) {
        this._errors.email = 'The email must be a valid email address.';
      }
    })

    this.registrationForm.get('phoneNumber')?.valueChanges.subscribe((value: string) => {
      this._phoneNumberLength = value?.length ?? 0;

      if( this.myForm.phoneNumber.errors?.required) {
        this._errors.phoneNumber = 'The phone field is required';
      } else if(this.myForm.phoneNumber.errors?.pattern) {
        this._errors.phoneNumber = 'Number should start with code of Ukraine +380';
      }
    })

    this.registrationForm.get('photo')?.valueChanges.subscribe(() => {
      if( this.myForm.photo.errors?.required) {
        this._errors.photo = 'Download your photo.';
      } else if(this.myForm.photo.errors?.incorrectSize) {
        this._errors.photo = 'Image should be less than 5mb.';
      } else if(this.myForm.photo.errors?.incorrectResolution) {
        this._errors.photo = 'Min resulotion 70px x 70px.';
      } else if(this.myForm.photo.errors?.incorrectType) {
        this._errors.photo = 'Allowed types jpeg/jpg only.';
      }
    })
  }

  public uploadFile(event: any) {
    let reader = new FileReader();
    let file = event.target.files[0];
    let fileChosen = document.getElementById('file-chosen');

    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this._imageUrl = reader.result;
        fileChosen!.textContent = event.target.files[0].name;
        this.registrationForm.patchValue({
          photo: file
        });
      }
    }
  }

  public showModal() {
    this._isModalVisible = true;
    if (this._isModalVisible == true) {
      document.querySelector('body')?.classList.add('app-lock');
    }
  }

  public hideModal() {
    this._isModalVisible = false;
    if (this._isModalVisible == false) {
      document.querySelector('body')?.classList.remove('app-lock');
    }
  }

  public onSubmit() {
    if (this.registrationForm.valid) {
      this.userService.createUser(this.registrationForm.value)
      .pipe(
        takeUntil(this.unsubscribe$),
        take(1)
      )
      .subscribe(() => {
        this.userService.resetUsers();
        this.registrationForm.reset();
        let fileChosen = document.getElementById('file-chosen');
        fileChosen!.textContent = 'Upload your photo';
        this.positionControl?.setValue(this._positions[0]);
        this.showModal();
      });
    }
  }
}
