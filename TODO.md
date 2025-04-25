# RealEstatePrediction-FAF-242

## Must have functionalities 
- The analysis of mortgage potential
- Investment analysis in the real estate market, etc.

Depending on the investment capacity, amount, term, etc., calculate the profitability and/or repayment period of such an investment, etc.

### Translation of some terms

- investment capacity: maximum level of assets that could be managed in an investment strategy (how much money and risk)

### Problem Analysis
- The analysis of mortgage potential
	- We can take the data from price indexes that we found and we can estimate how much of a price lift it would give (approx.) *HERE WE CAN TRY TO USE EXTRAPOLATION*
	- We can estimate or calculate the mortgage percentage to being able to calculate in how much time we will return our money (or we can ask from user)
	- We can do these stuff for all wanted purchases  
- Investment analysis in the real estate market
	- My understanding is that we can somehow estimate a coefficient for the market growth/price increase to determine the market movement and see if investing in the field is safe/favorable  

## TECH-SIDE

Because we only want to extrapolate one dataset and the others don't really have anything and its pretty much static we can develop the back-end with no python parsing component or maybe one minimal script. The main functionality and program will focus on C-API implementation as extrapolation. On maths in the C side there is GSL for scientific math calculations such as interpolation/extrapolation. On the front-end side we can practically use  whatever we like since our team has experience with next/react we might use that.

### Getting the Data
- Good luck guy there is no useful data that is given to there only a few posts that you will have to extract the data manually (or with data scraping tool do not recommend this) we are a little fucked on this regard.
#### TL;DR
- Back-end
	- C with C-Kore for API and calculation with GSL
- Front-end
	- Probably next/react
- Automation
	- python


### Links to resources

- GSL reference https://www.gnu.org/software/gsl/doc/html/index.html
- Kore reference https://docs.kore.io/4.2.0/api/
- RPPI DATA https://www.bnm.md/ro/search?hashtags[0]=Indicele%20pre%C8%9Bului%20bunurilor%20imobile%20reziden%C8%9Biale