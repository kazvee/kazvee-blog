---
title: Pair Programming
description: Musings on Collaborative Coding
canonical: https://kazvee.com/blog/pair-programming/
date: 2023-11-19
updated: 
tags:
  - coding
  - learning
  - collaboration
---

## 🧑‍🤝‍🧑 What is pair programming?

Pair programming is a collaborative endeavour in which two people work together on a single coding task. Typically, the person writing the code is called the _driver_, and the one reviewing the code is the _navigator_, and they'll swap roles a few times throughout the session. The aim is to foster an environment of active shared participation between both individuals as they each adopt a different perspective to achieve a common programming goal.

![Two small brown mice sitting on a branch](/static/img/posts/pair-programming/two-mice.jpg)

<center><em style="font-size:0.85rem;">Photo by <a href="https://unsplash.com/@bel2000a" target="_blank" rel="noopener noreferrer">Belinda Fewings</a> on <a href="https://unsplash.com/photos/two-small-brown-mice-sitting-on-a-branch-3xR0-gjjZaY" target="_blank" rel="noopener noreferrer">Unsplash</a></em></center>

---

## 🤔 Why would it be used?

Heavily associated with Extreme Programming (XP), an Agile methodology, one of the promoted benefits of pair programming is that it aims to ensure effective teamwork with different, but equally important, scopes of responsibility for each developer. While the driver is focused on writing the actual code to accomplish the more granular task at hand, they'll be thinking out loud as they do. The navigator will maintain a higher-level view of the programming direction, consider options for the next steps, and keep an eye out for the risk of bugs being introduced. When well-executed, it can be a great opportunity for each developer to use their technical as well as soft communication skills to write code with better architecture and lower risk of bugs than what either of them may have achieved in isolation.

> "Betty Snyder and I, from the beginning, were a pair. And I believe that the best programs and designs are done by pairs, because you can criticise each other, and find each other's errors, and use the best ideas."  
> _— Jean Bartik, one of the very first programmers_

## 🤹‍♀️ Is there only one way to pair program?

There are other pairing techniques besides the driver/navigator roles. Adapting a more unstructured style, two developers can pair up to tackle a task together, even occasionally summoning a third, often more experienced developer for input and guidance on major decisions, or to help get them unstuck if they've hit a progress blocker. 

![Three meerkats on sand during daytime](/static/img/posts/pair-programming/three-meerkats.jpg)

<center><em style="font-size:0.85rem;">Photo by <a href="https://unsplash.com/@veverkolog" target="_blank" rel="noopener noreferrer">Dušan veverkolog</a> on <a href="https://unsplash.com/photos/three-animals-on-sand-during-daytime-ah7KHxYg6Ow" target="_blank" rel="noopener noreferrer">Unsplash</a></em></center>

---

