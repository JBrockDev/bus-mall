# Bus Mall

## Project Outline

This was a Code 201 project completed while attending the Code Fellows coding bootcamp. We were given a wireframe to model the website from and a folder of images. The instructions were to make a website that has three products displayed to a user at any given time. The user is to click on their choice of the three products and then another set of three is to appear. This is supposed to happen until there have been twenty-five choices made. After twenty-five choices are made, then results should be viewable. The data was originally to be given in text format, but later directions were given to utilize Chart.js to display data in chart form as well. Later, local storage was to be added to keep track of the data through different collection sessions. 

Modifications I made outside of the directions given:
- Both bar and pie chart options for all statistics.
- Individual bar and pie chart options for each product.
- Completely unique product display through each set of 25 products shown to give each product equal chance of being viewed.
- On page load, any products which have been viewed less than the highest viewed product(s) will be displayed first to balance out views between many sessions. This caused the highest spread to ever reach 3 between highest and lowest and most of the time it's a spread of 1-2, which some increments completely even the views between all products.