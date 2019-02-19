import React, { Component } from 'react';
import Style from './index.module.less';
import { Icon } from 'antd';
import TopicDialog from '@components/topicDialog/index';

class FavoriteList extends Component {
  state = {
    hasData: false,
    openTopicDialog: false,
    topicDialogOption: null,
  };

  showDialog = (item, topicIndex) => {
    // 显示弹窗内容
    this.setState({
      openTopicDialog: true,
      topicDialogOption: {
        ...item,
        topicIndex,
      },
    });
  };

  closeDialog = () => {
    this.setState({
      openTopicDialog: false,
      topicDialogOption: null,
    });
  };

  render() {
    return (
      <main>
        <div className={Style['favorite-list']}>
            <ul className={Style['favorite-nav']}>
              <li className={Style['active']}><i className={Style['topic']}></i>帖子</li>
              <li><i className={Style['collect']}></i>收藏夹</li>
            </ul>
            <section className={Style['favorite-container']}>
            {
              this.props.topicList.length > 0 ?
              <div className={Style['descript']}>
                  <ul className={Style['topic-list']}>
                    {
                      this.props.topicList.map((item, index) => {
                        return (
                          <li className={Style['topic']} key={item.topic.topicId} onClick={() =>{ this.showDialog(item, index)}}>
                              <img src={item.topic.topicImgList[0]} height="293px"  width="293px" alt='' />
                              <div className={Style['abstract']}>
                                {
                                  item.discuss.length > 0 ?
                                    <span className={Style['comments']}><i className={Style['icon']}></i>{item.discuss.length}</span>
                                    :
                                    ""
                                }
                                {
                                  item.topic.topicLikeCounts > 0?
                                  <span className={Style['favorite']}><i className={Style['icon']}></i>{item.topic.topicLikeCounts}</span>
                                  : 
                                  ""
                                }
                              </div>
                          </li>
                        )
                      })
                    }
                  </ul>
              </div>
              :
              <div  className={Style['descript']}>
                  <div className={Style['no-more']}>
                      <Icon  className={Style['no-more-icon']} type="linkedin" />
                      <span className={Style['notice']}>没有帖子</span>
                  </div>
              </div>
            }
          </section>
        </div>
        <TopicDialog 
          openTopicDialog={this.state.openTopicDialog} 
          topicDialogOption={this.state.topicDialogOption}
          closeDialog={this.closeDialog}
        />
      </main>
    );
  }
}

export default FavoriteList;
