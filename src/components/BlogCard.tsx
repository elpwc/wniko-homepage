import LangUtils from '../lang/langUtils';
import { Link } from 'react-router-dom';
import './BlogCard.css';
import { getBlogPreview } from '../utils/utils';

interface P {
  blog: API.Blog;
  isFromHome?: boolean;
  showPreview?: boolean;
}

export default function BlogCard(props: P) {
  const L = LangUtils.selectLang();
  const previewLength = 150;
  const preview = getBlogPreview(props.blog.content, previewLength);

  return (
    <Link to={'/blogs/' + props.blog.id + (props.isFromHome ? '?from=home' : '')}>
      <div className="blogCardContainer">
        <div>
          {props.blog.isDraft ? <span>〈DRAFT〉</span> : <></>}
          <span className="blogtitle">{props.blog.title}</span>
        </div>
        <div className="bloginfo" style={{ display: 'flex' }}>
          <p className="blogdate">
            {
              //@ts-ignore
              new Date(props.blog.createtime).format('yyyy-MM-dd')
            }
          </p>
          <p className="blogsubject">{props.blog.subject}</p>
        </div>
        {props.showPreview ? (
          <div>
            <p className="blogPreview">
              {preview}
              {preview !== '' ? (preview.length >= previewLength ? '...' : '') : ''}
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </Link>
  );
}
