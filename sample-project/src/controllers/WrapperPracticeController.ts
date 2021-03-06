/**
 * Example Controller for the Overnight web-framework.
 *
 * created by Sean Maxwell Aug 26, 2018
 */

import * as expressAsyncHandler from 'express-async-handler';

import { OK, BAD_REQUEST } from 'http-status-codes';
import { ClassWrapper, Controller, Get, Wrapper } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { asyncWrapper, asyncFunction } from './other/wrapperFunctions';
import { Request, Response } from 'express';


@Controller('wrapper-practice')
export class WrapperPracticeController {


    @Get('async-wrapper/:id')
    @Wrapper(asyncWrapper)
    private async asyncGet(req: Request, res: Response) {
        const asyncMsg = await asyncFunction(req.params.id === 'make_it_fail');
        return res.status(OK).json({
            message: asyncMsg,
        });
    }


    @Get('async/:id')
    private async genericGet(req: Request, res: Response) {
        try {
            const asyncMsg = await asyncFunction(req.params.id === 'make_it_fail');
            return res.status(OK).json({
                message: asyncMsg,
            });
        } catch (err) {
            Logger.Err(err, true);
            return res.status(BAD_REQUEST).json({
                error: err,
            });
        }
    }


    @Get('async-third-party/:id')
    @Wrapper(expressAsyncHandler)
    private async asyncThirdParty(req: Request, res: Response) {
        const asyncMsg = await asyncFunction(req.params.id === 'make_it_fail');
        return res.status(OK).json({
            message: asyncMsg,
        });
    }
}


// tslint:disable-next-line:max-classes-per-file
@Controller('wrapper-practice-2')
@ClassWrapper(asyncWrapper)
export class WrapperPracticeController2 {


    @Get('async-wrapper/:id')
    private async asyncGet(req: Request, res: Response) {
        const asyncMsg = await asyncFunction(req.params.id === 'make_it_fail');
        return res.status(OK).json({
            message: asyncMsg,
        });
    }


    @Get('async-third-party/:id')
    private async asyncThirdParty(req: Request, res: Response) {
        const asyncMsg = await asyncFunction(req.params.id === 'make_it_fail');
        return res.status(OK).json({
            message: asyncMsg,
        });
    }
}
