import { createServer } from 'http'
import express from "express";
import { parse } from 'url'
import PostgressPool from "./postgresPool";
import * as next from "next";
import UserRouter from "./routes/user.router";

// import * as express from 'express';
import * as bodyParser from "body-parser";

var passport = require("passport");
// var request = require("request");
var session = require("express-session");
// var path = require("path");
const nextAuth = require('next-auth')
const nextAuthConfig = require('./next-auth.config')

const routes = {
	// admin:  require('./routes/admin'),
	account: require('./routes/account')
}

const pool = PostgressPool;

// const db = require('./queries');

const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare()
	.then(() => {
		return nextAuthConfig();
	})
	.then(nextAuthOptions => {
		// Pass Next.js App instance and NextAuth options to NextAuth
		// Note We do not pass a port in nextAuthOptions, because we want to add some
		// additional routes before Express starts (if you do pass a port, NextAuth
		// tells NextApp to handle default routing and starts Express automatically).
		return nextAuth(nextApp, nextAuthOptions)
	})
	.then((nextAuthOptions) => {

		const express = nextAuthOptions.express;
		const expressApp = nextAuthOptions.expressApp;
		// const server = express()

		routes.account(expressApp, nextAuthOptions.functions);

		expressApp.use(require("cookie-parser")());
		expressApp.use(session({ secret: "mySecretKey" }));
		expressApp.use(passport.initialize());
		expressApp.use(passport.session());

		expressApp.use(bodyParser.json());
		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(loggerMiddleware);

		expressApp.use('/api/user', UserRouter);

		// expressApp.get('/users', db.getUsers)
		// expressApp.get('/users/:id', db.getUserById)
		// expressApp.post('/users', db.createUser)
		// expressApp.put('/users/:id', db.updateUser)
		// expressApp.delete('/users/:id', db.deleteUser)

		expressApp.get('/a', (req: any, res: any) => {
			return res.send({ a: " AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " });
		})

		expressApp.get('*', (req: any, res: any) => {
			return handle(req, res)
		})

		expressApp.listen(port, (err: any) => {
			if (err) throw err
			console.log(`> Ready on http://localhost:${port}`)
		})
	})

// const port = 3000;
// const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()

// app.prepare()
// .then(() => {
//   const server = express()

//   server.get('/a', (req: any, res: any) => {
//     return res.send({ a: " AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA " });
//   })

//   server.get('*', (req: any, res: any) => {
//     return handle(req, res)
//   })

//   server.listen(port, (err:any) => {
//     if (err) throw err
//     console.log(`> Ready on http://localhost:${port}`)
//   })
// })

function loggerMiddleware(request: express.Request, response: express.Response, next) {
	console.log(`${request.method} ${request.path}`);
	next();
}