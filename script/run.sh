#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE=$DIR/..

source $BASE/script/setup.sh

export ROOT_URL=http://localhost:3000
export DIR=$BASE

# TODO: issue to kill all processes of meteor when closing atom shell
#cd $BASE/meteor
#exec 3< <(meteor)
#sed '/App running at/q' <&3 ; cat <&3 &
if [ ${OS_PLATFORM} == "linux" ] ; then
  NODE_ENV=development $BASE/cache/atom-shell/atom $BASE
elif [ ${OS_PLATFORM} == "darwin" ] ; then
  NODE_ENV=development $BASE/cache/atom-shell/Atom.app/Contents/MacOS/Atom $BASE
else
  echo "Unknown platform (${OS_PLATFORM}). Exiting.."
fi
