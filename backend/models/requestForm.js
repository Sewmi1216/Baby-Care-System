const mongoose = require('mongoose');

const schema = mongoose.Schema;

const requestFormSchema = new schema({
    parent: {
        type: schema.Types.ObjectId,
        ref: 'Parent',
    },
    Babysitter: {
        type: schema.Types.ObjectId,
        required: true,
    },
    isAccept: {
        type: Number,
        default: -1,
    },
    workExpectation: [{
        date: {
            type: String,
            required: false,
        },
        fromTime: {
            type: String,
            required: false
        },
        toTime: {
            type: String,
            required:false,
        }
    }],
    // numberofBabies: {
    //     type: Number,
    //     required: false,
    // },
    babyDetails: [{
        years: {
            type: Number,
            required: true
        },
        months: {
            type: Number,
            required: true
        },        
        gender: {
            type: String,
            required: true,
        }
    }],
    specialNeeds: {
        type: String,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now // Automatically set the current date when the document is saved
    },
    reason: {
        type: String,
        default: null
    }
})

const RequestForm = mongoose.model("RequestForm", requestFormSchema);

module.exports = RequestForm;

/* 
    const newRequestFormData = {
      workExpectation: [
        {
          date: new Date('2023-08-06'),
          fromTime: '10:00 AM',
          toTime: '3:00 PM',
        },
        {
          date: new Date('2023-08-08'),
          fromTime: '2:30 PM',
          toTime: '4:00 PM',
        },
      ],
      numberofBabies: 1,
      babyDetails: [
        {
            age: 1,
            gender: 'male',
        }
      ],
      specialNeeds: 'None',
    };
*/