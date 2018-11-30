game.module(
    'game.commoncode'
)
.require(
    'game.common',
    'game.poisson',
    'plugin.spine',
    'plugin.essentials',
    'plugin.tiled'
)

.body(function() {
});

function CreateDefaultButton(x,y,text,size, callback)
{
            var button = new game.ForgeButton(BUTTON_ACTIVE, BUTTON_PRESSED, BUTTON_DISABLED,
            x,y,text,{},size,COLOR_BLACK,COLOR_YELLOW,COLOR_DARKDARKGRAY, callback);
            SetDefaultButtonBehavior(button, 100);
            button.addTo(game.scene.stage);
            return button;
}

function CreateDefault1Button(x,y,text,size, callback)
{
            var button = new game.ForgeButton(BUTTON1_ACTIVE, BUTTON1_PRESSED, BUTTON1_DISABLED,
            x,y,text,{},size,COLOR_BLACK,COLOR_BLACK,COLOR_DARKDARKGRAY, callback);
            SetDefaultButtonBehavior(button, 100);
            button.addTo(game.scene.stage);
            return button;
}

function SetDefaultButtonBehavior(btn, scalein)
{
	    btn.scaleSpeed =500;
	    //btn.scaleStarting=1;
		//btn.scaleIn(scalein);
		//btn.rotateAmount=0.010;
		//btn.rotateSpeed = 500;
        //btn.rotate(true);
		btn.scaleAmount =0;
		btn.clickSound = SOUND_PRESSED;
		btn.clickSound1 = SOUND_RELEASED;
}

function CreateText(text,x,y,fontIdx,size,option)
{
        if(!option) option={}
		var etext = new game.Text(text,option);

		var width = etext.width / etext.scale.x;
        etext.anchor.set(width / 2, 0);
            
		etext.mySize = size
		var f= etext.height/etext.fontClass.lineHeight;
		etext.myFactorX = etext.height / (f*size);
		etext.height =	f*size;
		
		etext.width = etext.width / etext.myFactorX;
			
		etext.x = x
		etext.y = y
		return etext;
}

function CreateText1(text,x,y,fontIdx,size,option)
{
        if(!option) option={}
		var etext = new game.Text(text,option);

		var width = etext.width / etext.scale.x;
        etext.anchor.set(0, 0);
            
		etext.mySize = size
		var f= etext.height/etext.fontClass.lineHeight;
		etext.myFactorX = etext.height / (f*size);
		etext.height =	f*size;
		
		etext.width = etext.width / etext.myFactorX;
			
		etext.x = x
		etext.y = y
		return etext;
}

function SetColor(etext,tint)
{
// 		etext.cache = true;
// 		etext._cachedSprite.tint = tint;
// 		etext._cachedSprite.tintAlpha = 1; 
}



function AddForegroundUI()
{
    if(RF_UANECUBGVJVGKLHPMGTU)
    {
	    var title = CreateText("0",
		    HALF_WIDTH+330,0.9825 * game.height,0,20,0);
	    title.addTo(game.scene.stage);
	    game.scene.fps=title;
    }

    AddButtons();
}

function AddButtons()
{

    var soundButton = 'UI_Sound.png';
	if(game.mute)
	{
	    soundButton = 'UI_SoundOFF.png';
    }
    
	game.scene.soundButton = new game.Button(soundButton,
		0.07 * game.width, 0.95 * game.height,
		function() {
	        if(game.mute == false)
	        {
	            game.mute = true;
    	        this.sprite.setTexture('UI_SoundOFF.png');
    	        
	            game.introMusic.volume = 0;
	            game.intro2Music.volume = 0;
	            game.mainMusic.volume = 0;
	            game.outroMusic.volume = 0;
	            
	            if (game.scoreSound != null)
	            {
	                game.scoreSound.volume = 0;
	            }
            }
	        else
	        {
	            if(game.device.ie)
                {
                    return;
                }

	            game.introMusic.volume = MUSIC_VOLUME;
	            game.intro2Music.volume = MUSIC_VOLUME;
	            game.mainMusic.volume = MUSIC_VOLUME;
	            game.outroMusic.volume = MUSIC_VOLUME;
	            
	            game.audio.playSound(SOUND_PRESSED);
	            game.mute = false;
    	        this.sprite.setTexture('UI_Sound.png');
    	        
    	        if (game.scoreSound != null)
	            {
	                game.scoreSound.volume = 1;
	            }
	        }
	        SaveMute();
		});
		SetDefaultButtonBehavior(game.scene.soundButton,100);
		game.scene.soundButton.addTo(game.scene.stage);
}

