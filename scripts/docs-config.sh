#!/bin/bash

set -e

# tag is next|latest|master|x.x.x
# https://www.chartjs.org/chartjs-pligin-annotation/$tag/
function tag_from_version {
    local version=$1
    local mode=$2
    local tag=''
    if [ "$version" == "master" ]; then
        tag=master
    elif [[ "$version" =~ ^[^-]+$ ]]; then
      if [[ "$mode" == "release" ]]; then
        tag=$version
      else
        tag=latest
      fi
    else
        tag=next
    fi
    echo $tag
}

VERSION=$1
MODE=$2

TAG=$(tag_from_version "$VERSION" "$MODE")

sed -i -e "s/VERSION/$TAG/g" "docs/.vuepress/config.ts"
