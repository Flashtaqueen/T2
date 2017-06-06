## Torchlight Armory Decoder
This is a simple js file to decode torchlight armory skill calculator links, and recode them in tidbi.ru skill calculator links 

## How it works ?

Simply go on a page with links, open a js console, paste the file, press &lt;Enter>

## Can it recode my build links ? I've kept them in my bookmarks !

Sure !

The core function is : `SmallHash.decodeUrl(["<url>"] [, loglevel])`

`URL` and `loglevel` are both optionnal :

- with `loglevel` set at 1 it will show its decoding on console (list of stats and skills), 
- without `loglevel` it will only show translated link,
- without arguments, it will replace all the Torchlight Armory links on the current page.

So to translate a single URL, all you have to do is to launch a js console, paste the script, and type `SmallHash.decodeUrl("<your URL>", 1)`

I've added a `document.onload` event that launch it at the end of script for convenience : so it run this function with no argument on paste + enter

## But there are no links left on the new runic forum !!!

Yes, but it also works on the Internet Wayback Machine, for ex : try it on the [Frost Embermage Build](https://web.archive.org/web/20160804062549/http://forums.runicgames.com/viewtopic.php?f=43&t=36991)

## Is it reliable ?

For the skill calculator : yes. I've tested it on all available builds link on the wayback archive of torchlight armory (~1000 links by class), and it worked on all of them, except for 2 or 3 obviously mangled links.

I won't enter into the detail of how I built and tested this (would be quite lengthy). But if anyone is interested I can tell...

NB : I've ony tested it in Firefox, so there may be some bug on other browsers (let me know).

## But ... WHY ?!

I found T2 such an awesome game, and T2 armory disparition such a pity I decided to do sthg.

Cheers !
Hope it will be of some help...
