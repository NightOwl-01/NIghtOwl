
function getBasePrice() {
    const priceElement = document.getElementById('price');
    return parseFloat(priceElement.innerText.replace('$', ''));
}


function updatePrice() {
    const basePrice = getBasePrice();
    const quantity = parseInt(document.getElementById('quantity').value);
    const totalPrice = (basePrice * quantity).toFixed(2);
    document.getElementById('price').innerText = `$${totalPrice}`;
}


function getPriceInINR() {
    const priceElement = document.getElementById('price');
    const priceInUSD = parseFloat(priceElement.innerText.replace('$', ''));
    const usdToInrRate = 83; 
    return Math.round(priceInUSD * usdToInrRate * 100); 
}

// Razorpay options
var options = {
    "key": "DwsZBtzsYvZ4cNkuUF1GLI0J",
    "amount": getPriceInINR(), 
    "currency": "INR",
    "description": "Taylor Swift Eras Tour Bookmarks",
    "image": "../image/logo.png", 
    "prefill": {
        "email": "customer@example.com",
        "contact": "+919900000000",
    },
    "config": {
        "display": {
            "blocks": {
                "utib": {
                    "name": "Pay Using Axis Bank",
                    "instruments": [
                        {
                            "method": "card",
                            "issuers": ["UTIB"]
                        },
                        {
                            "method": "netbanking",
                            "banks": ["UTIB"]
                        },
                    ]
                },
                "other": {
                    "name": "Other Payment Methods",
                    "instruments": [
                        {
                            "method": "card",
                            "issuers": ["ICIC"]
                        },
                        {
                            "method": 'netbanking',
                        }
                    ]
                }
            },
            "hide": [
                {
                    "method": "upi"
                }
            ],
            "sequence": ["block.utib", "block.other"],
            "preferences": {
                "show_default_blocks": false
            }
        }
    },
    "handler": function (response) {
        alert("Payment successful! Razorpay Payment ID: " + response.razorpay_payment_id);
        // Here you should verify the payment on your server before confirming the order
    },
    "modal": {
        "ondismiss": function () {
            if (confirm("Are you sure you want to close the form?")) {
                console.log("Checkout form closed by the user");
            } else {
                console.log("Complete the Payment");
            }
        }
    }
};

// Initialize Razorpay
var rzp1 = new Razorpay(options);

// Add click event listener to the button
document.getElementById('rzp-button1').onclick = function (e) {
    options.amount = getPriceInINR();
    rzp1 = new Razorpay(options); // Recreate the Razorpay instance with updated amount
    rzp1.open();
    e.preventDefault();
}

// Add change event listener to the quantity select
document.getElementById('quantity').addEventListener('change', updatePrice);

// Initial price update
updatePrice();