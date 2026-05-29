````md
# HTML Notes

## What is HTML?
- HTML stands for **Hyper Text Markup Language**
- HTML is the standard markup language for creating web pages
- HTML describes the structure of a web page
- HTML consists of a series of elements
- HTML elements tell the browser how to display content
- HTML elements label content like headings, paragraphs, links, etc.

---

# Basic HTML Document Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>Page Title</title>
</head>
<body>

    <h1>My First Heading</h1>
    <p>My first paragraph.</p>

</body>
</html>
````

## Explanation

* `<!DOCTYPE html>` → Declares the document as HTML5
* `<html>` → Root element of the page
* `<head>` → Contains meta information
* `<title>` → Title shown in browser tab/title bar
* `<body>` → Contains all visible webpage content
* `<h1>` → Large heading
* `<p>` → Paragraph

---

# HTML Elements

## Syntax

```html
<tagname>Content</tagname>
```

## Example

```html
<h1>My First Heading</h1>
<p>My first paragraph.</p>
```

| Start Tag | Content             | End Tag |
| --------- | ------------------- | ------- |
| `<h1>`    | My First Heading    | `</h1>` |
| `<p>`     | My first paragraph. | `</p>`  |
| `<br>`    | none                | none    |

## Empty Elements

* Elements with no content are called **empty elements**
* They do not have closing tags

Example:

```html
<br>
```

---

# Nested HTML Elements

* HTML elements can contain other elements
* Most HTML documents use nested elements

Example:

```html
<html>
<body>
    <h1>Heading</h1>
    <p>Paragraph</p>
</body>
</html>
```

---

# Never Skip End Tags

Some elements may still work without end tags, but it is bad practice.

Bad Example:

```html
<p>This is a paragraph
<p>This is another paragraph
```

* Missing end tags can cause unexpected behavior

---

# HTML is Not Case Sensitive

These are treated the same:

```html
<P>
<p>
```

## Recommendation

* Always use lowercase tags
* XHTML strictly requires lowercase

---

# Web Browsers

* Browsers read HTML documents and display them
* Browsers do NOT display HTML tags directly
* Browsers use tags to determine content structure and formatting

Examples of browsers:

* Chrome
* Edge
* Firefox
* Safari

---

# HTML Page Structure

```html
<html>
<head>
    <title>Page title</title>
</head>

<body>
    <h1>This is a heading</h1>
    <p>This is a paragraph.</p>
</body>
</html>
```

## Important Notes

* Content inside `<body>` is visible on webpage
* Content inside `<title>` appears in browser tab

---

# HTML History

| Year | Version/Event                 |
| ---- | ----------------------------- |
| 1989 | Tim Berners-Lee invented WWW  |
| 1991 | Tim Berners-Lee invented HTML |
| 1993 | Dave Raggett drafted HTML+    |
| 1995 | HTML 2.0                      |
| 1997 | HTML 3.2                      |
| 1999 | HTML 4.01                     |
| 2000 | XHTML 1.0                     |
| 2008 | HTML5 First Public Draft      |
| 2012 | HTML5 Living Standard         |
| 2014 | HTML5 Recommendation          |
| 2016 | HTML 5.1                      |
| 2017 | HTML5.1 2nd Edition           |
| 2017 | HTML5.2                       |

---

# HTML Documents

## Basic Structure

```html
<!DOCTYPE html>
<html>
<body>

<h1>My First Heading</h1>
<p>My first paragraph.</p>

</body>
</html>
```

## Rules

* Every HTML document should begin with:

```html
<!DOCTYPE html>
```

* Document starts with:

```html
<html>
```

* Document ends with:

```html
</html>
```

* Visible content goes inside:

```html
<body>
```

---

# `<!DOCTYPE>` Declaration

## Purpose

* Defines document type
* Helps browser display webpage correctly

## Rules

* Must appear only once
* Must be at top of page
* Not case sensitive

