import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren
} from '@angular/core';
import {Organization} from '../../models/organization/organization';
import {OrganizationManager} from '../../models/organization/organization-manager';
import Role from '../../models/user/role';
import {User} from '../../models/user/user';
import {RequestsService} from '../../services/requests/requests.service';
import {UserService} from '../../services/data-services/user.service';
import {ToastrService} from 'ngx-toastr';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-organization-users-management-component',
    templateUrl: './organization-users-management.component.html',
    styleUrls: ['./organization-users-management.component.scss']
})
export class OrganizationUsersManagementComponent implements OnChanges, OnInit
{
    /**
     * The organization we are managing
     */
    @Input()
    organization: Organization;

    /**
     * Whether or not the managers load has been kicked off
     */
    managersLoaded = false;

    /**
     * The organization managers for this organization
     */
    organizationManagers: OrganizationManager[] = [];

    /**
     * All available roles
     */
    organizationRoles = [
        {
            value: Role.MANAGER,
            label: 'Manager'
        },
        {
            value: Role.ADMINISTRATOR,
            label: 'Administrator'
        },
    ]

    /**
     * The organization manager that is being edited if there is one
     */
    editingOrganizationManager: OrganizationManager = null;

    /**
     * The logged in user
     */
    me: User;

    /**
     * the organization manager that we are currently deleting if we are deleting one
     */
    deletingOrganizationManager: OrganizationManager = null;

    /**
     * The existing user modal for when the information entered already exists
     */
    @ViewChild('deleteConfirmation')
    deleteConfirmation;

    /**
     * The editing form modal
     */
    @ViewChild('editingModal')
    editingModal;

    /**
     * Default Constructor
     * @param requests
     * @param modalService
     * @param userService
     * @param toastrService
     */
    constructor(private requests: RequestsService,
                private modalService: NgbModal,
                private userService: UserService,
                private toastrService: ToastrService)
    {}

    /**
     * Loads the logged in user
     */
    ngOnInit(): void
    {
        this.userService.getMe().then(me => {
            this.me = me;
        });
    }

    /**
     * loads the managers when we are all set
     * @param changes
     */
    ngOnChanges(changes: SimpleChanges): void
    {
        if (!this.managersLoaded && this.organization) {
            this.managersLoaded = true;
            this.loadManagerPage(1);
        }
    }

    /**
     * Loads a page of managers off of the server
     * @param pageNumber
     */
    loadManagerPage(pageNumber)
    {
        this.requests.organization.loadOrganizationManagers(this.organization, pageNumber).then(page => {
            this.organizationManagers = this.organizationManagers.concat(page.data);
            if (page.last_page > pageNumber) {
                this.loadManagerPage(pageNumber + 1);
            }
        });
    }

    /**
     * Tells us whether or not the user related to the organization manager is the logged in user
     * @param organizationManager
     */
    notMe(organizationManager: OrganizationManager): boolean
    {
        return this.me && organizationManager.user_id !== this.me.id;
    }

    /**
     * Makes sure the user wants to delete the organization manager
     * @param organizationManager
     */
    promptDeletion(organizationManager: OrganizationManager)
    {
        this.modalService.open(this.deleteConfirmation);
    }

    /**
     * Confirms the deletion for us
     */
    confirmDeletion()
    {
        this.requests.organization.deleteOrganizationManager(this.deletingOrganizationManager).then(() => {
            this.organizationManagers =
                this.organizationManagers.filter(i => i.id != this.deletingOrganizationManager.id);
        });
    }

    /**
     * Opens the add member prompt
     */
    showManagerDialogue(organizationManager: OrganizationManager = null)
    {
        this.editingOrganizationManager = organizationManager;
        this.modalService.open(this.editingModal);
    }

    /**
     * Saves the organization manager
     * @param email
     */
    saveOrganizationManager(email: string)
    {
        const roleRadio: HTMLInputElement[] = Array.from(document.querySelectorAll('input[name="role"]'));
        const roleId = roleRadio.find(i => i.checked).value;
        if (roleId) {
            if (this.editingOrganizationManager) {
                this.requests.organization.updateOrganizationManager(this.editingOrganizationManager, Number(roleId)).then(updated => {
                    updated.user = this.editingOrganizationManager.user;
                    this.organizationManagers = this.organizationManagers.map(i => {
                        return i.id == updated.id ? updated : i;
                    });
                    this.closeOrganizationManagerForm();
                });
            } else {
                this.requests.organization.createOrganizationManager(this.organization.id, email, Number(roleId)).then((organizationManager) => {
                    this.organizationManagers.push(organizationManager);
                });
                this.closeOrganizationManagerForm();
            }
        }
    }

    /**
     * Closes the organization manager form
     */
    closeOrganizationManagerForm()
    {
        this.editingOrganizationManager = null;
        this.modalService.dismissAll();
    }
}
