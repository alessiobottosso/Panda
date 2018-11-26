var FR_ALLOW_UNKNOW=true;
var FR_PASSTROUGH=false;
var FR_DEBUG = true;
var FR_TIMEMALUS=30;
var FR_TIMEBONUS=3;
var FR_VALIDATION_TOKEN=[];
var FR_TIMESFALLEN=0;
var FR_TIMESSTARS=0;
var FR_SCORE=0;
var FR_PLAYERMAXSCORE=0;
var FR_TOPPLAYERSCORE=0;
var FR_PLAYERID="";
var FR_PLAYERNAME="";
var FR_SESSIONID="";
var FR_SPEED=500;
var FR_DIELEVEL=2000;

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
//LEVEL_DESIGN="level47.json"
LEVEL_DESIGN="";
LEVEL_DESIGN_SEQUENTIAL=false
MUSIC_VOLUME=0.20;
LOCAL_MODE=true;    


TestLevel=false;
MaxLevel=47; 
MaxLambda=35;
LowLimit=800;
Lambda = 1;
XSpeed=3;
XScale=1;
Fake3d = false;
layerFg="main";
layerSx="sx";
layerDx="dx";
layerBg="bg";
PointSize=8;


COLOR_BLACK = "#000000";
COLOR_WHITE = "#FFFFFF";
COLOR_DARKGRAY = "#686868";
COLOR_DOVEGRAY = "#AD986E";
COLOR_GREEN = "#285D4F";
COLOR_DARKGREEN = "#14322B";
COLOR_LIGHTBLUE = "#A4D2D5";
BACKGROUND_COLOR = "#14322B";

COLOR_DARKDARKGRAY= "#323232";
COLOR_YELLOW = "#fcc630";

PORTRAIT = "portrait";


WINDOW_ERROR = "Juv_Xmas_UI_window.png";

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

SOUND_TIME = "stx_time_running.m4a" ;

SOUND_STAR = "sfx_collect_star.m4a";
SOUND_PACK = "sfx_collect_gift.m4a";


MUSIC_MAIN = "mus_main.m4a";
MUSIC_INTRO = "mus_intro.m4a";
MUSIC_INTRO2 = "mus_santa_loop.m4a";
MUSIC_OUTRO = "mus_outro.m4a";

SOUND_STEP1 = "sfx_step_terrain_01.m4a";
SOUND_STEP2 = "sfx_step_terrain_02.m4a";

SOUND_JUMP1 = "sfx_player_jump.m4a";
SOUND_JUMP2 = "sfx_player_double_jump.m4a";

SOUND_TOCTOC = "sfx_knock_door.m4a";
SOUND_BALLOON = "sfx_balloon_in.m4a";
SOUND_SCORE = "sfx_points_up.m4a";
SOUND_SANTA = "sfx_santa_come_in.m4a";

BORDER = "border.png";

TUTORIAL1 = "Juv_Xmas_UI_Tutorial_01Jump";
TUTORIAL2 = "Juv_Xmas_UI_Tutorial_02Time";
TUTORIAL3 = "Juv_Xmas_UI_Tutorial_03Presents";

TUTORIAL1_ITA = "Text/ITA/Juv_Xmas_UI_Tutorial_01Jump_ITA.png";
TUTORIAL2_ITA = "Text/ITA/Juv_Xmas_UI_Tutorial_02Time_ITA.png";
TUTORIAL3_ITA = "Text/ITA/Juv_Xmas_UI_Tutorial_03Presents_ITA.png";

TUTORIAL1_ENG = "Text/ENG/Juv_Xmas_UI_Tutorial_01Jump_ENG.png";
TUTORIAL2_ENG = "Text/ENG/Juv_Xmas_UI_Tutorial_02Time_ENG.png";
TUTORIAL3_ENG = "Text/ENG/Juv_Xmas_UI_Tutorial_03Presents_ENG.png";

PROD=false;
ENDPOINT_PROD = "https://xmas.juventus.com/"
ENDPOINT_PRE = "https://levelupyourxmas.staging.weareserver.it/"
ENDPOINT1 = "api/startGame"
ENDPOINT2 = "api/endGame"

