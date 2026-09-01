const sharp = require('sharp')

sharp('./src/assets/butter.jpg')
  .webp({ quality: 80 })
  .toFile('./src/assets/butter.webp')
  .then(() => console.log('Butter image converted successfully!'))
  .catch((error) => {
    console.error('Conversion failed:', error)
    process.exit(1)
  })