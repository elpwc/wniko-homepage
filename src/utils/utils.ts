export const stripMarkdown = (markdown: string) => {
  return markdown
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // 加粗
    .replace(/(\*|_)(.*?)\1/g, '$2') // 斜体
    .replace(/(~~)(.*?)\1/g, '$2') // 删除线
    .replace(/`{1,2}([^`]+)`{1,2}/g, '$1') // 行内代码
    .replace(/!\[.*?\]\(.*?\)/g, '') // 图片
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // 链接
    .replace(/#+\s/g, '') // 标题
    .replace(/>+/g, '') // 引用
    .replace(/[-+*]\s+/g, '') // 列表项
    .replace(/\r?\n|\r/g, ' ') // 换行
    .trim();
};

export const getBlogPreview = (markdown: string, stringLen: number = 100) => {
  return stripMarkdown(markdown).slice(0, stringLen);
};
