class PincodeValidator extends HTMLElement {
    constructor() {
        super();
        this.input = this.querySelector('#pincode-input');
        this.button = this.querySelector('button');
        this.button.addEventListener('click', this.validatePin.bind(this))
        // this.
    }
    async validatePin() {
        // Get the pin code input value
        // const shadow = document.querySelector('pincode-validator').shadowRoot;
        const pincodeInput = document.getElementById('pincode-input');
        const pincodeValue = pincodeInput.value.trim();

        // Get the result and error elements inside the shadow DOM
        const resultElement = document.getElementById('result');
        const errorElement = document.getElementById('error');

        let updatedDate;
        // Validate the pin code
        if (pincodeValue.length === 6) {
            // If valid, display success message
            console.log(!isNaN(pincodeValue));
            if (!isNaN(pincodeValue)){
                let obj;
                let p="we are not serving in this area"
                let today = new Date()
                let data=await fetch('./data.json')
                let resolved = await data.json()
                obj = resolved.deliveryLocations
                console.log(obj);
                obj.map(each=>{
                    if (each.pincode === pincodeValue){
                        p=pincodeValue
                        let delay = each.estimatedDeliveryDays + 1
                        today.setDate(today.getDate()+delay)
                        updatedDate = `your order will be delivered on
                        ${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
                        // console.log(updatedDate)
                    }
                    if (p=="we are not serving in this area"){
                        updatedDate="Currently we are not serving in this area"
                    }
                })
            }else{
                updatedDate = 'Pin Code must have digits only.';
            }
            resultElement.textContent = updatedDate;
            errorElement.textContent = '';
        } else {
            // If not valid, display error message
            errorElement.textContent = 'Pin Code must have only 6 digit number.';
            resultElement.textContent = '';
        }
    }
}

// Define the custom element 'custom-element' using the custom element class
customElements.define('pincode-validator', PincodeValidator);

/*
function validatePin() {

    // Get the pin code input value
    const shadow = document.querySelector('pincode-validator').shadowRoot;
    const pincodeInput = shadow.getElementById('pincode-input');
    const pincodeValue = pincodeInput.value.trim();

    // Get the result and error elements inside the shadow DOM
    const resultElement = shadow.getElementById('result');
    const errorElement = shadow.getElementById('error');

    // Validate the pin code
    if (pincodeValue.length === 6) {
        // If valid, display success message
        if (!isNaN(pincodeValue)){
            let obj;
            let p="we are serving in this area"
            let data=fetch('./data.json')
            let today = newDate()
            .then(res=>{
                if (res.ok){
                    return res.json()
                }
            })
            .then(resData=>
                {obj=resData.deliveryLocations
                 console.log(obj);
                })
            obj.map(each=>{
                if (each.pincode === pincodeValue){
                    p=pincodeValue
                    let delay = each.estimatedDeliveryDays + 1

                }
            })
        }else{
            errorElement.textContent = 'Pin Code must have a only digits.';
        }
        resultElement.textContent = `Pin Code "${pincodeValue}" is valid!`;
        errorElement.textContent = '';
    } else {
        // If not valid, display error message
        errorElement.textContent = 'Pin Code must have a minimum length of 6 characters.';
        resultElement.textContent = '';
    }
}
*/
