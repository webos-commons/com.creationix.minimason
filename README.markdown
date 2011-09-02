# Traveling Wavefronts node-webgl demo for webOS

This is a simple webgl demo ported to node and webOS for fun.

# Building the IPK

First you need to clone this git repo to get the source.

    git clone https://github.com/creationix/com.creationix.minimason.git
    cd com.creationix.minimason

Then you'll need to grab the binaries.  They are stored in a git submodule

    git submodule init
    git submodule update

Then you'll need to move the `node` binary to it's proper location

    mv node_modules/node main

Now you're all set up, simply package and install the normal webOS way using the SDK tools:

    palm-package .
    palm-install com.creationix.minimason*
    palm-run com.creationix.minimason
    rm com.creationix.minimason*

Enjoy!
