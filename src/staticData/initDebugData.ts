import { BlogsStorage, ProjectsStorage } from "../dataStorage/storage";
import { DevState, ProjectUtils } from "../utils/project";
import { UsingTechs } from "./usingTechs";

const init_debug_data = () => {
    ProjectsStorage.set([
        ProjectUtils.create(
          'Wotageipedia - ヲタ芸百科',
          '御宅艺副歌技视频分类收录网站 (绝赞开发进行中♥)',
          DevState.Developping,
          [UsingTechs.reactjs, UsingTechs.sequelize, UsingTechs.nestjs, UsingTechs.antd, UsingTechs.typescript],
          'https://github.com/elpwc/wotageipedia'
        ),
        ProjectUtils.create(
          'アニメ整理 ANIMESEIRI',
          '一目了然的追番进度管理',
          DevState.Developping,
          [UsingTechs.php, UsingTechs.scss],
          'https://github.com/elpwc/ANIME-SEIRI.web',
          'http://www.elpwc.com/animeseiri'
        ),
        ProjectUtils.create('City Counter Game', '猜城市名的web游戏 (待开发)', DevState.Planning),
        ProjectUtils.create('RUA', 'az', DevState.Done),
        ProjectUtils.create('RUA2', 'az', DevState.Dispose),
      ]);

      BlogsStorage.set([]);
};

export default init_debug_data;