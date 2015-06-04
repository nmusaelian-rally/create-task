Ext.define('CustomApp', {
    extend: 'Rally.app.App',

    launch: function() {
        //get the model
        this.getModel().then({             //then create a task
            success: this.createTask,
            scope: this
        }).then({                          //then read the task
            success: this.readRecord,
            scope: this
        }).then({                          //then handle overall success or failure
            success: function(result) {
                //great success!
                console.log('result', result);
            },
            failure: function(error) {
                console.log('oh noes!', error); 
            }
        });
    },

    getModel: function() {
        return Rally.data.ModelFactory.getModel({
            type: 'Task'
        });
    },

    createTask: function(model) {
        console.log('creating a task...');
        var record = Ext.create(model, {
            Name: 'mytask',
            WorkProduct: '/hierarchicalrequirement/36566618167', //Task gets is project from the WorkProduct
            Owner: this.getContext().getUser()._ref
        });
        return record.save();
    },

    readRecord: function(record) {
        return record.self.load(record.getId(), {
            fetch: ['Name', 'Owner', 'Workproduct']
        });
    }
});
