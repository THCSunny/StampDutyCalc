function calculateStampDuty() {
    const propertyPrice = parseFloat(document.getElementById('propertyPrice').value);
    const buyerType = document.getElementById('buyerType').value;
    const residencyStatus = document.getElementById('residencyStatus').value;

    let stampDuty = 0;

    if (propertyPrice <= 0) {
        document.getElementById('stampDuty').innerText = '0.00';
        document.getElementById('effectiveRate').innerText = '0.00%';
        return;
    }

    // Calculate the First Time Buyer SDLT
    if (buyerType === 'firstTimeBuyer' && propertyPrice <= 625000) {
        if (propertyPrice <= 425000) {
            stampDuty = 0;
        } else {
            stampDuty = (propertyPrice - 425000) * 0.05;
        }
    } else {
        // Calculate the standard SDLT
        stampDuty = calculateStandardStampDuty(propertyPrice);
    }

    // Additional 2% for non-UK residents
    if (residencyStatus === 'nonUkResident') {
        stampDuty += propertyPrice * 0.02;
    }

    // Additional 3% for additional properties
    if (buyerType === 'additionalProperty') {
        stampDuty += propertyPrice * 0.03;
    }

    document.getElementById('stampDuty').innerText = stampDuty.toFixed(2);

    // Calculate the effective rate
    const effectiveRate = (stampDuty / propertyPrice) * 100;
    document.getElementById('effectiveRate').innerText = effectiveRate.toFixed(2) + '%';
}

function calculateStandardStampDuty(price) {
    let duty = 0;
    if (price > 1500000) {
        duty += (price - 1500000) * 0.12;
        price = 1500000;
    }
    if (price > 925000) {
        duty += (price - 925000) * 0.10;
        price = 925000;
    }
    if (price > 250000) {
        duty += (price - 250000) * 0.05;
        price = 250000;
    }
    return duty;
}
