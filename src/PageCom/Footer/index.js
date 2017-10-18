import React, { Component } from 'react';
import './index.scss'
import {playLoad} from "../../Play/index";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        {/* 底部导航 */}
         <div className="footer_fixe">
          <div className="footer">
            <a href="#/Home" className="fixe_item">首页</a>
            <a href="#/Home" className="fixe_item">我听</a>
            <a href="javascript:;" className="fixe_item">&nbsp;</a>
            <a href="#/Home" className="fixe_item">发现</a>
            <a href="#/Home" className="fixe_item">我的</a>
            <i className="content">&nbsp;</i>
          </div>
          <div className="bofang">
            <a href="javascript:;" onClick={this.playHandle.bind(this)}>播放</a>
          </div>
        </div>
        {/* 底部导航 */}
    </div>
    )
  }
    playHandle() {
      playLoad()
    }
}

export default Footer;