
let _mediaRecorder;
let isRecording = '' ; //防止两次上传
let _mediaStream;
// let _chunks;

$(document).ready(function(){
    initialize();
});

// 初始化摄像头设备
var initialize = function() {
    //  判断浏览器, 获得用户设备的兼容方法
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    const constraints = {audio: true, video: {width: 1280, height: 720}};

    //调用摄像头
    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
        _mediaStream = mediaStream;
        console.log("# 初始化 摄像头");
        initMediaRecorder(mediaStream);
    });

};// end initialize

    // 初始化录制器
var initMediaRecorder = function(mediaStream){
    console.log("# 初始化 mediaRecorder");
    // _chunks = [];
    // 视频格式
    let VIDEO_FORMAT = 'video/webm';
    if(!MediaRecorder.isTypeSupported(VIDEO_FORMAT)){
        alert(format)
        alert("当前浏览器不支持该编码类型");
        return;
    }

    // 初始化 录像 mediaRecorder
    _mediaRecorder = new MediaStreamRecorder(mediaStream);
    _mediaRecorder.mimeType = VIDEO_FORMAT;
    //  当停止录像以后的回调函数
    _mediaRecorder.ondataavailable = function (data) {
        console.log("# 产生录制数据...");
        console.log(data);
        console.log("# ondataavailable, size = " + parseInt(data.size/1024) + "KB");
        // _chunks.push(data);

        uploadFile(data);
    };

    _mediaRecorder.onstop = function(e) {
        console.log("# 录制终止 ...");
        const fullBlob = new Blob(_chunks);
        const blobURL = window.URL.createObjectURL(fullBlob);
        console.log("blob is ?, size="+parseInt(fullBlob.size/1024)+"KB. "); console.log(fullBlob);
        console.log("blobURL =" + blobURL);
        //saveFile(blobURL);
        // uploadFile(fullBlob);
    }
    _mediaRecorder.start(5000);
};// end initMediaRecorder

    // 关闭流
var closeMediaStream = function(){
    if(!_mediaStream) { return; }
    console.log("# 关闭数据流");
    _mediaStream.getTracks().forEach(function (track) {
        track.stop();
    });
    _mediaStream = undefined;
    _mediaRecorder = undefined;
};

let uploadFile = function(blob){
    var file = new File([blob], "media_.mp4");
    var formData = new FormData();
    formData.append('file', file);
    formData.append("userId", userId);
    formData.append("courseId", currentCourseId);
    console.log(formData);
    console.log("# 准备上传, fileName="+file.name +", size="+ parseInt(file.size/1024)+" KB");
    let $output = $("#output");
    $.ajax({
        type:"POST",
        url: apiBaseUrl + "/uploadvideo",
        data: formData,
        processData: false,
        contentType: false,
        success:function (){
            $output.prepend("上传视频成功!");
        },
        error : function() {
            $output.prepend("上传视频失败!");
        }
    });
};
