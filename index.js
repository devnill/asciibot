var irc = require('irc')
var request = require('request')
var spawn   = require('child_process').spawn;
//curl -s http://foo.bar/image.jpg | convert - jpg:- | jp2a -



var bot = new irc.Client('irc.wetfish.net','pr0nbot',{
    port: 6697,
    secure: true,
    selfSigned: true,
    channels:['#ascii']
});

bot.addListener('message', function (from, to, message) {
    var url;
    var jp2a    = spawn('jp2a', ['-','--height=30']);//,'--colors',"--chars=\#"
    var convert = spawn('convert', ['-','jpg:-']);


    convert.stdout.pipe(jp2a.stdin);

    jp2a.stdout.on('data', function (data) {
	console.log('aaaaaaaaaaaaa');
	console.log('stdout: ' + data);
	bot.say('#ascii', url[0]);
	bot.say('#ascii', data);
    });

    if(from!=='pr0nbot' && 
       (url = message.match(/(https?:\/\/.*\.(?:png|jpg|gif))/i))
      ){
	console.log('checking '+url[0]);
	var ext=url[0].split('.');
	ext=ext[ext.length-1];
	request
	    .get(url[0])
	    .on('response', function(response) {
		if(response.statusCode===200){
		    console.log('valid') // 'image/ png'
		    
		    response.pipe(convert.stdin);//todo make this based on file type
		}
		
	    });
	
    }
});




//    .pipe(request.put('http://mysite.com/img.png'))
/*
bot.on('CHANMSG', function (data) {
    debugger;
    var message = data.sender + ' said: ' + data.message;
    console.log(message);
    //if(data.sender !== nick) client.say(data.receiver, message); 
});
*/
/*exec('node -v', function(error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
        console.log('exec error: ' + error);
    }
});*/

/*    localAddress: null,
    debug: false,
    showErrors: false,
    autoRejoin: false,
    autoConnect: true,
    channels: [],
    certExpired: false,
    floodProtection: false,
    floodProtectionDelay: 1000,
    sasl: false,
    stripColors: false,
    channelPrefixes: "&#",
    messageSplit: 512,
    encoding: ''*/
