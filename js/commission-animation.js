let currentPrice    = 60;
let bgPrice         = 0;
let totalPrice      = 60;
let commercial      = 1;
let agree           = false;
let currentCurrency = 'Outdonesia';
let currentBodyPart = 'halfbody';
let currentBg       = 'solidcolor';

let currencyAll     = ['Indonesia', 'Outdonesia'];

let bodyPartName    = ['headshot', 'bustup', 'halfbody', 'kneeup', 'fullbody'];
let pricePartInIDR  = ['Rp.150.000', 'Rp.225.000', 'Rp.300.000', 'Rp.375.000', 'Rp.449.000'];
let pricePartInUSD  = ['$30', '$45', '$60', '$75', '$89'];

let bgPartName      = ['solidcolor', 'simple', 'blurry', 'detailed'];
let priceBgInIDR    = ['+Rp.0', '+Rp.40.000', '+Rp.100.000', '+Rp.200.000'];
let priceBgInUSD    = ['+$0', '+$8', '+$20', '+$40'];

let canvasSizes      = ['square', 'a3portrait', 'a3landscape', 'widescreen'];
let currentCanvas     = 'square';

function Region(regionID){

    const IDR = document.getElementById('Indonesia');
    const USD = document.getElementById('Outdonesia');

    // Set the element class to the default state //
    document.getElementById('Indonesia').className = '';
    document.getElementById('Outdonesia').className = '';
    // Change the button color by adding animation class //
    if (regionID=="Indonesia"){
        currentCurrency = 'Indonesia';
        IDR.classList.add('animation-change-color-region');
        // Change all of the price letiables inside the css file to IDR
        for (let index = 0; index < bodyPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bodyPartName[index]}-str`, `'${pricePartInIDR[index]}'`);

            if (index < bgPartName.length) document.querySelector(":root").style.setProperty(`--price-${bgPartName[index]}-str`, `'${priceBgInIDR[index]}'`); 
        }
    }
    else {
        currentCurrency = 'Outdonesia';
        USD.classList.add('animation-change-color-region')
        // Change all of the price letiables inside the css file to USD
        for (let index = 0; index < bodyPartName.length; index++){
            document.querySelector(":root").style.setProperty(`--price-${bodyPartName[index]}-str`, `'${pricePartInUSD[index]}'`);
            
            if (index < bgPartName.length) document.querySelector(":root").style.setProperty(`--price-${bgPartName[index]}-str`, `'${priceBgInUSD[index]}'`); 
        }
    }
    // Update current price
    UpdatePrice();
}

function CropAnimate(bodyPartID){

    let bodyPartIDtoString      = `${bodyPartID}`;
    let IDlowercase             = bodyPartIDtoString.toLowerCase();
    let bodyPart                = document.getElementById(bodyPartID);
    const dynamicCrop           = document.querySelector('.dynamic-price-container');
    const dynamicCrop_up        = document.querySelector('.dynamic-price-container-up');
    const movingText            = document.getElementById('PARTNAME');

    CropSetToDefault(dynamicCrop, dynamicCrop_up);      // Set the element class to the default state //

    dynamicCrop.classList.add(`animation-${IDlowercase}`);      // Move the cropping line, this function is flexible depending on the body part name
    document.querySelector(":root").style.setProperty(`--color-${IDlowercase}`, 'white');       // Move the cropping line, this function is flexible depending on the body part name
    bodyPart.classList.add('animation-change-color');
    movingText.innerHTML=`${bodyPartIDtoString.charAt(0) + IDlowercase.slice(1)}`;      // Set the first letter to uppercase and change the text content bellow the cropper

    // Remove the upper cropping line when the user clicked fullbody
    if(bodyPartID == 'FULLBODY')
        dynamicCrop_up.classList.add('animation-fullbody-up');

    // Set --total-price-str letiable to the new price
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
    let getPrice    = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${IDlowercase}-str`);
    let strPrice    = getPrice.toString();
    let slicedPrice = '';
    let priceInt    = 0;
    let isBg        = false;
    
    // Add the price clicked to the current price
    if (type == "background") { strPrice = strPrice.slice(1); isBg = true;} // Remove "+" from bg price string
    if (currentCurrency=='Outdonesia') { slicedPrice = strPrice.substring(2, strPrice.length - 1);} // Remove quotes and dollar sign
    else { slicedPrice = strPrice.substring(4, strPrice.length - 1);} // Remove "Rp." and quotes

    priceInt    = parseInt(slicedPrice);                      // Convert it to integer
    
    if (isBg) bgPrice  = priceInt;                         // Set the current price to the new price
    else currentPrice  = priceInt;
    totalPrice = (currentPrice + bgPrice)*commercial;
    SetTotalPrice(totalPrice);
}

