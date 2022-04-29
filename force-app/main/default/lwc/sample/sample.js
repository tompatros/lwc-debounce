import { LightningElement, api } from 'lwc';
import getAccountById from '@salesforce/apex/SampleController.getAccountById';
import updateDescription from '@salesforce/apex/SampleController.updateDescription';
import Debounce from 'c/debounce';

export default class Sample extends LightningElement {

    @api recordId;
    account;
    description;
    debounce = new Debounce(2000);
    
    connectedCallback() {
        this.call_getAccountById();
    }

    call_getAccountById() {
        getAccountById({ accountId: this.recordId })
            .then((result) => {
                this.account = result;
                this.description = this.account.Description;
            })
            .catch((error) => {
                console.log(error);
            });
    }

    call_updateDescription() {
        console.log(this.description);
        updateDescription({ accountId: this.account.Id, description : this.description })
            .then((result) => {
                this.account = result;
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
        this.debounce.handle(this.call_updateDescription.bind(this));
    }

}