import React, { Component } from 'react';

import Hls from 'hls.js';
// import HLSsource from './components/hlssource';

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.hls = null;
  }
  componentDidUpdate() {
    this._initPlayer();
  }

  componentDidMount() {
    this._initPlayer();
  }

  componentWillUnmount() {
    let { hls } = this;

    if (hls) {
      hls.destroy();
    }
  }

  _initPlayer() {
    if (this.hls) {
      this.hls.destroy();
    }

    let { url, autoplay, hlsConfig } = this.props;
    let { video: $video } = this.refs;
    let hls = new Hls(hlsConfig);

    hls.loadSource(url);
    hls.attachMedia($video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      if (autoplay) {
        $video.play();
      }
    });

    this.hls = hls;
  }

  render() {
    return <video ref="video"
      className="hls-player" controls></video>
  }
}