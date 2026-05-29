````md id="htmlnotes02"
# HTML Notes 02

# HTML Quotation and Citation Elements

## Tags Covered
| Tag | Purpose |
|---|---|
| `<blockquote>` | Long quotation from another source |
| `<q>` | Short inline quotation |
| `<abbr>` | Abbreviation or acronym |
| `<address>` | Contact information |
| `<cite>` | Title of a creative work |
| `<bdo>` | Overrides text direction |

---

# `<blockquote>` — Long Quotations

## Purpose
Defines a section quoted from another source.

## Features
- Browsers usually indent blockquote text
- Can use `cite` attribute to specify source URL

## Example
```html id="mx2e5p"
<p>Here is a quote from WWF's website:</p>

<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 60 years, WWF has worked to help people and nature thrive.
</blockquote>
````

## Notes

* Used for long quotations
* `cite` attribute provides source reference

---

# `<q>` — Short Quotations

## Purpose

Defines short inline quotations.

## Features

* Browser automatically adds quotation marks

## Example

```html id="c3mqha"
<p>
WWF's goal is to:
<q>Build a future where people live in harmony with nature.</q>
</p>
```

---

# `<abbr>` — Abbreviations

## Purpose

Defines abbreviations or acronyms.

Examples:

* HTML
* CSS
* WHO
* ASAP
* ATM

## Benefits

Helpful for:

* Browsers
* Search engines
* Translation systems

## Best Practice

Use `title` attribute for full form.

## Example

```html id="ll89z0"
<p>
The <abbr title="World Health Organization">WHO</abbr>
was founded in 1948.
</p>
```

## Feature

* Full form appears as tooltip on hover

---

# `<address>` — Contact Information

## Purpose

Defines contact information of:

* Author
* Owner of document/article

## Can Include

* Email
* URL
* Physical address
* Phone number
* Social media handle

## Browser Behavior

* Usually italic text
* Adds line break before and after element

## Example

```html id="jotc8j"
<address>
Written by John Doe.<br>
Visit us at:<br>
Example.com<br>
Box 564, Disneyland<br>
USA
</address>
```

---

# `<cite>` — Work Title

## Purpose

Defines title of creative work.

Examples of creative works:

* Book
* Poem
* Song
* Movie
* Painting
* Sculpture

## Important Note

* A person's name is NOT a title of work

## Browser Behavior

* Usually displayed in italic

## Example

```html id="p6vmqf"
<p>
<cite>The Scream</cite>
by Edvard Munch. Painted in 1893.
</p>
```

---

# `<bdo>` — Bi-Directional Override

## Meaning

BDO = Bi-Directional Override

## Purpose

Overrides current text direction.

## Attribute Used

```html id="6ulwwu"
dir="rtl"
```

* `rtl` → right to left
* `ltr` → left to right

## Example

```html id="mjlwm5"
<bdo dir="rtl">
This text will be written from right to left
</bdo>
```

---

# HTML Comments

## Purpose

* Add notes/reminders in code
* Help debugging
* Hide content temporarily

## Important

* Comments are NOT displayed in browser

---

# Comment Syntax

```html id="42mt3x"
<!-- Write your comments here -->
```

## Note

* `!` exists only in opening part

---

# Adding Comments

## Example

```html id="v87q4y"
<!-- This is a comment -->

<p>This is a paragraph.</p>

<!-- Remember to add more information here -->
```

---

# Hiding Content with Comments

## Hide Single Element

```html id="31snzv"
<p>This is a paragraph.</p>

<!-- <p>This is another paragraph</p> -->

<p>This is a paragraph too.</p>
```

---

# Hide Multiple Lines

```html id="0sy2xt"
<!--
<p>Look at this cool image:</p>
<img src="pic_trulli.jpg" alt="Trulli">
-->
```

---

# Debugging with Comments

## Usage

* Comment out lines one-by-one
* Helps locate HTML errors

---

# Hide Inline Content

## Example

```html id="bm2wgm"
<p>This <!-- great text --> is a paragraph.</p>
```

Browser Output:

```text id="3smbpo"
This is a paragraph.
```

---

# HTML Colors

## Colors Can Be Specified Using

* Color names
* RGB
* RGBA
* HEX
* HSL
* HSLA

---

# Color Names

## Example Color Names

* Tomato
* Orange
* DodgerBlue
* MediumSeaGreen
* Gray
* SlateBlue
* Violet
* LightGray

## Important

* HTML supports 140 standard color names

---

# Background Color

## Purpose

Sets background color of element.

## Example

```html id="h9ibxv"
<h1 style="background-color:DodgerBlue;">
Hello World
</h1>

<p style="background-color:Tomato;">
Lorem ipsum...
</p>
```

---

# Text Color

## Purpose

Changes text color.

## Example

```html id="f14v6n"
<h1 style="color:Tomato;">Hello World</h1>

<p style="color:DodgerBlue;">
Lorem ipsum...
</p>
```

---

# Border Color

## Purpose

Changes border color.

## Example

```html id="l8nm4q"
<h1 style="border:2px solid Tomato;">
Hello World
</h1>
```

## Breakdown

* `2px` → border thickness
* `solid` → border style
* `Tomato` → border color

---

# Color Values

## Supported Formats

| Format | Example                |
| ------ | ---------------------- |
| RGB    | `rgb(255,99,71)`       |
| RGBA   | `rgba(255,99,71,0.5)`  |
| HEX    | `#ff6347`              |
| HSL    | `hsl(9,100%,64%)`      |
| HSLA   | `hsla(9,100%,64%,0.5)` |

---

# RGB Colors

## Meaning

RGB = Red + Green + Blue

