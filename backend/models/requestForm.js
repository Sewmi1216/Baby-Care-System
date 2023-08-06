const mongoose = require('mongoose');

const schema = mongoose.Schema;

const requestFormSchema = new schema({
    isAccept: {
        type: Boolean,
        default: false,
    },
    workExpectation: [{
        date: {
            type: Date,
            required: true
        },
        fromTime: {
            type: String,
            required: true
        },
        toTime: {
            type: String,
            required: true
        }
    }],
    numberofBabies: {
        type: Number,
        required: true
    },
    babyDetails: [{
        age: {
            type: Number,
            required: true
        },
        gender: {
            type: String,
            // enum: ['male', 'female'],
            required: true
        }
    }],
    specialNeeds: {
        type: String,
        required: true,
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