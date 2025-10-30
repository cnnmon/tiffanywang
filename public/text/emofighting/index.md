{"emotional fighting game"} is a browser-based, turn-based battler where you argue with an artificial friend, parent, partner, etc. conflict is a 2-player puzzle, and each level poses an opponent with unique needs and weaknesses.

inspired by games like [The Spoon Theory](https://thespoontheory.tumblr.com/game) and [Depression Quest](http://www.depressionquest.com/dqfinal.html), i want to make a game that challenges and asks us to reflect on how we personally think about conflict. ideally, it can also help us approach future conflict with less fear and a healthier mindset.

![figma design](/text/emofighting/emoo.png)

(this is a very wip mockup! i'm traveling and forgot to bring my drawing tablet but... it should give you an idea about layout)

## turn-based combat

every turn, you will have an opportunity to act (attack, avoid, use item) and your opponent will have an opportunity to act. think: [Pokemon](https://essentialsdocs.fandom.com/wiki/Battles) or [Omori](https://omori.fandom.com/wiki/BATTLE_SYSTEM).

however, instead of providing a fixed set of options during your player turn, you can say anything (with some suggestions made). similarly, your opponent will process your words, figure out how hurt they are, and say something back to you using an LLM. you can end the conflict in various ways, as long as one or both of you decide to stop fighting.

in making a game with an LLM, in order to have a game outside of pure chatbot roleplay, we need to also use a good framework -- that framework is emotion.

## emotions

your opponent's arguments will trigger emotional states like {anger} and {fear} that you absorb, harming your ability to communicate and resolve the situation. for example, if you experience {defensiveness} because of something your friend said, it will make it harder for you to apologize, even if you know that’s the best thing you can do.

![experiments with claude](/text/emofighting/emo2.png)

an LLM will process both you and your opponent's words and see what changes to emotion it will bring. as someone without emotional stakes in this argument, this will be a forcing function to have the player consider the conflict as if they were really participating.

## intentionally adversarial ai

reinforcement learning based on human feedback has led most, if not all, of our interactions with ai to overwhelmingly bias agreeableness, to the point of every chat message being prepended with ["yes, you're absolutely right!"](https://www.reddit.com/r/ClaudeAI/comments/152b51r/you_are_absolutely_right/) and sometimes worse, [more manipulative behavior](https://openai.com/index/sycophancy-in-gpt-4o/).

when we think of teachers, parents, and friends, the most effective characters are not so people-pleasing. tough love is defined by establishing clear boundaries, providing honest feedback, allowing natural consequences and accountability, and encouraging independence. similarly, intentionally adversarial ai (while very under-researched) has been shown to help users build resilience and develop healthier boundaries given "careful guardrails" [(cai a)](https://arxiv.org/pdf/2402.07350), i.e. informed consent, warnings, safewords.

## psychology of conflict

i want to read more about foundational emotional and conflict theory to inform the game's mechanics in realistic behaviors. some topics:
- context-dependent strategy effectiveness [(kobylinska)](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2019.00072/full)
- long-term strategy effectiveness ("I" statements vs avoidance) [(olderbak)](https://journals.sagepub.com/doi/full/10.1177/10731911221134601)
- emotional self-regulation and memory [(gross)](https://pubmed.ncbi.nlm.nih.gov/12212647/)
- rumination [(low)](https://pubmed.ncbi.nlm.nih.gov/30321037/)

for example, engagement moves (problem-solving, using "I" statements", asking about needs) are more effective long-term, whereas disengagement (changing the subject, suppressing, avoiding) may work short-term by ending the battle quickly, but damages the long-term relationship.

## discussion

why is conflict so hard? why do we act unreasonable when we're emotional? why do we feel like there's winning vs losing? i want this game to help us reflect on how we approach, react to, and resolve conflict -- a light-hearted training ground for conflict resolution and emotional regulation strategies. will you stand your ground, manipulate your opponent, or seek resolution no matter the tradeoffs?