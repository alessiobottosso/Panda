 game.module(
    'game.common'
)
.require(
    'game.poisson',
    'plugin.spine',
    'plugin.essentials',
    'plugin.tiled'
)

.body(function() {
LEVEL_DESIGN="level.json"
//LEVEL_DESIGN="";

LOCAL_MODE=true;
FR_DEBUG = true;
FR_TIMEMALUS=30;
FR_TIMEBONUS=3;
FR_VALIDATION_TOKEN=[];
FR_TIMESFALLEN=0;
FR_TIMESSTARS=0;
FR_SCORE=0;
FR_PLAYERMAXSCORE=0;
FR_TOPPLAYERSCORE=0;
FR_PLAYERID="";
FR_PLAYERNAME="";
FR_SESSIONID="";
FR_SPEED=500;
TestLevel=false;

MaxLevel=6;
MaxLambda=3;
FR_DIELEVEL=2000;
LowLimit=800;
Lambda = 1;
XSpeed=3;
XScale=1;
Fake3d = false;
layerFg="main";
layerSx="sx";
layerDx="dx";
layerBg="bg";


COLOR_BLACK = "#000000";
COLOR_WHITE = "#FFFFFF";
COLOR_DARKGRAY = "#686868";
COLOR_DOVEGRAY = "#AD986E";
COLOR_GREEN = "#285D4F";
COLOR_DARKGREEN = "#14322B";
COLOR_LIGHTBLUE = "#A4D2D5";
BACKGROUND_COLOR = "#14322B";



PORTRAIT = "portrait";

BUTTON_ACTIVE = "Juv_Xmas_UI_Button_Active.png";
BUTTON_DISABLED = "Juv_Xmas_UI_Button_Disabled.png";
BUTTON_PRESSED = "Juv_Xmas_UI_Button_Pressed.png";

BUTTON1_ACTIVE = "Juv_Xmas_UI_Forward_Active.png";
BUTTON1_DISABLED = "Juv_Xmas_UI_Forward_Disabled.png";
BUTTON1_PRESSED = "Juv_Xmas_UI_Forward_Pressed.png";

TEXTBOX = "Juv_Xmas_UI_Tutorial_TextBox.png";

GREEK_UP = 'Juv_Xmas_UI_Selection_Greek_UP.png';
GREEK_DOWN = 'Juv_Xmas_UI_Selection_Greek_DOWN.png';
LOADING_STAR ="Juv_Xmas_UI_Loading_Star.png"


SOUND_PRESSED = "click1.m4a" ;
SOUND_RELEASED = "click2.m4a";

SOUND_SELECT = "sfx_select.m4a" ;

SOUND_STAR = "sfx_collect_star.m4a";
SOUND_PACK = "sfx_collect_gift.m4a";

SOUND_STEP1 = "audio1.m4a";
SOUND_STEP2 = "audio2.m4a";

SOUND_JUMP1 = "sfx_player_jump.m4a";
SOUND_JUMP2 = "sfx_player_double_jump.m4a";


PAGE="placeholder.jpg";

TUTORIAL1 = "Juv_Xmas_UI_Tutorial_01Jump.png"
TUTORIAL2 = "Juv_Xmas_UI_Tutorial_02Time.png"
TUTORIAL3 = "Juv_Xmas_UI_Tutorial_03Presents.png"

PROD=false;
ENDPOINT_PROD = "https://xmas.juventus.com"
ENDPOINT_PRE = "https://levelupyourxmas.staging.weareserver.it"
ENDPOINT1 = "/startGame"
ENDPOINT2 = "/endGame"

VFX = "Vfx_Character_4x.png"

game.addAsset(PAGE);

game.addAsset(VFX);


game.addAsset("localization.json");
game.addAsset(LOADING_STAR);


game.addAsset(TEXTBOX);
game.addAsset(GREEK_UP);
game.addAsset(GREEK_DOWN);

game.addAsset(BUTTON_ACTIVE);
game.addAsset(BUTTON_DISABLED);
game.addAsset(BUTTON_PRESSED);

game.addAsset(BUTTON1_ACTIVE);
game.addAsset(BUTTON1_DISABLED);
game.addAsset(BUTTON1_PRESSED);

game.addAsset(SOUND_PRESSED);
game.addAsset(SOUND_RELEASED);
game.addAsset(SOUND_STAR);
game.addAsset(SOUND_PACK);

game.addAsset(SOUND_STEP1);
game.addAsset(SOUND_STEP2);

game.addAsset(SOUND_JUMP1);
game.addAsset(SOUND_JUMP2);


game.addAsset('UI_Sound.png');
game.addAsset('UI_SoundOFF.png');

game.addAsset('level0.png');


game.addAsset('layer_03.png');
game.addAsset('layer_04.png');
game.addAsset('layer_05.png');
game.addAsset('layer_06.png');
game.addAsset('layer_07.png');
game.addAsset('layer_08.png');

game.addAsset('layer_10.png');




game.addAsset('minecraft.fnt');



game.addAsset('level.json');

game.addAsset('level0.json');
game.addAsset('level1.json');
game.addAsset('level2.json');
game.addAsset('level3.json');
game.addAsset('level4.json');
game.addAsset('level5.json');
game.addAsset('level6.json');

//game.addAsset('player.png');
game.addAsset('player1.png');
//game.addAsset('player1.png');
game.addAsset('tileset.png');


game.addAsset('t1.png');


game.addAsset('block.png');


game.addAsset('portraitBg1.png');
game.addAsset('portraitFg.png');
game.addAsset('portraitBg.png');
game.addAsset('portraitLock.png');

game.addAsset('portrait0.png');
game.addAsset('portrait0b.png');
game.addAsset('portrait1.png');
game.addAsset('portrait2.png');
game.addAsset('portrait3.png');
game.addAsset('portrait4.png');
game.addAsset('portrait5.png');




game.addAsset(TUTORIAL1);
game.addAsset(TUTORIAL2);
game.addAsset(TUTORIAL3);




game.createClass('ForgeButton', 'Button', {
	//We extend the standard button
	staticInit: function(texture1, texture2, texture3,
	    x, y, text, textProps, size,
    	tint1, tint2, tint3, callback) 
	{
		this.super(texture2, x, y, callback);
		this.myEnabled = true;
		this.callback = callback;
		
		//this.sprite.alpha=0;
		
		this.sprite2 = new game.Sprite(texture1);
		this.sprite2.anchorCenter();
		this.sprite2.alpha=1;
		this.sprite2.buttonMode = true;
		
		this.sprite2.position.x = x;
		this.sprite2.position.y = y;
		this.sprite2.interactive = true;
		this.sprite2.mousedown = this.mousedown.bind(this);
		this.sprite2.mouseup = this.mouseup.bind(this);
		this.sprite2.mouseupoutside = this.mouseup.bind(this);


		this.sprite3 = new game.Sprite(texture3);
		this.sprite3.anchorCenter();
		this.sprite3.alpha=0;
		this.sprite3.position.x = x;
		this.sprite3.position.y = y;


	    var n = text.search("\n");
	    var text1="";
	    if(n > 0)
	    {
	        text1 = text.substring(n+1, text.length);
	        text = text.substring(0, n);
	    }
	    var interleave=0.020;

	    if(n > 0)
	    {
    		this.innerCreateText(text, this.sprite,size,tint2,-interleave * game.height);
    		this.innerCreateText(text1, this.sprite,size,tint2,interleave * game.height);
    		this.innerCreateText(text, this.sprite2,size,tint1,-3-interleave * game.height);
    		this.innerCreateText(text1, this.sprite2,size,tint1,-3+interleave * game.height);
    		this.innerCreateText(text, this.sprite3,size,tint3,-interleave * game.height);
    		this.innerCreateText(text1, this.sprite3,size,tint3,+interleave * game.height);

	    }
	    else
	    {
        	this.innerCreateText(text, this.sprite,size,tint2,0);
        	this.innerCreateText(text, this.sprite2,size,tint1,-3);
        	this.innerCreateText(text, this.sprite3,size,tint3,-2);
	    }
	    this.sprite2.click = this.click.bind(this);
	},
	innerCreateText: function(text,container,size,tint,offsetY)
	{
	    var x= container.width/2;
	    var text2 = CreateText(text,0,0,10,size)
	    
	    SetColor(text2,tint);
        var f= text2.height/text2.fontClass.lineHeight;
	    text2.y =+offsetY + (1/f )*(-text2.height*text2.scale.y/2)
	    //text2.x = container.width/2;
	    //text2.y += container.height/2;
		text2.addTo(container);
	},
	setEnable: function(value)
	{
	    if(value)
	    {
	        this.sprite3.alpha=0;
	    }
	    else
	    {
	        this.sprite3.alpha=1;
	    }
	    this.myEnabled = value;
		this.sprite.interactive = value;
		this.sprite2.interactive = value;
	},
	addTo: function(container) {
		this.super(container);
		container.addChild(this.sprite2);
		container.addChild(this.sprite3);
	},
	scaleIn: function(delay) {
		delay = delay || 0;
		this.sprite2.scale.set(0);
		game.Tween.add(this.sprite2.scale, {
			x: 1, y: 1
		}, this.scaleSpeed, {
			easing: this.scaleEasing,
			delay: delay,
			onStart: this._onScaleInStart.bind(this),
			onComplete: this._scaleInEnd.bind(this)
		}).start();
	},
	rotate: function(random) {
		this.super(random),
		this.sprite2.rotation = -this.rotateAmount;
		this.rotateTween = game.Tween.add(this.sprite2, {
			rotation: this.rotateAmount
		}, this.rotateSpeed, {
			repeat: Infinity,
			yoyo: true,
			easing: this.rotateEasing
		}).start();
		if (random) this.rotateTween.currentTime = this.rotateTween.duration.random();
	},
	setPosition: function(x,y)
	{
		
		this.sprite.position.x = x;
		this.sprite.position.y = y;
		this.sprite2.position.x = x;
		this.sprite2.position.y = y;
		this.sprite3.position.x = x;
		this.sprite3.position.y = y;
		
	},
	setScale: function(x,y)
	{
		
		this.sprite.scale.x = x;
		this.sprite.scale.y = y;
		this.sprite2.scale.x = x;
		this.sprite2.scale.y = y;
		this.sprite3.scale.x = x;
		this.sprite3.scale.y = y;
		
	},
	mousedown: function()
	{
	    if(this.myEnabled)
	    {
            //console.log("sound");
    		if (this.clickSound) PlaySound(this.clickSound);
    		this.sprite2.alpha=0.01;
    		this.sprite.alpha=1;
    		this.sprite.mousedown();
	    }
	},
	mouseup: function()
	{
	    if(this.myEnabled)
        {
            //console.log("sound release");
            if (this.clickSound1) PlaySound(this.clickSound1);
    
    		this.sprite2.alpha=1;
    		this.sprite.alpha=0.01;
    		this.sprite.mouseup();
        }
	},
	activate: function()
	{
	    if(this.myEnabled)
        {
    		this.sprite2.alpha=0;
    		this.sprite.alpha=1;
        }
	},
	deactivate: function()
	{
	    if(this.myEnabled)
        {
    		this.sprite2.alpha=1;
    		this.sprite.alpha=0;
        }
	},
	click: function()
	{
	    if(this.myEnabled)
	    {
    		//if (this.clickSound) game.audio.playSound(this.clickSound);
    		
    		if (typeof this.callback === 'function')
    		{
    			this.callback();
    		}
	        
	    }
	}
});

});