function UpdatePrice(){
    let getSelectedPartPrice    = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${currentBodyPart}-str`);
    let getSelectedBgPrice      = getComputedStyle(document.querySelector(':root')).getPropertyValue(`--price-${currentBg}-str`);
    let {slicedPartPrice, slicedBgPrice} = '';
    let totalPrice    = 0;
    
    if (currentCurrency=='Outdonesia'){
        slicedPartPrice = getSelectedPartPrice.substring(2, getSelectedPartPrice.length - 1);
        slicedBgPrice   = getSelectedBgPrice.substring(3, getSelectedBgPrice.length - 1);
    }
    else {
        slicedPartPrice = getSelectedPartPrice.substring(4, getSelectedPartPrice.length - 1);
        slicedBgPrice   = getSelectedBgPrice.substring(5, getSelectedBgPrice.length - 1);
    }

        priceIntPart    = parseInt(slicedPartPrice);
        priceIntBg      = parseInt(slicedBgPrice); 

        currentPrice    = priceIntPart;
        bgPrice         = priceIntBg;
        totalPrice      = (currentPrice + bgPrice)*commercial;

        SetTotalPrice(totalPrice);
}

function SetTotalPrice(totalPrice){
    document.querySelector(":root").style.setProperty('--total-price-str',
        (function(){
            if (currentCurrency == "Outdonesia") {return `'$${totalPrice}'`} else {return `'Rp.${parseInt(totalPrice)}.000'`};
        }())
    )
}

function BgAnimate(bgID){
    let bgIDtoString            = `${bgID}`;
    let IDlowercase             = bgIDtoString.toLowerCase();
    let bg                      = document.getElementById(bgID);
    let commissionBg            = document.querySelector(`.img-${IDlowercase}`);

    BgSetToDefault();      // Set the element class to the default state //

    document.querySelector(":root").style.setProperty(`--color-${IDlowercase}`, 'white'); // Set selected price color to white    
    bg.classList.add('animation-change-color-bg');  // Change the color of the button to orange gradient by inserting the animation class
    commissionBg.classList.add(`animation-change-bg`); // Put the changing opacity animation class to the selected background

    TotalPrice(IDlowercase, "background");
    currentBg = IDlowercase;
}

function BgSetToDefault(){
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

function Commercial(){
    let commercalButton = document.querySelector('.commercial-check-1');

    if(commercial != 1) { commercial = 1; commercalButton.className = 'commercial-check-1 box-bold';}
    else {commercial = 1.5; commercalButton.classList.add("animation-commercial");}

    totalPrice = (currentPrice + bgPrice)*commercial;
    SetTotalPrice(totalPrice);
}

function Canvas(canvasID){
    let canvasToString          = `${canvasID}`;
    let IDlowercase             = canvasToString.toLowerCase();
    let canvas                  = document.getElementById(canvasID);

    // Set canvas state to default
    canvasSizes.forEach(canvasElement=>{
        let uppercaseCanvas = canvasElement.toUpperCase();
        document.getElementById(`${uppercaseCanvas}`).className ='';
    });
    
    // Set color to white
    canvas.classList.add("animation-canvas");
    currentCanvas = IDlowercase;
    console.log(currentCanvas);
}

function Agree(){
    let agreeButton         = document.querySelector('.agree-check-1');
    let orderButtonDisabled = document.querySelector('.order-btn-disabled');
    let orderButtonEnabled  = document.querySelector('.order-btn-enabled');

    if(agree){
        agree = false;
        agreeButton.className = 'agree-check-1 box-bold';
        orderButtonDisabled.className = 'order-btn-disabled';
        orderButtonEnabled.className = 'order-btn-enabled';
    }
    else {
        agree = true;
        agreeButton.classList.add("animation-agree");
        orderButtonDisabled.classList.add("animation-order");
        orderButtonEnabled.classList.add("animation-order-enabled");
    }

}

function ForwardToForm() {
    // Forwarding all current letiables into Google form, this is quite tricky //
    //
    let Parts             = "entry.1894098826";
    let Bg                = "entry.11836467";
    let Canvas            = "entry.484493434";
    let Commercial        = "entry.848784798";
    let Currency          = "entry.339349554";
    let Price             = "entry.1342342806";


    let fCurrency         = ["IDR (Rupiah)", "USD (US Dollar)"];
    let fParts            = ["Headshot", "Bust Up","Half Body","Knee Up", "Fullbody"];
    let fBg               = ["Solid Color","Simple Background","Blur Background","Detailed Background"];
    let fCanvas           = ["Square","A3 Potrait","A3 Landscape","Widescreen 5K"];
    let fCommercial       = (function(){
        if (commercial   == 1) {return "No, I only use it for non-commercial purposes."} else {return "Yes, I want it to be used as commercial purposes."};
    }());
    let totalPriceStr     = (function(){
        if (currentCurrency == "Outdonesia") {return `$${totalPrice}`} else {return `Rp.${parseInt(totalPrice)}.000`};
    }());

    let iParts            = bodyPartName.indexOf(currentBodyPart);
    let iBg               = bgPartName.indexOf(currentBg);
    let iCanvas           = canvasSizes.indexOf(currentCanvas);
    let iCurrency         = currencyAll.indexOf(currentCurrency);
    let updatedTotalPrice = window.getComputedStyle(document.querySelector(":root")).getPropertyValue("--total-price-str");

    console.log(updatedTotalPrice);
    // Open Google Form URL with parameters, each parameters are seperated by "&"
    // This will autofill the destined lists
    window.open(`https://docs.google.com/forms/d/e/1FAIpQLSePoEfMdtBQeu77gCH41TZ6KMfOeQ2uUVPbD1SLZBG9afAUmw/viewform?${Parts}=${fParts[iParts]}&${Bg}=${fBg[iBg]}&${Canvas}=${fCanvas[iCanvas]}&${Commercial}=${fCommercial}&${Currency}=${fCurrency[iCurrency]}&${Price}=${updatedTotalPrice}`
    
    
    
    
    
    
    , '_blank');
}

if (window.innerWidth < 800)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
if (window.attachEvent) {
    window.attachEvent('onresize', function() {
        if (window.innerWidth < 800)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
        else
        document.querySelector(":root").style.setProperty("--x-offset", '8vw');
    });
}
else if (window.addEventListener) {
    window.addEventListener('resize', function() {
        if (window.innerWidth < 800)
        document.querySelector(":root").style.setProperty("--x-offset", '25vw');
        else
        document.querySelector(":root").style.setProperty("--x-offset", '8vw');
    });
}

let bg;
let onceBg = true;
window.addEventListener('scroll',function(){
    if (onceBg) {onceBg = false; bg=document.getElementById("header-img");}
    let value = window.scrollY;

    bg.style.top = value*0.5 + 'px';
})