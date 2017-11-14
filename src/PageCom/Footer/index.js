import React, {Component} from 'react';
import './index.scss'
import {play, playLoad} from "../../Play/index";
import {Link, hashHistory} from 'react-router'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions/store'

class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img: '',
            playLoad: false
        }
    }

    render() {
        return (
            <div className="footer">
                {/* 底部导航 */}
                <div className="footer_fixe">
                    <div className="footer">
                        <Link to="/Home" className="fixe_item">首页</Link>
                        <Link to="/Home" className="fixe_item">我听</Link>
                        <i className="fixe_item">&nbsp;</i>i>
                        <Link to="/Home" className="fixe_item">发现</Link>
                        <Link to="/Home" className="fixe_item">我的</Link>
                        <i className="content">&nbsp;</i>
                    </div>
                    <div className="bofang "  ref='play'>
                        <Link  className={this.props.store.play ? "play" +
                            " active" : "play"} onClick={this.playHandle.bind(this)}><img src={this.state.img} alt=""/></Link>

                    </div>
                </div>
                {/* 底部导航 */}
            </div>
        )
    }

    componentDidMount() {
        let playRef = this.refs.play
        let play = JSON.parse(localStorage.getItem('play'))
        if (play) {
            this.setState({
                img: play.img
            })
        }

        let forceSafariPlayAudio = () => {
            playRef.click()
            window.removeEventListener('touchstart', forceSafariPlayAudio, false)
        }
        window.addEventListener('touchstart', forceSafariPlayAudio, false);
    }


    playHandle() {
        let oldPlay = JSON.parse(localStorage.getItem('play'))
        let currLocalStorage = localStorage.getItem('play')
        let audio = window.audio
        let currNow = audio.currentTime
        if(oldPlay) {
            let newUrl = window.location.href.indexOf(oldPlay.url) > -1
            // 不在播放所在页面
            if (!newUrl) {
                hashHistory.push(oldPlay.url)
                return true
            }
            if(audio.src === oldPlay.src) {
                currLocalStorage > currNow ? audio.currentTime = currLocalStorage : ''
            }
            if(audio.paused) {
                currLocalStorage > currNow ?  '' : localStorage.setItem('curr', currNow)
            }
            playLoad()
        }
    }


}

function mapStateToProps(state) {
    return {
        store: state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        play: bindActionCreators(actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Footer)