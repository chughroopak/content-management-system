# Content Management System

**Content Management System** is an application to share posts with your friends, like and comment on your friends posts and interact with them.
The user is required to do a sign-up/sign-in before they can post or react on any of the posts shared by other users. However, all posts are public and still can be viewed by anyone using the home page of the application.
On the home page users can go to sign-up or sign-in option to get started with posting content on the website and react on other users' posts.

## Technology Stack

The application uses _Node.js_ as a backend with _Express_ router to handle all the api requests. It also uses _BcryptJS_ to handle password encryption and _MongoDB Atlas_ as the NoSQL database. The user authentication is handled using _JsonWebToken_ and _Passport_ with _JWT_ strategy.
The front-end is designed using _ReactJS_ and _Bootstrap_ to provide a clean component based UI.

## Setup

To setup the application in production environment the user needs to setup the following two environment variables before running the startup command.
|**Environment Variable**| Value|
|--|--|
|**mongoURI**| Mongo DB database URL|
| **secretOrKey** | This can be any string (e.g., SECRET) |

The environment should also have an instance on Node.js installed.
