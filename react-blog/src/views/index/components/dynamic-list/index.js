import React, { Component } from 'react';
import Carousel from '@components/carousel/index';
import Comments from '@components/comments/index';
import Avatar from '@components/avatar/index';
import Style from './index.module.less';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class DynamicList extends Component {
  render() {
    return (
      <div className={Style['dynamic-list']}>
        {
          this.props.rootStore.dataStore.topicList.map((item, index) => {
            return (
              <article className={Style['article']} key={index}>
                <header className={Style['header']}>
                  <Avatar userInfo={item.userInfo}/>
                </header>
                <div className={Style['container']}>
                  <Carousel imageList={item.topic.topicImgList}></Carousel>
                </div>

                {/* 评论区 */}
                <div className={Style['comments-content']}>
                  <Comments 
                    topicIndex={index}
                    createdAt={item.topic.created_at}
                    discuss={item.discuss} 
                    topicId={item.topic.topicId} 
                    topicLike={item.topic.topicLike}
                    dotCounts={item.topic.topicLikeCounts}>
                  </Comments>
                </div>
              </article>
            )
          })
        }
      </div>
    );
  }
}

export default DynamicList;