## HTML5 Declaration

```html
<!DOCTYPE html>
```

---

# HTML Headings

## Tags

```html
<h1> to <h6>
```

* `<h1>` → Most important
* `<h6>` → Least important

Example:

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
```

## Important Notes

* Browsers automatically add margin before and after headings
* Search engines use headings for indexing
* Headings help define page structure

## Recommended Structure

```html
<h1>Page Title</h1>
<h2>Section</h2>
<h3>Sub-section</h3>
```

## Best Practice

* Use only ONE `<h1>` per page

## Do NOT

* Use headings just to make text big or bold

## Custom Size

```html
<h1 style="font-size:60px;">Heading</h1>
```

---

# HTML Paragraphs

## Paragraph Tag

```html
<p>This is a paragraph.</p>
```

## Features

* Always starts on new line
* Browser adds margin automatically

---

# HTML Display Behavior

## Important

HTML ignores:

* Extra spaces
* Extra lines

Example:

```html
<p>
This    text
has many spaces
</p>
```

Browser displays it normally.

---

# Horizontal Rules (`<hr>`)

## Purpose

* Creates thematic/content break
* Usually displayed as horizontal line

Example:

```html
<hr>
```

## Notes

* Empty element
* No closing tag

---

# Line Breaks (`<br>`)

## Purpose

* Adds new line without new paragraph

Example:

```html
<p>This is<br>a paragraph</p>
```

## Notes

* Empty element
* No closing tag

---

# `<pre>` Element

## Purpose

Displays preformatted text.

* Preserves:

  * spaces
  * line breaks

* Uses fixed-width font

Example:

```html
<pre>
Line 1
    Line 2
</pre>
```

---

# HTML Links

## Syntax

```html
<a href="URL">Link Text</a>
```

Example:

```html
<a href="https://www.w3schools.com">
Visit W3Schools
</a>
```

## `href` Attribute

* Specifies destination URL

---

# HTML Images

## Syntax

```html
<img src="image.jpg" alt="description">
```

## Common Attributes

| Attribute | Purpose          |
| --------- | ---------------- |
| `src`     | Image path       |
| `alt`     | Alternate text   |
| `width`   | Width in pixels  |
| `height`  | Height in pixels |

Example:

```html
<img src="w3schools.jpg"
     alt="W3Schools.com"
     width="104"
     height="142">
