import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {regexValidators} from '../../validators/validators';
import {User} from "../../models/user/user";
import {AppComponent} from '../../app.component';
import {BasePage} from '../base.page';
import {StorageService} from '../../services/storage/storage.service';
import {RequestsService} from '../../services/requests/requests.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../services/data-services/user.service';
import {Router} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.page.html',
    styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage extends BasePage implements OnInit
{
    /**
     * The form object that helps us validate the sign in form
     */
    form: FormGroup;

    /**
     * Boolean switch for whether or not the form has been submitted
     */
    submitted = false;

    /**
     * The existing user modal for when the information entered already exists
     */
    @ViewChild('existingUserModal', {static: false})
    existingUserModal;

    /**
     * Default Constructor
     * @param formBuilder
     * @param storageService
     * @param requestsService
     * @param toastrService
     * @param userService
     * @param router
     * @param modalService
     */
    constructor(private formBuilder: FormBuilder,
                private storageService: StorageService,
                private requestsService: RequestsService,
                private toastrService: ToastrService,
                private userService: UserService,
                private router: Router,
                private modalService: NgbModal)
    {
        super();
    }

    /**
     * Takes care of setting up our form properly
     */
    ngOnInit()
    {
        this.form = this.formBuilder.group({

            name: ['', Validators.compose([
                Validators.maxLength(120),
                Validators.required,
            ])],
            email: ['', Validators.compose([
                Validators.pattern(regexValidators.email),
                Validators.maxLength(120),
                Validators.required,
            ])],
            password: ['',  Validators.compose([
                Validators.minLength(6),
                Validators.maxLength(256),
                Validators.required,
            ])],
        });
    }

    /**
     * Runs the submission to the server
     */
    submit ()
    {
        this.submitted = true;

        if (this.form.valid) {

            const data = {
                name: this.form.controls['name'].value,
                email: this.form.controls['email'].value,
                password: this.form.controls['password'].value,
            };
            this.requestsService.auth.signUp(data, this.handleExistingUser.bind(this))
                .then(this.handleLoginCompletion.bind(this));
        }
    }

    /**
     * Handles the login completion properly
     * @param response
     */
    handleLoginCompletion(response)
    {
        const authToken = response.token;

        this.storageService.saveAuthToken(authToken);

        this.requestsService.auth.loadInitialInformation()
            .then(this.saveUserData.bind(this));
    }

    /**
     * Handles displaying the incorrect credentials toast to the user
     * @param error
     */
    handleExistingUser(error)
    {
        this.modalService.open(this.existingUserModal);
    }

    /**
     * Takes the user to the login page
     */
    goToSignIn()
    {
        this.router.navigateByUrl('/sign-in').catch(console.error);
    }

    /**
     * Saves user information
     *
     * @param user
     */
    saveUserData(user: User)
    {
        this.userService.storeMe(user);
        this.storageService.saveLoggedInUserId(user.id);
        AppComponent.LOGGED_IN = true;
        this.router.navigateByUrl('/home').catch(console.error);
    }
}
