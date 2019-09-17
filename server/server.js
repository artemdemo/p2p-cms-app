const GUN_WEB_SERVER = `GUN_WEB_SERVER`;

// `MAIN_APP` at this point defined by the user
// `MAIN_APP=true npm run electron-dev`
const isMainApp = process.env.MAIN_APP === 'true';

if (isMainApp) {
    require('./server-main');
} else {
    require('./server-secondary');
}
