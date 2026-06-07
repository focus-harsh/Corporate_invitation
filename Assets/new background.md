# GLOBAL WEBSITE ATMOSPHERE REDESIGN

# The Art of Story Telling By Harsh Shah

## IMPORTANT

DO NOT redesign the layout.

Keep:

* Hero section
* Timeline section
* Video section
* Venue section
* RSVP section

The layout is already strong.

Instead redesign the ENTIRE VISUAL ATMOSPHERE.

The website should feel like one connected cinematic storytelling journey.

---

# CURRENT PROBLEM

The website currently feels like:

Black background

* cards

* timeline

* images

Everything appears disconnected.

Users feel they are scrolling through sections.

They should feel they are travelling through a story.

---

# NEW MASTER CONCEPT

## The Storyteller's Journey

Transform the website into a single immersive environment.

Imagine:

The visitor is sitting at a storyteller's desk.

As they scroll:

They travel through:

* memories
* experiences
* stories
* conversations
* inspiration
* transformation

Every section should feel connected.

---

# GLOBAL BACKGROUND

Remove flat black.

Create layered cinematic background.

---

# BASE LAYER

Use deep luxury navy.

```css
background:
linear-gradient(
180deg,
#06070A 0%,
#0A0B10 25%,
#0E0D12 50%,
#090A0F 75%,
#06070A 100%
);
```

---

# STORY LIGHTING

Add warm storytelling glow.

Create multiple radial gradients.

```css
radial-gradient(
circle at 20% 20%,
rgba(212,164,75,.12),
transparent 35%
);

radial-gradient(
circle at 80% 40%,
rgba(212,164,75,.08),
transparent 30%
);

radial-gradient(
circle at 50% 80%,
rgba(212,164,75,.06),
transparent 35%
);
```

The glow should move slowly.

Almost unnoticeable.

---

# PARALLAX STORY WORLD

Entire page should have depth.

Layer 1

Background texture

Layer 2

Floating particles

Layer 3

Dust effects

Layer 4

Content

Layer 5

Light overlays

---

# FLOATING STORY ELEMENTS

Across the entire website.

Randomly place:

* paper fragments
* feather illustrations
* ink drops
* handwritten marks
* subtle story symbols

Opacity:

3% to 8%

Very subtle.

Almost hidden.

Visitors should discover them.

---

# GLOBAL PARTICLE SYSTEM

Create cinematic particles.

Color:

Gold

Amber

Warm white

Behavior:

Slow drifting

Floating

Occasional rotation

Quantity:

30-50

Across entire website.

Not section specific.

---

# SECTION TRANSITIONS

Every section should blend into the next.

Avoid hard separation.

Each section should overlap visually.

Create:

```css
mask-image:
linear-gradient(
to bottom,
transparent,
black 10%,
black 90%,
transparent
);
```

---

# TIMELINE REDESIGN

Current timeline is good.

Keep structure.

Improve experience.

---

# TIMELINE LINE

Replace static line.

Create glowing animated path.

Color:

Gold

```css
#D4A44B
```

Glow:

```css
box-shadow:
0 0 30px rgba(212,164,75,.4);
```

---

# TIMELINE DOTS

Current dots become story milestones.

Each milestone:

Glow softly.

Pulse when visible.

Scale when active.

---

# SCROLL PROGRESSION

As user scrolls:

Timeline line fills.

Like progress.

The story journey becomes visible.

---

# IMAGE CARDS

Current images are good.

Keep them.

Add cinematic treatment.

---

# IMAGE HOVER

Scale:

1.04

Rotate:

0.5 degree

Shadow expands.

Warm glow appears.

---

# IMAGE DEPTH

Add:

```css
transform:
translateZ(40px);
```

Use perspective.

Cards should feel tangible.

---

# VIDEO SECTION

Current section feels isolated.

Connect it.

---

# STORY LIGHT EFFECT

As video enters viewport:

Golden light spreads behind video.

Like projector light.

---

# PLAY BUTTON

Make luxurious.

Gold glass button.

Animated pulse.

Soft glow.

---

# VIDEO CARD

Hover:

Lift upward.

Glow.

Gold border.

---

# VENUE SECTION

Most important section after timeline.

---

# ATMOSPHERE

Create venue lighting effect.

Warm spotlight behind venue card.

Like stage lights.

---

# GOOGLE MAP

Wrap map in luxury frame.

Gold border.

Soft glow.

Glassmorphism.

---

# VENUE IMAGE SLIDER

Current image card becomes cinematic.

Apply:

Depth

Reflection

Glow

Slow zoom effect

---

# RSVP SECTION

Transform into finale.

Not form.

Experience.

---

# BACKGROUND

Create sunrise glow.

Very subtle.

Represents beginning of journey.

---

# RSVP CARD

Luxury invitation card.

Glassmorphism.

Gold border.

Warm lighting.

---

# SCROLL ANIMATIONS

Use GSAP.

Every section:

Fade

Blur

Lift

Scale

Parallax

Never appear instantly.

---

# SECTION REVEAL

```javascript
opacity:0
y:100
blur:10px
```

Animate to:

```javascript
opacity:1
y:0
blur:0
```

---

# STORY FLOW EFFECT

Create a golden path.

This is the biggest upgrade.

A thin gold line should subtly travel through:

Hero

↓

Timeline

↓

Video

↓

Venue

↓

RSVP

Like a story path connecting the entire website.

Not always visible.

Appears while scrolling.

---

# CURSOR EFFECT

Desktop only.

Create:

Gold glow cursor.

Small trailing particles.

Luxury feel.

---

# FINAL EMOTIONAL GOAL

The visitor should not feel:

"I am scrolling a website."

They should feel:

"I am travelling through a carefully crafted story."

Every section must feel connected through light, motion, atmosphere, and storytelling.

The website should resemble a premium Apple launch event combined with a luxury storytelling experience.

Keep the existing layout.

Transform the atmosphere.
