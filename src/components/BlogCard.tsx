import LangUtils from '../lang/langUtils';
import { Link } from 'react-router-dom';
import './BlogCard.css';

interface P {
  blog: API.Blog;
}

export default function BlogCard(props: P) {
  const L = LangUtils.selectLang();

  return (
    <div className="blogCardContainer">
      <div>
        <Link to={'./' + props.blog.id}>
          {props.blog.isDraft ? <span>〈DRAFT〉</span> : <></>}
          <span className="blogtitle">{props.blog.title}</span>
        </Link>
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
    </div>
  );
}
