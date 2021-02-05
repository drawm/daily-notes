#!/bin/bash

gnudate() {
    if commant -v gdate &> /dev/null; then
        gdate "$@"
    else
        date "$@"
    fi
}
