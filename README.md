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

### Setup in three simple steps
* Clone this repo (`git clone git@github.com:drawm/daily-notes.git`)
* Create a separate repository to hold your notes because you won't be able to push to https://github.com/drawm/daily-notes)
* Run setup script `note-setup`

The setup script will ensure that your notes folder is properly created and will add a bunch of aliases to `$PATH`. This will allow you to manage your notes from any location in the terminal.

### Getting started
When you start your day, use `note-begin` to update your notes, create a new note file.

* All notes are located in the `notes/` folder, relative to the root folder of your repository created in the setup.

#### Examples:
```bash
# Create a new note with the current date
note-begin

# Create a note for a specific date
note-begin 2022-04-21

# When you are done taking notes for the day, use the `note-end` alias to save your notes and extract some sections for the next day.
note-end
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

Sections are saved when you use `note-end` to complete your notes for the day.

### Useful tips
* To quickly open yesterday's note, simply run `note-yesterday`
* Same goes for tomorrow's note, simply run `note-tomorrow`
* To create a note without updating or syncing your files, use `note-new` 
* To open a note without creating a new file and adding sections to it, use `note-open`
* All scripts that open notes accept a date as an argument to open the note file of that day.
    * `note-open 'today'` (same as `./note-open`)
    * `note-new 'last tuesday'`

## Permissions
This project need to be able to read and write files. For convenience, the `$HOME` environment variable is also needed.

Theses 3 flags are needed to use `daily-notes`:
* `--allow-read`
* `--allow-write`
* `--allow-env`

## Contribution
Most of the codebase is being rewritten in [deno](https://deno.land).
Net new features should be written using TS. 


### Tests
Tests are run in a docker container to freely change the file system without impacting the host environment.

You can run tests outside of docker but it might break your own daily-notes.

Build the docker image
```bash
docker build . -t daily-notes
``` 

And run the tests
```bash
docker run -v $PWD:/daily-notes daily-notes test --allow-env --allow-read --allow-write --unstable 
```
