#!/usr/sh
docker run --rm -v "$PWD":"$PWD" -w "$PWD" ligolang/ligo:0.31.0 compile contract contract.religo > contract.michelson
