import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import flash from 'connect-flash';
import cookieParser from 'cookie-parser';
import exphbs from 'express-handlebars';

// routes
import DefinitionRoute from 'definition/route/DefinitionRoute';
import AuthRoute from 'auth/route/AuthRoute';

class ExpressConfig {

  configureRoutes(app, config) {
    app.use('/definition', DefinitionRoute);
    app.use('/auth', AuthRoute);
  }

  configureView(app, config) {
    app.engine('.hbs', exphbs({ extname: '.hbs' }));
    app.set('view engine', '.hbs');
    app.use(express.static(`${__dirname}/../../public`));
    app.get('*', (req, res) => {
      res.render(`${__dirname}/../../public/index.hbs`, { bundleHost: config.client.bundleHost });
    });
  }

  configure(app, config) {
    app.use(cookieParser());
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(flash());

        // NOTE: order is important!!
    this.configureRoutes(app, config);
    this.configureView(app, config);

    const server = app.listen(process.env.PORT || '3000', '0.0.0.0', () => {
      console.log(`listening server on port ${server.address().port}`);
    });
  }
}

export const expressConfig = new ExpressConfig();
