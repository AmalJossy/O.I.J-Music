import React, { Component } from 'react';

// import Hls from 'hls.js';
import HLSPlayer from './components/hlsplayer';

export default class Player extends Component{
    constructor(props) {
      super(props);
    }
    render(){
        return <div>
            <HLSPlayer url="/api/stream/1401/1400195/1401_1400195_2_h.smil/chunklist_b128000_ao.m3u8" autoplay />
        </div>
    }
}