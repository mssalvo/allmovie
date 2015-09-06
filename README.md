allmovie
========
<b>Draw your Deezer player with html tags and combines controls thanks to the bees Allmovie</b>
</b>
#Setting All event default

Example:<br>

<b>deezer.all_init_default_event();<br></b>
</b>
#Setting All controller button<br>

Example:<br>
<b>deezer.add_all_controller();<br></b>
</b>
#Setting manualy controller player<br>

Example:<br>
<b>deezer.addController.play($("#play"));<br></b>
<br>
Example:<br>
<b>deezer.addController.pause($("#pause"));<br></b>
<br>
Example:<br>
<b>deezer.addController.prev($("#prev"));<br></b>
<br>
Example:<br>
<b>deezer.addController.next($("#next"));<br></b>
</b>
#Setting BoxMenu<br>

Example:<br>
<b>deezer.setting.boxMenu=$("#menu");<br></b>
</b>
#Setting BoxAlbum<br>

Example:<br>
<b>deezer.setting.boxMenu=$("#menu");<br></b>
Setting BoxProgressBar<br>

Example:<br>
<b>deezer.setting.boxProgressBar=$("#boxProgressBar");<br></b>
</b>
#Setting lineProgress<br>

Example:<br>
<b>deezer.setting.lineProgress=$("#lineProgress");<br></b>
</b>
#Setting titolo Cover<br>

Example:<br>
<b>deezer.setting.titoloCover=$("#titolo");<br></b>
Setting image Cover<br>

Example:<br>
<b>deezer.setting.imageCover=$("#image");<br></b>
Setting button Play<br>

Example:<br>
<b>deezer.setting.play=$("#play");<br></b>
Setting button Prev<br>

Example:<br>
<b>deezer.setting.prev=$("#prev");<br></b>
Setting button Pause<br>

Example:<br>
<b>deezer.setting.prev=$("#pause");<br></b>
Setting button Next<br>

Example:<br>
<b>deezer.setting.boxMenu=$("#next");<br></b>
#Setting input Search<br>

Example:<br>
<b>deezer.setting.inputSearch=$("#search");<br></b>
<br>
<b>Page html<br></b>
Example:<br>
&lt;div style="float:left;width:24.5%; height:100%; overflow:auto;"><br>
&lt;img id="image"> <br>
&lt;div id="titoloCover"><br>
&lt;/div><br>
&lt;div style="width:100%; height:33px;"><br>
&lt;input type="button" class="btnPrev" value="prev" id="prev"><br>
&lt;input type="button" class="btnPlay" value="play" id="play"><br>
&lt;input type="button" class="btnPausa" value="pause" id="pause"> <br>
&lt;input type="button" class="btnNext" value="next" id="next"> </div><br>
&lt;input type="text" placeholder="search" id="search" class="search"><br>
&lt;div id="boxProgressBar" class="boxProgress"><br>
&lt;div id="lineProgress" class="progessBar"> </div><br>
&lt;/div><br>
&lt;div id="menu"></div><br>
&lt;/div><br><br>
&lt;div id="content-body" style="float:left;width:50%; height:100%; overflow:auto;"></div><br>
&lt;div style="float:left; width:24.5%; height:100%; overflow:auto;"><br>
&lt;div id="album"> </div><br>
&lt;/div><br>
<br>

&lt;script src="http://cdn-files.deezer.com/js/min/dz.js"></script><br>
&lt;script type="text/javascript" src="js/core/jquery-1.10.2.min.js"></script><br>
&lt;script type="text/javascript" src="js/api.all.js"></script><br>
&lt;link href="css/style.css" rel="stylesheet"><br>

&lt;script><br>
<br>
(function(api){<br>
api.setting.boxMenu=$("#menu");<br>
api.setting.boxAlbum=$("#album");<br>
api.setting.boxProgressBar=$("#boxProgressBar");<br>
api.setting.lineProgress=$("#lineProgress");<br>
api.setting.titoloCover=$("#titoloCover");<br>
api.setting.imageCover=$("#image");<br>
api.setting.play=$("#play");<br>
api.setting.pause=$("#pause");<br>
api.setting.prev=$("#prev");<br>
api.setting.next=$("#next");<br>	
api.setting.inputSearch=$("#search");<br>

<br>
api.init({	
appId : "139735",	
channelUrl : "http://msdeveloper.it/brand/frame/channel.html",	
player: { }	
})<br>
<br>
api.add_all_controller();<br>
<br>
api.all_init_default_event();<br>
<br>
})(api.deezer);<br>
&lt;/script>
