var RF_WBPZPBYZRISMQHIEYEBZ =true; //FR_ALLOW_UNKNOW
var RF_HGPHGUTRLVUBQHFAVTZC =false; //FR_PASSTROUGH
var RF_UANECUBGVJVGKLHPMGTU = false; //FR_DEBUG
var RF_HGMWPQXICIIEEYEGTJFL =30; //FR_TIMEMALUS
var RF_TLVCZMRDZQNNAFUMMRPL =3; //FR_TIMEBONUS
var RF_XSEMAQCLGAWCBGBVKKXC =[]; //FR_VALIDATION_TOKEN
var RF_YUILUVEZESUBVUPAHIBJ =0; //FR_TIMESFALLEN
var RF_JFWZULMTDYBCUMMDITSF =0; //FR_TIMESSTARS
var RF_KDHPGVHHRBNCIMSTXJSI =0; //FR_SCORE
var RF_HKVFQRGHGLRPQWYGYGSZ =0; //FR_PLAYERMAXSCORE
var RF_EFBCKZTGVUFZAJYZHBZP =0; //FR_TOPPLAYERSCORE
var RF_NZAFJZLMNLVQRTEBJTVQ =""; //FR_PLAYERID
var RF_YAMMFSNGYZYWHDLEEWSK =""; //FR_PLAYERNAME
var RF_MFSIZQHHEWQNGIQMLNZR =""; //FR_SESSIONID
var RF_KFPPMYINHZWMAJCSHDNQ =500; //FR_SPEED
var RF_JGCBIKQYMYSRWBZHRCWA =2000; //FR_DIELEVEL

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




game.addAsset('level.json');

var num=0;
for(num=0;num<MaxLevel+1;++num)
{
    game.addAsset('level'+num +'.json');
    
}

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

