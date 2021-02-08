Daily-Notes
===

Low tech note taking ~application~ scripts

### Requirements:
Should work on most "standard" linux distro
* `git`
* `gnu date` (For MacOS, get gnudate via `brew install coreutils`)
* `awk`
* A text editor (`EDITOR` environment variable need to be set)
* `bash` or `zsh` for autocompletion

## Usage

### Setup
```
TLDR:
Get `daily-notes`, create your note folder and call the setup script
Change path to fit your needs or keep them as-is.
```

#### Step by steps
* Create your note folder
    - `mkdir -p $HOME/.my-notes`
    - `cd $HOME/.my-notes`
    - `git init`
* Get `daily-notes`
    - Make sure the parent directory exist `mkdir -p $HOME/.bin`
    - Clone the repo `git clone git@github.com:drawm/daily-notes.git $HOME/.bin/daily-notes`
* Setup Daily-Notes
    - Call `note-setup` locate in the repo you clonned
    - `cd $HOME/.bin/daily-notes`
    - `./note-setup $HOME/.my-notes no`
    - Follow the script instructions to add path mapping to your rc file
* All done!

### Note - Getting started
`note` is used to quickly create & edit personnal notes.
Usage is simple, `note [category [sub-category]] name`
Notes must have:
* At most 2 levels of category.
* A name.

When editing a note for the first time, a file will be created with a title, timestamp and signature.

Calling `note` with the same argument will re-open the previously note.

Notes will be automatically commited to git when done editing.
If no change was made, the note isn't commited.

If the new is new and wasn't edited, it is removed.
This is to prevent creating files when making typos.

### Journal - Getting started
Daily notes are managed through the `journal` command.
`journal` has 4 possible action (`begin`, `open`, `end`, `new`) and they all accept a date as argument
If no date is provided, it will use today's date as default.


When you start your day, use `begin` to create your note for today.
At the end of the day, use `end` to save your notes sections and commit to git.

#### Examples:
```bash
# Create a new note with the current date
journal begin

# Create a new note for next friday
journal begin 'next friday'
```

When you are done taking notes for the day, use `end` to save your notes and extract some sections for the next day.
```bash
journal end
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

Sections are saved when you use `journal end` to complete your notes for the day.

### Useful tips
* To create a note without updating or syncing your files, use `journal new`
* To open a note without creating a new file and adding sections to it, use `journal open`
* To quickly open yesterday's note, simply run `journal open yesterday`
* All scripts that open notes accept a date as an argument to open the note file of that day.
    * `journal open 'today'` (same as `journal open`)
    * `journal new 'last tuesday'`
    * `journal open 'last sunday'`
    * `journal new 'next monday'`

## Permissions (Deno)
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

TODO
===
* Config loading is convoluted and possibly over engineered
    * args can be sources from env & cli arguments
    * config is from the user configuration file only
    * Distinction between en two is important, do not allow overlap for now (might be added later)
* Make `test` script (& update the doc/readme)
* Migrate everything to deno
  * Keep the oppening of the editor in bash
    * Needed for now as Deno does not properly handle subprocess
    * Can't open editors through deno :(
    * Maybe this pr will fix it? https://github.com/denoland/deno/pull/5836
  * Keep `note-setup` for last as it will require more thinking
  * Use `deno install` if possible to get the base binary instead of cloning the repo

## New features
* [Feat]((tag)) [ ] Add support for tags (used for search and linking things together
  * Meta data should be hidded form the end html
  * Reuse link syntax?
  * [display name]((double,parentesis,for,tags))
  * Do a poc and start using it, worst case scenario, write a converter to move to another syntax
  * Foam uses [[]], its plain text and will not be capture my mk converter.
* [Feat]((deno,new,project)) [ ] `note project new 'project name'` create project
* [Feat]((deno,new,project)) [ ] `note project [list] 'project name'` list notes
* [Feat]((deno,new,project)) [ ] `note project 'project name' 'note name'` open/create note
* [Feat]((deno,new,project)) [ ] `note project [list]` list projects
* [Feat]((deno,new,wiki)) [ ] `note wiki new 'project name'` create project
* [Feat]((deno,new,wiki)) [ ] `note wiki [list] 'project name'` list notes
* [Feat]((deno,new,wiki)) [ ] `note wiki 'project name' 'note name'` open/create note
* [Feat]((deno,new,wiki)) [ ] `note wiki [list]` list projects
* [Feat]((deno)) [ ] `note daily open [today]` open daily note named with today's date (error if does not exist)
* [Feat]((deno)) [ ] `note daily open 2020-08-28` open daily note at specific date
* [Feat]((deno)) [ ] `note daily new [today]` create daily note named with today's date
* [Feat]((deno)) [ ] `note daily new 2020-08-28` create daily note at specific date
* [Feat]((deno)) [ ] `note daily start [today]` create/open daily note named with today's date
* [Feat]((deno)) [ ] `note daily start 2020-08-28` create/open daily note at specific date
* [Feat]((deno)) [ ] `note daily end [today]` save daily note and generate meta-data
* [Feat]((deno)) [ ] `note daily end 2020-08-28` save daily note at specific date and generate meta-data
* [Feat]((deno)) [ ] `note setup` setup daily note folder structure


