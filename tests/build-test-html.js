const fthtml = require('fthtml');
const fs = require('fs');

const testSpecs = ['SpecRunner', 'HeadlessSpecRunner']

testSpecs.forEach(async e => {
    const html = await fthtml.renderFile(`./tests/${e}`);

    fs.writeFile(`./tests/${e}.html`, html, function (err) {
        if (err) return console.log(err);
    });

})
