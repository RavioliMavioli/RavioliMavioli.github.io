var currentPrice = 50;
var bgPrice = 0;
var totalPrice = currentPrice + bgPrice;
var currentCurrency = 'Indonesia';
var currentBodyPart = 'halfbody';
var currentBg       = 'solidcolor';

let bodyPartName    = ['headshot', 'bustup', 'halfbody', 'kneeup', 'fullbody'];
let pricePartInIDR  = ['Rp.125.000', 'Rp.175.000', 'Rp.250.000', 'Rp.325.000', 'Rp.425.000'];
let pricePartInUSD  = ['$30', '$45', '$60', '$75', '$89'];

let bgPartName      = ['solidcolor', 'simple', 'blurry', 'detailed'];
let priceBgInIDR    = ['+Rp.0', '+Rp.40.000', '+Rp.120.000', '+Rp.200.000'];
let priceBgInUSD    = ['+$0', '+$8', '+$20', '+$40'];



function Region(regionID){


    const IDR = document.getElementById('Indonesia');
    const USD = document.getElementById('Outdonesia');

    // Set the element class to the default state //
    RegionSetToDefault();
    // Change the button color by adding animation class //
    if (regionID=="Indonesia"){
        currentCurrency = 'Indonesia';
        IDR.classList.add('animation-change-color-region');
        // Change currency to IDR
        for (var index = 0; index < bodyPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bodyPartName[index]}-str`, `'${pricePartInIDR[index]}'`);
            //console.log(`--price-${bodyPartName[index]}-str`);
            //console.log(document.querySelector(":root").style.getPropertyValue(`--price-${bodyPartName[index]}-str`));   
        }
        for (var index = 0; index < bgPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bgPartName[index]}-str`, `'${priceBgInIDR[index]}'`);
        }
    }
    else {
        currentCurrency = 'Outdonesia';
        USD.classList.add('animation-change-color-region')
        // Change currency to USD
        for (var index = 0; index < bodyPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bodyPartName[index]}-str`, `'${pricePartInUSD[index]}'`);
            //console.log(`--price-${bodyPartName[index]}-str`);
            //console.log(document.querySelector(":root").style.getPropertyValue(`--price-${bodyPartName[index]}-str`));        
        }
        for (var index = 0; index < bgPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bgPartName[index]}-str`, `'${priceBgInUSD[index]}'`);
        }
    }
    // Update current price
    UpdatePrice();
}

function RegionSetToDefault(){
    document.getElementById('Indonesia').className = '';
    document.getElementById('Outdonesia').className = '';
}

function CropAnimate(bodyPartID){

    var bodyPartIDtoString      = `${bodyPartID}`;
    var IDlowercase             = bodyPartIDtoString.toLowerCase();
    var bodyPart                = document.getElementById(bodyPartID);
    const dynamicCrop           = document.querySelector('.dynamic-price-container');
    const dynamicCrop_up        = document.querySelector('.dynamic-price-container-up');
    const movingText            = document.getElementById('PARTNAME');
    const headshotStr           = document.getElementById('HEADSHOT');

    CropSetToDefault(dynamicCrop, dynamicCrop_up);      // Set the element class to the default state //

    dynamicCrop.classList.add(`animation-${IDlowercase}`);      // Move the cropping line, this function is flexible depending on the body part name
    document.querySelector(":root").style.setProperty(`--color-${IDlowercase}`, 'white');       // Move the cropping line, this function is flexible depending on the body part name
    bodyPart.classList.add('animation-change-color');
    movingText.innerHTML=`${bodyPartIDtoString.charAt(0) + IDlowercase.slice(1)}`;      // Set the first letter to uppercase and change the text content bellow the cropper

    // Remove the upper cropping line when the user clicked fullbody
    if(bodyPartID == 'FULLBODY')
        dynamicCrop_up.classList.add('animation-fullbody-up');

    // Set --total-price-str variable to the new price
    TotalPrice(IDlowercase, "crop");
    currentBodyPart = IDlowercase;
}

function CropSetToDefault(dynamicCrop, dynamicCrop_up){

    Region(currentCurrency);
    // Remove every single classes from the element //
    bodyPartName.forEach(element => {
        let uppercaseElement = element.toString().toUpperCase();

        document.getElementById(`${uppercaseElement}`).className = '';
        document.querySelector(":root").style.setProperty(`--color-${element}`, '#1793d1');
    });

    // Except for the "moving container" element, it will be set to the default class //
    dynamicCrop.className = 'dynamic-price-container';
    dynamicCrop_up.className = 'dynamic-price-container-up';

}

