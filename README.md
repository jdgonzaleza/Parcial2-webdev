# Project Title

This web app was made as the final exam for the Webdev course at La Universidad de Los Andes (Colombia). The technologies used where: Meteor, ReactJs, d3, NextBus API, Google Maps API.

The main purpouse of the web site is to present through a d3 stack chart the distance difference between the buses in an specific route. NextBus API was used in order to obtain data in real time. 

## Getting Started

Clone or download the repository to your computer. As I used Google Maps API and Google's authentication system, you should create a developer app in order to get the API key that will be used for the development and usage of the web app. Please read and follow the instructions given by google in this site : https://developers.google.com/maps/?hl=en 

### Deployment

After getting your google's API key, you should create an enviromental variable in which you will store the API's Key. (as we are using meteor, you could also store the key in a settings.json file. 

Then you could start the application localy by installing al the packages and libraries.

```
export GOOGLE_MAPS_API="YourKey"

meteor npm install
meteor
```
The application will be runing at http://localhost:3000

### Creative Component

As said before, I used the Google Maps API to visulize the stops each bus made in San Francisco. Localy, the Application works perfectly, but when it was deployed in heroku, the API began to fail. It seems that Heroku can't reach the API Key that was configured previously.
  
```
Google Maps API error: MissingKeyMapError https://developers.google.com/maps/documentation/javascript/error-messages#missing-key-map-error.
```
I was not able to find a solution to the API/Heroku problem, so I decided to record a small video where yo could watch this functionality: https://www.youtube.com/watch?v=OSCbRV33h2Y&feature=youtu.be

### The Bug

I found two bugs in the code given by Professor John Guerra. The first one was that the widht of the stack bar chart was not defined...
The second: When the distances between the buses where calculated they where added and used in order to sort the routes distance. But the distance between the buses inside a route where not taken into acount when creating the chart. This is why I decided to sort the buses in each route so that the visualization could be better. 

## Authors

* **Juan Diego González** 



## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