function SaveMute()
{
    try{
    localStorage.setItem('stores/mute', JSON.stringify(game.mute));
    }
    catch(e){}

}

function LoadMute()
{
    if(game.device.ie)
    {
        game.mute=true;
        return;
    }
    
    try{
        var data1 = localStorage.getItem('stores/mute');
        if(data1 == undefined || data1=='' || data1 == "undefined" )
        {
            var empty = [0];
            game.mute = false;
            SaveMute(game.mute)
        }
        else
        {
            game.mute = JSON.parse(data1);
        }
    	
    }
    catch(e){}
}

function GoToScene(scene)
{
    game.currentScene = scene;
    game.system.setScene(scene);
}

function PlaySound(sound, x ,y)
{
    if(x==undefined) x=1;
    if(y==undefined) y=1;
    
	if(!game.mute)
	{
        game.loadingSound = game.audio.playSound(sound, x, y);
	}

}

function IsWalkable(tileid)
{
    if(tileid<16) return false
    
    
    --tileid;
    tileid = tileid % 16;
    if(tileid==7)
    {
        return true;
    }
    if(tileid==6)
    {
        return true;
    }
    if(tileid==3)
    {
        return true;
    }
    if(tileid==1)
    {
        return true;
    }
    if(tileid==0)
    {
        return true;
    }
    return false;
}

function IsCloud(tileid)
{
    --tileid;
    tileid = tileid % 16;
    if(tileid==2)
    {
        //console.log(tileid + " true") 
        return true;
    }
        //console.log(tileid) 
    return false;
}

function CommonUpdate()
{
    if(game.scene.fps&& RF_UANECUBGVJVGKLHPMGTU)
        game.scene.fps.setText((1/game.delta).toFixed(1))

    //TODO do this better!
    
    if(game.currentScene=="Tutorial")
    {
        ServerUpdateStart();
    }
    if(game.currentScene=="Main")
    {
        ServerUpdateEnd();
    }
}
//Language Related

function GetLanguageName()
{
    return GetLanguageFromIndex(GetLanguageIndex())
}

function GetLanguageIndex()
{
    if(game.locale.search("it_")!=-1)
    {
            return 2;
    }
    return 1;
}

function GetLanguageFromIndex(i)
{
    switch (i) 
    {
        case 1:
            return 'ENG';
            break;
        case 2:
            return 'ITA';
            break;

        default:
            //throw new Error("undefined language");
            return 'ENG';
    }
}

function GetAnimationLanguageFromIndex(i)
{
    // Used to cope with spine animation names
    switch (i) 
    {
        case 1:
            return '_Eng';
            break;
        case 2:
            return '_Ita';
            break;

        default:
            //throw new Error("undefined language");
            return '_Eng';
    }
}

function GetLocalizedString(label)
{
    return game.localizedTexts[label][GetLanguageName()]; 
}

function GetLocalizedAnimation(name)
{
    // Return the localized spine animation name
    return name + GetAnimationLanguageFromIndex(GetLanguageIndex());
}

function GetLocalizedPath(resourceName, override)
{
    if(override)
    {
        resourceName ="Text/" + GetLanguageFromIndex(override)+ "/" + resourceName;
        resourceName+="_" + GetLanguageFromIndex(override);
        return resourceName;
    }
    else
    {
        resourceName ="Text/" + GetLanguageName()+ "/" + resourceName;
        resourceName+="_" + GetLanguageName();
        return resourceName;
    }
}

//Server Related
function GetTimestamp()
{
    return (~~(Date.now() / 1000));
}

