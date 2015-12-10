# DECK
## Release(/build/)
Main file: **index.html**
## Src(/src/)
* ```jade/``` -- jade templates
* ```less/``` -- less css source files
* ```js/``` -- javascript files

## Features
* Reading config card list from ```/build/data/cards.js```
* Two card types: wide and narrow
* Controls(hover on top card):
  * **click** -- remove top card
  * **shift+click** -- add narrow card
  * **shift+alt+click** -- add wide card
* History(back|forward) for card actions