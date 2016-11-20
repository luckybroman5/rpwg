#!/bin/bash

NAME=$1

mkdir $NAME
cd $NAME
echo "'use strict'; \nmodule.exports = require('${NAME}');" > index.js
echo "'use strict'; \n\n//Deps\n\n\n//Project Deps\n\n\n//Main\n\n\nclass ${NAME} {\n   constructor(){\n      //\n   };\n}\n\nmodule.exports = ${NAME};" > $NAME.js