import { BlogUtils } from '../utils/blog';
import { DevState, ProjectUtils } from '../utils/project';

class init_debug_data {
  public static projects = [
    ProjectUtils.create(
      'Wotageipedia - ヲタ芸百科',
      '御宅艺副歌技视频分类收录网站 (绝赞开发进行中♥)',
      DevState.Developping,
      ['reactjs', 'sequelize', 'nestjs', 'antd', 'typescript'],
      'https://github.com/elpwc/wotageipedia'
    ),
    ProjectUtils.create(
      'アニメ整理 ANIMESEIRI',
      '一目了然的追番进度管理',
      DevState.Developping,
      ['php', 'scss'],
      'https://github.com/elpwc/ANIME-SEIRI.web',
      'http://www.elpwc.com/animeseiri'
    ),
    ProjectUtils.create('City Counter Game', '猜城市名的web游戏 (待开发)', DevState.Planning),
    ProjectUtils.create('RUA', 'az', DevState.Done),
    ProjectUtils.create('RUA2', 'az', DevState.Dispose),
  ];

  public static blogs = [
    BlogUtils.create(
      'My First Blog!',
      `
  ### Hi there 👋

Here is **wniko(海胆子・うにこ・우니코)**, I'm a frontend&backend programmer, illustrator, wotagei performer.  

🌍**Speaking Langs**:  
- [中原官话秦陇片](https://en.wikipedia.org/wiki/Central_Plains_Mandarin)(mother tongue), [汉语]()(native), [日本語]()(near native), [English]()(daily conversation), [한국어]()(basic conversation)

💡**Skills**:   
- **Web**: Typescript, Javascript, React.js, HTML5, CSS3, PHP, Node.js, Nest.js, Sequelize, Ruby, Electron, MySQL, Python, etc.  
- **Desktop**: C#, C++，shell, batch, etc.  
- **Mobile**: Kotlin, Java.  
- **Other**: Photoshop, Premiem, Aegisub, etc.  
  
🎧**Develop Env**:  
- VSCode, Windows 10, Thinkpad, コーラ🥤たっぷりと超うめ～ぇ淡梅酒🍶  
  
🎈**Recently Studying**:  
- Vocaloid4 x Fruit Studio, Ruby on Rails, Redux, Chrome extension
  
**Contact**:  
🐦Twitter: [@elpwc](https://twitter.com/elpwc)  
🐧QQ: [@unitower84](https://user.qzone.qq.com/2575784532/main) (2575784532)  
💗Site: <http://www.elpwc.com/>  
📫Email: elpwc@hotmail.com  
🎨Pixiv: [うにこ/海胆子/elpwc](https://www.pixiv.net/users/18240502)  
  
About "elpwc":  
A word from a [conlang](https://en.wikipedia.org/wiki/Constructed_language) called *Kalsa Annueso* I made before.  
Sounds /ˌe̝ɭ.pʰʊkʰ/.  Meaning is "*the earth*".  
I've been using it as my internet identification from the beginning of middle school period up to now,  
only because it never repeats with existing usernames.  

  `,
      'wniko',
      1
    ),
    BlogUtils.create('摸了', '[az]()', 'wniko', 2),
  ];
}

export default init_debug_data;