function TotalPrice(IDlowercase, type){
    // Initialization for getting the current price as integer
    var getPrice    = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${IDlowercase}-str`);
    var strPrice    = getPrice.toString();
    var slicedPrice = '';
    var priceInt    = 0;
    var bgornot     = false;
    // Remove + from bg price
    if (type == "background") { strPrice = strPrice.slice(1); bgornot = true;}
    // Add the price clicked to the current price
    if (currentCurrency=='Outdonesia'){
        slicedPrice = strPrice.substring(2, strPrice.length - 1); // Remove quote and dollar sign
        priceInt    = parseInt(slicedPrice);                      // Convert it to integer

        if (bgornot) bgPrice  = priceInt;                         // Set the current price to the new price
        else currentPrice  = priceInt;
        totalPrice = currentPrice + bgPrice;
        document.querySelector(":root").style.setProperty('--total-price-str', `'$${totalPrice}'`)
    }
    else{
        slicedPrice = strPrice.substring(4, strPrice.length - 1); // Remove quote and Rp. sign
        priceInt    = parseInt(slicedPrice);                      // Convert it to integer, note that it returns 3 digit number since the "." inside the string is detected as comma
    
        if (bgornot) bgPrice  = priceInt;                         // Set the current price to the new price
        else currentPrice  = priceInt;
        totalPrice = currentPrice + bgPrice;
        document.querySelector(":root").style.setProperty('--total-price-str', `'Rp.${totalPrice}.000'`); // Modify --price-total value to the current price
    }
    console.log(bgPrice);
}

function UpdatePrice(){
    var getSelectedPartPrice    = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${currentBodyPart}-str`);
    var getSelectedBgPrice      = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${currentBg}-str`);
    var {slicedPartPrice, slicedBgPrice} = '';
    var totalPrice    = 0;
    
    if (currentCurrency=='Outdonesia'){
        
        slicedPartPrice = getSelectedPartPrice.substring(2, getSelectedPartPrice.length - 1);
        slicedBgPrice   = getSelectedBgPrice.substring(3, getSelectedBgPrice.length - 1);
        priceIntPart    = parseInt(slicedPartPrice);
        priceIntBg      = parseInt(slicedBgPrice);
        
        currentPrice    = priceIntPart;
        bgPrice         = priceIntBg;
        totalPrice      = currentPrice + bgPrice;

        document.querySelector(":root").style.setProperty('--total-price-str', `'$${totalPrice}'`)
    }
    else{
        slicedPartPrice = getSelectedPartPrice.substring(4, getSelectedPartPrice.length - 1);
        slicedBgPrice   = getSelectedBgPrice.substring(5, getSelectedBgPrice.length - 1);
        priceIntPart    = parseInt(slicedPartPrice);
        priceIntBg      = parseInt(slicedBgPrice);

        currentPrice    = priceIntPart;
        bgPrice         = priceIntBg;
        totalPrice      = currentPrice + bgPrice;


        document.querySelector(":root").style.setProperty('--total-price-str', `'Rp.${totalPrice}.000'`)
    }
}

function BgAnimate(bgID){
    var bgIDtoString            = `${bgID}`;
    var IDlowercase             = bgIDtoString.toLowerCase();
    var bg                      = document.getElementById(bgID);
    var commissionBg            = document.querySelector(`.img-${IDlowercase}`);

    BgSetToDefault(commissionBg);      // Set the element class to the default state //

    document.querySelector(":root").style.setProperty(`--color-${IDlowercase}`, 'white');       // Move the cropping line, this function is flexible depending on the body part name
    bg.classList.add('animation-change-color-bg');
    commissionBg.classList.add(`animation-change-bg`);

    TotalPrice(IDlowercase, "background");
    currentBg = IDlowercase;
}

function BgSetToDefault(commissionBg){
    Region(currentCurrency);
    let bgPartName = ['solidcolor', 'simple', 'blurry', 'detailed'];

    // Remove every single classes from the element //
    bgPartName.forEach(backgrounds => {
        let uppercasedBg = backgrounds.toUpperCase();
        document.getElementById(`${uppercasedBg}`).className = '';
        document.querySelector(`.img-${backgrounds}`).className = `img-${backgrounds}`;
        document.querySelector(":root").style.setProperty(`--color-${backgrounds}`, '#FF4C01');
    });
}

if (window.innerWidth < 1000)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
if (window.attachEvent) {
    window.attachEvent('onresize', function() {
        if (window.innerWidth < 1000)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
        else
        document.querySelector(":root").style.setProperty("--x-offset", '8vw');
    });
}
else if (window.addEventListener) {
    window.addEventListener('resize', function() {
        if (window.innerWidth < 1000)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
        else
        document.querySelector(":root").style.setProperty("--x-offset", '8vw');
    });
}