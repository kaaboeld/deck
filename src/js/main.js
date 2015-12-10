var deck,prevState,lastIndex;

var Deck = function(){
    this.container = $("#deck");
    this.source = null;
    this.itemSelector = ".card";
    this.indent = 60;
    this.animSpeed = 500;
    
    this.init = function(opts){
        var source = null;
        if(opts != undefined){
            source = opts.source || [];
        }
        this.setSource(source);

        if(this.source.length > 0){
           this.add(this.source,false,true);
        }
        this.addListeners();
        
        return this;
    }
    this.add = function(data,isState,isInit){
        var self = this;
        var src = $("#card-template").html();
        var tpl = Handlebars.compile(src);
        
        var dummy = $("<i/>");
        var count = self.container.find(self.itemSelector).length;
        
        var isState = isState || false;
        var isInit  = isInit || false;
        
        $.each(data,function(key,context){
            var index = count + key;
            total = index;
            context.number = index + 1;
            context.index = index;
            var item = $(tpl(context));
            self.setIndent(index,item);
            dummy.append(item);
        });
        self.container.append(dummy.children());
        self.setSize();
    }
    this.remove = function(item,isState){
        var self = this;
        var target = item || self.container.find(self.itemSelector).last();
        
        var isState = isState || true;
        
        target.addClass("_remove").fadeOut(self.animSpeed,function(){
           $(this).remove();
           var data = target.data();
           var type = data.type;
           var index = data.index;
        });
    }
    this.setSource = function(source){
        this.source = source || cards;
    }
    this.setSize = function(item){
        var self = this;
        
        var target = item || self.container.find(self.itemSelector+"-type-wide").last();
        
        if(target.length ==  0) return false;
        var size = self.container.innerWidth() - parseFloat(target.css("margin-left"));
        
        target.css({
            "width":size
        });
    }
    this.setIndent = function(index,item){
        var indent = this.indent * index;
        item.css({"margin-left":indent});
    }
    this.detectAction = function(e){
        var action = null;
        var target = $("body");
        if(e.shiftKey) action = (e.altKey)? 'wide':'narrow';
        target.removeClass("_add-wide _add-narrow");
        if(action != null) target.addClass("_add-"+action);
        
        return action;
    }
    this.addListeners = function(){
        var self = this;
        
        $("body").on("keypress click",self.itemSelector+":last-child",function(e){
            var elem = $(this);
            var data = elem.data();
            
            var count = self.container.find(self.itemSelector).length;
            var action = "remove";
            
            var newIndex = parseInt(data.index)+1;
            
            if(e.shiftKey) action = (e.altKey)? 'wide':'narrow';
            switch(action){
                case "wide":
                    History.pushState({action:"add",type:"wide",index:newIndex}, null, "?state=add-"+newIndex);
                    break;
                case "narrow":
                    History.pushState({action:"add",type:"narrow",index:newIndex}, null, "?state=add-"+newIndex);
                    break;
                default:
                    History.pushState({action:"remove",type:data.type,index:data.index}, null, "?state=remove-"+data.index);
                break;
            }
           return false;
        });
        $(document).on("keydown keyup",function(e){
            self.detectAction(e);
            
        }).on("mouseleave",function(e){
            var target = $("body");
            target.removeClass("_add-wide _add-narrow");
        }).on("mouseenter",function(e){
            self.detectAction(e);
        });
        
        $(window).on("popstate",function(){
            var state = History.getState();
            var data = ($.isEmptyObject(state.data))? prevState : state.data;
            
            var count = self.container.find(self.itemSelector).length;
            var obj = {};
            var item = self.container.find(self.itemSelector+"[data-index="+data.index+"]");
            
            switch (data.action) {
                case 'remove':
                    
                    if(item.length > 0) self.remove();
                    else{
                        obj = {
                            "type":prevState.type
                        };
                        self.add([obj]);
                    }
                    
                    break;
                case 'add':
                    if(item.length > 0) self.remove();
                    else{ 
                        obj = {
                            "type":data.type
                        };
                        self.add([obj]);
                    }
                    break;
            }
            if(!$.isEmptyObject(state.data)){
                prevState = state.data;
            }
        });
        
        $(window).on("resize",function(){
            deck.setSize(); 
        });
    }
}
function init(){
    deck = new Deck().init();
    if(location.search != "") location.search = "";
}

$(document).on("ready",function(){
    init();
});

