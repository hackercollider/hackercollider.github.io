---
layout:     post
title:      "Recall vs Precision"
subtitle:   "an alternative way to understand and remember recall and precision"
date:       2016-06-03 19:11:00 +0700
categories: articles
tags:       [machine learning, recall, precision]
author:     "Supasate Choochaisri"
header-img: "img/post-bg-01.jpg"
comments:   true
---

In machine learning, `recall` and `precision` are heavily used for measuring algorithm performance.

To make myself able to remember their meaning without thinking about `true positive/false positive/false negative` jargon, I conceptualize them as follows:

Imagine that, your girlfriend gave you a birthday surprise every year in last **10** years. (Sorry, I didn't intend to depress you if you don't have one.)

However, one day, your girlfriend asks you:

> 'Sweetie, do you remember all birthday surprises from me?'

This simple question makes your life in danger.

To extend your life, you need to **recall** all **10** surprising events from your memory.

So, `recall` is the ratio of a number of **events you can *correctly* recall** to a number of **all correct events**.

If you can recall all **10** events correctly, then, your recall ratio is **1.0** (**100%**). If you can recall **7** events correctly, your recall ratio is **0.7** (**70%**).

Now, it's easier to map the word `recall` to real life usage of that word.

However, you might be wrong in some answers.

For example, you answers **15** times, **10** events are correct and **5** events are wrong. This means you can recall all events but it's not so `precise`.

So, `precision` is the ratio of a number of **events you can *correctly* recall** to a number **all events you recall** *(mix of correct and wrong recalls)*. In other words, it is how precise of your recall.

From the previous example (10 real events, 15 answers: 10 correct answers, 5 wrong answers), you get **100%** recall but your precision is only **66.67%** (10 / 15).

Yes, you can guess what I'm going to say next. If a machine learning algorithm is good at `recall`, it doesn't mean that algorithm is good at `precision`. That's why we also need [`F1 score`](https://en.wikipedia.org/wiki/F1_score) which is the [*(harmonic)* mean](https://en.wikipedia.org/wiki/Harmonic_mean) of `recall` and `precision` to evaluate an algorithm.

Hope that this way of conceptualization could be an alternative way to help you understand and remember the difference between `recall` and `precision`.

---

**NOTE:**

>
A number of events you can correctly recall
  = True positive (they're correct and you recall them)
>
A number of all correct events
  = True positive (they're correct and you recall them)
    + False negative (they're correct but you don't recall them)
>
A number of all events you recall
  = True positive (they're correct and you recall them)
    + False positive (they're not correct but you recall them)
>
recall = True positive / (True positive + False negative)
>
precision = True positive / (True positive + False positive)
