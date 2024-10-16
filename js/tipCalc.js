document.addEventListener('DOMContentLoaded', () => {
    let billInput = document.getElementById('bill');
    const customAmountInput = document.querySelector('#customAmount');
    const peopleInput = document.getElementById('calc--numOfPeople');
    const tipPer = document.getElementById('tipPer');
    const totalPer = document.getElementById('totalPer');
    const grandTotal = document.getElementById('grandTotal');
    const buttons = document.querySelectorAll('.btn.tip'); 
    const resetBtn = document.getElementById('reset');
    const customBtn = document.getElementById('btnCustom'); 

    const tipPercentage = {
        five: 5,
        ten: 10,
        fifteen: 15,
        twenty: 20,
        twentyfive: 25
    };

    // Show custom amount input on button click
    customBtn.addEventListener('click', (e)=> {
        e.target.style.backgroundColor = '#26C2AE';
        customAmountInput.style.display = 'block';
        customAmountInput.style.border = '2px solid red';
        
        
        setTimeout(()=>{
            
            e.target.style.backgroundColor = '';
            customAmountInput.style.border = ''
        },1000);
    });

    // Handle custom tip input
    customAmountInput.addEventListener('keyup', (e) => {
        let tip = parseFloat(e.target.value); // Convert input to a number
        const values = initializeValues();
        if (!values) return;

        const { billValue, peopleValue } = values;

        if (isNaN(tip)) {
            alert('Invalid custom tip amount');
            return;
        }

        let tipPerPerson = tip / peopleValue;  // Calculate tip per person
        let totalPerPerson = calculateBillPerPerson(billValue, peopleValue, tipPerPerson);

        // Update DOM with the calculated values
        tipPer.innerText = tipPerPerson.toFixed(2);
        totalPer.innerText = totalPerPerson.toFixed(2);
        grandTotal.innerText = (totalPerPerson * peopleValue).toFixed(2);
    });

    // Handle percentage buttons
    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.target.style.backgroundColor = '#26C2AE';

            
            
            setTimeout(()=>{
            
                e.target.style.backgroundColor = '';
            },1000);





            let rate = e.target.getAttribute('data-key');
            const values = initializeValues();
            if (!values) return;

            const { billValue, peopleValue } = values;
            let tip = calculateTip(billValue, rate, peopleValue);

            // Update DOM with calculated values
            tipPer.innerText = tip.toFixed(2); 
            let totalPerPerson = calculateBillPerPerson(billValue, peopleValue, tip);
            totalPer.innerText = totalPerPerson.toFixed(2);
            grandTotal.innerText = (totalPerPerson * peopleValue).toFixed(2);
        });

        // Reset button logic
        resetBtn.addEventListener('click', reset);
    });

    // Initialize values and validate inputs
    function initializeValues() {
        let billValue = parseFloat(billInput.value);
        let peopleValue = parseFloat(peopleInput.value);

        if (isNaN(billValue) || billValue <= 0) {
            alert('Bill cannot be null or zero!');
            return null;
        } else if (isNaN(peopleValue) || peopleValue <= 0) {
            alert('Add a valid number of people at the table!');
            return null;
        }

        return { billValue, peopleValue };
    }

    // Calculate tip amount
    function calculateTip(bill, tipRate, people) {
        let tipGiven = (bill * (tipPercentage[tipRate] / 100)) / people;
        return tipGiven;
    }

    // Calculate total bill per person
    function calculateBillPerPerson(bill, people, tipGiven) {
        let billPerPerson = (bill / people) + tipGiven;
        return billPerPerson;
    }

    // Reset inputs and UI values
    function reset() {
        totalPer.innerHTML = '$0';
        tipPer.innerHTML = '$0';
        grandTotal.innerHTML = '$0';
        billInput.value = '';
       
        customAmountInput.value = '';
        peopleValue.value = '1';
        customAmountInput.style.display = 'none';
    }
});
