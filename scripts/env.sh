#!/bin/sh
alias ligo=docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:0.33.0
# docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:0.31.0 compile contract contract.religo > contract.michelson
