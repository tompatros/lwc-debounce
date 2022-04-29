import { LightningElement, api } from 'lwc';
import getAccountById from '@salesforce/apex/SampleController.getAccountById';
import updateName from '@salesforce/apex/SampleController.updateName';
import updateDescription from '@salesforce/apex/SampleController.updateDescription';
import Debounce from 'c/debounce';

export default class Sample extends LightningElement {

    @api recordId;
    account;
    description;
    name;
    debounce = new Debounce(2000);
    
    connectedCallback() {
        this.call_getAccountById();
    }

    call_getAccountById() {
        getAccountById({ accountId: this.recordId })
            .then((result) => {
                this.account = result;
                this.name = this.account.Name;
                this.description = this.account.Description;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    call_updateName() {
        console.log(this.name);
        updateName({ accountId: this.account.Id, name : this.name })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    call_updateDescription() {
        console.log(this.description);
        updateDescription({ accountId: this.account.Id, description : this.description })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleDescriptionChangeWithoutDebounce(event) {
        this.description = event.target.value;
        this.call_updateDescription();
    }

    handleDescriptionChangeWithDebounce(event) {
        this.description = event.target.value;
        this.debounce.register('debounceDescription', this.call_updateDescription.bind(this), 3000);
    }

    handleNameChange(event) {
        this.name = event.target.value;
        this.debounce.register('debounceName', this.call_updateName.bind(this), 3000);
    }

}