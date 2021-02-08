#!/bin/bash

gnudate() {
    if command -v gdate &> /dev/null; then
        gdate "$@"
    else
        date "$@"
    fi
}
