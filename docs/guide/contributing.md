---
id: contributing
title: Contributing
sidebar: contributing
---
Contributions to Chart.js are welcome and encouraged, but please have a look through the guidelines in this document before raising an issue, or writing code for the project.

## Using issues

The [issue tracker](https://github.com/chartjs/chartjs-plugin-annotation/issues) is the preferred channel for reporting bugs, requesting new features and submitting pull requests.

Please do not use issues for support requests. For help using the annotation plugin, please take a look at the [GitHub Discussions](https://github.com/chartjs/chartjs-plugin-annotation/discussions) page.

## Reporting bugs

Well structured, detailed bug reports are hugely valuable for the project.

Guidlines for reporting bugs:

- Check the issue search to see if it has already been reported
- Isolate the problem to a simple test case
- Provide a demonstration of the problem on [JS Bin](http://jsbin.com) or similar

Please provide any additional details associated with the bug, if it's browser or screen density specific, or only happens with a certain configuration or data.

## Local development

Run `npm ci` to install all the libraries, then run `npm run dev` to build and run tests as you make changes.

## Pull requests

Clear, concise pull requests are excellent at continuing the project's community driven growth. But please review [these guidelines](https://github.com/blog/1943-how-to-write-the-perfect-pull-request) and the guidelines below before starting work on the project.

Guidelines:

- Please create an issue first:
  - For bugs, we can discuss the fixing approach
  - For enhancements, we can discuss if it is within the project scope and avoid duplicate effort
- Please make changes to the files in [`/src`](https://github.com/chartjs/chartjs-plugin-annotation/tree/master/src)
- Please add tests in [`/test`](https://github.com/chartjs/chartjs-plugin-annotation/tree/master/test)
- Spaces for indentation, not tabs please
- If adding new functionality, please also update the relevant `.md` file in [`/docs`](https://github.com/chartjs/chartjs-plugin-annotation/tree/master/docs)
- Please make your commits in logical sections with clear commit messages

## License

By contributing your code, you agree to license your contribution under the [MIT license](https://github.com/chartjs/Chart.js/blob/master/LICENSE.md).
