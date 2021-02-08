#!/bin/bash -x

INITIAL_LOCATION="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_FOLDER="$(note-folder)"

note_type="${1}"

category="${2}"
path_category=""
if [[ ! -z "$category" ]]; then
    path_category="/${category}"
fi

sub_category="${3}"
path_sub_category=""
if [[ ! -z "$sub_category" ]]; then
    path_sub_category="/${sub_category}"
fi

note_name="${4}"
file_name="/$note_name.md"

file_path="${ROOT_FOLDER}/${note_type}${path_category}${path_sub_category}${file_name}"


# Create folders so we can start working
mkdir -p $(dirname $file_path)

# Create new file if it doesn't exist
is_new_file=0
if [[ ! -f $file_path ]]; then
    is_new_file=1

    # Use a template if one is available
    template_path="${INITIAL_LOCATION}/templates/quick-notes/${note_type}"
    if [[ -f $template_path ]]; then
        echo "Creating file using '${note_type}' template"
        echo "$template_path '${category}' '${sub_category}' '${note_name}' >> '$file_path'"
        $template_path "${category}" "${sub_category}" "${note_name}" >> "$file_path"
    else
        echo "No template found for '${note_type}'. Create an empty file instead"
        touch "$file_path"
    fi
fi

# Stage the file to git so we can see if it changed once the user is done editing
pushd $ROOT_FOLDER
    git add "$file_path"

    # Edit the file
    echo "Editing file ${file_path}"
    ${EDITOR} "$file_path"

    if [[ ! -z "$(git diff "$file_path")" ]]; then
        # The file was changed, commit it to git
        git add "$file_path"

        local commit_message
        if [[ $is_new_file == 1 ]]; then
            commit_message = "File created using '${note_type} ${category} ${sub_category} ${note_name}', @$(date) by $(whoami)"
        else
            commit_message = "File changed using '${note_type} ${category} ${sub_category} ${note_name}', @$(date) by $(whoami)"
        fi
        git commit "$file_path" -m "$commit_message"

        # Only push if a remote exist
        if [[ ! -z $(git remote -v) ]]; then
            git push origin
        fi
    else
        # File wasn't changed, either cleanup or exit
        if [[ $is_new_file == 1 ]]; then
            echo "Removing file '$file_path' as it was left unchanged from its default template"
            rm -f "$file_path"
            git add "$file_path"
        else
            echo "No change detected for file '$file_path'"
        fi
    fi
popd
