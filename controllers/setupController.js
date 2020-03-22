"use stric"

const config = require('../config')

class SetupController {

    static render(request, response) {
        switch (request.params.selector) {
            
            case 'database' : {
                response.render('setup_database')
            }; break;
            
            case 'menu' : {
                // setup menu
                response.render('setup_menu', new Postgres());
            }; break;

            case 'createdb' : {
                
                config.Job.createDB(request.body)
                    .then(() => response.redirect(`/setup/menu?dbname=${request.body.database}&${request.body.pg_db_name}`))
                    .catch(() => response.redirect('/error'))
            }; break;
            
            case 'begin' : {
                // begin setup
                config.Job.initializeSetup(request.body)
                    .then(() => response.redirect('/'))
                    .catch(() => response.redirect('/error'))
            }; break;

            default : {
                response.render('setup')
            }
        }
    }

}

class Postgres extends config.DatabaseSetup {
    constructor(ListeningPort = 3000, User = 'postgres', databaseName='', Password='postgres', DatabasePort = 5432, HostName = 'localhost', DefaultDB = 'postgres', dbExist = 'yes') {
        super(ListeningPort, User, databaseName, Password, DatabasePort, HostName, DefaultDB, dbExist)
    }
}

module.exports = SetupController;