## Syntax

```html id="8cqu88"
rgb(red, green, blue)
```

## Range

Each value:

```text id="sru7r3"
0 → 255
```

## Total Possible Colors

```text id="s2w10t"
256 × 256 × 256 = 16,777,216 colors
```

---

# RGB Examples

## Red

```html id="swqgc5"
rgb(255, 0, 0)
```

## Green

```html id="vuwp8f"
rgb(0, 255, 0)
```

## Blue

```html id="v5xt53"
rgb(0, 0, 255)
```

## Black

```html id="1z7y1f"
rgb(0, 0, 0)
```

## White

```html id="8rzwwi"
rgb(255, 255, 255)
```

---

# Shades of Gray in RGB

## Rule

Use equal RGB values.

## Examples

```html id="i0zhye"
rgb(60, 60, 60)
rgb(100, 100, 100)
rgb(140, 140, 140)
rgb(240, 240, 240)
```

---

# RGBA Colors

## Meaning

RGBA = RGB + Alpha(opacity)

## Syntax

```html id="qz0lph"
rgba(red, green, blue, alpha)
```

## Alpha Range

| Value | Meaning           |
| ----- | ----------------- |
| `0`   | Fully transparent |
| `1`   | Fully visible     |

---

# RGBA Examples

```html id="e0bhpb"
rgba(255, 99, 71, 0)
rgba(255, 99, 71, 0.5)
rgba(255, 99, 71, 1)
```

---

# HEX Colors

## Syntax

```html id="djlwmj"
#rrggbb
```

## Structure

| Part | Meaning |
| ---- | ------- |
| `rr` | Red     |
| `gg` | Green   |
| `bb` | Blue    |

## Range

```text id="49v5mu"
00 → ff
```

Equivalent to decimal:

```text id="yyxwvh"
0 → 255
```

---

# HEX Examples

## Red

```html id="i9g6lc"
#ff0000
```

## Green

```html id="k1gh07"
#00ff00
```

## Blue

```html id="2y2d8d"
#0000ff
```

## Black

```html id="6dvm5f"
#000000
```

## White

```html id="e9gh8q"
#ffffff
```

---

# Shades of Gray in HEX

## Rule

Use equal values for RR, GG, BB.

## Examples

```html id="7k9f8o"
#404040
#686868
#a0a0a0
#f8f8f8
```

---

# HSL Colors

## Meaning

HSL = Hue + Saturation + Lightness

## Syntax

```html id="t5d6km"
hsl(hue, saturation, lightness)
```

---

# Hue

## Meaning

Position on color wheel.

| Value | Color |
| ----- | ----- |
| `0`   | Red   |
| `120` | Green |
| `240` | Blue  |

## Range

```text id="tfv0m5"
0 → 360 degrees
```

---

# Saturation

## Meaning

Intensity/purity of color.

| Value  | Meaning         |
| ------ | --------------- |
| `100%` | Full color      |
| `50%`  | Mixed with gray |
| `0%`   | Completely gray |

---

# Lightness

## Meaning

Amount of light in color.

| Value  | Meaning |
| ------ | ------- |
| `0%`   | Black   |
| `50%`  | Normal  |
| `100%` | White   |

---

# HSL Examples

```html id="6m2kgh"
hsl(0, 100%, 50%)
hsl(240, 100%, 50%)
hsl(147, 50%, 47%)
```

---

# Shades of Gray in HSL

## Rule

Set:

```text id="bz1mcm"
Hue = 0
Saturation = 0%
```

Then adjust lightness.

## Examples

```html id="y0cdb2"
hsl(0, 0%, 20%)
hsl(0, 0%, 40%)
hsl(0, 0%, 90%)
```

---

# HSLA Colors

## Meaning

HSLA = HSL + Alpha(opacity)

## Syntax

```html id="0xtu7i"
hsla(hue, saturation, lightness, alpha)
```

---

# HSLA Alpha Values

| Value | Meaning           |
| ----- | ----------------- |
| `0`   | Fully transparent |
| `1`   | Fully visible     |

---

# HSLA Examples

```html id="w6xkws"
hsla(9, 100%, 64%, 0)
hsla(9, 100%, 64%, 0.5)
hsla(9, 100%, 64%, 1)
```

---

# Important Notes About Colors

## RGB

* Uses light intensity
* Great for digital displays

## RGBA / HSLA

* Supports transparency using alpha channel

## HEX

* Very common in web development
* Compact representation

## HSL

* Easier to understand and modify visually

---

# Quick Comparison Table

| Format | Example                | Transparency Support |
| ------ | ---------------------- | -------------------- |
| RGB    | `rgb(255,0,0)`         | ❌                    |
| RGBA   | `rgba(255,0,0,0.5)`    | ✅                    |
| HEX    | `#ff0000`              | ❌                    |
| HSL    | `hsl(0,100%,50%)`      | ❌                    |
| HSLA   | `hsla(0,100%,50%,0.5)` | ✅                    |

---

# Tags Learned in This Section

| Tag            | Purpose                 |
| -------------- | ----------------------- |
| `<blockquote>` | Long quotation          |
| `<q>`          | Short quotation         |
| `<abbr>`       | Abbreviation            |
| `<address>`    | Contact information     |
| `<cite>`       | Title of work           |
| `<bdo>`        | Text direction override |

---

# Important Best Practices

* Use `<blockquote>` for long quotes
* Use `<q>` for short inline quotes
* Use `title` with `<abbr>`
* Use `<cite>` only for work titles
* Use comments for documentation/debugging
* Prefer meaningful color usage
* Use RGBA/HSLA when transparency is needed
* Use lowercase color values and tags

---

```
```