function StartGame()
{
    SetLoginVars();
    SendStartGame();
}

function SendStartGame()
{
        	   if(!LOCAL_MODE) 
                {
                    
                    game.startRequestNumber=0;
                    DoStartRequest();
                }
                
                if(LOCAL_MODE) game.startReceived=true;
                game.scene.button.setEnable(false)
}

function SendEndGame()
{
        	   if(!LOCAL_MODE) 
                {
                    
                    game.endRequestNumber=0;
                    DoEndRequest();
                }
                
                if(LOCAL_MODE) 
                {
                    console.log("SendEndGame")//rme
                    game.endReceived=true;
                }
                //game.scene.button.setEnable(false)
}

function ServerUpdateStart()
{
        if(game.startReceived==true)
        {
            game.startSent=false;
            game.startReceived=false;
            game.startSendTimer=0;
            GoToScene("Main");
        }
        if(game.startSendTimer !=0 && game.startSent && game.startReceived==false)
        {
            var time =  Date.now() - game.startSendTimer ;
            if(time>10000)
            {
                ErrorStartTimeout();
            }
        }

}

function ServerUpdateEnd()
{
    //if(game.endSent)
    {
        if(game.endReceived==true)
        {
            console.log("received")//rme
            game.endSent=false;
            game.endReceived=false;
            game.endSendTimer=0;
            GoToScene("Outro");
        }
        if(game.endSendTimer !=0 && game.endSent && game.endReceived==false)
        {
            var time =  Date.now() - game.endSendTimer ;
            if(time>10000)
            {
                ErrorEndTimeout();
            }
        }
    }
}

function DoStartRequest()
{
                    game.startSent=true;
                    game.startRequestNumber++;
                    var xhr = new XMLHttpRequest();
                    var endpoint = ENDPOINT_PROD
                    if(!PROD)
                        endpoint = ENDPOINT_PRE
                    
                    endpoint +=ENDPOINT1
                    game.startSendTimer = Date.now();
                    var params = {}
                    params["Timestamp"]=GetTimestamp();
                    params["PlayerId"]=RF_NZAFJZLMNLVQRTEBJTVQ;
                    
                    xhr.open('POST', endpoint, true);
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onreadystatechange = function(e) 
                    {
                        if (xhr.readyState == 4)
                        {
                            if (xhr.status == 200) 
                            {
                                var response = JSON.parse(xhr.responseText);
                                //alert(response.ip);
                                console.log(JSON.stringify(response))
                                game.startReceived=true;
                                if(response)
                                {
                                    if(response["PlayerMaxScore"])
                                        RF_HKVFQRGHGLRPQWYGYGSZ=response["PlayerMaxScore"]
                                    RF_EFBCKZTGVUFZAJYZHBZP=response["TopPlayerScore"]
                                    RF_MFSIZQHHEWQNGIQMLNZR=response["SessionID"]
                                }
                            }
                            else
                            {
                                //error
                                if(game.startRequestNumber==1)
                                {
                                    DoStartRequest();
                                }
                                else
                                {
                                    Handle2ErrorStart(xhr.status);
                                }
                            }
                        }
                    }
                    xhr.send(JSON.stringify(params));
                    
}

