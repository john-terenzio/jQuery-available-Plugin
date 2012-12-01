// jQuery available Plugin 1.7.0 (20121201)
// By John Terenzio | http://terenz.io | MIT License
(function(c){var a,b=[],d=function(){for(a=0;a<b.length;++a)if(c(b[a][0])[0]&&(b[a][2]||c(b[a][0]).next()[0]||c.isReady)){try{b[a][1].apply(c(b[a][0]).eq(0))}catch(e){"undefined"!==typeof window.console&&window.console.log(e)}b.splice(a,1);--a}b.length&&!c.isReady&&window.setTimeout(d,10)};c.fn.available=function(a,c){b.push([this.selector,a,c||!1]);d();return this}})(jQuery);
