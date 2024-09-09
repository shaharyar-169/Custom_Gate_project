function handleClick(event) {
    // Determine the selector based on the clicked element's class
    let targetClass;

    if (event.currentTarget.classList.contains('kit-inner')) {
        targetClass = '.kit-inner';
    } else if (event.currentTarget.classList.contains('panel-inner')) {
        targetClass = '.panel-inner';
    } else if (event.currentTarget.classList.contains('style-inner')) {
        targetClass = '.style-inner';
    }

    else if (event.currentTarget.classList.contains('pickets-inner')) {
        targetClass = '.pickets-inner';
    }
    else if (event.currentTarget.classList.contains('ironwood-inner')) {
        targetClass = '.ironwood-inner';
    }
    else if (event.currentTarget.classList.contains('access-inner')) {
        targetClass = '.access-inner';
    }

    // Select all elements with the same class as the clicked element
    const items = document.querySelectorAll(targetClass);

    // Remove 'active' class from all items
    items.forEach(el => el.classList.remove('active'));

    // Add 'active' class to the clicked item
    event.currentTarget.classList.add('active');
}


// Select all elements with the class 'kit-inner', 'panel-inner', and 'style-inner'
const kitItems = document.querySelectorAll('.kit-inner');
const panelItems = document.querySelectorAll('.panel-inner');
const styleItems = document.querySelectorAll('.style-inner');
const picketaItems = document.querySelectorAll('.pickets-inner');
const ironwoodItems = document.querySelectorAll('.ironwood-inner');
const accessItems = document.querySelectorAll('.access-inner');

// Add event listeners for all three sets of elements
kitItems.forEach(item => item.addEventListener('click', handleClick));
panelItems.forEach(item => item.addEventListener('click', handleClick));
styleItems.forEach(item => item.addEventListener('click', handleClick));
picketaItems.forEach(item => item.addEventListener('click', handleClick));
ironwoodItems.forEach(item => item.addEventListener('click', handleClick));
accessItems.forEach(item => item.addEventListener('click', handleClick));



function updateSVG(value) {
    const minWidth = 100;
    const maxWidth = 400;
    const newWidth = minWidth + (maxWidth - minWidth) * (value / 100);
    const centerX = 200;

    const newX1 = centerX - (newWidth / 2);
    const newX2FromCenter = centerX + (newWidth / 2);

    const newMiddleLeft = newX1 + (newWidth * 0.3);
    const newMiddleRight = newX2FromCenter - (newWidth * 0.3);



    document.getElementById('mainRect').setAttribute('x', newX1);
    document.getElementById('mainRect').setAttribute('width', newWidth);
    document.getElementById('innerLine').setAttribute('x1', newX1);
    document.getElementById('innerLine').setAttribute('x2', newX2FromCenter);
    document.getElementById('bottomLineLeft').setAttribute('x1', newX1);
    document.getElementById('bottomLineLeft').setAttribute('x2' , newMiddleLeft);
    document.getElementById('bottomLineRight').setAttribute('x1', newMiddleRight);
    document.getElementById('bottomLineRight').setAttribute('x2', newX2FromCenter);
    document.getElementById('bottomEndLeft').setAttribute('x1', newX1);
    document.getElementById('bottomEndLeft').setAttribute('x2', newX1 );
    document.getElementById('bottomEndRight').setAttribute('x1', newX2FromCenter);
    document.getElementById('bottomEndRight').setAttribute('x2', newX2FromCenter);

    const maxFeet = 16;
    const minFeet = 3;
    const maxInches = 10;
    const minInches = 0;

    const widthRange = maxWidth - minWidth;
    const totalInchesRange = (maxFeet - minFeet) * 12 + (maxInches - minInches);

    const currentInches = totalInchesRange * (newWidth - minWidth) / widthRange;
    const feet = minFeet + Math.floor(currentInches / 12);
    const inches = Math.round(currentInches % 12);

    const bottomText = document.getElementById('bottomText');
    bottomText.textContent = `${feet}' ${inches}"`;
    bottomText.setAttribute('x', (newMiddleLeft + newMiddleRight) / 2 - bottomText.getBBox().width / 2);

   
    ///////////// CODE FOR VISIBLE VERTICAL LINE ABOVE 10 FEET //////////////////////////

    const targetFeet = 10;
    const targetInches = (targetFeet - minFeet) * 12;
    const targetWidth = minWidth + (targetInches / totalInchesRange) * widthRange;

    const verticalLine = document.getElementById('verticalLine');
    if (newWidth >= targetWidth) {
        verticalLine.setAttribute('visibility', 'visible');
        const verticalLineX = centerX;
        verticalLine.setAttribute('x1', verticalLineX);
        verticalLine.setAttribute('x2', verticalLineX);
    } else {
        verticalLine.setAttribute('visibility', 'hidden');
    }
    ///////////// CODE FOR VISIBLE VERTICAL LINE ABOVE 10 FEET //////////////////////////



    document.getElementById('leftTopLine').setAttribute('x1', newX1 - 25);
    document.getElementById('leftTopLine').setAttribute('x2', newX1 - 25);
    document.getElementById('leftBottomLine').setAttribute('x1', newX1 - 25);
    document.getElementById('leftBottomLine').setAttribute('x2', newX1 - 25);
    document.getElementById('leftEndTop').setAttribute('x1', newX1 - 35);
    document.getElementById('leftEndTop').setAttribute('x2', newX1 - 15);
    document.getElementById('leftEndBottom').setAttribute('x1', newX1 - 35);
    document.getElementById('leftEndBottom').setAttribute('x2', newX1 - 15);
    const leftText = document.getElementById('leftText');
    leftText.setAttribute('x', newX1 - 30);


    // Initial setup: Set initial width and draw wood plates
    document.addEventListener('DOMContentLoaded', () => {
        updateSVG(70); // Set initial slider value to 50% for demonstration
    });


    
}




