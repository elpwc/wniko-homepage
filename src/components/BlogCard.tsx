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
  const previewLength = props.isFromHome ? 100 : 150;
  const preview = getBlogPreview(props.blog.content, previewLength);

  return (
    <Link to={'/blogs/' + props.blog.id + (props.isFromHome ? '?from=home' : '')}>
      <div className="blogCardContainer" style={{ padding: props.isFromHome ? '5px 5px' : '5px 15px' }}>
        <div>
          {props.blog.isDraft ? <span>〈DRAFT〉</span> : <></>}
          <span className="blogtitle" style={{ color: props.isFromHome ? 'black' : 'black', fontSize: props.isFromHome ? '16px' : '23px' }}>
            {props.blog.title}
          </span>
        </div>
        {!props.isFromHome && (
          <div className="bloginfo" style={{ display: 'flex' }}>
            <p className="blogdate" style={{ color: props.isFromHome ? 'white' : 'black' }}>
              {
                //@ts-ignore
                new Date(props.blog.createtime).format('yyyy-MM-dd')
              }
            </p>
            <p className="blogsubject" style={{ color: props.isFromHome ? 'white' : 'black' }}>
              {props.blog.subject}
            </p>
          </div>
        )}

        {props.showPreview ? (
          <div>
            <p className="blogPreview" style={{ color: props.isFromHome ? '#252525' : 'black', fontSize: props.isFromHome ? '10px' : '15px' }}>
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
