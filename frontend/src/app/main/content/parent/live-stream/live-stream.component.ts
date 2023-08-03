import {Component, } from '@angular/core';

declare var apiRTC: any;

@Component({
  selector: 'app-live-stream',
  templateUrl: './live-stream.component.html',
  styleUrls: ['./live-stream.component.css']
})

export class LiveStreamComponent{

//webcam
  // constructor() {
  // }
  // videoRef: any;
  // ngOnInit():void{
  //   this.videoRef =document.getElementById('video');
  //   console.log(this.videoRef);
  //   this.setupCamera();
  // }
  // setupCamera(){
  //   navigator.mediaDevices.getUserMedia({
  //     video:{width:1100, height:500},
  //     audio:true
  //   }).then(stram=>{
  //     console.log(stram);
  //     this.videoRef.srcObject=stram;
  //   })
  // }
  constructor() {}

  //apiRTC
  getOrcreateConversation() {
    var localStream:any = null;

    var ua = new apiRTC.UserAgent({
      uri: 'apzkey:'
    });
    ua.register().then((session:any) => {

      var conversation :any;

      ua.createStream({
        constraints: {
          audio: true,
          video: {width:1250, height:600}
        }
      })
        .then((stream: any) => {
          console.log('createStream :', stream);
          // Save local stream
          localStream = stream;
          stream.removeFromDiv('local-container', 'local-media');
          stream.addInDiv('local-container', 'local-media', {}, true);

        }).catch((err:any) => {
        console.error('create stream error', err);
      });
    });
  }
}
