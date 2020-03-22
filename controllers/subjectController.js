"use strict"

const baseController = require('./controller')

class SubjectController {

    static render(request, response) {
        let pageSelector = request.params.selector || 'list';
        let page = `subjects_${pageSelector}`;

        // compiling callout after finishing update / create
        let callout = request.query.hasOwnProperty('adding') || 
                      request.query.hasOwnProperty('updating') ||
                      request.query.hasOwnProperty('deleting') 
                      ? request.query : '';

        let activeMenu, treeView;

        switch (pageSelector) {
            case 'list' : {
                
                baseController.retrieveData('subjects')
                    .then(result => response.render(page, {
                        data: result, 
                        activeMenu: 'subjects', 
                        treeView: 'list', 
                        callout: callout
                    }))
                    .catch(() => response.redirect('/error'))

            }; break;

            case 'add' : {
                // something awesome goes here
                baseController.insert('insert', 'subjects', request.body, null)
                    .then(page => response.redirect(page))
                    .catch(() => response.redirect('/error'))
            }; break; 

            case 'delete' : {

                baseController.delete('delete', 'subjects', request.query.id)
                    .then(redirect => response.redirect(redirect))
                    .catch(() => response.redirect('/error'))

            }; break;

            default : {
                response.render(page, {activeMenu: 'subject_reg', treeView: 'register', callout:callout})
            }
        }
    }
}

module.exports = SubjectController;