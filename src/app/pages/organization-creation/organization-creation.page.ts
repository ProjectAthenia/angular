import {Component, OnInit,} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BasePage} from '../base.page';
import {User} from '../../models/user/user';
import {RequestsService} from '../../services/requests/requests.service';
import {UserService} from '../../services/data-services/user.service';
import {OrganizationService} from '../../services/data-services/organization.service';
import {Router} from '@angular/router';
import Role from '../../models/user/role';
import {OrganizationManager} from '../../models/organization/organization-manager';

@Component({
    selector: 'app-organization-creation',
    templateUrl: './organization-creation.page.html',
    styleUrls: ['./organization-creation.page.scss']
})
export class OrganizationCreationPage extends BasePage implements OnInit
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
     * The logged in user
     */
    me: User;

    /**
     * Default Constructor
     * @param formBuilder
     * @param requestsProvider
     * @param organizationService
     * @param userService
     * @param router
     */
    constructor(private formBuilder: FormBuilder,
                private requestsProvider: RequestsService,
                private organizationService: OrganizationService,
                private userService: UserService,
                private router: Router)
    {
        super();
    }

    /**
     * setups the initial location
     */
    ngOnInit(): void {

        this.form = this.formBuilder.group({

            name: ['', Validators.compose([
                Validators.maxLength(120),
                Validators.required,
            ])],
        });
        this.userService.getMe().then(me => {
            this.me = me;
        });
    }

    /**
     * Runs the submission to the server
     */
    submit () {
        this.submitted = true;

        if (this.form.valid) {

            const name = this.form.controls['name'].value;

            this.requestsProvider.organization.createOrganization(name).then(organization => {
                const organizationManager = new OrganizationManager({role_id: Role.ADMINISTRATOR});
                organizationManager.organization = organization;
                organization.organization_managers.push(organizationManager);
                this.organizationService.cacheOrganization(organization);
                this.me.organization_managers.push(organizationManager);
                this.userService.storeMe(this.me);
                this.router.navigateByUrl('/organization-dashboard/' + organization.id).catch(console.error);
            });
        }
    }
}