VFX = "Vfx_Jump_4x.png"
VFX2 = "Vfx_Run_4x.png"

VFX3 = "Vfx_Gift_4x.png"
VFX4 = "Vfx_Star_4x.png" 
VFX5 = "Vfx_DoubleJump.png" 
VFX6 = "Vfx_Numbers.png" 

VFX7 = "Vfx_Victory.png";

// Intro/outro animation names
INTRO_OUTRO_ATLAS = "Animations.atlas"
INTRO_OUTRO_JSON = "Animations.json"

INTRO_01 =
[
    "Intro_01_Part1_Once",
    "Intro_01_Part2_Loop"
]

INTRO_02 =
[
    "Intro_02_Part1_Once",
    "Intro_02_Part2_Once"
]

INTRO_03 =
[
    "Intro_03_Part1_Once"
]

INTRO_04 = 
[
    "Intro_03_Part2_Once",
    "Intro_03_Part3_Loop"
]

INTRO_05 =
[
    "Intro_04_Once"
]

INTRO =
[
    INTRO_01,
    INTRO_02,
    INTRO_03,
    INTRO_04,
]

GAMEPLAY =
[
    INTRO_05
]

OUTRO_01 =
[
    "Ending_Part1_Once",
    "Ending_Part2_Loop",
]

OUTRO_02 =
[
    "Ending_Part3_Once",
    "Ending_Part4_Loop",
]

OUTRO =
[
    OUTRO_01,
    OUTRO_02 
]

game.addAsset(MUSIC_MAIN);
game.addAsset(MUSIC_INTRO);
game.addAsset(MUSIC_INTRO2);
game.addAsset(MUSIC_OUTRO);


game.addAsset(VFX);
game.addAsset(VFX2);
game.addAsset(VFX3);
game.addAsset(VFX4);
game.addAsset(VFX5);
game.addAsset(VFX6);
game.addAsset(VFX7);

game.addAsset("localization.json");
game.addAsset(LOADING_STAR);


game.addAsset(TEXTBOX);
game.addAsset(GREEK_UP);
game.addAsset(GREEK_DOWN);


game.addAsset(WINDOW_ERROR);
game.addAsset(BUTTON_ACTIVE);
game.addAsset(BUTTON_DISABLED);
game.addAsset(BUTTON_PRESSED);

game.addAsset(BUTTON1_ACTIVE);
game.addAsset(BUTTON1_DISABLED);
game.addAsset(BUTTON1_PRESSED);


game.addAsset(SOUND_SELECT);
game.addAsset(SOUND_TIME);

game.addAsset(SOUND_PRESSED);
game.addAsset(SOUND_RELEASED);
game.addAsset(SOUND_STAR);
game.addAsset(SOUND_PACK);

game.addAsset(SOUND_STEP1);
game.addAsset(SOUND_STEP2);

game.addAsset(SOUND_JUMP1);
game.addAsset(SOUND_JUMP2);

game.addAsset(SOUND_TOCTOC);
game.addAsset(SOUND_BALLOON);
game.addAsset(SOUND_SCORE);
game.addAsset(SOUND_SANTA);


game.addAsset(BORDER);

game.addAsset("L1_House_01.png");
game.addAsset("L1_House_02.png");
game.addAsset("L1_House_03.png");
game.addAsset("L1_House_04.png");
game.addAsset("L1_Reindeer.png");
game.addAsset("L1_Snowman_01.png");
game.addAsset("L1_Snowman_02.png");
game.addAsset("L1_Snow_01.png");
game.addAsset("L1_Snow_02.png");
game.addAsset("L1_Snow_03.png");
game.addAsset("L1_Snow_04.png");
game.addAsset("L1_Tree_01.png");
game.addAsset("L1_Tree_02.png");
game.addAsset("L1_Tree_03.png");
game.addAsset("L2_House_01.png");
game.addAsset("L2_House_02.png");
game.addAsset("L2_House_03.png");
game.addAsset("L2_House_04.png");
game.addAsset("L2_tree_02.png");

game.addAsset("Stadium.png");
game.addAsset("Stadium_quinta.png");



