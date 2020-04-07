Daily-Notes
===

Low tech note taking ~application~ scripts

### Requirements:
Should work on most "standard" linux distro
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
./note-begin

# Create a new note for next friday
./note-begin 'next friday'
```

When you are done taking notes for the day, use `end` to save your notes and extract some sections for the next day.
```bash
./note-end
```

### Sections
Some sections are copied over to the next note you will create.
* `Todo`
* `Tomorrow`
* `Reminder`
* `Keep`

To create a section, use the triple equal (`===`) delemiter under the section name.


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

Sections are saved when you use `./note-end` to complete your notes for the day.

### Useful tips
* To quickly open yesterday's note, simply run `./note-yesterday`
* Same goes for tomorrow's note, simply run `./note-tomorrow`
* To create a note without updating or syncing your files, use `./note-new` 
* To open a note without creating a new file and adding sections to it, use `./note-open`
* All scripts that open notes accept a date as an argument to open the note file of that day.
    * `./note-open 'today'` (same as `./note-open`)
    * `./note-new 'last tuesday'`
    * `./note-tomorrow 'last sunday'` (kinda dumb but it works :shrug:)
    * `./note-yesterday 'next monday'` (kinda dumb but it works :shrug:)

