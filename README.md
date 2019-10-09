# Weather Application
This ia an Angular Web App application with Angular Material for the core components. Also, it uses Googles autocomplete service to fetch addresses and search terms and OpenWeather API to fetch the weather.

## Requirements
- Node.js version 8.x or 10.x
- Recent npm(node package manager)

## To install Angular Cli run:

```
npm install -g @angular/cli
```
More info: https://angular.io/guide/quickstart

## To setup the dependencies run:

```
npm install
```

## To run the app:

```
ng serve --open
```
Navigate to `http://localhost:4200/` and try the application(Make sure you have the Backend running)

## Sample tests
- Taj Mahal **(Touristic Attraction)**
- Berlin **(City)** 
- Japan, Tokyo, Chiyoda City, Marunouchi, 1 Chome−5, marunouchi house **(Specific address)** 

**IMPORTANT**: The Weather Open API used in this app has a bad support for Zip Code weather requests 
depending on the country. Countries like Brazil are not well supported. US, Germany, Japan seem more realiable.
More about that on: https://openweathermap.desk.com/customer/portal/questions/16681528--not-found-city-response-for-all-api-calls

## Bonus features
- Autocomplete to enhance user experience
- Support to generic places, cities, business
- Angular theming applied, the whole website can be controlled exporting a material theme at styles.scss
- 18 Weather icons to represent the different weathers in the table

## Next steps, improvement points:
- Caching is working directly on the component, a more elegant solution is to use [HTTP Interceptor](https://angular.io/api/common/http/HttpInterceptor) in the service.
- Extend the user feedback for all kinds of error
- Use [Data Source CDK](https://material.angular.io/components/table/overview#datasource) as a DataSource instead of JSON to allow better dynamics/perfomance while interacting with the MaterialTable
- Adding front ends testing with karma/jasmine 
- Add sticky header and paginator to Table
- Add possiblity to toggle the temperature unit clicking on it
- Provide address support when clicking on button

### Observations:
The described coding task required the developer to fetch the ZipCode when the user provided an specific address, and that works and was implemented exactly like that. However, with that the user has to always provide a street/specific address to get a ZipCode. That said, to make the experience better a second routine to find an approximate Zipcode for generic places like cities and business was implemented as well. 


