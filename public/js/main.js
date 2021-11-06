/* Sets the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "40%";
    document.getElementById("main").style.marginLeft = "40%";
  }
  
  /* Sets the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }

// PERSIST MUSIC THROUGH PAGES

// function setCookie(c_name,value,exdays)
// {
//     var exdate=new Date();
//     exdate.setDate(exdate.getDate() + exdays);
//     var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
//     document.cookie=c_name + "=" + c_value;
// }

// function getCookie(c_name)
// {
//     var i,x,y,ARRcookies=document.cookie.split(";");
//     for (i=0;i<ARRcookies.length;i++)
//     {
//       x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
//       y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
//       x=x.replace(/^\s+|\s+$/g,"");
//       if (x==c_name)
//         {
//         return unescape(y);
//         }
//       }
// }

// var song = document.getElementsByTagName('audio')[0];
// var played = false;
// var tillPlayed = getCookie('timePlayed');
// function updateMusicCookie()
// {
//     if(!played){
//         if(tillPlayed){
//         song.currentTime = tillPlayed;
//         song.play();
//         played = true;
//         }
//         else {
//                 song.play();
//                 played = true;
//         }
//     }
//     else {
//     setCookie('timePlayed', song.currentTime);
//     }
// }
// setInterval(updateMusicCookie,1000);

// MUSIC PLAYER
$(function(){
  $("#jquery_jplayer_1").jPlayer({
    ready: function () {
      $(this).jPlayer("setMedia", {
        title: "Dire Dire Docks",
        mp3: "/assets/dire-dire-docks.mp3"
      });
    },
    cssSelectorAncestor: "#jp_container_1",
    swfPath: "/js",
    supplied: "mp3",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true,
    remainingDuration: true,
    toggleDuration: true
  });
});