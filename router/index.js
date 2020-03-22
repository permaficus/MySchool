const students = require('../controllers/studentController');
const teachers = require('../controllers/teacherController');
const classes = require('../controllers/classController');
const subjects = require('../controllers/subjectController');
const setup = require('../controllers/setupController')
const routes = require('express').Router();
const fs = require('fs');


// routes.get('/index/:assetID/:selector/:pageID:query', page.render)

routes.get('/students/:selector', students.render);
routes.get('/students/', students.render)
routes.post('/students/:selector', students.render);

routes.get('/teachers/:selector', teachers.render);
routes.get('/teachers/', teachers.render)
routes.post('/teachers/:selector', teachers.render)

routes.get('/subjects/:selector', subjects.render);
routes.get('/subjects', subjects.render)
routes.post('/subjects/:selector', subjects.render);

routes.get('/class/:selector', classes.render);
routes.get('/class', classes.render)
routes.post('/class/:selector', classes.render);

// setup page
routes.get('/setup/:selector', setup.render)
routes.get('/setup', setup.render)
routes.post('/setup/:selector', setup.render)


// error page
routes.get('/error', (request, response) => {
    response.render('error', {activeMenu: 'error', treeView: 'error'});
})

const {activeMenu, treeView} = 'home'
routes.get('/', (request, response) => {
    const check = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

    if (check.db_created === 'no') {
        response.render('setup');
    } else {
        response.render('index', {activeMenu: activeMenu, treeView: treeView});
    }
})

routes.get('*', (request, response) => {
    response.status(404).render('404', {activeMenu: 'error', treeView: 'error'})
})

module.exports = routes;