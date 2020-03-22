"use strict"

const baseController = require('./controller')

class StudentsController {

    static render(request, response) {

        let pageSelector = request.params.selector || 'list';
        let page = `students_${pageSelector}`;

        // compiling callout after finishing update / create
        let callout = request.query.hasOwnProperty('adding') || 
                      request.query.hasOwnProperty('updating') ||
                      request.query.hasOwnProperty('deleting') 
                      ? request.query : '';

        let activeMenu = '', treeView = ''

        switch (pageSelector) {
            case 'list' : {

                baseController.retrieveData('students')
                    .then(result => response.render(page, {
                        data: result, 
                        activeMenu: 'students', 
                        treeView: 'list', 
                        callout: callout
                    }))

                    .catch(error => response.redirect('/error'))

            }; break;

            case 'delete' : {

                baseController.delete('delete', 'students', request.query.id)
                    .then(redirect => response.redirect(redirect))
                    .catch(() => response.redirect('/error'))

            }; break;

            case 'add' : {
                // something awesome goes here\
                baseController.insert('insert', 'students', request.body, null)
                    .then(redirect => response.redirect(redirect))
                    .catch(error => response.render('error', {error}))

            }; break;

            default : {
                response.render(page, {activeMenu: 'student_reg', treeView: 'register', callout: callout})
            }
        }
    }
}

module.exports = StudentsController;