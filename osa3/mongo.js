const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('add a person: node mongo.js password "First Last" number')
  console.log('list all persons: node mongo.js password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://dbuser:${password}@fs2019-auiij.mongodb.net/puhelinluettelo?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if( process.argv.length > 4 ) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(response => {
    console.log(`lisätään ${name} numero ${number} luetteloon`);
    mongoose.connection.close();
  })

} else {
  Person.find({}).then(result => {
    console.log('puhelinluettelo:')
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })
}

