#!/bin/bash

rootFolder="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
rootFolder="$( cat "${rootFolder}/../.noteFolderPath")"
if [ ! -z $rootFolder ]; then
  exit 1
fi

echo "${rootFolder}"

