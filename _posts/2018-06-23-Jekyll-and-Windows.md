---
layout: post
title:  "Jekyll and Windows"
date:   2018-06-23 23:34:10 +0200
categories: Jekyll Tutorial
color: rgba(192,64,0,0.4)
image: /images/basic-tileable-2.svg
excerpt_separator: <!--more-->
author: Jaroslav
---
## Linux inside Windows?

In this post, I will explain how I installed Ruby and Jekyll in Windows 10. This will work only in Windows 10!

I used Linux subsystem for Windows, you can find installation guide [here][ls4w-guide]. I have chosen Ubuntu as my Linux distro. Please note that this isn't emulation of any sort. You are running actual Linux binaries.

`Pro tip:` if you install X-Server on your computer, then you can run graphical programs too! I am using [Xming][xming-download].

<!--more-->

Benefits of installing Linux subsystem for Windows is that it won't create any mess on your disk. All of it's data is hidden and so you don't have to worry about your disk getting all messed up.

## Jekyll inside Linux inside Windows?

Once you're done with the installation, you have everything you can have on Linux. You don't need to start the bash through the app that came from Windows Store. You can start it by simply typing `bash` into command line. Do it. Start it up and set it up if you haven't done it already.

Next you will have to install some dependencies. To install dependencies I ran this command inside bash:
`sudo apt-get install curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev`
I have found these dependencies [here][dependencies-gh]. Next install ruby: `sudo apt-get install ruby`. And now you can install Jekyll: `sudo gem install jekyll`.
Now you should be ready to create your first Jekyll blog.

Create folder where you want your Jekyll blog to be created. Now from file explorer you can run powershell. To do this click on File -> Open Windows PowerShell. Write `bash` and press enter. And now you can run `Jekyll New "Name of your blog"`.

This will create folder with the name "Name of your blog". Write `cd "Name of your blog"` to switch to this folder. It will contain default Jekyll blog. Type `bundle exec jekyll serve` to start it up. Now you can go into your favorite web browser and visit: `http://localhost:4000/` to see it in action.

Next I will recommend you look around and find some nice template. My blog is based on [dactl][dact-link]. Although I rewritten it almost completely.

## Some tips and tricks

**`IMPORTANT!` I have found that windows is sometimes including [bom character][BOM-wiki] in your files. This will break Jekyll down! To repair files run `sed -i '1s/^\xEF\xBB\xBF//' /_layouts/*` this is example for _layouts folder but you should run it for everything inside your jekyll blog folder!**

One thing I have done differently is 'theme' changing. The original dactl template is using css variables to change the theme. Because I was worried about compatibility issues I have chosen a little different approach. In my css folder I've created main.scss, dark.scss and light.scss. The main.scss would contain all styling rules but the color one. All color styling rules will be stored inside _colors.scss file in _sass folder and the dark.scss and light.scss would contain sass variables that define will be referenced form _colors.scss, it will look like this:

{% highlight scss %}
---
#mandatory front matter
---
@charset 'utf-8';
//Some color variables
$text-color: #111;
$backgroun-color: #eee;

@import "colors";

{% endhighlight %}

This technique will produce two almost identical stylesheets. Now we will use a little bit of javascript to switch between them we will need to put `id="theme_css` into our stylesheet link inside <head> tag:

{% highlight javascript %}

function changeTheme() {
    var url = window.location.protocol + "//" + window.location.host + "/";
    if (document.getElementById('theme_css').href == url + "css/light.css") {
        document.getElementById('theme_css').href = url + "css/dark.css";
        if (window.localStorage) {
            localStorage['theme'] = 'dark';
        }
    }
    else {
        document.getElementById('theme_css').href = url + "css/light.css";
        if (window.localStorage) {
            localStorage['theme'] = 'light';
        }
    }
};

function loadTheme() {
    var url = window.location.protocol + "//" + window.location.host + "/";
    if (window.localStorage) {
        const maybeTheme = localStorage['theme']
        if (maybeTheme) {
            if (maybeTheme == 'dark') {
                document.getElementById('theme_css').href = url + "css/dark.css";
            }
            else {
                document.getElementById('theme_css').href = url + "css/light.css";
            }
        }
        else {
            document.getElementById('theme_css').href = url + "css/dark.css";
        }
    }
}

{% endhighlight %}

This script will change the href of our stylesheet reference and also store it inside browser. Just add `onclick="changeTheme()"` into some button and `onclick="loadTheme()"` into <body> tag. 

If the last part confused you, you can always look inside my github repo of this blog or even fork it.



[ls4w-guide]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[xming-download]: https://sourceforge.net/projects/xming/
[dependencies-gh]: https://github.com/eventmachine/eventmachine/issues/442
[dact-link]: https://melangue.github.io/dactl//
[BOM-wiki]: https://en.wikipedia.org/wiki/Byte_order_mark