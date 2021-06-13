#!/bin/bash

gnudate() {
    if command -v gdate &> /dev/null; then
        gdate "$@"
    else
        date "$@"
    fi
}

# Run the function if the script was called directly
test "$(basename -- "$0")" != "gnudate.sh" || gnudate $@
