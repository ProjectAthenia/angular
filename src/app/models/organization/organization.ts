import {BaseModel} from '../base-model';
import {OrganizationManager} from './organization-manager';
import {Relation} from '../relation';
import Entity from '../entity';

/**
 * Used as a data wrapper for our organization model
 */
export class Organization extends Entity {

    /**
     * The name of the organization
     */
    name: string;

    /**
     * All organization managers on this organization
     */
    organization_managers: OrganizationManager[];

    /**
     * Default Constructor
     * @param data
     */
    constructor(data) {
        super(data, {
            organization_managers: new Relation('array', OrganizationManager),
        });
    }

    /**
     * The base route for all entity routes
     */
    baseRoute(): string {
        return 'organizations';
    }
}
