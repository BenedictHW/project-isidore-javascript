---
title: "Installation of Spacemacs on Windows 10 via WSL2"
date: "2021-02-04"
---

# Table of Contents

1.  [Introduction](#orgc9a03ad)
    1.  [Install Microsoft Windows Subsystem for Linux (WSL) & Your Linux Distribution](#org08c9768)
    2.  [Install X Server](#orgaab4b1b)
    3.  [Install Spacemacs](#orgbe61ec3)
        1.  [Fixing the Font](#orga4d08b7)
    4.  [How WSL (Ubuntu) files are treated by Windows](#org34f4b1c)
        1.  [Further Reading](#orgdb4b0d6)
        2.  [Symlink to your Windows folders](#org44d7da7)
    5.  [Getting Comfortable with Spacemacs](#orgb6dd1ae)
        1.  [Prerequisite: familiarity with basic vim operations](#org8ea1f7c)
        2.  [Watch and Learn](#org1fb5ab4)
        3.  [Do and Explore](#org4f91c62)
        4.  [Customize](#orgcd75788)
    6.  [Conclusion](#orgcd4434d)
    7.  [References](#org097ba94)


<a id="orgc9a03ad"></a>

# Introduction

Is it possible to judge whether or not a piece of music is objectively good, perfect and beautiful? The word "objectively" must sound a bit old fashioned, after all, every man is doing what is right in his own eyes in these times. But we can be reasonably certain that a song which has been well loved generation after generation has a quality absent from a yet untested, recently released album. Yes, I'm talking about Emacs here. 40 odd years is a terribly long time in the world of software. We have reason to be grateful as spacemacs has done its part in flattening the notorious Emacs learning curve. But enough evangelizing. This comprehensive tutorial can be said to be directed towards non-programmers who are comfortable with computing (as this write-up originally existed as personal notes of mine). I hope you take away something useful!

1.  Prerequisites

Check that you meet the requirements for running WSL2. "Win + r", type in "winver" and hit enter. Open command prompt or powerhsell and enter:

    systeminfo | find "System Type"

Compare your Windows version with the below   

-   For x64 systems: Version 1903 or higher, with Build 18362 or higher.
-   For ARM64 systems: Version 2004 or higher, with Build 19041 or higher.


<a id="org08c9768"></a>

## Install Microsoft Windows Subsystem for Linux (WSL) & Your Linux Distribution     

I feel obliged to point out that there exist multiple popular ways of installing Emacs on a Windows machine. You may compile Emacs source code and run it "natively" through [Cygwin](https://www.cygwin.com/). Another option is to run a virtual linux machine and install Emacs from there. Because installing natively would mean more workarounds in the future when dealing with external software and also because WSL offers better system call compatibility, I elected to go down the more well trodden path of running Emacs on Ubuntu through WSL. In the simplest terms, WSL is a very lightweight virtual machine that allows you to use linux kernels to run linux apps in Windows *without* dual booting.

First, install the Microsoft Windows Subsystem for Linux version 2. WSL 2 is recommended over WSL 1 Unless you plan on using Lennox commandline on files stored in the Native Windows file system instead of the WSL filesystem. I will go into more detail later, but the WSL filesystem is accessible in Windows Explorer and shows up as a network drive. If you are unsure, go with WSL2.  [This process is already documented by Microsoft (includes troubleshooting guidelines).](https://docs.microsoft.com/en-us/windows/wsl/install-win10#step-1---enable-the-windows-subsystem-for-linux) Repeated here for completion's sake:

Enable the windows feature called "Windows subsystem for Linux" by either checking the box in the GUI screen. You can get there by searching "Turn Windows features on or off" in the control panel search box. Do the same for the check box titled "virtual machine platform". you can enable these 2 features via the shell as well.

![img](/images/2021/enable-wsl.png)

OR open the power shell as administrator and run:

    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

now you have to download and run the Linux kernel update package from Microsoft. Again make sure you download the right one for your CPU architecture.

-   <https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi>
-   <https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_arm64.msi>

Last but not least, set WSL 2 as the default version when you install a new Linux distribution.

Open the powershell and run:

    wsl --set-default-version 2

Now you can go to the window store and download your preferred lytics distribution. I went with Ubuntu. One thing to note is that you may find three results when you search Ubuntu in the Windows store.

-   Ubuntu (This one updates to the latest long term support version)
-   Ubuntu 20.04 (Stays on 20.04 LTS)
-   Ubuntu 18.04 (Stays on 18.04 LTS)

[If for some reason you are unable to download applications from the Windows store, you can install the distribution through manual methods.](https://docs.microsoft.com/en-us/windows/wsl/install-manual) After installing through the window store, launching the Ubuntu will ask you for a username and password for your superuser account.


<a id="orgaab4b1b"></a>

## Install X Server     

This is the software that allows linux to display GUI elements. You have many options here: 

1.  Xming
2.  Mobaxterm
3.  Vcxsrv

I have chosen Vcxsrv. Simple installation and configuration. [Download and run the sourceforge installer and you can launch the program by the "Xlaunch" shortcut.](https://sourceforge.net/projects/vcxsrv/) No need to change any of the settings. Click next until the end and you should see a system tray icon similar to an X. Feel free to add the "X Launch" shortcut to your Windows (Win + R) <startup>  folder.

![img](/images/2021/vcxsrv.png)    

The last step before launching is to configure your X Server correctly. In the WSL terminal, export the DISPLAY variable. 

    $ export DISPLAY=$(awk '/nameserver / {print $2; exit}' /etc/resolv.conf 2>/dev/null):0
    $ export LIBGL_ALWAYS_INDIRECT=1

The reason for the above is because the internal IP address of the WSL (2) server changes on reboot. Don't worry, the team at WSL has ensured that connections to WSL from Windows (Ex. localhost:8000) require no extra configuration. The snippet above for is for WSL to Windows 10 GUI applications. [And WSL may be supporting GUI apps in the near future, so no X server would be needed.](https://devblogs.microsoft.com/commandline/whats-new-in-the-windows-subsystem-for-linux-september-2020/#gui-apps) You will probably want to put the two export commands into your .bashrc file, located in ~/home/$USER$/ folder. We can do this after completing the steps below.


<a id="orgbe61ec3"></a>

## Install Spacemacs

Spacemacs is a preset configuration of Emacs, so we must first make sure Emacs is installed properly. The default Emacs build that comes with Ubuntu on WSL doesn't support XWindows (the X Server we just installed). To fix this we are going to add Kevin Kelley's builds of Emacs with XWindows supports, simply by adding Kevin's PPA to WSL. Enter the following in the WSL Terminal.

    sudo apt update && sudo apt upgrade
    sudo add-apt-repository ppa:kelleyk/emacs
    sudo apt update
    sudo apt install emacs27

Enter the following in your WSL terminal to install spacemacs from the develop branch. It is strongly recommended to use develop over master as bugs get fixed more quickly on develop. You have the option to change later on. Make sure git is installed on Ubuntu and clone the spacemacs repo.

    git clone -b develop https://github.com/syl20bnr/spacemacs ~/.emacs.d

Now for the moment of truth. Launch spacemacs by the following command in the WSL terminal.

    $ emacs27 & 

On the initial startup, you will be presented with a few choices. Pick "All aboard the evil&#x2026;..Vim" and then "Full Installation" for the second choice. Rest assured, you will be able to change the first option later on in your dotspacemacs (~/.spacemacs) file and if you are a beginner, the full installation is preferred over the base installation. In the first initial startup, you will have to wait for all the MELPA packages to download and install. MELPA is the package manager for all Emacs packages. After the download is completed, you will have successfully installed spacemacs. 


<a id="orga4d08b7"></a>

### Fixing the Font

If you get a message informing you that "adobe source code pro" cannot be found, you can install it with the following WSL bash commands <sup><a id="fnr.1" class="footref" href="#fn.1">1</a></sup>.

    #!/bin/bash
    set  -euo pipefail
    I1FS=$'\n\t'
    mkdir -p /tmp/adodefont
    cd /tmp/adodefont
    wget -q --show-progress -O source-code-pro.zip https://github.com/adobe-fonts/source-code-pro/archive/2.030R-ro/1.050R-it.zip
    unzip -q source-code-pro.zip -d source-code-pro
    fontpath="${XDG_DATA_HOME:-$HOME/.local/share}"/fonts
    mkdir -p $fontpath
    cp -v source-code-pro/*/OTF/*.otf $fontpath
    fc-cache -f
    rm -rf source-code-pro{,.zip}


<a id="org34f4b1c"></a>

## How WSL (Ubuntu) files are treated by Windows

**DO NOT** access the WSL linux files under @appdata/canonical etc. in the Windows explorer. According to the developers, this is due to differences in how file metadata is implemented in linux versus Windows. 2 methods of properly accessing your files:

1.  To access your linux files, in your WSL bash terminal enter in
    
        explorer.exe .
2.  WSL Filepath method. Location of these files is under "\\\wsl$". Click on windows explorer address bar at the top to input this address.

3.  Tangentially related, but if you find that WSL2 uses too much system memory or want to set other configuration options, the [Microsoft WSL2 has enabled that via a .wslconfig file](https://docs.microsoft.com/en-us/windows/wsl/wsl-config#configure-global-options-with-wslconfig) located in your C:\Users\<yourUserName>\.wslconfig. My own configuration is as follows:

        [wsl2]
        memory=1GB # Limits VM memory in WSL 2 to 1 GB


<a id="orgdb4b0d6"></a>

### Further Reading

-   [What’s new for WSL in Windows 10 version 1903? | Windows Command Line](https://devblogs.microsoft.com/commandline/whats-new-for-wsl-in-windows-10-version-1903/)
-   [A Deep Dive Into How WSL Allows Windows to Access Linux Files | Windows Comma&#x2026;](https://devblogs.microsoft.com/commandline/a-deep-dive-into-how-wsl-allows-windows-to-access-linux-files/)
-   [Do not change Linux files using Windows apps and tools | Windows Command Line](https://devblogs.microsoft.com/commandline/do-not-change-linux-files-using-windows-apps-and-tools/)
-   [How to Access Your Linux (WSL) Files in Windows 10](https://www.howtogeek.com/426749/how-to-access-your-linux-wsl-files-in-windows-10/)
-   [File Permissions | Microsoft Docs](https://docs.microsoft.com/en-us/windows/wsl/file-permissions)


<a id="org44d7da7"></a>

### Symlink to your Windows folders

Author has created symbolic links to make filesystem navigation more simple. Without symbolic links, your Windows files are accessible through "*/mnt/c*" from the Ubuntu root directory. 

      ln -s /mnt/c/Users/Hanshen/Documents/ ~/
      ln -s /mnt/c/Users/Hanshen/Downloads/ ~/
      ln -s /mnt/c/Users/Hanshen/Pictures/ ~/
      ln -s /mnt/c/Users/Hanshen/Music/ ~/
      ln -s /mnt/c/Users/Hanshen/Videos/ ~/


<a id="orgb6dd1ae"></a>

## Getting Comfortable with Spacemacs

A couple of first steps to get yourself grounded. Makre sure you take caution to avoid the dreaded Emacs pinkie. Repetitive strain injury and carpal tunnel are painful and debilitating. Personally, I have made the following changes to my keyboard layout to make it more ergonomic. The benefits spill over to applications outside of Emacs as well. To do so:

1.  [Install Microsoft PowerToys](https://github.com/microsoft/PowerToys)
2.  Under the Keyboard Remapper, swap right ctrl and right alt.
3.  swap left ctrl and left alt.
4.  swap left alt (physically the left ctrl key) with the Windows key. This will retain comfortable alt-tabbing.
5.  swap esc with caps lock.

Emacs is designed to be keyboard driven, although scrolling and mouse support works out of the box. Now let's get started.


<a id="org8ea1f7c"></a>

### Prerequisite: familiarity with basic vim operations

If are new or want a brushup, access the built in tutorial via "SPC h T v" in spacemacs ("SPC h T e" for the emacs version). If you pause after hitting "SPC", you will see a popup. This package is called ["emacs-which-key"](https://github.com/justbur/emacs-which-key) and it frees you for remembering 1001 commands. Like memorizing a piano piece, you will pick up your most commonly used bindings soon enough. To extend this analogy further, spacemacs bindings are not without reason, but are designed to be mnemonic. If you are new to vim's way of modal editing, here is some helpful reading: [vi - What is your most productive shortcut with Vim? - Stack Overflow](https://stackoverflow.com/questions/1218390/what-is-your-most-productive-shortcut-with-vim/1220118#1220118). Even more interactive vim tutorials are easily found online. 


<a id="org1fb5ab4"></a>

### Watch and Learn

In terms of time efficiency, depth of content covered, and ease of understanding, nothing surpasses:[Spacemacs: Installation, Configuration, and Navigation Tutorial - YouTube (20 min).](https://www.youtube.com/watch?v=fdLCuJcS2Aw) I seriously and whole-heartedly recommend the rest of his videos. Definitely try following along.

Almost all configuration will be done in your ~/.spacemacs file. For a proper understanding of the ~/.spacemacs file, [see Streaky Cobra's breakdown of the file.](https://stackoverflow.com/questions/37076998/how-to-configure-spacemacs-so-that-it-executes-code-when-you-start-it) The only update to this information is the placement of custom user layers and snippets in the "private" directory of the ~/.emacs.d . But that is a worry for later.


<a id="org4f91c62"></a>

### Do and Explore

Spacemacs places it's help commands under "SPC h", so give those a try. A hint for new users, "SPC h d", opens up a plethora of information. I'm am proceeding under the assumption you have watched the video in 1) and so one of the topics only lightly discussed was the concept of major and minor modes. A buffer can have one major mode, and multiple minor modes. Of course, Emacs being Emacs, it's possible to have two major modes [with the package Polymode.](https://github.com/polymode/polymode) "SPC h d b" will pull up a buffer describing the currently active modes. You can access the spacemacs beginner tutorial with "SPC h SPC", and then typing in "Beginner's Tutorial". Now you can navigate the tutorial with the movement keys you have just learned. [The tutorial is also accessible here.](https://develop.spacemacs.org/doc/BEGINNERS_TUTORIAL.html)


<a id="orgcd75788"></a>

### Customize

Lastly here is a step by step example to install [the "helpful" package.](https://github.com/Wilfred/helpful) This is just a concrete example of package installation & configuration process. This particular package was chosen simply because it extends the "self-documenting" aspect of Emacs.

If you have found a useful Emacs package, the installation differs slightly than vanilla Emacs. The first thing to do is check the [spacemacs develop layers list](https://develop.spacemacs.org/layers/LAYERS.html) to see if a layer has included your desired package. Lets do that with the "helpful" package. Huh. [So it is already included in a layer!](https://develop.spacemacs.org/layers/+emacs/helpful/README.html) That makes life easier for us, we can follow the README installation instructions. Don't forget to hit "SPC f e R" to reload your configuration after adding the layer to your ~/.spacemacs file.

Now if your package is not already pre-configured in a layer, it is most likely either on MELPA or Github. If it is a local package, I'm afraid you'll have to consult the README.md found in ~/.emacs.d/private/local . In fact, that README contains all the information we need for all three use cases above. Quoted below:

     1.  For a local package:
         
         -   Load the file explicitly, using the full path to the file, by placing a
         
         \`(load "~/.emacs.d/private/local/package-name")\` within the body of the
         \`dotspacemacs/user-config\` function of your dotspacemacs file.
         
         -   Alternatively create a directory with the name of the package in the
         
         \`.emacs.d/private/local\` directory, and add that directory to the load-path
         variable by adding \`(some-package :location local)\` to the list
         \`dotspacemacs-additional-packages\` within the \`dotspacemacs/layers\` function
         of your dotspacemacs file. After placing your package file into this
         package-directory the file can be loaded, without requiring the full path, by
         placing a \`(require 'package-name)\` within the body of the
         \`dotspacemacs/user-config\` function of your dotspacemacs file.
     
     2.  If the package is on (M)ELPA simply add the package name to the list
         \`dotspacemacs-additional-packages\` in your dotspacemacs file
     
     3.  For a package hosted on github the recipe for github packages can be used i.e. add
     
     \`\`\`
     (some-package :location (recipe
     :fetcher github
     :repo "some/repo"))
     \`\`\`
     
     to the list \`dotspacemacs-additional-packages\` in your dotspacemacs file.
    
There is no substitute for reading the documentation of the package. Or the source code itself. Luckily, the package we are about to customize makes the latter task slightly easier. Let us pretend we want to customize a variable in our dotspacemacs file. Before we do that, let's switch to the ~/.spacemacs (dotspacemacs) file buffer with "SPC b b".  

One important point to keep in mind is that all key bindings are simply calling a command. From the code and package docs we can see that "helpful-variable" is a command. To run any interactive function in Emacs, we will use M-x ("alt-x" or the spacemacs way: "SPC SPC") and type in "helpful-variable". Before we run it by hitting RET (enter), we notice &#x2013; thanks to helm, an emacs completion package &#x2013; that the keybinding already set for that command is "C-h v". Good to know. Press ESC to exit.

"SPC b d", ESC, q and C-g are the common default bindings to close a buffer or window. 

In our dotspacemacs file let's press "SPC s s" and type in "dotspacemacs-themes". Make sure our cursor is placed on the variable "dotspacemacs-themes" and use the keybind we learned earlier: "C-h v". The variable at our cursor is filled in and a helpful buffer is drawn up. Give it a quick read. If you are curious you can compare it to "SPC h d v" with the cursor on the same point. Try swapping the "dotspacemacs-themes" variable. Save, "SPC f s" and reload "SPC f e R".

    dotspacemacs-themes '(spacemacs-light
                          spacemacs-dark)


<a id="orgcd4434d"></a>

## Conclusion

So there you have it. The universality and power of vim's modal editing combined with the endless flexibility of a lisp interpreter. Made "modern" and accessible thanks to the blood, sweat, tears and smarts of open-source contributors. Where to go from here?

-   Install the appropriate layer for your favourite language and get working.
-   Explore what are often called the "killer features" of emacs: [org-mode and magit.](https://www.youtube.com/watch?v=S4f-GUxu3CY&list=PLd_Oyt6lAQ8RgaMN3JnmZjxhPZ8jU34fP)
-   If you haven't already heard of it, try the [browser extension Vimium](https://addons.mozilla.org/en-CA/firefox/addon/vimium-ff/) to browse the web with vim keybindings.
-   Familiarize your self with Emacs Lisp or perhaps even [Common Lisp](http://lispcookbook.github.io/cl-cookbook/)?
    -   A no-nonsense "hit the ground running" intro - [Stevey's Blog Rants: Emergency Elisp](http://steve-yegge.blogspot.com/2008/01/emergency-elisp.html)
    -   GNU Intro to Elisp Manual - <https://www.gnu.org/software/emacs/manual/html_node/eintr/>
-   [A much more powerful version of Jupyter notebooks](https://news.ycombinator.com/item?id=16842786) once you get familiar with Emacs. In particular, this is thanks to [the org-babel package.](https://rgoswami.me/posts/jupyter-orgmode/) 
-   Fear of missing out on the freshest news in the Emacs sphere? [Sacha Chua has got you covered.](https://sachachua.com/blog/emacs/)

Once you get comfortable enough, you may even want to remove spacemacs and roll your own custom configuration. There is, however, no rush at all. My thoughts on future blog posts include a showcase of three org-mode packages which are particularly dear to my heart: org-brain, org-agenda, and org-babel. I hope this tutorial has helped you, and have a wonderful day.


<a id="org097ba94"></a>

## References

-   [The definitive guide to installing Spacemacs on Windows](http://mdr78.github.io/2019/07/01/windows-spacemacs-install.html)
-   [GitHub - hubisan/emacs-wsl: Install and run Emacs with the Windows Subsystem &#x2026;](https://github.com/hubisan/emacs-wsl)


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> [Software installation - How to use the Adobe Source Code Pro font? - Ask Ubuntu](https://askubuntu.com/questions/193072/how-to-use-the-adobe-source-code-pro-font)