function DoEndRequest()
{
                    game.endSent=true;
                    game.endRequestNumber++;
                    var xhr = new XMLHttpRequest();
                    var endpoint = ENDPOINT_PROD
                    if(!PROD)
                        endpoint = ENDPOINT_PRE
                    
                    endpoint +=ENDPOINT2
                    game.endSendTimer = Date.now();
                    var params = {}
                    params["Timestamp"]=GetTimestamp();
                    params["PlayerId"]=RF_NZAFJZLMNLVQRTEBJTVQ;
                    params["Nickname"]=game.name;
                    params["SessionID"]=RF_MFSIZQHHEWQNGIQMLNZR;
                    params["Score"]=RF_KDHPGVHHRBNCIMSTXJSI;
                    params["NumStars"]=RF_JFWZULMTDYBCUMMDITSF;
                    params["NumFalls"]=RF_YUILUVEZESUBVUPAHIBJ;
                    params["ValidationToken"]=RF_XSEMAQCLGAWCBGBVKKXC;
                    
                    params["PlayerSelectedID"]=game.selectIdx;
                    params["PlayerSelectedName"]=game.gname;
                    
                    
                    xhr.open('POST', endpoint, true);
                    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                    xhr.onreadystatechange = function(e) 
                    {
                        if (xhr.readyState == 4)
                        {
                            if (xhr.status == 200) 
                            {
                                var response = JSON.parse(xhr.responseText);
                                //alert(response.ip);
                                console.log(JSON.stringify(response))
                                game.endReceived=true;
                                if(response)
                                {
                                    //RF_HKVFQRGHGLRPQWYGYGSZ=response["PlayerMaxScore"]
                                    //RF_EFBCKZTGVUFZAJYZHBZP=response["TopPlayerScore"]
                                    //RF_MFSIZQHHEWQNGIQMLNZR=response["SessionID"]
                                }
                            }
                            else
                            {
                                //error
                                if(game.endRequestNumber==1)
                                {
                                    DoEndRequest();
                                }
                                else
                                {
                                    Handle2ErrorEnd(xhr.status)
                                }
                            }
                        }
                    }
                    xhr.send(JSON.stringify(params));
                    
}

function Handle2ErrorStart(value)
{
    game.errorType=0;
    GoToScene("Error");
}

function Handle2ErrorEnd(value)
{
    game.errorType=1;
    GoToScene("Error");
}

function ErrorStartTimeout()
{
    game.errorType=0;
    GoToScene("Error");
}

function ErrorEndTimeout()
{
    game.errorType=1;
    GoToScene("Error");
}



function Alert(str,callback)
{
    console.log(str)
    callback();
}

function EmergencyRestart()
{
    game.loadDone=true; GoToScene("Intro");
}

function Loader(objs, onError, onProgress, onComplete, names)
{
        if(game.loadDone == false)
        {
            throw new Error("Loader invoked while is in working");
        }
        
        game.loadingAssets = objs;
		game.loadDone = false;
		game.loadStart = Date.now();


	objs.forEach(function(element1)
		{
		var index = Contains(names,element1);

            if(index >= 0)
            {
                var name = names[index]['value'];

			game.addAsset(element1,name);
            }
            else
            {
			game.addAsset(element1);
            }
		});

		game.mainLoader = new game.Loader();
		
		game.mainLoaderonError = function(error) {
		    Alert(JSON.stringify(error),function(){
    		var errors=JSON.stringify(error);
		              
        	objs.forEach(function(element1)
    		{
    		    if(element1.search("atlas")!=-1)
    		    {
    		        console.log("removing "+ element1);
    		        name = element1.replace('.atlas', '');
    
    		        var i = 0;
    		        var j = -1;
    		        var keys = Object.keys(game.spine.AtlasCache);
    		        for(i=0; i < keys.length; ++i)
    		        {
    		            console.log(game.spine.AtlasCache[keys[i]]);
    		            
    		            if(keys[i].search(name)!=-1)
    		            {
    		                j=i;  
    		            }
    		        }
    		        
    		        if(j > 0)
    		        {
    		            var obj = game.spine.AtlasCache[keys[j]];
    		            obj.pages.forEach(function(element) 
    		            {
                            //console.log(element);
                            game.removeAsset(element.name);
                        });
    		            
    		            delete game.spine.AtlasCache[keys[j]];
    		        }
    		        //game.spine.AtlasCache={};

    		        game.removeAsset(element1);
    		    }
    		    if(element1.search("json")!=-1)
    		    {
    		        console.log("removing "+ element1);
    		        game.removeAsset(element1);
    		    }
		    }); 
		        
                
		        onError(error);
		    });
		};
		game.mainLoaderonProgress = function() {CommonOnProgress(this.percent);onProgress(this.percent);};
		game.mainLoaderonComplete = function() {game.loadDone=true; onComplete()};
		
		game.mainLoader.onError = game.mainLoaderonError
		game.mainLoader.onProgress = game.mainLoaderonProgress
		game.mainLoader.onComplete = game.mainLoaderonComplete
		
		game.mainLoader.start();
}

