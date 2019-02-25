import React, { Component } from 'react';
import Carousel from '@components/carousel/index';
import Comments from '@components/comments/index';
import Avatar from '@components/avatar/index';
import Style from './index.module.less';
import { inject, observer } from 'mobx-react';

@inject('rootStore')
@observer
class DynamicList extends Component {
  topicLikeFn = (likeInfo) => {
    this.props.rootStore.dataStore.handleTopicLike(likeInfo);
  };
  
  addCommentsFn = (comment) => {
    this.props.rootStore.dataStore.addTopicComment(comment);
  };

  topicCollectFn = (collectInfo) => {
    this.props.rootStore.dataStore.handleTopicCollect(collectInfo);
  };

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
                <h3 className={Style['title']}>{item.topic.topicTitle}</h3>
                <div className={Style['container']}>
                  <Carousel imageList={item.topic.topicImgList}></Carousel>
                </div>

                {/* 评论区 */}
                <div className={Style['comments-content']}>
                  <Comments
                    topicLikeFn={this.topicLikeFn}
                    addCommentsFn={this.addCommentsFn}
                    topicCollectFn={this.topicCollectFn}
                    topicIndex={index}
                    createdAt={item.topic.created_at}
                    discuss={item.discuss}
                    topicId={item.topic.topicId}
                    topicLike={item.topic.topicLike}
                    topicCollect={item.topic.topicCollect}
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
