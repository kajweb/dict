# 单词释义 TXT 文件
为了方便一些需要使用 txt 的用户，新建这样一个 txt 目录。

该文件夹中的 `.txt` 内容是根据 `/book/` 文件夹中 `.json` 生成的。
是由项目根目录中的 nodejs 脚本 `main.js` 生成的。


## 一、文本生成规则
取每个单词的 `.headWord` 和 `.content.word.content.trans` 内容，生成规则是：

`单词` `\t` `词性 + 释义`

如，`CET4luan_1.txt` 的内容是这样的：

```
access	 v. 获取 n. 接近，入口
project	 n. 工程；课题、作业
intention	 n. 打算，意图
equivalence	 n. 等值，相等
negotiate	 v. 谈判，协商，交涉
disappointing	 adj. 令人失望的
alternative	 n. 代替品
generous	 adj. 慷慨的
biological	 adj. 生物的
strategy	 n. 策略，战略
paradox	 n. 悖论；自相矛盾
primary	 adj. 主要的，基本的
```


## 二、自动生成 txt

> 需要已安装 nodejs

1. 解压所有的 `/book/*.zip` 文件到原目录，变成  `/book/*.json`
2. 根目录中新建 `/book-txt/` 文件夹
3. 在根目录中执行 `node main.js` 即可自动生成对应的 txt 文件到 `/book/txt` 文件夹，再执行一遍会覆盖原有的 txt 文件
