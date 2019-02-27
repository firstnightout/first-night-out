First Night Out
=======

## Purpose

The purpose of this project was to approach building a product in a new way. We strove out to build a website mobile-first, with React Hooks (which came out the week of the inception of this project), and learn several components of the Google Maps APIs.

## About the Site

First Night Out was inspired by DevMountain. We noticed that there were a lot of people who had come from so many different places and were experiencing the city for the first time. We aimed to create a product that would help people get to truly know and hopefully appreciate the experiences that new places get to offer. Out of this came First Night Out.

## Technologies Used
For our technologies, we planned on using React, Firebase, Express, and Node.js. However, we also wanted to try something new with this project. Firstly we understood that our idea's primary platform should be mobile. It makes much more sense for users to be able to move around while using our product since the goal is to get users to go out and try new places. Thus we went mobile first with the project when it came to design and UX. In addition, a couple days before we started on this, Facebook released a big new update for React: Hooks. Hooks allow us to store state in functional components. We saw this and challenged ourselves to build the entire project using just functional components with hooks. Lastly, due to how many places, restaurants, shops, music venues, etc. there are in the world, we quickly realized we were going to need to bring in a lot of external data to help us. We deferred this duty to the Google Maps APIs. We had never used the APIs before and it became clear that this data was going to be such a huge chunk of our project. Nevertheless, we proceeded to learn how to use these APIs as we went.

## Pictures

![Login Screen](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Flogin_screen_fno.png?alt=media&token=f35d562d-b329-4583-80e5-798d976c79e9)

Users can create accounts and login allowing them to have unique, tailored experiences to them.

![Home Screen](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Fhome_screen_fno.png?alt=media&token=aaf0cc82-88ce-4f7a-88ce-d34491fe99fa)

On the home screen they are presented with suggestions for nights out based on their current location. We used to Geolocation and Geocoding API for this.

![Side Menu](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Fside_menu_fno.png?alt=media&token=85b54d28-9fe0-49ae-948b-129ac416ebc6)

As part of our adherence to mobile-first, we went ahead and built this sweet side menu.

![Venue Card](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Fvenue_card_fno.png?alt=media&token=ead0d5d4-a071-4580-868b-2eabf447b444)

Data in the project is typically comprised of either places or routes. Routes are collections of places, the main meat of the project. Places are the actual stops along the routes which we created using the Places API from Google. The above is an example of a place.

![Big Route](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Fbig_route_fno.png?alt=media&token=df366735-6700-4ee9-8885-37a514e8de93)

And here is an example of a route.

![Map](https://firebasestorage.googleapis.com/v0/b/this-is-just-for-my-github.appspot.com/o/first-night-out%2Fmap_fno.png?alt=media&token=2533f3de-49fe-43c7-899b-66bf82b53178)

Once selecting a route, a user can bring up a display of what the route would actually look like, so that they can get an idea of where they would have to go.

## Contact
This project was built by Daniel Dominguez, Jeremy Scott and Mykenzie Rogers. If you have questions, advice, suggestions, or would like to reach out to us our emails are ddominguez20.dd@gmail.com, jeremylscott@gmail.com, and mykenzierogers@gmail.com respectively.
