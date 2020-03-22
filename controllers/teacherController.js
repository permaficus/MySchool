"use strict"

const baseController = require('./controller')

class TeachersController {

    static render(request, response) {
        let pageSelector = request.params.selector || 'list';
        let page = `teachers_${pageSelector}`;

        // compiling callout after finishing update / create
        let callout = request.query.hasOwnProperty('adding') || 
                      request.query.hasOwnProperty('updating') ||
                      request.query.hasOwnProperty('deleting') 
                      ? request.query : '';

        let activeMenu, treeView;

        switch (pageSelector) {
            case 'list' : {
                baseController.retrieveData('teachers')
                    .then(result => response.render(page, {
                        data: result, 
                        activeMenu: 'teachers', 
                        treeView: 'list', 
                        callout: callout
                    }))
                    .catch(() => response.redirect('/error'))

            }; break;

            case 'add' : {
                // something awesome goes here
                baseController.insert('insert', 'teachers', request.body, null)
                    .then(redirect => response.redirect(redirect))
                    .catch(error => response.render('error', {error}))

            }; break;

            case 'delete' : {

                baseController.delete('delete', 'teachers', request.query.id)
                    .then(redirect => response.redirect(redirect))
                    .catch(() => response.redirect('/error'))

            }; break;

            default : {
                response.render(page, {activeMenu: 'teacher_reg', treeView: 'register', callout: callout})
            }
        }
    }
}

module.exports = TeachersController;