Another technique, called Mob (or Ensemble) Programming, is popular for hackathons or [TDD](https://agiledata.org/essays/tdd.html) (Test-Driven-Development) [code retreats](https://www.coderetreat.org/), where a larger group of developers collaborate on a task, allowing for a larger variety of insights and experiences. Mob events can often feel more socially casual, since with more people on the team, there can be a wider comfort range for participants who may be somewhat less familiar with the coding language being used but who still want to take part to further their own learning.

Insights from the Cucumber team, the people behind the acceptance-testing tool for Agile teams, have highlighted how mob programming has [empowered their development team to be more inclusive](https://cucumber.io/blog/bdd/inclusive-benefits-of-mob-programming). Mobbing has given their business the broadest reach when recruiting new members, enabling them to enjoy and leverage all the other well-documented benefits that more diverse teams are proven to offer.

Teaming up on a rotational basis can also be an effective tool to smooth out the new hire onboarding process. By giving the new colleague a chance to meet with everyone on the team, they can be quickly given a great overall perspective on the tech stack used, as well as a variety of individual perspectives on the current state of the codebase. Every developer will have an opinion about the code's current challenges and insight on why particular architecture and design choices were made. Every team will have their own dynamic to learn, and wisdom to share about what, if building the same thing today, they might prefer to do differently this time around. 

On day one of the new job, without any of the necessary system or account permissions, a new hire can help their new team during pairing sessions by spotting typos, respectfully querying the status quo from a fresh new learner's perspective, and — of course, Googling to help research various code refinement options. If the existing documentation doesn't match what's seen in the code, the newest colleague is well-placed to update the docs. Every new hire gets the gift of time for their first few weeks, and taking the opportunity to dive right in and start contributing can often be a welcome reprieve from the less-exciting (but still vitally important) mandatory cybersecurity, financial crime prevention, and other legal and regulatory training courses that most businesses require new joiners to complete during the first few weeks of their tenure.

## 🤔 Are there downsides to pair programming?

The idea of humans working together is not a new concept, so, unsurprisingly, collective efforts in the world of software development share many of the same advantages and limitations as other scenarios involving any kind of collaborative work. Not every situation will warrant the time and effort involved. Not every business will see value in pairing for knowledge sharing and exchanging ideas with the potential for a less speedy deployment cycle. Not every developer will feel enthusiastic about taking part in a pair session, on that specific day, at that particular time. 

![Brown and white cat in shallow focus shot](/static/img/posts/pair-programming/brown-white-cat.jpg)

<center><em style="font-size:0.85rem;">Photo by <a href="https://unsplash.com/@hhh13" target="_blank" rel="noopener noreferrer">傅甬 华</a> on <a href="https://unsplash.com/photos/brown-and-white-cat-in-shallow-focus-shot-tEMU4lzAL0w" target="_blank" rel="noopener noreferrer">Unsplash</a></em></center>

---

As well, pairing can disrupt the flow of deep solo concentration. Developers can't listen to music while they pair. Meetings, online or in person, even only between two people, can sometimes be mentally _exhausting_. Also worth a quick mention is the entire range of complexities involved when working with someone who has a different personality, level of experience, preferred communication style, or willingness to even partner up in the first place. There are likely as many arguments against pairing as there are in favour of it.

## 🤷‍♀ ️What's the solution?

If there _was_ a one-approach-fits-all answer to the challenges involved with pair programming, it'd probably already exist in highly monetized form — and as much as this developer would love to change the world with a free open-source solution, you won't find one in this post.

However, if we agree that most enterprise-level software projects will eventually grow in scale beyond one person's time availability or current skill set, you're likely to encounter the requirement for some type of group effort throughout your development career. If you enjoy teamwork, the good news is that all the skills acquired from other aspects of your life will transfer very well into the realm of pair programming.

Alternatively, if you _haven't_ enjoyed any of the collaborative work you've done elsewhere, the good news is that you'll be able to leverage all your adaptive skills to ensure teamwork is something you can do effectively when the situation doesn't allow for your personal preference to opt out.

> "Living life by going with the flow..."  
> _— Gudetama, the famous lazy egg_

When faced with numerous potential variables, many of which are outside of your control, it's a good idea to remain flexible, adjusting to the given scenario in a way that still enables you to stay true to yourself.

## 👩‍🏫 What worked well for this new developer

Whether you enjoy teamwork or only _endure_ it, there are multiple techniques you can use to tailor your approach to collaborative events as you encounter them along your career journey.

> Be friendly and welcoming.  
> Be mindful of how much space you take up in conversations.  
> Be respectful of others by choosing words and actions with care.  
> Ask questions.  
> Take care of your body.  
> _— The Coders' Code, from [Canada Learning Code](https://www.canadalearningcode.ca/)_


### 👩‍💻 Some observations from my own group collaboration experiences:


* Try to understand, set, or clarify the expectation for the pairing session so you can make the best use of the time you have. Is this an open-ended endeavour, or is there a goal to accomplish within a particular time frame? There can be a big difference between pairing up with a senior developer who only has an hour to demonstrate how to implement an urgent bugfix, and how two newer developers might be freer to do some Google research, or experiment with various FAFO (_fool_ around and find out) coding techniques. Contextual awareness is helpful to understand if it's fine to ask a lot of questions during the session, or if it'd be more appropriate to make notes and follow up, or carry out some independent research after the session ends.

* We're all only human. The "bad code" you're working on now may have been written years ago, by the same person you're pairing with today. Assume positive intent. Just like you, everyone tries their best with what they've got at the time. You don't know the full history of the timeline, cost, or [Agile story points](https://www.atlassian.com/agile/project-management/estimation) allocated to the initial code creation. Move forward with kindness and diplomacy as you work together to complete the task at hand.

* Network delay is a thing. If your remote pair partner is mentioning typos or missed semicolons you've already spotted and are in the middle of fixing, mention the lag so they can adjust the grace period they wait before calling out typing errors. When contributing as the navigator, be aware of possible internet slowness, and use the line numbers provided inside the IDE to smoothly guide your driver to the part of the code you're referencing.

* Among the learning insights shared during the [2023 - 48 hour GLOBAL Day of Code Retreat](https://www.eventbrite.com/e/2023-48-hour-global-day-of-coderetreat-everywhere-tickets-734278696347) (hosted by [Code Craft Saturdays and Sundays](https://www.eventbrite.com/o/code-craft-saturdays-and-sundays-15457506392)) a really valuable bit of guidance was: "The navigator is encouraged to provide sufficient context to accomplish the task while allowing the driver the autonomy to make coding decisions." For example, the navigator can ask the driver to "create a weblink with a destination of google\.com" instead of initiating a keystroke micromanagement scenario of "type <, a, space, h, r, e, f, equal sign." 😬 

* Read the error messages, then read them _again_. Walk through the code, use a debugger, or add some strategically-placed console logs to help get a better idea of what is going wrong, and where. Don't spin your wheels for too long before seeking extra help, but do yourselves the favour of trying various approaches beforehand. The context provided by a few failed attempts can offer your helper a better perspective on where your progress stalled. Perhaps you _almost_ had a working solution, and only need a few minor code changes to get unstuck. 

* Maintain objectivity and professionalism during challenging group dynamics. If your suggestion for how to move the current task forward is shot down, query why your idea isn't expected to bring about the desired outcome. This may be a great opportunity to learn from someone else's lived experience of spending an afternoon down a rabbit hole! Focus on the goal, welcome other suggestions, and signal-boost the one you believe is most likely to succeed. However, if the atmosphere has degraded to the point that every idea is summarily rejected, and all forward momentum has come to a halt, it may be time for the group to consider convening the session and exploring alternative paths to success. Without a supporting explanation, _"I don't think that will work"_  delivers zero value, and [analysis paralysis](https://en.wikipedia.org/wiki/Analysis_paralysis) is the opposite of progress. 

* Sometimes, democracy will mean the group votes to move in a direction you believe is incorrect, despite your protests. Determine if this disagreement is really the hill you want to die on. A well-architected business lifecycle will have multiple quality checkpoints in place, such as automated testing or code reviews from senior developers, so trust this process. You will not need to fight every battle.

* Understand that no one will _ever_ care more about your own growth than you will. As your time within a working environment increases, you may encounter [toxic behaviours](https://jgefroh.medium.com/toxic-developers-considered-harmful-f7ea1494d4c0) or [crabs in a bucket mentality](https://en.wikipedia.org/wiki/Crab_mentality). If despite a few adjustments, the current situation isn't proving to be conducive to your ongoing learning or skills progression, find a non-career-limiting way to advocate for yourself. Learn everything you can from discouraging experiences, and discard whatever doesn't ~~spark joy~~ serve your higher-level goals. Stay humble, but never doubt that you absolutely have worth.

>> "**Competition** happens at the bottom.   
>> The people at the top are **collaborating**."  
>>  _— original source unknown_

* If you're the more experienced of the pair for a particular coding task, make it a positive and encouraging learning experience for both of you. You were new once, too. You know what it's like to feel small, stupid, confused, intimidated, and too scared to ask a question or admit out loud that you don't understand something. At some point in your life, someone helped you learn and grow in a way that makes you remember their mentorship now with fondness. Be that kind of person for your session partner.

* If you're a newer developer, understand that everyone willing to teach you will first try to meet you from where they are, but it also demands equal effort and engagement from you. If someone's lesson style doesn't fit well with how you learn best, tell them. Mentors who want to help you learn will try more than one way to explain things, so give them a fair chance to do that for you. Ask for help when you need it, and pay attention when you get it! Take notes on new things you're taught, so you won't need to ask the same question twice.

* No one is so experienced that they can't still learn new things. No one is so brand new that they don't have something of value to contribute.

* Commit your code early and often, perhaps before every time you swap pair programming roles. 💡

---

**References & Additional Resources to Explore:**
- [Jean Bartik: ENIAC's Programmers](https://www.computerhistory.org/revolution/birth-of-the-computer/4/78/2258)
- [Canada Learning Code - Code of Conduct](https://www.canadalearningcode.ca/code-of-conduct)
- [Code Craft Saturdays and Sundays](https://www.eventbrite.com/o/code-craftsman-saturdays-and-our-sponsors-15457506392)
- [Mob Programming: The Role-Playing Game](https://github.com/willemlarsen/mobprogrammingrpg)

<!-- **Image Credit:**
- Header photo by [Belinda Fewings](https://unsplash.com/@bel2000a?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/two-small-brown-mice-sitting-on-a-branch-3xR0-gjjZaY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) -->
