#!/usr/bin/env bash

rootFolder="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
file="${1}"
section="${2}"

cat "${file}" | awk "
BEGIN {
    wordFound=\"false\";
    isInSection=\"false\";
}

/^===\$/ {
    if(isInSection == \"true\") {
        isInSection=\"false\";
        wordFound=\"false\";
    }
    if(wordFound == \"true\"){
        isInSection=\"true\";
    }
    
}

/^${section}\$/ {
    wordFound=\"true\";
}

{
    if(wordFound == \"true\" || isInSection == \"true\"){
        print \$0;
    }
}
" | head -n -1 

