/**
 * @author Salvatore Mariniello
 * 
	
	The contents of this file are subject to the Mozilla Public License
	Version 1.1 (the "License"); you may not use this file except in
	compliance with the License. You may obtain a copy of the License at
	http://www.mozilla.org/MPL/

	Software distributed under the License is distributed on an "AS IS"
	basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
	License for the specific language governing rights and limitations
	under the License.

	The Original Code is javascript.

	The Initial Developer of the Original Code is Salvatore Mariniello.
	Portions created by Salvatore Mariniello are Copyright (C) 2014
	Salvatore Mariniello. All Rights Reserved.

 */
 
 var EVENT = EVENT ||{
PLAYER_LOADED:"player_loaded",
PLAYER_PLAY:"player_play",
PLAYER_PAUSED:"player_paused",
PLAYER_POSITION:"player_position",
PLAYER_BUFFERING:"player_buffering",
VOLUME_CHANGED:"volume_changed",
SHUFFLE_CHANGED:"shuffle_changed",
REPEAT_CHANGED:"repeat_changed",
MUTE_CHANGED:"mute_changed",
TRACKLIST_CHANGED:"tracklist_changed",
TRACK_END:"track_end",
CURRENT_TRACK:"current_track",
SEARCH_BLUR:"search_blur",
SEARCH_KEYUP:"search_keyup",
SEARCH_CLICK:"search_click"
};
var deezer= deezer || false;
(function(w,core){
!deezer?deezer = {
	info:{
	autore:'Salvatore Mariniello',
	versione:1.0,
	license: 'https://www.mozilla.org/MPL/2.0/index.txt',
	contact:'salvo.mariniello@gmail.com'
	},
	init:function(o){
	if(!$("#dz-root").length){$("<div/>").attr("id","dz-root").appendTo(document.body)}
      deezer.core.init(o)
	  deezer.initSetting()
    },
    login:function(f,o){
    deezer.core.login(function(r) {if(f && typeof f =='function'){f(r)}},o||{scope: 'manage_library,basic_access'})
	}, 

    getLoginStatus:function(f,o){
    deezer.core.getLoginStatus(function(r) {if(f && typeof f =='function'){f(r)}},o||{scope: 'manage_library,basic_access'})
    },
	core:core,
	putListener:function(e,f){deezer.core.Event.subscribe(e,f)},
	get:function(e,f){deezer.core.api(e,f)},
	eventListener:{
	PLAYER_LOADED:[],
	PLAYER_PLAY:[],
	PLAYER_PAUSED:[],
	PLAYER_POSITION:[],
	PLAYER_BUFFERING:[],
	VOLUME_CHANGED:[],
	SHUFFLE_CHANGED:[],
	REPEAT_CHANGED:[],
	MUTE_CHANGED:[],
	TRACKLIST_CHANGED:[],
	TRACK_END:[],
	CURRENT_TRACK:[],
	SEARCH_BLUR:[],
	SEARCH_CLICK:[]
	},
	addController:{
    play:function(o){deezer.player.play(o)},
    pause:function(o){deezer.player.pause(o)},
    prev:function(o){deezer.player.prev(o)},
    next:function(o){deezer.player.next(o)},
	playAlbum:function(a){deezer.player.playAlbum(a)},
	playTracks:function(a,i,f){deezer.player.playTracks(a, i, f)},
    seek:function(i){deezer.player.seek(i)}
      },
	player:{
	play:function(o){if(o && typeof o =='object'){ o.click(function(){deezer.core.player.play()})} else deezer.core.player.play()},
	pause:function(o){if(o && typeof o =='object'){ o.click(function(){deezer.core.player.pause()})} else deezer.core.player.pause()},
	prev:function(o){if(o && typeof o =='object'){ o.click(function(){deezer.current.trackID=deezer.tracksid[deezer.getIndex(false)]; deezer.core.player.prev()})} else{deezer.current.trackID=deezer.tracksid[deezer.getIndex(false)]; deezer.core.player.prev()}},
	next:function(o){if(o && typeof o =='object'){ o.click(function(){deezer.current.trackID=deezer.tracksid[deezer.getIndex(true)]; deezer.core.player.next()})} else{deezer.current.trackID=deezer.tracksid[deezer.getIndex(true)];  deezer.core.player.next()}},
	seek:function(i){deezer.core.player.seek(i)},
	playAlbum:function(a){deezer.core.player.playAlbum(a)},
	playTracks:function(a,i,f){deezer.core.player.playTracks(a, i, function(r){ if(f && typeof f =='function'){f(r)}})},
	isPlaying:function(){return deezer.core.player.isPlaying()},
	getTrackList:function(){return deezer.core.player.getTrackList()},
	getCurrentTrack:function(){return deezer.core.player.getCurrentTrack()},
	getCurrentIndex:function(){return deezer.core.player.getCurrentIndex()},
	getVolume:function(){return deezer.core.player.getVolume()},
	getShuffle:function(){return deezer.core.player.getShuffle()},
	getRepeat:function(){return deezer.core.player.getRepeat()},
	getMute:function(){return deezer.core.player.getMute()}
	},
	addEventListener:function(){
		var EVT="",fn=null,ob=null,b_=true,ary=[];
		if(arguments.length>0){
		for(k in arguments){
		 
		arg=typeof arguments[k]
		
		switch(arg){
		case "string":
		if(arguments[k]=="true" || arguments[k]=="false"){b_=new Boolean(arguments[k])}
		for(var p in EVENT){ if(EVENT[p]==arguments[k]){EVT=arguments[k];} };
		break;
		case "function":
		fn=arguments[k];
		break;
		case "object":
		ob=arguments[k];
		break;
		case "boolean":
		b_=new Boolean(arguments[k]);
		break;
		case "array":
		ary=arguments[k];
		break;

		}
		
		}
		if(EVT==EVENT.PLAYER_LOADED){
		 
		 deezer.putListener(EVENT.PLAYER_LOADED,function(r){ if(b_){deezer.loader(r,fn)} else if(fn && typeof fn =='function'){fn(r)}})
		}
		else if(EVT==EVENT.CURRENT_TRACK){
	 
		 deezer.putListener(EVENT.CURRENT_TRACK,function(r){ deezer.currentTracker(r,fn)})
		}
		else if(EVT==EVENT.PLAYER_POSITION){
		 
		deezer.putListener(EVENT.PLAYER_POSITION,function(r){ deezer.progress(r,fn,ob)})
		}
		else if(EVT==EVENT.SEARCH_BLUR){
		 
		if(ob && ob.bind){
		deezer.setting.inputSearch=ob;
		ob.bind("blur",fn||deezer.fn_search_blur)
		}else if(deezer.setting.inputSearch && deezer.setting.inputSearch.bind){
		deezer.setting.inputSearch.bind("blur",fn||deezer.fn_search_blur)
		}
		}
		else if(EVT==EVENT.SEARCH_KEYUP){
		 
		if(ob && ob.bind){
		deezer.setting.inputSearch=ob;
		ob.bind("keyup",fn||deezer.fn_search_blur)
		}else if(deezer.setting.inputSearch && deezer.setting.inputSearch.bind){
		deezer.setting.inputSearch.bind("keyup",fn||deezer.fn_search_blur)
		}
		}
		else if(EVT==EVENT.SEARCH_CLICK){
		if(ob && ob.bind){
		ob.bind("click",fn||deezer.fn_search_click)
		}else if(deezer.setting.buttonSearch && deezer.setting.buttonSearch.bind){
		deezer.setting.buttonSearch.bind("click",fn||deezer.fn_search_click)
		}
		}
		else{
	 	deezer.putListener(EVT,function(r){if(fn && typeof fn =='function'){fn(r)}}) 
		}
	 
		}
	
	},	
	current:{
	trackID:"",
	userID:"",
	albumID:"",
	artistID:"",
	playlistID:"",
	radioID:"",
	editorialID:"",
	genreID:""
	},
	search:{
    all:function(v){deezer.get('/search?q=' + encodeURIComponent(v),function(r){deezer.getElementsBoxAll(r)} )},
	album:function(v,f){deezer.get('/search/album?q=' + encodeURIComponent(v),function(r){deezer.getElementsBoxAlbum(r)} )},
	album_tracker:function(v){deezer.get('/album/' +deezer.current.albumID+'/tracks',function(r){deezer.getElementsTitle(r,v)})},
	artist:function(v,f){deezer.get('/search/artist?q=' + encodeURIComponent(v),function(r){f(r)} )},
	user:function(v,f){deezer.get('/search/user?q=' + encodeURIComponent(v),function(r){f(r)} )},
	autocomplete:function(v,f){deezer.get('/search/autocomplete?q=' + encodeURIComponent(v),function(r){f(r)} )},
	track:function(v,f){deezer.get('/track/' + deezer.current.trackID,function(r){deezer.getCurrentElement(r,f)} )}
	},
	playlist:{
	id:function(v,f){deezer.get('/playlist/' + encodeURIComponent(v),function(r){f(r)} )},
	},
	track:{
	id:function(v,f){deezer.get('/track/' + deezer.current.trackID,function(r){f(r)} )}
	},
	album:{
	comments:function(v,f){deezer.get('/album/' + deezer.current.albumID+'/comments',function(r){f(r)} )},
	fans:function(v,f){deezer.get('/album/' + deezer.current.albumID+'/fans',function(r){f(r)} )},
	tracks:function(v,f){deezer.get('/album/' + deezer.current.albumID+'/tracks',function(r){f(r)} )}
	},
	artist:{
	top:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/top',function(r){f(r)} )},
	albums:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/albums',function(r){f(r)} )}, 
	comments:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/comments',function(r){f(r)} )}, 
	fans:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/fans',function(r){f(r)} )}, 
	related:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/related',function(r){f(r)} )}, 
	radio:function(v,f){deezer.get('/artist/' + encodeURIComponent(v)+'/radio',function(r){f(r)} )}
	},
	user:{
	albums:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/albums',function(r){f(r)} )},
	artists:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/artists',function(r){f(r)} )}, 
	charts:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/charts',function(r){f(r)} )},
	flow:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/flow',function(r){f(r)} )},
	folders:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/folders',function(r){f(r)} )},
	followings:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/followings',function(r){f(r)} )},
	followers:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/followers',function(r){f(r)} )},
	history:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/history',function(r){f(r)} )},
	notifications:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/notifications',function(r){f(r)} )},
	followings:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/followings',function(r){f(r)} )},	
	permissions:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/permissions',function(r){f(r)} )},
	personal_songs:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/personal_songs',function(r){f(r)} )},
	playlists:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/playlists',function(r){f(r)} )},
	radios:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/radios',function(r){f(r)} )},
	tracks:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/tracks',function(r){f(r)} )},
	recommendations_playlists:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/recommendations/playlists',function(r){f(r)} )},
	recommendations_albums:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/recommendations/albums',function(r){f(r)} )},
	recommendations_tracks:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/recommendations/tracks',function(r){f(r)} )},
	recommendations_radios:function(v,f){deezer.get('/user/' + encodeURIComponent(v)+'/recommendations/radios',function(r){f(r)} )}
	},
	radios:{
	 all:function(f){deezer.get('/radio/',function(r){f(r)} )}, 
	 radio:function(v,f){deezer.get('/radio/' + encodeURIComponent(v),function(r){f(r)} )}, 
	 genres:function(f){deezer.get('/radio/genres',function(r){f(r)} )}, 
	 top:function(f){deezer.get('/radio/top',function(r){f(r)} )} 
	},
	editorials:{
	all:function(v,f){deezer.get('/editorial/',function(r){f(r)} )},
	editorial:function(v,f){deezer.get('/editorial/' + encodeURIComponent(v),function(r){f(r)} )},
	selection:function(v,f){deezer.get('/editorial/' + encodeURIComponent(v)+'/selection',function(r){f(r)} )},
	charts:function(v,f){deezer.get('/editorial/' + encodeURIComponent(v)+'/charts',function(r){f(r)} )}
	}, 
	genre:{
	all:function(v,f){deezer.get('/genre/',function(r){f(r)} )},
	genre:function(v,f){deezer.get('/genre/' + encodeURIComponent(v),function(r){f(r)} )},
	artists:function(v,f){deezer.get('/genre/' + encodeURIComponent(v)+'/artists',function(r){f(r)} )},
	radios:function(v,f){deezer.get('/genre/' + encodeURIComponent(v)+'/radios',function(r){f(r)} )}
	},
	loader:function(r,f){
	deezer.getLoginStatus(function(response) { 
	if (response.authResponse) {
					console.log('check login: logged');
				} else {
			 deezer.login(function(r){},{scope: 'manage_library,basic_access'});
					console.log('check login: not logged');
				}
		})		
		if(f && typeof f =='function')
				f(r)
	},
	progress:function(r,f,o){
	 if(o['css'])
	 o.css('width', (100*r[0]/r[1]) + '%')
	 if(f && typeof f == "function")
		f(r)		
		 
	},
	 fn_search_blur:function(){
		
		if(deezer.setting.boxAlbum){
		deezer.setting.boxAlbum.html("")
		}
		 // avvio la ricerca per più chiavi di ricerca 
		 deezer.search.all($(this).val());	
		 // avvio la ricerca per solo album 
		 deezer.search.album($(this).val());
	},
	fn_search_click:function(){
		
		if(deezer.setting.boxAlbum){
		deezer.setting.boxAlbum.html("")
		}
		 // avvio la ricerca per più chiavi di ricerca 
		 deezer.search.all(deezer.setting.inputSearch.val());	
		 // avvio la ricerca per solo album 
		 deezer.search.album(deezer.setting.inputSearch.val());
	},
	
	fn:function(r,f){ f(r)
	},
	currentTracker:function(r,f){
	deezer.current.trackID= r.track.id;
	deezer.search.track(r.track.id, function(response,current){
			 f({r:r,respons:response,current:current})
			});
	
	},
	getCurrentElement:function(r,f){
	
			  if(deezer.collectionTitle.length>0){
					for(var k=0;k < deezer.collectionTitle.length;k++){
					 if(deezer.collectionTitle[k].id==r.id){
					c= deezer.collectionTitle[k].el.css("background","url(img/eq_primary.gif) #ccc 2% 50% no-repeat")
					 }else{
					 deezer.collectionTitle[k].el.css("background","transparent")
					 }
				  }
			 }
			 if(f && typeof f =='function'){f(r,c)}
			
	},
	getElementsTitle:function(r,v){
		b=r.data;
		 
		deezer.setting.boxMenu.html("");
				deezer.collectionTitle=[];
				deezer.tracksid=[];
				for(var l=0;l<b.length;l++){
				deezer.setting.boxMenu.append(
				c= $("<div/>").attr("id",b[l].id).attr("pos",b[l].track_position)
			    .html(b[l].title).addClass("titolo")
				.click( function(){ 
				deezer.index=$(this).attr("pos");
				deezer.current.trackID=deezer.tracksid[deezer.index-1];
				//console.log("deezer.index:",deezer.index-1)
				//console.log("deezer.tracksid:",deezer.tracksid)
				deezer.current.trackID=deezer.tracksid[deezer.index-1];
				deezer.addController.playTracks(deezer.tracksid,deezer.index-1,function(r){deezer.current.trackID=deezer.tracksid[deezer.index-1];})}  
				      ).mouseover(function(e){$(this).css({"color":deezer.setting.labelTextColorOver})})
					  .mouseout(function(e){$(this).css({"color":deezer.setting.labelTextColorOut})}) 
					  )	  
				deezer.collectionTitle.push({id:b[l].id,el:c})	
				deezer.tracksid.push(b[l].id)
					  } // fine ciclo
		 //deezer.addController.playAlbum(v)
		 deezer.current.trackID=deezer.tracksid[0]
		 deezer.addController.playTracks(deezer.tracksid,0,function(r){})
		 deezer.setting.fnMenu({response:r,trackers:deezer.collectionTitle,ids:deezer.tracksid})  
	},
	getElementsBoxAll:function(r){
		 
			 	deezer.collectionBox=[];
				deezer.albumid=[];
				b = r.data;
					 
					for(var j=0;j<b.length;j++){
				 
					 deezer.setting.boxAlbum
					.append(c = $("<div/>").addClass("album").append($("<img/>").addClass("albumImage")
					.attr("src",b[j].album.cover)
					.attr("id",b[j].album.id).attr("title",b[j].album.title)
					.click(function(){
					deezer.current.albumID=$(this).attr("id");
					deezer.search.album_tracker($(this).attr("id"))})
					).append($("<div/>").html(b[j].album.title)
					.addClass("albumInfo")
					.attr("pos",b[j].album.id)
					.mouseover(function(e){$(this).css({"opacity":deezer.setting.albumInfoOpacityOver})})
					.mouseout(function(e){$(this).css({"opacity":deezer.setting.albumInfoOpacityOut})})
					.click(function(){deezer.current.albumID=$(this).attr("pos"); deezer.search.album_tracker($(this).attr("pos"))})
					)
					 
					.mouseover(function(e){$(this).addClass("albumIn")}).mouseout(function(e){$(this).removeClass("albumIn")})
					)
					 
					deezer.collectionBox.push({id:b[j].album.id,el:c,cover:b[j].album.cover});
					deezer.albumid.push(b[j].id)
					} // fine ciclo
			      
				  
		          deezer.setting.fnAll({response:r,albums:deezer.collectionBox,albumid:deezer.albumid})  
	},
	default_current_track:function(e){
	 
	deezer.setting.titoloCover.html("<b>"+e.r.track.artist.name+"</b><br>"+e.r.track.title) 
	deezer.setting.imageCover.attr("src",e.respons.album.cover)
	deezer.setting.currentPlay=e.current;
	//console.log('currentPlay...',e.current);

		},
	 default_track_end:function() {
	 deezer.setting.pause.css("display","none")
	 deezer.setting.play.css("display","block")
	 if(deezer.setting.currentPlay!=null){
		deezer.setting.currentPlay.css("background","#F1F1F1","color","#646468")
	  }
		},
	 default_player_paused:function(e){
	 deezer.setting.lineProgress.css("display","none")
	 deezer.setting.pause.css("display","none")
	 deezer.setting.play.css("display","block")
	 if(deezer.setting.currentPlay!=null){
		deezer.setting.currentPlay.css("background","#F1F1F1","color","#646468")
	  }
		},
	default_player_play:function(e){
	 deezer.setting.lineProgress.css("display","block")
	 deezer.setting.play.css("display","none")
	 deezer.setting.pause.css("display","block").css("background","url(img/eq_white.gif) #252525 no-repeat center center")
	 if(deezer.setting.currentPlay!=null){
		deezer.setting.currentPlay.css("background","url(img/eq_primary.gif) #ccc 2% 50% no-repeat")
	  }
	},
	all_init_default_event:function(){
	  deezer.addEventListener(EVENT.CURRENT_TRACK, deezer.default_current_track);
	  deezer.addEventListener(EVENT.PLAYER_LOADED, function(){});
	  deezer.addEventListener(EVENT.TRACK_END, deezer.default_track_end);
	  deezer.addEventListener(EVENT.PLAYER_PAUSED, deezer.default_player_paused);
	  deezer.addEventListener(EVENT.PLAYER_PLAY, deezer.default_player_play);
	  
	  deezer.addEventListener(EVENT.PLAYER_POSITION,deezer.setting.lineProgress);
	  deezer.addEventListener(EVENT.SEARCH_KEYUP,deezer.setting.inputSearch);
	},
	getElementsBoxUser:function(){},
	getElementsBoxArtist:function(){},
	getElementsBoxRadio:function(){},
	getElementsBoxEditorial:function(){},
	getElementsBoxAlbum:function(r){
		 
			 	deezer.collectionBox=[];
				deezer.albumid=[];
				b = r.data;
					 
					b = r.data; // slice(0, 20)
				
				    for(var j=0;j<b.length;j++){
				 
					deezer.setting.boxAlbum
					.append(/*contentBox*/
					
					c = $("<div/>").addClass("album").append($("<img/>").addClass("albumImage")
					.attr("src",b[j].artist.picture)
					.attr("id",b[j].id)
					.click(function(){deezer.current.albumID=$(this).attr("id"); 
					 deezer.search.album_tracker($(this).attr("id"));} ) 
					 ) 
					 
					 //
					 .append($("<div/>").html(b[j].artist.name).addClass("albumInfo")
					 .attr("pos",b[j].id)
					 .mouseover(function(e){$(this).css({"opacity":deezer.setting.albumInfoOpacityOver})})
					 .mouseout(function(e){$(this).css({"opacity":deezer.setting.albumInfoOpacityOut})})
					 .click(function(){deezer.current.albumID=$(this).attr("pos"); 
					  deezer.search.album_tracker($(this).attr("pos"))} )
					 )
					
					.mouseover(function(e){$(this).addClass("albumIn")})
					.mouseout(function(e){$(this).removeClass("albumIn")})
					.append(
					$("<div/>").addClass("starAlbum").html(b[j].nb_tracks)
					)
					 ) /*fine contentBox*/
					
					deezer.collectionBox.push({id:b[j].id,el:c,cover:b[j].artist.picture});
					deezer.albumid.push(b[j].id)
					
					} // fine ciclo
			    
				   
		            deezer.setting.fnAlbum({response:r,albums:deezer.collectionBox,albumid:deezer.albumid})  
	},
	setting:{
	boxMenu:{},
	boxAlbum:{},
	titoloCover:false,
	imageCover:false,
	inputSearch:false,
	buttonSearch:false,
	boxProgressBar:{},
	lineProgress:false,
	play:false,
	pause:false,
	prev:false,
	next:false,
	fnMenu:function(r){},
	fnAlbum:function(r){},
	fnAll:function(r){},
	labelTextColorOver:"#FF18E3",
	labelTextColorOut:"#646468",
	albumInfoOpacityOver:"1",
	albumInfoOpacityOut:"0"
	},
	collectionTitle:[],
	collectionBox:[],
	tracksid:[],
	albumid:[],
	index:0,
	currentPlay:false,
	getIndex:function(b){
	if(b){
	if((deezer.index-1)<deezer.tracksid.length-1){
	deezer.index++;
	}
	}
	else{
	if((deezer.index-1)>0){
	deezer.index--;
	}
	}
	 return (deezer.index-1)>0?(deezer.index-1):0;
	},
	initSetting:function(){
    if(deezer.setting.boxProgressBar)
	deezer.setting.boxProgressBar.click(function(e) {
		var progres = $(e.delegateTarget);
		var x = e.clientX - progres.offset().left;
		var xMax = progres.width();
		//console.log(e.clientX, progres.offset().left, e);
		//console.log(x / xMax * 100);
		deezer.addController.seek(x / xMax * 100);
	    } )
	
	}
		
    // fine envet      
}:deezer;
})(window,DZ)


var youtube = youtube || {};
(function(d){
//alert(d.info.autore)
 })(deezer)
 
 
var api=api || false;
(function(d,y){
 !api?api={
   deezer:d,
   youtube:y
 }:api;
})(deezer,youtube)
  