```

---

# Image URLs

## Absolute URL

Links to external website image.

Example:

```html
src="https://www.w3schools.com/images/img_girl.jpg"
```

### Notes

* May have copyright issues
* External image can change/remove anytime

---

## Relative URL

Links to image inside same website.

Examples:

```html
src="img_girl.jpg"
src="/images/img_girl.jpg"
```

### Recommendation

* Prefer relative URLs

---

# `alt` Attribute

## Purpose

Provides alternate text if image cannot load.

Reasons:

* Slow internet
* Broken image path
* Screen reader accessibility

Example:

```html
<img src="img.jpg" alt="Girl with a jacket">
```

---

# HTML Attributes

## Important Points

* All HTML elements can have attributes
* Attributes provide additional information
* Written inside start tag
* Usually:

```html
name="value"
```

---

# `style` Attribute

## Purpose

Adds CSS styling to element.

Syntax:

```html
<tag style="property:value;">
```

Example:

```html
<p style="color:red;">Red paragraph</p>
```

---

# Common CSS Properties

## Background Color

```html
<body style="background-color:powderblue;">
```

---

## Text Color

```html
<h1 style="color:blue;">
```

---

## Font Family

```html
<p style="font-family:courier;">
```

---

## Font Size

```html
<h1 style="font-size:300%;">
```

---

## Text Alignment

```html
<h1 style="text-align:center;">
```

---

# `lang` Attribute

## Purpose

Defines webpage language.

Example:

```html
<html lang="en">
```

## Country-Specific

```html
<html lang="en-US">
```

---

# `title` Attribute

## Purpose

Shows extra information as tooltip.

Example:

```html
<p title="I'm a tooltip">
This is a paragraph.
</p>
```

---

# Attribute Best Practices

## Use Lowercase

Recommended:

```html
title
```

Avoid:

```html
TITLE
```

---

## Always Use Quotes

Good:

```html
<a href="https://example.com">
```

Bad:

```html
<a href=https://example.com>
```

---

# Single vs Double Quotes

## Double Quotes

Most common:

```html
<p title="Hello">
```

## Single Quotes

Useful when value contains double quotes:

```html
<p title='John "ShotGun" Nelson'>
```

---

# Viewing HTML Source

## View Page Source

* Press:

```text
CTRL + U
```

OR

* Right-click → "View Page Source"

---

## Inspect Element

* Right-click → "Inspect"

Can view/edit:

* HTML
* CSS

---

# HTML Text Formatting

| Tag        | Meaning          |
| ---------- | ---------------- |
| `<b>`      | Bold text        |
| `<strong>` | Important text   |
| `<i>`      | Italic text      |
| `<em>`     | Emphasized text  |
| `<mark>`   | Highlighted text |
| `<small>`  | Smaller text     |
| `<del>`    | Deleted text     |
| `<ins>`    | Inserted text    |
| `<sub>`    | Subscript        |
| `<sup>`    | Superscript      |

---

# `<b>` vs `<strong>`

## `<b>`

* Bold text only
* No extra importance

Example:

```html
<b>Bold Text</b>
```

## `<strong>`

* Important text
* Usually bold

Example:

```html
<strong>Important Text</strong>
```

---

# `<i>` vs `<em>`

## `<i>`

* Alternate voice/mood
* Technical term, foreign phrase, etc.

Example:

```html
<i>Italic text</i>
```

## `<em>`

* Emphasized text
* Screen readers stress pronunciation

Example:

```html
<em>Emphasized text</em>
```

---

# `<small>`

Displays smaller text.

Example:

```html
<small>Small text</small>
```

---

# `<mark>`

Highlights text.

Example:

```html
<p>Buy <mark>milk</mark></p>
```

---

# `<del>`

Shows deleted text.

Example:

```html
<p><del>Blue</del></p>
```

Usually shown with strike-through.

---

# `<ins>`

Shows inserted text.

Example:

```html
<p><ins>Red</ins></p>
```

Usually underlined.

---

# `<sub>`

Subscript text.

Example:

```html
H<sub>2</sub>O
```

---

# `<sup>`

Superscript text.

Example:

```html
x<sup>2</sup>
```

---

# Important Best Practices

* Always use lowercase tags and attributes
* Always close tags properly
* Always quote attribute values
* Use semantic tags correctly
* Use only one `<h1>` per page
* Prefer relative URLs for internal resources
* Use `alt` attribute for accessibility
* Use headings for structure, not styling

---

# Tags Learned So Far

| Tag             | Purpose              |
| --------------- | -------------------- |
| `<html>`        | Root element         |
| `<head>`        | Metadata container   |
| `<title>`       | Browser tab title    |
| `<body>`        | Visible page content |
| `<h1>` - `<h6>` | Headings             |
| `<p>`           | Paragraph            |
| `<a>`           | Hyperlink            |
| `<img>`         | Image                |
| `<br>`          | Line break           |
| `<hr>`          | Horizontal rule      |
| `<pre>`         | Preformatted text    |
| `<b>`           | Bold                 |
| `<strong>`      | Important text       |
| `<i>`           | Italic               |
| `<em>`          | Emphasized text      |
| `<small>`       | Smaller text         |
| `<mark>`        | Highlight text       |
| `<del>`         | Deleted text         |
| `<ins>`         | Inserted text        |
| `<sub>`         | Subscript            |
| `<sup>`         | Superscript          |

---

```
```
