#!/bin/bash

file="${1}"
section="${2}"

section_content=$(cat "${file}" | awk "
BEGIN {
    wordFound=\"false\";
    isInSection=\"false\";
}

/^===\$/ {
    if(isInSection == \"true\") {
        isInSection=\"false\";
        wordFound=\"false\";
        print \$0;
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
")

last_line=$(echo "${section_content}" | tail -n 1)

if [[ "${last_line}" == '===' ]];
then
    line_count=$(echo "${section_content}" | wc -l)
    echo "${section_content}" | head -n $((line_count - 2))
    exit 0
fi

echo "${section_content}"
