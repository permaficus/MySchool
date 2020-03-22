"use strict"

const baseController = require('./controller')

class ClassController {

    static render(request, response) {
        let pageSelector = request.params.selector || 'list';
        let page = `class_${pageSelector}`;
        // compiling callout after finishing update / create
        let callout = request.query.hasOwnProperty('adding') || 
                      request.query.hasOwnProperty('updating') ||
                      request.query.hasOwnProperty('deleting') 
                      ? request.query : '';

        let activeMenu, treeView, subject, instructor;

        switch (pageSelector) {
            case 'list' : {

                baseController.retrieveData('class')
                    .then(result => response.render(page, {
                        data: result, 
                        activeMenu: 'class', 
                        treeView: 'list', 
                        callout: callout
                    }))
                    
                    .catch(() => response.redirect('/error'))

            }; break;

            case 'add' : {
                // something awesome goes here
                
                baseController.insert('insert', 'class', request.body, null)
                    .then(redirect => response.redirect(redirect))
                    .catch(() => response.redirect('/error'))

            }; break;

            case 'delete' : {

                baseController.delete('delete', 'class', request.query.id)
                    .then(redirect => response.redirect(redirect))
                    .catch(() => response.redirect('/error'))
            
            }; break;

            default : {
                let teachersData = '';

                baseController.retrieveData('teachers')
                    .then(result => teachersData = result)
                    .catch(error => response.render('error', {error}))

                baseController.retrieveData('subjects')
                    .then(result => response.render(page, {
                        subject: result, 
                        instructor: teachersData, 
                        callout: callout, 
                        activeMenu: 'class_reg', 
                        treeView: 'register'
                    }))

                    .catch(error => response.render('error', {error}))
            }
        }
    }
}

module.exports = ClassController;