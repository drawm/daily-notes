Daily-Notes
===

Low tech note taking ~application~ scripts

### Requirements:
Should work on most "standart" linux distro
* `git`
* `date`
* `awk`
* A text editor (`EDITOR` environment variable need to be set)

## Usage

### Setup in two steps
* Clone this repo (`git clone git@github.com:drawm/daily-notes.git`)
* Move over to your own repo (you won't be able to push to https://github.com/drawm/daily-notes)

### Getting started
When you start your day, use `begin` to update your notes, create a new note file.
* All notes are located in the `notes/` folder.

#### Examples:
```bash
# Create a new note with the current date
./begin

# Create a new note for next friday
./begin 'next friday'
```

When you are done taking notes for the day, use `end` to save your notes and extract some sections for the next day.
```bash
./end
```

### Sections
Some sections are copied over to the next note you will create.
* `Todo`
* `Tomorrow`
* `Reminder`
* `Keep`

To create a sections, use the triple equal (`===`) delemiter under the section name.


#### Examples:
```
Todo
===
[ ] Something I need to do


Tomorrow
===
Tomorrow I need to remember this


Reminder
===
I need to remember this


Keep
===
For safe keeping
```

Sections are saved when you use `./end` to complete your notes for the day.

### Useful tips
* To quickly open yesterday's note, simply run `./yesterday`
* Same goes for tomorrow's note, simply run `./tomorrow`
* To create a note without updating syncing your files, use `./new` 
* To open a note without creating a new file and adding sections to it, use `./open`
* All scripts that open notes accepts a date as an argument to open the note file of that day.
    * `./open 'today'` (same as `./open`)
    * `./new 'last tuesday'`
    * `./tomorrow 'last sunday'` (kinda dumb but it works :shrug:)
    * `./yesterday 'next monday'` (kinda dumb but it works :shrug:)