game.addAsset('UI_Sound.png');
game.addAsset('UI_SoundOFF.png');


game.addAsset('layer_04.png');
game.addAsset('layer_05.png');
game.addAsset('layer_06.png');
//game.addAsset('layer_07.png');
game.addAsset('layer_08.png');


game.addAsset(TUTORIAL1_ITA);
game.addAsset(TUTORIAL2_ITA);
game.addAsset(TUTORIAL3_ITA);

game.addAsset(TUTORIAL1_ENG);
game.addAsset(TUTORIAL2_ENG);
game.addAsset(TUTORIAL3_ENG);

game.addAsset('minecraft.fnt');



game.addAsset('level1.png');
game.addAsset('level2.png');
game.addAsset('level3.png');
game.addAsset('level4.png');
game.addAsset('level5.png');

game.addAsset('level.json');

var num=0;
for(num=0;num<MaxLevel+1;++num)
{
    game.addAsset('level'+num +'.json');
    
}
//var num=0;
//for(num=0;num<MaxLevel+1;++num)
//{
//    game.addAsset('level'+num +'.png');    
//}

MaxPlayer=25;
var num=0;
for(num=1;num<MaxPlayer;++num)
{
    game.addAsset('player'+num +'.png');
    
}

game.addAsset('portrait0.png');
game.addAsset('portrait0b.png');
var num=0;
for(num=1;num<MaxPlayer;++num)
{
    game.addAsset('portrait'+num +'.png');
    
}


//game.addAsset('player1.png');
game.addAsset('tileset.png');


game.addAsset('t1.png');


game.addAsset('block.png');


game.addAsset('portraitBg2.png');
game.addAsset('portraitBg1.png');
game.addAsset('portraitFg.png');
game.addAsset('portraitBg.png');
game.addAsset('portraitLock.png');

//game.addAsset(TUTORIAL1);
//game.addAsset(TUTORIAL2);
//game.addAsset(TUTORIAL3);

// Intro/Outro Spine Animation
game.addAsset(INTRO_OUTRO_ATLAS);
game.addAsset(INTRO_OUTRO_JSON);


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
            x,y,text,{},size,COLOR_BLACK,COLOR_YELLOW,COLOR_DARKDARKGRAY, callback);
            SetDefaultButtonBehavior(button, 100);
            button.addTo(game.scene.stage);
            return button;
}

function CreateDefault1Button(x,y,text,size,callback)
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
		etext.cache = true;
		etext._cachedSprite.tint = tint;
		etext._cachedSprite.tintAlpha = 1; 
}



function AddForegroundUI()
{
    if(FR_DEBUG)
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
    if(game.scene.fps&& FR_DEBUG)
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
                                    if(response["PlayerMaxScore"])
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
                    params["PlayerId"]=FR_PLAYERID;
                    params["Nickname"]=game.name;
                    params["SessionID"]=FR_SESSIONID;
                    params["Score"]=FR_SCORE;
                    params["NumStars"]=FR_TIMESSTARS;
                    params["NumFalls"]=FR_TIMESFALLEN;
                    params["ValidationToken"]=FR_VALIDATION_TOKEN;
                    
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
    game.loadDone=true; GoToScene("Preloading");
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
		    Alert(JSON.stringify(error),()=>{
    		var errors=JSON.stringify(error);
		              
        	objs.forEach(function(element1)
    		{
    		    if(element1.includes("atlas"))
    		    {
    		        console.log("removing "+ element1);
    		        name = element1.replace('.atlas', '');
    
    		        var i = 0;
    		        var j = -1;
    		        var keys = Object.keys(game.spine.AtlasCache);
    		        for(i=0; i < keys.length; ++i)
    		        {
    		            console.log(game.spine.AtlasCache[keys[i]]);
    		            
    		            if(keys[i].includes(name))
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
    		    if(element1.includes("json"))
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
        
    if (animName.includes("Loop")) loop = true;
    
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
        
        if (animName.includes("Loop")) loop = true;
        
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
        
        if (animName.includes("Loop")) loop = true;
        
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
        if (music)
        {
            music.play();
        }
    }
    catch (e)
    {
        console.log(e.message);
    }
}