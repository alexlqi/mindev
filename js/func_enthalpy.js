//Objeto con las funciones enthalpy
var enthalpy={
	ajax:function(url,datos,tipo,callback){
		$.ajax({
			url:url,
			cache:false,
			type:tipo,
			data:datos,
			success: function(r){
				if(typeof callback != "undefined"){
					callback(r);
				}else{
					console.log(r);
				}
			}
		});
	},
	
	json2option:function(d,mtx){
		//mtx={value:'',name:''};
		opt = ['<option disabled selected value="0">Elige empresa</option>'];
		$.each(d,function(i,v) {
			//console.log("mtx (length): " + arr.length + "; " + v[mtx.value] + " - " + v[mtx.nombre]);
			opt.push('<option value="' + v[mtx.value] + '">' + v[mtx.nombre] + '</option>');
		});
		return opt.join("");
	},
	
	cotejarArrId:function(d,campo){
		var mtxId=[];
		$.each(d,function(i,v){
			mtxId[v[campo]]=i;
		});
		return mtxId;
	},
	
	rellenarCampos:function(d,puntero){
		puntero = (typeof puntero != "undefined" || puntero !="") ? puntero : document ;
		if(typeof d != 'undefined'){
			$.each(d,function(i,v){
				i="."+i;
				$(puntero).find(i).val(v);
			});
		}else{
			$(puntero).get(0).reset();
			console.log('rellenarCampos: El parámetro está vacío');
		}
	},
	
	//json to array
	json2array:function(json){
		arr = $.map(json, function(el) { return el; });
		return arr;
	},
	alerta:function(msg,persist){
		$(".respuesta").html('');
		t_in=200;
		t_out=300;
		t_wait=2000;
		$(".respuesta").html(msg);
		$(".respuesta").fadeIn(t_in,function(){
			if(!persist){
				setTimeout(function(){$(".respuesta").fadeOut(t_out);},t_wait);
			}
		});
	}
}

//funciones que solo funcionan con jQuery para añadirlas
if(typeof $ != "undefined"){
	//NOTA: se debe regresar this para que elem tenga el elemento usado
	jQuery.fn.extend({
		conEnter:function(callback){
			this.keyup(function(e){
				if(e.keyCode==13){
					if(typeof callback != "undefined"){callback($(this));}
				}
			});
			return this;
		}
	});
}