"use strict"

/*  
    Import npm packages
*/ 
import * as express from 'express';
import * as massive from 'massive';
import * as moment from 'moment';
import * as dotenv from 'dotenv';

/*
    Import type interfaces
*/
import * as types from '../typeDefinitions/types';

/*=====================Configuration======================*/

dotenv.config({ path: '.env' });
let timeRouter = express.Router();

/*=====================Functions==========================*/

let clockIn = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let job = req.body.jobId 
  let time = req.body.time

  req.app.get('db').time.insert({
    job_id: job,
    clock_in: time
  }).then((time: types.ITimeRaw) => {
    res.send({success: true, timeId: time.id})
  })
  .catch((err: types.IError) => next(err))
}

let clockOut = (req: express.Request, res: express.Response, next: express.NextFunction) => {

  let job = req.body.jobId 
  let time = req.body.time
  
  req.app.get('db').time.update({
    job_id: job,
    clock_in: time
  }).then((time: types.ITimeRaw) => {
    res.send({success: true})
  })
  .catch((err: types.IError) => next(err))


}

/*=====================Helper Function==========================*/


/*===========================Endpoints============================*/

timeRouter.post('/clockin', clockIn);

export = timeRouter;