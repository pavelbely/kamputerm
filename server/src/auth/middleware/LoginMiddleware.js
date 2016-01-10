'use strict';

import passport from 'passport';

export function ensureAuthenticated(req, res, next) {
    console.log(`is autheticated ${req.isAuthenticated()}`);
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).send('not authenticated');
}