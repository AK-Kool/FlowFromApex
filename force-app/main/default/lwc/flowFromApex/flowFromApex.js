import { LightningElement, track } from 'lwc';
import start from '@salesforce/apex/FlowControllerLwc.start';

export default class FlowFromApex extends LightningElement 
{   
    @track firstName = '';
    @track lastName = '';
    @track email = '';

    _isAllInputsValid = true;
    get checkDisabledStatus()
    {
        if(!this._isAllInputsValid && this.firstName !== '' && 
                        this.lastName !== '' && this.email !== '')
        {
            return false;
        }
        return true;
    }

    handleChange(e)
    {
        if(e.target.name === 'firstName')
            this.firstName = e.detail.value.trim();
        else if(e.target.name === 'lastName')
            this.lastName = e.detail.value.trim();    
        else
            this.email = e.detail.value.trim();

        this._isAllInputsValid = ![...this.template.querySelectorAll('lightning-input')]
                                 .reduce((validSoFar , inputField) => {
                                        inputField.reportValidity();
                                        return validSoFar && inputField.checkValidity();
                                    }, true) ? true : false;
    }
    handleClick()
    {
        const data = 
            {
                firstName : this.firstName ,
                lastName : this.lastName ,
                email : this.email
            };
        
        start({
            jsonData : JSON.stringify(data)
        }).then(() => {
            alert('SUCCESS!!');
            this.template.querySelectorAll('lightning-input')[0].value = '';
            this.template.querySelectorAll('lightning-input')[1].value = '';
            this.template.querySelectorAll('lightning-input')[2].value = '';
        }).catch(err => {
            alert('Error!!' + JSON.stringify(err));
        });
    }
}