document.addEventListener('DOMContentLoaded', function () {
    // JavaScript to dynamically create wood plates
    const woodPlatesGroup = document.getElementById('woodPlates');
    const plateWidth = 15;
    const plateHeight = 196;
    const startX = 67;
    const startY = 52;
    const spacing = 15.5; // Gap between each plate

    for (let i = 0; i < 14; i++) {
        let rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", startX + i * spacing);
        rect.setAttribute("y", startY);
        rect.setAttribute("width", plateWidth);
        rect.setAttribute("height", plateHeight);
        rect.setAttribute("fill", "#BC9055");
        woodPlatesGroup.appendChild(rect);
    }
});



function updateFilter(filterType) {
    const svg = document.querySelector('svg');

    // Clear existing SVG content
    while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
    }

    if (filterType === 'none') {
        // Add default SVG structure for "None" filter
        svg.innerHTML = `
            <rect id="mainRect" x="65" y="50" width="220" height="200" stroke="black" stroke-width="4" fill="none" />
            <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />
            <line id="leftTopLine" x1="40" y1="50" x2="40" y2="130" stroke="black" stroke-width="1.5" />
            <line id="leftBottomLine" x1="40" y1="170" x2="40" y2="250" stroke="black" stroke-width="1.5" />
            <line id="leftEndTop" x1="30" y1="50" x2="50" y2="50" stroke="black" stroke-width="1.5" />
            <line id="leftEndBottom" x1="30" y1="250" x2="50" y2="250" stroke="black" stroke-width="1.5" />
            <text id="leftText" x="35" y="155" font-family="Arial" font-size="14">6'</text>
            <line id="bottomLineLeft" x1="65" y1="290" x2="140" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomLineRight" x1="195" y1="290" x2="285" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomEndLeft" x1="65" y1="280" x2="65" y2="300" stroke="black" stroke-width="1.5" />
            <line id="bottomEndRight" x1="285" y1="280" x2="285" y2="300" stroke="black" stroke-width="1.5" />
            <text id="bottomText" x="155" y="295" font-family="Arial" font-size="14">6' 3"</text>
            <line id="verticalLine" x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="8" visibility="hidden" />
        `;
    }

    else if (filterType === 'swing') {
        // Add SVG structure for "Swing" filter
        svg.innerHTML = `
        <svg  width="400" height="400" xmlns="http://www.w3.org/2000/svg">
 
 <!-- Circle to create the rounded top for the left side -->
  <circle id="Leftpillarcircle" cx="45" cy="47" r="5" fill="black" />

  <!-- Left side line with thicker stroke width and flat ends -->
  <line id="Leftpillar" x1="45" y1="47" x2="45" y2="255" stroke="black" stroke-width="10" />

<line id="lefttopsecrueline" x1="60" y1="70" x2="50" y2="70" stroke="black" stroke-width="3" />


<line id="lefttopsecrue" x1="62" y1="58" x2="62" y2="72" stroke="black" stroke-width="6" />

<line id="leftbottomsecrueline" x1="60" y1="195" x2="50" y2="195" stroke="black" stroke-width="3" />


<line id="leftbottomsecrue" x1="62" y1="180" x2="62" y2="197" stroke="black" stroke-width="6" />


<rect id="mainRect"  x="65" y="50" width="220" height="200" stroke="black" stroke-width="4" fill="none" />
          
  <!-- Horizontal line inside the rectangle -->
                    <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />


    <!-- Circle to create the rounded top for the right side -->
  <circle id="rightpillarcircle" cx="295" cy="47" r="5" fill="black" />

  <!-- Right side line with thicker stroke width and flat ends -->
  <line id="rightpillar" x1="295" y1="47" x2="295" y2="255" stroke="black" stroke-width="10" />



   <!-- Left dimension lines -->
                    <line id="leftTopLine" x1="20" y1="50" x2="20" y2="130" stroke="black" stroke-width="1.5" />
                    <line id="leftBottomLine" x1="20" y1="170" x2="20" y2="250" stroke="black" stroke-width="1.5" />
                    <line id="leftEndTop" x1="10" y1="50" x2="30" y2="50" stroke="black" stroke-width="1.5" />
                    <line id="leftEndBottom" x1="10" y1="250" x2="30" y2="250" stroke="black" stroke-width="1.5" />
                    <text id="leftText" x="15" y="155" font-family="Arial" font-size="14">6'</text>


 <!-- Bottom dimension lines -->
                    <line id="topbottomLineLeft" x1="40" y1="280" x2="140" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="topbottomLineRight" x1="195" y1="280" x2="300" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="topbottomEndLeft" x1="40" y1="270" x2="40" y2="290" stroke="black" stroke-width="1.5" />
                    <line id="topbottomEndRight" x1="300" y1="270" x2="300" y2="290" stroke="black" stroke-width="1.5" />
                    <text id="topbottomText" x="155" y="285" font-family="Arial" font-size="14">6' 3"</text>




                    <!-- Bottom dimension lines -->
                   <line id="bottomLineLeft" x1="65" y1="300" x2="140" y2="300" stroke="black" stroke-width="1.5" />
            <line id="bottomLineRight" x1="195" y1="300" x2="285" y2="300" stroke="black" stroke-width="1.5" />
            <line id="bottomEndLeft" x1="65" y1="290" x2="65" y2="310" stroke="black" stroke-width="1.5" />
            <line id="bottomEndRight" x1="285" y1="290" x2="285" y2="310" stroke="black" stroke-width="1.5" />
            <text id="bottomText" x="155" y="305" font-family="Arial" font-size="14">6' 3"</text>
       


</svg>
                   
   `;

       
    }

    else if (filterType === 'slide') {
        // Add SVG structure for "Slide" filter
        svg.innerHTML = `
          
  <!-- Circle to create the rounded top for the left side -->
  <circle cx="65" cy="47" r="5" fill="black" />

  <!-- Left side line with thicker stroke width and flat ends -->
  <line x1="65" y1="47" x2="65" y2="260" stroke="black" stroke-width="10" />

  <!-- Top side with normal stroke width -->
  <line x1="65" y1="50" x2="285" y2="50" stroke="black" stroke-width="5" />

  <!-- Circle to create the rounded top for the right side -->
  <circle cx="285" cy="47" r="5" fill="black" />

  <!-- Right side line with thicker stroke width and flat ends -->
  <line x1="285" y1="47" x2="285" y2="260" stroke="black" stroke-width="10" />

  <!-- Bottom side with normal stroke width -->
  <line x1="65" y1="250" x2="285" y2="250" stroke="black" stroke-width="5" />

  <!-- Circle at the bottom left corner -->
  <circle cx="95" cy="255" r="6" fill="black" />

  <!-- Circle at the bottom right corner -->
  <circle cx="255" cy="255" r="6" fill="black" />


  <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />
  
        <line id="leftTopLine" x1="40" y1="50" x2="40" y2="130" stroke="black" stroke-width="1.5" />
            <line id="leftBottomLine" x1="40" y1="170" x2="40" y2="250" stroke="black" stroke-width="1.5" />
            <line id="leftEndTop" x1="30" y1="50" x2="50" y2="50" stroke="black" stroke-width="1.5" />
            <line id="leftEndBottom" x1="30" y1="250" x2="50" y2="250" stroke="black" stroke-width="1.5" />
            <text id="leftText" x="35" y="155" font-family="Arial" font-size="14">6'</text>
            <line id="bottomLineLeft" x1="65" y1="290" x2="140" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomLineRight" x1="195" y1="290" x2="285" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomEndLeft" x1="65" y1="280" x2="65" y2="300" stroke="black" stroke-width="1.5" />
            <line id="bottomEndRight" x1="285" y1="280" x2="285" y2="300" stroke="black" stroke-width="1.5" />
            <text id="bottomText" x="155" y="295" font-family="Arial" font-size="14">6' 3"</text>
            <line id="verticalLine" x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="8" visibility="hidden" />
       
      
            `;
    }

    else if (filterType === 'doublepickets') {

        // Add SVG structure for "Slide" filter
        svg.innerHTML = `

<svg width="400" height="350">
  <!-- Circle to create the rounded top for the left side -->
  <circle cx="45" cy="47" r="5" fill="black" />

  <!-- Left side line with thicker stroke width and flat ends -->
  <line x1="45" y1="47" x2="45" y2="255" stroke="black" stroke-width="10" />

<line x1="60" y1="70" x2="50" y2="70" stroke="black" stroke-width="3" />


<line x1="62" y1="58" x2="62" y2="72" stroke="black" stroke-width="6" />

<line x1="60" y1="195" x2="50" y2="195" stroke="black" stroke-width="3" />


<line x1="62" y1="180" x2="62" y2="197" stroke="black" stroke-width="6" />


 <!-- Define the pattern -->
  <defs>
    <pattern id="ironwood" width="10" height="10" patternUnits="userSpaceOnUse">
      <line x1="0" y1="0" x2="0" y2="10" stroke="black" stroke-width="2" />
      <line x1="5" y1="0" x2="5" y2="10" stroke="black" stroke-width="2" />
      <line x1="10" y1="0" x2="10" y2="10" stroke="black" stroke-width="2" />
    </pattern>
  </defs>

  <!-- Rectangle with ironwood pattern -->
  <rect x="65" y="50" width="220" height="200" stroke="black" stroke-width="4" fill="url(#ironwood)" />

 


          
  <!-- Horizontal line inside the rectangle -->
                    <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />


    <!-- Circle to create the rounded top for the right side -->
  <circle cx="295" cy="47" r="5" fill="black" />

  <!-- Right side line with thicker stroke width and flat ends -->
  <line x1="295" y1="47" x2="295" y2="260" stroke="black" stroke-width="10" />

   <!-- Left dimension lines -->
                    <line id="leftTopLine" x1="20" y1="50" x2="20" y2="130" stroke="black" stroke-width="1.5" />
                    <line id="leftBottomLine" x1="20" y1="170" x2="20" y2="250" stroke="black" stroke-width="1.5" />
                    <line id="leftEndTop" x1="10" y1="50" x2="30" y2="50" stroke="black" stroke-width="1.5" />
                    <line id="leftEndBottom" x1="10" y1="250" x2="30" y2="250" stroke="black" stroke-width="1.5" />
                    <text id="leftText" x="15" y="155" font-family="Arial" font-size="14">6'</text>


 <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="40" y1="280" x2="140" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="280" x2="300" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="40" y1="270" x2="40" y2="290" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="300" y1="270" x2="300" y2="290" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="285" font-family="Arial" font-size="14">6' 3"</text>




                    <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="65" y1="305" x2="140" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="305" x2="285" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="65" y1="295" x2="65" y2="315" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="285" y1="295" x2="285" y2="315" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="310" font-family="Arial" font-size="14">6' 3"</text>


  

</svg>

        `;
    }

    else if (filterType === 'arch') {
        // Add SVG structure for "Slide" filter
        svg.innerHTML = `

        <svg width="400" height="350">
  <!-- Circle to create the rounded top for the left side -->
  <circle cx="45" cy="80" r="5" fill="black" />

  <!-- Left side line with thicker stroke width and flat ends -->
  <line x1="45" y1="80" x2="45" y2="255" stroke="black" stroke-width="10" />

<line x1="60" y1="120" x2="50" y2="120" stroke="black" stroke-width="3" />


<line x1="62" y1="107" x2="62" y2="122" stroke="black" stroke-width="6" />

<line x1="60" y1="230" x2="50" y2="230" stroke="black" stroke-width="3" />


<line x1="62" y1="217" x2="62" y2="232" stroke="black" stroke-width="6" />


  <!-- Rectangle with ironwood pattern -->
 <!-- Path with an arched top and straight sides -->
  <path d="M65 80 Q 180 25 285 80 L 285 250 L 65 250 Z" stroke="black" stroke-width="4" fill="none" />

          
  <!-- Horizontal line inside the rectangle -->
                    <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />


    <!-- Circle to create the rounded top for the right side -->
  <circle cx="295" cy="80" r="5" fill="black" />

  <!-- Right side line with thicker stroke width and flat ends -->
  <line x1="295" y1="80" x2="295" y2="255" stroke="black" stroke-width="10" />

   <!-- Left dimension lines -->
                    <line id="leftTopLine" x1="20" y1="50" x2="20" y2="130" stroke="black" stroke-width="1.5" />
                    <line id="leftBottomLine" x1="20" y1="170" x2="20" y2="250" stroke="black" stroke-width="1.5" />
                    <line id="leftEndTop" x1="10" y1="50" x2="30" y2="50" stroke="black" stroke-width="1.5" />
                    <line id="leftEndBottom" x1="10" y1="250" x2="30" y2="250" stroke="black" stroke-width="1.5" />
                    <text id="leftText" x="15" y="155" font-family="Arial" font-size="14">6'</text>


 <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="40" y1="280" x2="140" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="280" x2="300" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="40" y1="270" x2="40" y2="290" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="300" y1="270" x2="300" y2="290" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="285" font-family="Arial" font-size="14">6' 3"</text>




                    <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="65" y1="305" x2="140" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="305" x2="285" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="65" y1="295" x2="65" y2="315" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="285" y1="295" x2="285" y2="315" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="310" font-family="Arial" font-size="14">6' 3"</text>


  

</svg>

           `;
    }

    else if (filterType === 'finials') {
        // Add SVG structure for "Slide" filter
        svg.innerHTML = `

        
    <svg width="400" height="350">
  <!-- Circle to create the rounded top for the left side -->
  <circle cx="45" cy="47" r="5" fill="black" />

  <!-- Left side line with thicker stroke width and flat ends -->
  <line x1="45" y1="47" x2="45" y2="255" stroke="black" stroke-width="10" />

<line x1="60" y1="70" x2="50" y2="70" stroke="black" stroke-width="3" />


<line x1="62" y1="58" x2="62" y2="72" stroke="black" stroke-width="6" />

<line x1="60" y1="195" x2="50" y2="195" stroke="black" stroke-width="3" />


<line x1="62" y1="180" x2="62" y2="197" stroke="black" stroke-width="6" />

<!-- Finials top of the rectangle -->

<line x1="75" y1="50" x2="75" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="90" y1="50" x2="90" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="105" y1="50" x2="105" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="120" y1="50" x2="120" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="135" y1="50" x2="135" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="150" y1="50" x2="150" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="165" y1="50" x2="165" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="180" y1="50" x2="180" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="195" y1="50" x2="195" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="210" y1="50" x2="210" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="225" y1="50" x2="225" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="240" y1="50" x2="240" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="255" y1="50" x2="255" y2="40" stroke="black" stroke-width="2.5" />></line>
<line x1="270" y1="50" x2="270" y2="40" stroke="black" stroke-width="2.5" />></line>
<!-- Reactangle shape -->
<rect  x="65" y="50" width="220" height="200" stroke="black" stroke-width="4" fill="none" />
          
  <!-- Horizontal line inside the rectangle -->
                    <line id="innerLine" x1="65" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />


    <!-- Circle to create the rounded top for the right side -->
  <circle cx="295" cy="47" r="5" fill="black" />

  <!-- Right side line with thicker stroke width and flat ends -->
  <line x1="295" y1="47" x2="295" y2="255" stroke="black" stroke-width="10" />

   <!-- Left dimension lines -->
                    <line id="leftTopLine" x1="20" y1="50" x2="20" y2="130" stroke="black" stroke-width="1.5" />
                    <line id="leftBottomLine" x1="20" y1="170" x2="20" y2="250" stroke="black" stroke-width="1.5" />
                    <line id="leftEndTop" x1="10" y1="50" x2="30" y2="50" stroke="black" stroke-width="1.5" />
                    <line id="leftEndBottom" x1="10" y1="250" x2="30" y2="250" stroke="black" stroke-width="1.5" />
                    <text id="leftText" x="15" y="155" font-family="Arial" font-size="14">6'</text>


 <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="40" y1="280" x2="140" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="280" x2="300" y2="280" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="40" y1="270" x2="40" y2="290" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="300" y1="270" x2="300" y2="290" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="285" font-family="Arial" font-size="14">6' 3"</text>




                    <!-- Bottom dimension lines -->
                    <line id="bottomLineLeft" x1="65" y1="305" x2="140" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomLineRight" x1="195" y1="305" x2="285" y2="305" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndLeft" x1="65" y1="295" x2="65" y2="315" stroke="black" stroke-width="1.5" />
                    <line id="bottomEndRight" x1="285" y1="295" x2="285" y2="315" stroke="black" stroke-width="1.5" />
                    <text id="bottomText" x="155" y="310" font-family="Arial" font-size="14">6' 3"</text>


  

</svg>

           
            <!-- Add swing specific SVG structure here -->
        
        
           `;
    }

    else if (filterType === 'dual') {
        // Add SVG structure for "Slide" filter
        svg.innerHTML = `

        
     
 <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">

<!-- First part of the rectangle -->
    <rect id="mainRectPart1" x="65" y="50" width="105" height="200" stroke="black" stroke-width="4" fill="none" />

    <!-- Second part of the rectangle, positioned to the right with a gap of 10 pixels -->
    <rect id="mainRectPart2" x="180" y="50" width="105" height="200" stroke="black" stroke-width="4" fill="none" />

    <!-- First horizontal line inside the first part of the rectangle -->
    <line id="innerLinePart1" x1="65" y1="200" x2="170" y2="200" stroke="black" stroke-width="4" />

    <!-- Second horizontal line inside the second part of the rectangle -->
    <line id="innerLinePart2" x1="180" y1="200" x2="285" y2="200" stroke="black" stroke-width="4" />



            <line id="leftTopLine" x1="40" y1="50" x2="40" y2="130" stroke="black" stroke-width="1.5" />
            <line id="leftBottomLine" x1="40" y1="170" x2="40" y2="250" stroke="black" stroke-width="1.5" />
            <line id="leftEndTop" x1="30" y1="50" x2="50" y2="50" stroke="black" stroke-width="1.5" />
            <line id="leftEndBottom" x1="30" y1="250" x2="50" y2="250" stroke="black" stroke-width="1.5" />
            <text id="leftText" x="35" y="155" font-family="Arial" font-size="14">6'</text>
            <line id="bottomLineLeft" x1="65" y1="290" x2="140" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomLineRight" x1="195" y1="290" x2="285" y2="290" stroke="black" stroke-width="1.5" />
            <line id="bottomEndLeft" x1="65" y1="280" x2="65" y2="300" stroke="black" stroke-width="1.5" />
            <line id="bottomEndRight" x1="285" y1="280" x2="285" y2="300" stroke="black" stroke-width="1.5" />
            <text id="bottomText" x="155" y="295" font-family="Arial" font-size="14">6' 3"</text>
            <line id="verticalLine" x1="200" y1="50" x2="200" y2="250" stroke="black" stroke-width="8" visibility="hidden" />
       
</svg>
        
        
           `;
    }




    // Update the SVG based on the default or selected filter
    updateSVG(document.getElementById('vol').value);


}

