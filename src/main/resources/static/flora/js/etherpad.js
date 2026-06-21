// var isIframeLoaded = false;
// var countdownTime = 0; // Countdown time in seconds
// var countdownInterval;
// var countdownDiv;
//
// function startCountdown() {
//     countdownDiv = document.createElement('div'); // Create a div to display the countdown
//     countdownDiv.style.position = 'fixed';
//     countdownDiv.style.top = '10px';
//     countdownDiv.style.right = '10px';
//     countdownDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
//     countdownDiv.style.color = 'white';
//     countdownDiv.style.padding = '10px';
//     countdownDiv.style.fontSize = '20px';
//     countdownDiv.style.borderRadius = '5px';
//     countdownDiv.style.zIndex = "999999";
//     countdownDiv.innerText = `Etherpad is on the way...`;
//
//     document.body.appendChild(countdownDiv); // Add the countdown div to the body
//
//     countdownInterval = setInterval(function() {
//         if (!isIframeLoaded) {
//             countdownTime++;
//             countdownDiv.innerText = `Etherpad is on the way, already wait for ${countdownTime} seconds...`;
//         } else {
//             clearInterval(countdownInterval); // Stop the countdown
//             countdownDiv.innerText = "Etherpad is now ready!";
//         }
//     }, 1000); // Update the countdown every second
// }

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

