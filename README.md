## Welcome to Eye Glass Management Server

### Live link of this server : https://glass-management-inventory-server.vercel.app/

### Documentation of this server : https://documenter.getpostman.com/view/27373681/2sA35Baj16

### Here are the steps to run the application in your local environment.

1 . Clone the repository [```git clone {repository-url}```]

2 . Run the command to install all the dependencies `npm install`

3 . Create a `.env` file and write these values

```


PORT=7000                           // Write your port
DB_URI=                             // Write your database url
SALT_ROUNDS=                        // Write salt rounds for password encryption
JWT_ACCESS_SECRET=                  // write your JWT access token
JWT_ACCESS_EXPIRES=                 // Write JWT access tokens expire time
CLOUD_NAME=                         // Write you cloudinary cloud name
API_KEY=                            // Write you cloudinary api key
API_SECRET=                         // Write you cloudinary api secret


```

4 . Now, write this command to build the application for running. Write the command `npm run build` to build.

5 . Then run this command `npm run start:prod` to start the server.

#### Now go the this address of your browser `http://localhost://7000` to see the output.
