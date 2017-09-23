"use strict"

/*  
    Import npm packages
*/ 
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as moment from 'moment';
import * as massive from 'massive';
import * as express from 'express';  

/*  
    Import controllers
*/ 
import * as timeTracker from './controllers/timeTracker';
import * as addJob from './controllers/addJob';

/*  
    Import type interfaces
*/ 
import * as types from './typeDefinitions/types.d';

/*
    Export WebApi Class
*/
export class WebApi 
{

  constructor(
    private app: express.Express,
    private port: number
  )
  {
    dotenv.config({ path: '.env' });
    this.configureMiddleware(app);
    this.configureRoutes(app);
  }

  /**
   * 
   * @param app 
   */
  private configureMiddleware(app: express.Express)
  {
    app.use(bodyParser.json());
    massive(process.env.DB_CONNECT).then(db => {
      app.set('db', db);
    })
  }

  /**
   * Configure Routes
   * 
   * @description
   * @param app 
   */
  private configureRoutes(app: express.Express)
  {
    app.use('/time', timeTracker);
    app.use('/job', addJob);

    app.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
      req.app.get('db').jobs.find().then((jobs: types.IJobsRaw) => {
        res.status(200).send({success: true, jobs: jobs})
      }).catch((err: types.IError) => next(err))
    })
  }

  /**
   * 
   * @description
   */
  public run() 
  {
    this.app.listen(this.port, () => {
      console.log('Listening on ', this.port)
    }) 
  }
  
}