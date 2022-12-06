import { Fragment } from 'react'
import {Link} from 'react-router-dom'

export const Main = () => {
  return (
    <Fragment>
      <Link to="/counter">계산기</Link>
      <br />
      <Link to="/post">게시판</Link>
      <br />
      <Link to="/post-rtk">리덕스 연결 포스트</Link>
    </Fragment>
  );
}