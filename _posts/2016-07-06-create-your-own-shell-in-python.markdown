---
layout:     post
title:      "Create Your Own Shell in Python"
date:       2016-07-06 02:40:00 +0700
categories: articles
tags:       [shell, python, unix]
author:     "Supasate Choochaisri"
header-img: "img/post-bg-01.jpg"
comments:   true
---

I'm curious to know how a shell (like bash, csh, etc.) works internally. So, I implemented one called **yosh** (**Y**our **O**wn **SH**ell) in Python to answer my own curiosity. The concept I explain in this article can be applied to other languages as well.

Let's start.

**Step 0: Project Structure**

For this project, I create the following project structure.

{% highlight bash %}
yosh_project
|-- yosh
   |-- __init__.py
   |-- shell.py
{% endhighlight %}

`yosh_project` is the root project folder (you can also name it just `yosh`).

`yosh` is the package folder and `__init__.py` will make it a package named the same as the package folder name.

`shell.py` is our main shell file.

**Step 1: Shell Loop**

When you start a shell, it will show a command prompt and wait for your command input. After it receives the command and executes it (the detail will be explained later), your shell will be back to the wait loop for your next command.


In `shell.py`, we start by a simple main function calling the `shell_loop()` function as follows:

{% highlight python %}
def shell_loop():
    # Start the loop here

def main():
    shell_loop()

if __name__ == "__main__":
    main()
{% endhighlight %}

Then, in our `shell_loop()`, we use a status flag to indicate whether the loop should continue or stop. In the beginning of the loop, our shell will show a command prompt and wait to read command input.

{% highlight python %}
import sys

SHELL_STATUS_RUN = 1
SHELL_STATUS_STOP = 0

def shell_loop():
    status = SHELL_STATUS_RUN
    while status == SHELL_STATUS_RUN:
        # Display a command prompt
        sys.stdout.write('> ')
        sys.stdout.flush()

        # Read command input
        cmd = sys.stdin.readline()
{% endhighlight %}

After that, we tokenize the command input and execute it (we'll implement the `tokenize` and `execute` functions soon).

Therefore, our `shell_loop()` will be the following.

{% highlight python %}
import sys

SHELL_STATUS_RUN = 1
SHELL_STATUS_STOP = 0

def shell_loop():
    status = SHELL_STATUS_RUN
    while status == SHELL_STATUS_RUN:
        # Display a command prompt
        sys.stdout.write('> ')
        sys.stdout.flush()

        # Read command input
        cmd = sys.stdin.readline()

        # Tokenize the command input
        cmd_tokens = tokenize(cmd)

        # Execute the command and retrieve new status
        status = execute(cmd_tokens)
{% endhighlight %}

That's all of our shell loop.
