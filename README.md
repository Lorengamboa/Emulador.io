# Emulador.io
Nodejs console handheld Social Network

## Index
1. [Requirements](#requirements)
2. [How to install](#install)
3. [How to consume API](#requirements)
4. [supported console handheld](#consoles)
5. [How to collaborate](#collaborate)

## Requirements <a name="requirements"></a>
* MongoDB [install now!](https://www.mongodb.com/download-center?jmp=nav#community)
* Node.js > v6.0 [install now!](https://nodejs.org/en/download/)

## How to install <a name="install"></a>
* npm install
* rename the file auth.example.js to auth.js
* npm start
* Server will run on port 3000
* Go to localhost:3000

## Supported handheld consoles<a name="consoles"></a>
* [GameBoy](http://162.243.192.10:3000/gameboy)
* [GameBoy color](http://162.243.192.10:3000/gameboy-color)
* [GameBoy advance](http://162.243.192.10:3000/gameboy-advance)
* [NES](http://162.243.192.10:3000/nes)
* [SNES](http://162.243.192.10:3000/snes)

## How to consume games API<a name="requirements"></a>
| Endpoint    | HTTP Verb    | Description                      |
| ------------|--------------|----------------------------------|
| api/gb/:id  | GET          | Single GameBoy game              |
| api/gbc/:id | GET          | Single GameBoy Color game        |
| api/gba/:id | GET          | Single GameBoy Advance game      |
| api/nes/:id | GET          | Single NES game                  |
| api/snes/:id| GET          | Single SNES game                 |

## How to collaborate<a name="collaborate"></a>
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D
