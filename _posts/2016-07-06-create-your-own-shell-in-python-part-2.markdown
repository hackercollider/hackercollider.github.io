---
layout:     post
title:      "Create Your Own Shell in Python : Part II"
date:       2016-07-06 11:00:00 +0700
categories: articles
tags:       [shell, python, unix]
author:     "Supasate Choochaisri"
header-img: "img/post-bg-01.jpg"
comments:   true
---

In [part 1](https://hackercollider.com/articles/2016/07/05/create-your-own-shell-in-python-part-1/), we already created a main shell loop, tokenized command input, and executed a command by `fork` and `exec`. In this part, we will solve the remaining problmes. First, `cd test_dir2` does not change our current directory. Second, we still have no way to exit from our shell gracefully.

**Step 4: Built-in Commands**
===

The statement "`cd test_dir2` does not change our current directory" is true and false in some senses. It's true in the sense that after executing the command, we are still at the same directory. However, the directory is actullay changed, but, it's changed in the child process.

Remember that we fork a child process, then, exec the command which does not happen on a parent process. The result is we just change the current directory of a child process, not the directory of a parent process.

Then, the child process exits, and the parent process continues with the same intact directory.

Therefore, this kind of commands must be built-in with the shell itself. It must be executed in the shell process without forking.