function PlayCinematic (json, animations, x, y)
{
    game.cinematicIndex = 0;
    game.cinematicSequenceIndex = 0;
    game.cinematic = new game.Spine(INTRO_OUTRO_JSON);
    game.cinematicSequence = animations;
    
    var animName = GetLocalizedAnimation(
        animations[game.cinematicIndex][game.cinematicSequenceIndex]);
    
    game.cinematic.position.x = x;
    game.cinematic.position.y = y;
    
    var loop = false;
        
    if (animName.search("Loop")!=-1) loop = true;
    
    game.cinematic.play(animName, loop);
    
    game.cinematic.state.addListener({
                //start: this.start.bind(this),
                complete: ProceedCinematic.bind(this),
                event: CinematicEvent.bind(this)
            });
    
    game.cinematic.addTo(game.scene.stage);
}

function ProceedCinematic ()
{
    game.cinematicSequenceIndex += 1;
    if (game.cinematicSequenceIndex >= 
        game.cinematicSequence[game.cinematicIndex].length)
    {
        // No more animations, wait for input
    }
    else
    {
        var animName = GetLocalizedAnimation (
            game.cinematicSequence[game.cinematicIndex][game.cinematicSequenceIndex]);
    
        var loop = false;
        
        if (animName.search("Loop")!=-1) loop = true;
        
        game.cinematic.play(animName, loop);
    }
}

function NextCinematic()
{
    game.cinematicSequenceIndex = 0;
    game.cinematicIndex += 1;
    
    if (game.cinematicIndex >= 
        game.cinematicSequence.length)
    {
        // No more cinematics, wait for input
    }
    else
    {
        var animName = GetLocalizedAnimation (
            game.cinematicSequence[game.cinematicIndex][game.cinematicSequenceIndex]);
    
        var loop = false;
        
        if (animName.search("Loop")!=-1) loop = true;
        
        game.cinematic.play(animName, loop);
    }
}

function CinematicEvent(entry, event) 
{
            
    // User-defined event
    switch (event.data.name)
    {
        case 'TocToc':
        {
            PlaySound(SOUND_TOCTOC);
            break;
        }
        
        case 'Balloon':
        {
            PlaySound(SOUND_BALLOON);
            break;
        }
        
        case 'SantaComeIn':
        {
            if (game.playingIntro1 == true)
            {
                game.introMusic.stop();
                game.playingIntro1 = false;
            }
            if (game.playingIntro2 == false)
            {
                PlaySound(SOUND_SANTA);
                PlayMusic(game.intro2Music);
                
                game.playingIntro2 = true;
            }
            break;
        }
        
        case 'StartScore':
        {
            game.playingScoreSound = false;
            game.scoreSound = new game.Sound(SOUND_SCORE);
    	    game.scoreSound.loop = true;
    	    if(!game.mute)
        	{
        	    game.playingScoreSound = true;
                game.scoreSound.play();
        	}
        	
        	game.scene.displayScore();
        	
            break;
        }
        
        case 'VictoryFX':
        {
            var sheet = new game.SpriteSheet(VFX7, 192, 160);
            this.vfx = new game.Animation(sheet.textures);
            this.vfx.addAnim('fx', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0],  { speed: 17.5, loop: false });
            this.vfx.anchorCenter();
            this.vfx.x = HALF_WIDTH;
            this.vfx.y = game.height * 0.5;
            this.vfx.addTo(game.scene.stage)
            this.vfx.play('fx');
            break;
        }
        
        case 'VictoryPlayer':
        {
            game.scene.player.won = true;
            break;
        }
        
        default:
        {
            //console.log(event.data.name);
            break;
        }
    }
}

function PlayMusic(music)
{
    try
    {
        if (music && !game.device.ie)
        {
            music.play();
        }
    }
    catch (e)
    {
        console.log(e.message);
    }
}
