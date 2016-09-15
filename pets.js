'use strict';
//part1
var fs = require('fs');
var path = require('path');
var petPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
    readPets();
} else if (cmd === 'create') {
    createPets();
} else {
    console.log(`Usage: ${node} ${file} [read | create]`);
    process.exit(1);
}

function readPets() {
    fs.readFile(petPath, 'utf8', function(readErr, data) {
        var index = process.argv[3];
        if (readErr) {
            throw readErr;
        }
        var pets = JSON.parse(data);
        //if index is more or less than existing indices or no input
        if (index > pets.length - 1 || index < 0 || index === undefined) {
            console.error(`Usage: ${node} ${file} ${cmd} INDEX`);
        } else {
            console.log(pets[index]);
        }
    });
}

function createPets() {
    fs.readFile(petPath, 'utf8', function(createErr, data) {
        if (createErr) {
            throw createErr;
        }
        var pets = JSON.parse(data);
        var AGE = process.argv[3];
        var KIND = process.argv[4];
        var NAME = process.argv[5];

        if (!AGE || !KIND || !NAME) {
            console.error(`Usage: ${node} ${file} ${cmd} AGE KIND NAME`);
            process.exit(1);
        }

        var pet = {
            age: parseInt(AGE),
            kind: KIND,
            name: NAME
        }
        pets.push(pet);

        var petsJSON = JSON.stringify(pets);

        fs.writeFile(petPath, petsJSON, function(writeErr) {
            if (writeErr) {
                throw writeErr;
            }
            console.log(pet);
        });
    });
}
