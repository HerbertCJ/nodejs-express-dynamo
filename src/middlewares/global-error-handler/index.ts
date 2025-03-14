import { Request, Response, NextFunction } from 'express'

export default function errorHandlerMiddleware() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return (error: any, req: Request, res: Response, next: NextFunction) => {
        const status = error.status || 'error'

        // logger(`[Global Error Handler] ${error.message || error.name}`, { error, stack: error.stack })

        res.status(error.statusCode || 500).json({
            status,
            message: error instanceof Error ? error.message : String(error),
        })
    }
}
