# Random motion generator

This is the source code for random motion simulation, as described in my [blog](https://www.sohamkamani.com/blog/2017/09/10/random-line-generation/)

## Running on your local system

You will need NodeJs and npm

Install rollup and http-server :

```
npm install -g rollup http-server
```

Run this command to generate the `bundle.js` script :

```
rollup -c
```

Run a server in the project directory:

```
http-server
```

and navigate to `http://localhost:8080`