(function( $ ){

    $.fn.pad = function( options ) {
        const endTime20 = performance.now();
        const timeTaken20 = endTime20 - startTime2;
        console.log("*******From outside $.fn.pad to inside $.fn.pad  ", timeTaken20, " milliseconds!");

        var settings = {

            // 'host'              : "http://localhost/etherpad",//`${etherpadApiUrl}`,
            'host'              : `${etherpadApiUrl}`,
            'baseUrl'           : '/p/',
            'showControls'      : true,
            'showChat'          : true,
            'showLineNumbers'   : true,
            'userName'          : 'unnamed',
            'lang'              : '',
            'useMonospaceFont'  : true,
            'noColors'          : false,
            'userColor'         : '#000',
            'hideQRCode'        : false,
            'alwaysShowChat'    : false,
            'width'             : '100%',
            'height'            : '100%',
            'border'            : '1px',
            'borderStyle'       : 'solid',
            'toggleTextOn'      : 'Disable Rich-text',
            'toggleTextOff'     : 'Enable Rich-text',
            'plugins'           : {},
            'rtl'               : false
        };
        console.log("etherpad.js settings:", settings)
        var $self = this;
        if (!$self.length) return;
        if (!$self.attr('id')) throw new Error('No "id" attribute');

        var useValue = $self[0].tagName.toLowerCase() == 'textarea';
        var selfId = $self.attr('id');
        var epframeId = 'epframe'+ selfId;
        // This writes a new frame if required
        if ( !options.getContents ) {
            if ( options ) {
                $.extend( settings, options );
            }
            const startIFrame = performance.now();
            var pluginParams = '';
            for(var option in settings.plugins) {
                pluginParams += '&' + option + '=' + settings.plugins[option]
            }

            var iFrameLink = '<iframe id="'+epframeId;
            iFrameLink = iFrameLink +'" name="' + epframeId;
            iFrameLink = iFrameLink +'" src="' + settings.host+settings.baseUrl+options.padId;
            iFrameLink = iFrameLink + '?showControls=' + settings.showControls;
            iFrameLink = iFrameLink + '&showChat=' + settings.showChat;
            iFrameLink = iFrameLink + '&showLineNumbers=' + settings.showLineNumbers;
            iFrameLink = iFrameLink + '&useMonospaceFont=' + settings.useMonospaceFont;
            iFrameLink = iFrameLink + '&userName=' + settings.userName;
            if (settings.lang) {
                iFrameLink = iFrameLink + '&lang=' + settings.lang;
            }
            iFrameLink = iFrameLink + '&noColors=' + settings.noColors;
            iFrameLink = iFrameLink + '&userColor=' + settings.userColor;
            iFrameLink = iFrameLink + '&hideQRCode=' + settings.hideQRCode;
            iFrameLink = iFrameLink + '&alwaysShowChat=' + settings.alwaysShowChat;
            iFrameLink = iFrameLink + '&rtl=' + settings.rtl;
            iFrameLink = iFrameLink + pluginParams;
            iFrameLink = iFrameLink +'" style="border:' + settings.border;
            iFrameLink = iFrameLink +'; border-style:' + settings.borderStyle;
            iFrameLink = iFrameLink +';" width="' + '100%';//settings.width;
            iFrameLink = iFrameLink +'" height="' + settings.height;
            iFrameLink = iFrameLink +'"></iframe>';

            // var iFrameLink = '<iframe id="'+epframeId;
            // iFrameLink = iFrameLink +'" name="' + epframeId;
            // iFrameLink = iFrameLink +'" src="' + settings.host+settings.baseUrl+generateRandomString(5);
            // iFrameLink = iFrameLink +'"></iframe>';

            var $iFrameLink = $(iFrameLink);
            console.log("Iframe setup time:", performance.now() - startIFrame);

            if (useValue) {
                var $toggleLink = $('<a href="#'+ selfId +'">'+ settings.toggleTextOn +'</a>').click(function(){
                    var $this = $(this);
                    $this.toggleClass('active');
                    if ($this.hasClass('active')) $this.text(settings.toggleTextOff);
                    $self.pad({getContents: true});
                    return false;
                });
                $self
                    .hide()
                    .after($toggleLink)
                    .after($iFrameLink)
                ;
            }
            else {
                const startDomManipulation = performance.now();

                $self.html(iFrameLink);
                console.log("DOM manipulation time:", performance.now() - startDomManipulation);
                // let iframe;
                //
                // $('#' + epframeId).on('load', function() {
                //     console.log('Etherpad iframe loaded:', this.src);
                //     iframe = document.getElementById('epframecollapseCollaborateWrite');
                //     checkIframeLoaded();
                //     isIframeLoaded = true;
                //     const endTime21 = performance.now();
                //     const timeTaken21 = endTime21 - startTime2;
                //     console.log("*******From excuting .pad function to iframe fully loaded took ", timeTaken21, " milliseconds!");
                //
                //     clearInterval(countdownInterval);
                //
                //     // Display an alert indicating the iframe is loaded
                //     alert("Etherpad iframe has loaded successfully!");
                //     if(countdownDiv){
                //         countdownDiv.style.display = 'none';
                //     }
                //
                //     // You can now safely interact with the iframe
                //     // For example, fetching contents or triggering actions after the iframe is loaded
                // });
                // function checkIframeLoaded() {
                //
                //     try {
                //         let collaborateWriteWindow = iframe.contentWindow;
                //
                //         // Check if iframe document is accessible and loaded
                //         if (collaborateWriteWindow && collaborateWriteWindow.document.readyState === "complete") {
                //             console.log("Etherpad iframe loaded successfully:", iframe.src);
                //             // You can now interact with the iframe or trigger further actions
                //             console.log("collaborateWriteDocument available and setEtherpadCookie!");
                //             setSessionCookie(userEtherpadSessionID,"/");
                //         } else {
                //             console.log("Iframe not ready, reloading...");
                //             iframe.contentWindow.location.reload(); // Force reload
                //             setTimeout(checkIframeLoaded, 1000); // Retry after 1 second
                //         }
                //     } catch (e) {
                //         console.log("Unable to access iframe document due to cross-origin restrictions or other issues: ", e);
                //         setTimeout(checkIframeLoaded, 1000); // Retry after 1 second
                //     }
                // }


            }
        }

        // This reads the etherpad contents if required
        else {
            var frameUrl = $('#'+ epframeId).attr('src').split('?')[0];
            var contentsUrl = frameUrl + "/export/html";
            var target = $('#'+ options.getContents);

            console.log("contentsUrl: ",contentsUrl);
            // perform an ajax call on contentsUrl and write it to the parent
            $.get(contentsUrl, function(data) {

                if (target.is(':input')) {
                    target.val(data).show();
                }
                else {
                    target.html(data);
                }

                $('#'+ epframeId).remove();
            });
        }


        return $self;
    };
})( jQuery );