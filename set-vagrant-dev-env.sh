#!/bin/bash

VAGRANT_MNT=${VAGRANT_MNT:-/usr/local/devel}

if [ -L "/usr/share/ngcp-csc/csc" ]; then
  echo "/usr/share/ngcp-csc/csc is already a link, ignoring..."
else
  mv "/usr/share/ngcp-csc/csc" "/usr/share/ngcp-csc/csc.orig"
  ln -s "$VAGRANT_MNT/ngcp-csc/build/production" "/usr/share/ngcp-csc/csc"
fi
