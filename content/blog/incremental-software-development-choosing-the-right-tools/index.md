---
title: "Incremental Software Development: The Art of Choosing the Right Tools"
date: 2026-02-06T09:21:00+03:30
draft: false

ShowToc: false
---

In a large or mid-sized software company, it's common to build teams around goals rather than around technologies or components.
This article is about my experience and lessons learned in such teams over the last few years.
I will share my insights and thoughts on software development in a result-oriented way, with a top-down approach.

Here we discuss about screwdrivers, calipers, hammers and saws in our toolbox!

![Toolbox](toolbox.svg)

# Two Types of Software

## Formal

I call them `formal` after the university course "Formal Methods" which is about
mathematical models of software and their properties.
There are lots of textbooks and courses about this topic, so I won't go into details here.
One exmple here is a traffic light system ordered by a city council.
It has to be reliable, safe and predictable with lots of well-defined rules and requirements.
The software development team follows a well-known procedure.
It can be a waterfall, V-model or any other process that suits the project.
Requirements are met, tests are written, and the software is delivered on time and within budget.
Maybe one or two iterations are needed to get things right,
but in general, the process is predictably laid out, with an expected outcome.

## Incremental

Incremental software is quite the opposite. A goal is set, but the path to reach it is not clear.
There are horizontal requirements, compliance issues and general constraints that are known,
but beyond that, the team has to figure out how to get there.
In this situation, we are a bunch of people with a box of tools.
The art is to figure out when to pull out each tool and how to use it.
I'd like to mention a few tools to give you the general idea:

#### **Design System**
A set of reusable components, guidelines and best practices that
help to create consistent and cohesive user interfaces.

Some engineers might think that it is imperative to follow the design system to the letter,
but in reality, sometimes it is better to deviate from it and create a custom solution that fits the specific needs of the project.

#### **Software Testing**
A set of practices and tools that help to ensure the quality and reliability of the software.

One might believe that writing tests is always a good idea, but in a propotype product,
it often slows down the development process and adds unnecessary overhead.
Note that we have a limited amount of time to prove that a product is viable, and after that window,
the whole project might be shut down.

On the other hand, sometimes it is worth writing tests even in a prototype product,
because it reduces the amount of labour required to find and fix a bug.

#### **Agile Frameworks**
Yet another screwdriver in our toolbox.
Some managers cannot imagine working without a framework like Scrum or Kanban.
These are mere tools to structure our work and help us to achieve our goals.
Sometimes, it's more efficient to work without a framework and just focus on getting things done.

#### **Cross-functional Team**
A team that consists of members with different skills and expertise, such as developers, designers, testers and product managers.

#### **Formal Methods**
Formal methods themselves can be used completely or partially in small increments of the process.

> We should see every decision as a trade-off, and decide whether the benefits of using a tool outweigh its costs in a given situation.

# The Toolbox
My point here is not to undermine the importance of these tools, but to emphasize that they are just tools.
I strongly encourage engineers to learn and master these tools, but they should not be used blindly.
If leaving something out of the picture becomes an option,
then you begin to see its true value and how it can help you to achieve your goals.
