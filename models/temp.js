const Producers = require('./producers');

Producers.updateProducer({
    id: '1d29489f-07e4-471e-b448-e4e0ae833c65',
    bio: 'thriller'
}).then(console.log)
    .catch(console.error)