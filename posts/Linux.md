---
title: 'Linux'
date: '2022-11-29'
---
A random assortment of notes on linux including commands. This is a work in progress

### chmod
Owner | Group | Other
------------ | ------------ | ------------
r w x | r w x | r w x
------------ | ------------ | ------------
1 1 1 | 1 1 1  | 1 1 1

- 4 is for `read`
- 2 is for `write`
- 1 is for `execute`
- 0 is for `no permission`

Changes file permissions to a `mode` and a mode describes the permissions to modify. 
Doesn't change the permissions of symbolic links. 
Eg `chmod 740` allows read, write, execute for owner, read for group and no permission for other.

![image info](/images/profile.jpg)

### Vim 
Vim is a popular command based text editor. Vim is keyboard orientated which renders your mouse useless. It can make you a more effecient developer especially as a project gets larger and most coding requires hopping about a code base making changes. There are a number of keyboard shortcuts which I'll list below:
- `:q` quit 
- `:w` save (this can be used in conjunction with `q`)
- `i` this is `insert` mode which allows you to edit starting before the current character **Note** to leave this ensure you `esc`
- `a` this allows you to edit characters starting after the current character
- `h`, `j`, `k`, `l` - these are used to move left, right, up, down
- `w` to move forward one word
- `b` to move back 1 word
- `gg` to move to very start of file
- `$` to move to end of line
- `0` to move to start of line
- `dw` to delete a word and `dd` to delete an entire line
- `/` to begin searching for a word
- For copying and pasting, you can use a combination of `v` to highlight words and `y` to `yank` them followed by `p` to paste it
- `u` to undo the last thing

Those are just some basic commands I find quite useful however you can hone your vim skills here: https://vim-adventures.com/ or use this anki deck: https://ankiweb.net/shared/info/553269875.