function CreateDefaultButton(x,y,text,size,callback)
{
            var button = new game.ForgeButton(BUTTON_ACTIVE, BUTTON_PRESSED, BUTTON_DISABLED,
            x,y,text,{},size,COLOR_BLACK,COLOR_BLACK,COLOR_DARKGRAY, callback);
            SetDefaultButtonBehavior(button, 100);
            button.addTo(game.scene.stage);
            return button;
}

function CreateDefault1Button(x,y,text,size,callback)
{
            var button = new game.ForgeButton(BUTTON1_ACTIVE, BUTTON1_PRESSED, BUTTON1_DISABLED,
            x,y,text,{},size,COLOR_BLACK,COLOR_BLACK,COLOR_DARKGRAY, callback);
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

function CreateText(text,x,y,fontIdx,size)
{
		var etext = new game.Text(text);

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

function SetColor(etext,tint)
{
		etext.cache = true;
		etext._cachedSprite.tint = tint;
		etext._cachedSprite.tintAlpha = 1; 
}



function AddForegroundUI()
{
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
            }
	        else
	        {
	            game.audio.playSound(SOUND_PRESSED);
	            game.mute = false;
    	        this.sprite.setTexture('UI_Sound.png');
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
    if(tileid==1+20)
    {
        return true;
    }
    if(tileid==1+16)
    {
        return true;
    }
    return false;
}

function IsCloud(tileid)
{
    if(tileid==1+18)
    {
        return true;
    }
    return false;
}

function CommonUpdate()
{
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
    if(game.locale.includes("it_"))
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

function GetLocalizedString(label)
{
    return game.localizedTexts[label][GetLanguageName()]; 
}


//Server Related
function GetTimestamp()
{
    return (~~(Date.now() / 1000));
}

function StartGame()
{
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
                
                if(LOCAL_MODE) game.endReceived=true;
                //game.scene.button.setEnable(false)
}

function ServerUpdateStart()
{
        if(game.startSent && game.startReceived==true)
        {
            game.startSent=false;
            game.startReceived=false;
            GoToScene("Main");
        }
        if(game.startSendTimer !=0 && game.startSent && game.startReceived==false)
        {
            var time =  Date.now() - game.startSendTimer ;
            if(time>10000)
            {
                //timeout request
                game.startReceived=true;
                //TODO ERROR HANDLING
            }
        }

}

function ServerUpdateEnd()
{
    //if(game.endSent)
    {
        if(game.endSent && game.endReceived==true)
        {
            game.endSent=false;
            game.endeceived=false;
            GoToScene("Outro");
        }
        if(game.endSendTimer !=0 && game.endSent && game.endReceived==false)
        {
            var time =  Date.now() - game.endSendTimer ;
            if(time>10000)
            {
                //timeout request
                game.endReceived=true;
                //TODO ERROR HANDLING
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
                    params["PlayerId"]=FR_PLAYERID;
                    
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
                                    FR_PLAYERMAXSCORE=response["PlayerMaxScore"]
                                    FR_TOPPLAYERSCORE=response["TopPlayerScore"]
                                    FR_SESSIONID=response["SessionID"]
                                }
                            }
                            else
                            {
                                //error
                                if(game.startRequestNumber==1)
                                {
                                    DoStartRequest();
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
                    params["PlayerId"]=FR_PLAYERID;
                    params["Nickname"]=game.name;
                    params["SessionID"]=FR_SESSIONID;
                    params["Score"]=FR_SCORE;
                    params["NumStars"]=FR_TIMESSTARS;
                    params["NumFalls"]=FR_TIMESFALLEN;
                    params["ValidationToken"]=FR_VALIDATION_TOKEN;
                    
                    
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
                                    //FR_PLAYERMAXSCORE=response["PlayerMaxScore"]
                                    //FR_TOPPLAYERSCORE=response["TopPlayerScore"]
                                    //FR_SESSIONID=response["SessionID"]
                                }
                            }
                            else
                            {
                                //error
                                if(game.endRequestNumber==1)
                                {
                                    DoEndRequest();
                                }
                            }
                        }
                    }
                    xhr.send(JSON.stringify(params));
                    
}

