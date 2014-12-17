


//////////////////////////////////////////////////////////////////// JOGO /////////////////////////////////////////////////////////////
var countTiros =0;
var game = {

	framesPorSegundo: 120,
	unidadeMinimaW:16,
	unidadeMinimaH:16,
	limiteScroll: 0.75,
	pressionaEspaco: false,
	pressionaDireita: false,
	pressionaEsquerda: false,
	pressionaCima: false,
	pressionaBaixo: false,
	pressionaC: false,
	listaTiros:[],
	listaAlvos:[],

	init: function()
	{
		$('.gamelayer').hide();
		$('#menuTela').show();
		game.canvas = $('#gamecanvas')[0];
		game.context = game.canvas.getContext('2d');
		window.addEventListener("keydown", game.acionaKeyDown);
		window.addEventListener("keyup", game.acionaKeyUp);
	},

	mostraEscolheUsuarioTela:function()
	{
		$('.gamelayer').hide();
		$('#escolheUsuarioTela').show('slow');
		escolheUsuario.init();
	},

	acionaKeyUp: function(e)
	{
		if(e.keyCode == 39 || e.keyCode==37 || e.keyCode==38|| e.keyCode==40)personagem.estaAndando  = false;
		if(e.keyCode==32)game.pressionaEspaco = false;
		if(e.keyCode==39)game.pressionaDireita = false;
		if(e.keyCode==37)game.pressionaEsquerda = false;
		if(e.keyCode==38)game.pressionaCima = false;
		if(e.keyCode==40)game.pressionaBaixo = false;
		if(e.keyCode==67)game.pressionaC = false;
	},

	acionaKeyDown: function(e)
	{
		if(e.keyCode==32)game.pressionaEspaco = true;
		if(e.keyCode==39)game.pressionaDireita = true;
		if(e.keyCode==37)game.pressionaEsquerda = true;
		if(e.keyCode==38)game.pressionaCima = true;
		if(e.keyCode==40)game.pressionaBaixo = true;
		if(e.keyCode==67)game.pressionaC = true;
		if(e.keyCode == 39 || e.keyCode==37 || e.keyCode==38|| e.keyCode==40)personagem.estaAndando  = true;

		var auxArray = ["baixo","esquerda", "direita", "cima"];

		if(game.pressionaEspaco && personagem.municao>0)
		{
			personagem.municao--;
			countTiros++;
			game.listaTiros.push(new tiroObjeto(auxArray[personagem.posicaoVertical], personagem.personagemPosicaoX + personagem.personagemWidth/2, personagem.personagemPosicaoY+ personagem.personagemHeight/2,countTiros));
			game.listaTiros[game.listaTiros.length-1].init();
		}

		var matrizAtualConteudo;

		if(game.pressionaC && caixaTexto.estaNaAnimacao==false)
		{
			matrizAtualConteudo = personagem.posicaoMatriz(auxArray[personagem.posicaoVertical]);
			if(matrizAtualConteudo.charAt(0) == "s")
			{
				this['secundario'+ matrizAtualConteudo.charAt(1)].falar();
			}
		}

		if(!game.pressionaC && caixaTexto.estaNaTela && !caixaTexto.estaNaAnimacao)
		{
			this['secundario'+ personagensSecundarios.atual.charAt(1)].finalizaFalar();
		}

		
		if(game.pressionaDireita) //right
		{
			matrizAtualConteudo = personagem.posicaoMatriz("direita");
			if(matrizAtualConteudo==0)
			{
				if(personagem.personagemPosicaoX >= game.canvas.width * game.limiteScroll && (mapa.mapaPosicaoX + game.canvas.width) < mapa.mapaWidth)
				{
					mapa.mapaPosicaoX += personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoX<game.canvas.width - personagem.personagemWidth)personagem.personagemPosicaoX += personagem.velocidade;
				}
			} 
			else if(matrizAtualConteudo.charAt(0) == "i")
			{
				if(personagem.personagemPosicaoX >= game.canvas.width * game.limiteScroll && (mapa.mapaPosicaoX + game.canvas.width) < mapa.mapaWidth)
				{
					mapa.mapaPosicaoX += personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoX<game.canvas.width - personagem.personagemWidth)
					{
						personagem.personagemPosicaoX += personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].x += personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].atualizaMatriz();
					}
				}
			}
			personagem.posicaoVertical = 2; 	

		} else if(game.pressionaEsquerda) //left
		{
			matrizAtualConteudo = personagem.posicaoMatriz("esquerda");
			if(matrizAtualConteudo ==0)
			{
				if(personagem.personagemPosicaoX <= (game.canvas.width - game.canvas.width * game.limiteScroll) && (mapa.mapaPosicaoX > 0))
				{
					mapa.mapaPosicaoX-= personagem.velocidade; 
				}
				else
				{
					if(personagem.personagemPosicaoX>0)personagem.personagemPosicaoX-= personagem.velocidade; 
				}
			}
			else if(matrizAtualConteudo.charAt(0) == "i")
			{
				if(personagem.personagemPosicaoX <= (game.canvas.width - game.canvas.width * game.limiteScroll) && (mapa.mapaPosicaoX > 0))
				{
					mapa.mapaPosicaoX-= personagem.velocidade; 
				}
				else
				{
					if(personagem.personagemPosicaoX>0)
					{
						personagem.personagemPosicaoX-= personagem.velocidade; 
						this['item'+ matrizAtualConteudo.charAt(1)].x -= personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].atualizaMatriz();
					}
				}
			}
			personagem.posicaoVertical = 1;

		} else if(game.pressionaCima) //up
		{
			matrizAtualConteudo = personagem.posicaoMatriz("cima");
			if(matrizAtualConteudo==0)
			{
				if(personagem.personagemPosicaoY <= game.canvas.height - game.canvas.height * game.limiteScroll && mapa.mapaPosicaoY >0)
				{
					mapa.mapaPosicaoY-= personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoY>0)personagem.personagemPosicaoY-= personagem.velocidade;
				}
			}
			else if(matrizAtualConteudo.charAt(0) == "i")
			{
				if(personagem.personagemPosicaoY <= game.canvas.height - game.canvas.height * game.limiteScroll && mapa.mapaPosicaoY >0)
				{
					mapa.mapaPosicaoY-= personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoY>0)
					{
						personagem.personagemPosicaoY-= personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].y -= personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].atualizaMatriz();
					}
				}
			}

			personagem.posicaoVertical = 3; 

		} else if(game.pressionaBaixo) //down
		{
			matrizAtualConteudo = personagem.posicaoMatriz("baixo");
			if(matrizAtualConteudo==0)
			{
				if(personagem.personagemPosicaoY >= game.canvas.height * game.limiteScroll && mapa.mapaPosicaoY + game.canvas.height < mapa.mapaHeight)
				{
					mapa.mapaPosicaoY += personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoY<game.canvas.height - personagem.personagemHeight)personagem.personagemPosicaoY+= personagem.velocidade;
				}
				
			} else if(matrizAtualConteudo.charAt(0) == "i")
			{
				if(personagem.personagemPosicaoY >= game.canvas.height * game.limiteScroll && mapa.mapaPosicaoY + game.canvas.height < mapa.mapaHeight)
				{
					mapa.mapaPosicaoY += personagem.velocidade;
				}
				else
				{
					if(personagem.personagemPosicaoY<game.canvas.height - personagem.personagemHeight)
					{
						personagem.personagemPosicaoY+= personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].y += personagem.velocidade;
						this['item'+ matrizAtualConteudo.charAt(1)].atualizaMatriz();
					}
				}
			}
			personagem.posicaoVertical = 0; 
		}

		
		
	}

}

////////////////////////////////////////////////////////////////// LEVELS ///////////////////////////////////////////////////////////////
var count = 0;
var fases = {
	faseAtual:1,
	data:
	[
		{ // Primeira fase
			mapa:'cidade1',
			itens: [] 
		},
		{ // Segunda fase
			mapa:'cidade2',
			itens: [] 
		}
	],
	
	init:function(number)
	{
		 fases.faseAtual = number;
		 fases.load();
	},
	
	load:function()
	{
		mapa.init();
		mapa.mapeamento();
		personagem.init();
		caixaTexto.init();
		fases.atualizaElementosTela();
		itensMoveis.init();
		personagensSecundarios.init();
	},

	atualizaElementosTela: function()
	{
		count++;
		if(count == Math.round(1000 / game.framesPorSegundo) )
		{
			game.context.clearRect(0,0,game.canvas.width, game.canvas.height);
			mapa.desenhar();			
			item1.desenhar();
			secundario1.desenhar();
			
			for (var i = 0; i < game.listaTiros.length; i++) {
				game.listaTiros[i].desenhar();
			};
			for (var i = 0; i < game.listaAlvos.length; i++) {
				game.listaAlvos[i].andar();
				game.listaAlvos[i].desenhar();
			};
			personagem.desenhar();
			caixaTexto.desenhar();
			personagem.desenhaMunicao();
			count = 0;
		}
		requestAnimFrame(fases.atualizaElementosTela);
	}
}

/////////////////////////////////////////////////////////////////MAPA//////////////////////////////////////////////////////////////////
var imgMapa  = new Image();
var matrizMapa = new Array();

var mapa = {

	mapaWidth:0,
	mapaHeight:0,

	load: function()
	{

	},

	init: function()
	{
		imgMapa.src = "img/mapas/" + fases.data[fases.faseAtual-1].mapa + ".png";
		imgMapa.onload = function()
		{
			mapa.mapaWidth = imgMapa.width;
			mapa.mapaHeight = imgMapa.height;
			mapa.numMatrizColuna = Number(mapa.mapaWidth) / Number(game.unidadeMinimaW);
			mapa.numMatrizLinha = Number(mapa.mapaHeight) / Number(game.unidadeMinimaH);
		}
		mapa.mapaPosicaoX = 0;
		mapa.mapaPosicaoY = 0;

		
	},

	desenhar: function()
	{
		
		game.context.globalAlpha = 1;
		game.context.drawImage(imgMapa,mapa.mapaPosicaoX,mapa.mapaPosicaoY,game.canvas.width, game.canvas.height,0,0,game.canvas.width, game.canvas.height);
	},

	mapeamento: function()
	{
		
			  matrizMapa = [[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
		
			
	}
}

/////////////////////////////////////////////////////////////////PERSONAGEM//////////////////////////////////////////////////////////////////
var imgPersonagem;
var personagem = {

	velocidade: 1,
	estaAndando: false,
	posicaoVertical:3,
	raio: 0 ,
	vida: 100,
	municao: 30,

	init: function()
	{
		imgPersonagem = new Image()
		imgPersonagem.src = "img/personagens/personagem.png";
		imgPersonagem.onload = function()
		{
			personagem.personagemWidth = imgPersonagem.width/3;
			personagem.personagemHeight = imgPersonagem.height/4;
			personagem.raio = (Math.sqrt(2) * personagem.personagemWidth)/2;
		}
		personagem.personagemPosicaoX = 20;
		personagem.personagemPosicaoY = 50;
		personagem.posicaoHorizontal = 0; 
		personagem.posicaoVertical = 0; 
		
		
	},

	desenhaMunicao: function()
	{
		game.context.fillStyle = "red";
		game.context.font = "40px Verdana"
    	game.context.fillText(personagem.municao, 530, 40);
	},

	desenhar: function()
	{
		if(personagem.estaAndando)
		{
		personagem.posicaoHorizontal++;
		personagem.posicaoHorizontal = personagem.posicaoHorizontal % 3;
		}
		game.context.globalAlpha = 1;
		game.context.drawImage(imgPersonagem,personagem.posicaoHorizontal * personagem.personagemWidth,personagem.posicaoVertical * personagem.personagemHeight, personagem.personagemWidth, personagem.personagemHeight,personagem.personagemPosicaoX,personagem.personagemPosicaoY, personagem.personagemWidth, personagem.personagemHeight);
		
		game.context.fillStyle = "gray";
    	game.context.fillRect(10,10,200,10);

    	game.context.fillStyle = "green";
    	game.context.fillRect(10,10,200 * this.vida/100,10);

	},

	posicaoMatriz: function(acao)
	{

		return posicaoMatrizParaHumanoides(acao,personagem.personagemPosicaoX,personagem.personagemPosicaoY,personagem.personagemWidth,personagem.personagemHeight);
	},


	hit: function(valor)
	{
		this.vida -= valor;
		if(this.vida <=0)
		{
			this.vida = 0;
			// OQ ACONTECE? MORREU!
		}
	}
}
/////////////////////////////////////////////////////////

function posicaoMatrizParaHumanoides(acao,x,y,w,h)
	{

			var coluna1 = Math.floor((x + mapa.mapaPosicaoX)/16);
			var linha1 = Math.floor((y + mapa.mapaPosicaoY + (h/4*3))/16);

			var coluna2 = Math.floor((x + mapa.mapaPosicaoX + w)/16);
			var linha2 = Math.floor((y + mapa.mapaPosicaoY+ (h/4*3))/16);

			var coluna3 = Math.floor((x + mapa.mapaPosicaoX + w/2)/16);
			var linha3 = Math.floor((y + mapa.mapaPosicaoY+ (h/2))/16);

			var coluna4 = Math.floor((x + mapa.mapaPosicaoX + w/2)/16);
			var linha4 = Math.floor((y + mapa.mapaPosicaoY+ (h))/16);

			switch(acao)
			{
				case "direita":
					//console.log("direita = "+ matrizMapa[linha2][coluna2])
					return matrizMapa[linha2][coluna2];
				break;

				case "esquerda":
					//console.log("esquerda = "+ matrizMapa[linha1][coluna1])
					return matrizMapa[linha1][coluna1];				
				break;

				case "cima":
					//console.log("cima = "+ matrizMapa[linha3][coluna3])
					return matrizMapa[linha3][coluna3];
				break;

				case "baixo":
				//console.log("baixo = "+ matrizMapa[linha4][coluna4])
				return matrizMapa[linha4][coluna4];
				break;
				default:
				break;

			}
	};

////////////////////////////////////////////////////////////////// ESCOLHE USUSARIO ///////////////////////////////////////////////////////////////
var escolheUsuario = {

	data:
	[
		{ 
			usuarioId:0,
			localizacaoPersonagem: null,
			fase:0,
			pontuacao: null
		},
		{ 
			usuarioId:0,
			localizacaoPersonagem: null,
			fase:0,
			pontuacao: null
		},
		{ 
			usuarioId:0,
			localizacaoPersonagem: null,
			fase:0,
			pontuacao: null
		},
		{ 
			usuarioId:0,
			localizacaoPersonagem: null,
			fase:0,
			pontuacao: null
		},
		{ 
			usuarioId:0,
			localizacaoPersonagem: null,
			fase:0,
			pontuacao: null
		}
	],
	
	init:function()
	{
		// implementar carregar progresso jogador (localstorage)
		var dadosStorage = 
		[
			{ 
				usuarioId:1,
				localizacaoPersonagem: null,
				fase:1,
				pontuacao: null
			},
			{ 
				usuarioId:2,
				localizacaoPersonagem: null,
				fase:1,
				pontuacao: null
			},
			{ 
				usuarioId:0,
				localizacaoPersonagem: null,
				fase:0,
				pontuacao: null
			},
			{ 
				usuarioId:0,
				localizacaoPersonagem: null,
				fase:0,
				pontuacao: null
			},
			{ 
				usuarioId:0,
				localizacaoPersonagem: null,
				fase:0,
				pontuacao: null
			}
		];
		escolheUsuario.data = dadosStorage;
		// implementar carregar progresso jogador (localstorage)

		var html = "";
		for (var i = 0; i < escolheUsuario.data.length; i++) {
		var usuario = escolheUsuario.data[i];
			if(escolheUsuario.data[i].usuarioId != 0){
				html += ' <input type = "button" value = "' + "Usuário " + escolheUsuario.data[i].usuarioId + '"> ';
			}else{
				html += ' <input type = "button" value = "' + "Slot vazio " + (i + 1) + '"> ';
			}
		};
		$('#escolheUsuarioTela').html(html);
		
		$('#escolheUsuarioTela input').click(function(){
			var numeroUsuario;
			if(this.value.indexOf("Usuário" != -1)){
				numeroUsuario = this.value.split("Usuário ");
				escolheUsuario.load(Number(numeroUsuario[1])-1);
			}else{
				numeroUsuario = this.value.split("Slot vazio ");
				escolheUsuario.load(Number(numeroUsuario[1])-1);
			}
			$('#escolheUsuarioTela').hide();
		});
	},
	
	load:function(number)
	{		
		fases.load(escolheUsuario.data[number].fase); 
		$('.gamelayer').hide();
		$('#gamecanvas').show('slow');
		$('#interfaceUsuario').show('slow');
	}
}
///////////////////////////////////////////////////////////////ITENS MOVEIS///////////////////////////////////////////////////////////
function itemMovel(w,h,x,y,id)
{
	this.width =  w;
	this.height = h;
	this.x = x;
	this.y = y;
	this.id = id;
	this.atualizaMatriz =  atualizaMatriz;
	this.desenhar = desenhar;
	this.linha1 = -1;
	this.coluna1 =-1;
	this.linha2 = -1;
	this.coluna2 =-1;
	this.linha3 = -1;
	this.coluna3 =-1;
	this.linha4 = -1;
	this.coluna4 =-1;

	function atualizaMatriz()
	{
		var coluna1 = Math.floor((this.x + mapa.mapaPosicaoX)/game.unidadeMinimaW);
		var linha1 = Math.floor((this.y + mapa.mapaPosicaoY)/game.unidadeMinimaH);

		var coluna2 = Math.floor((this.x + mapa.mapaPosicaoX  + this.width -1)/game.unidadeMinimaW);
		var linha2 = Math.floor((this.y + mapa.mapaPosicaoY)/game.unidadeMinimaH);

		var coluna3 = Math.floor((this.x + mapa.mapaPosicaoX + this.width -1)/game.unidadeMinimaW);
		var linha3 = Math.floor((this.y + mapa.mapaPosicaoY + this.height -1)/game.unidadeMinimaH);

		var coluna4 = Math.floor((this.x + mapa.mapaPosicaoX)/game.unidadeMinimaW);
		var linha4 = Math.floor((this.y + mapa.mapaPosicaoY -1 + this.height)/game.unidadeMinimaH);

		console.log(linha1 + "//" + coluna1)
		console.log(linha2 + "//" + coluna2)
		console.log(linha3 + "//" + coluna3)
		console.log(linha4 + "//" + coluna4)

		if(this.linha1 != linha1 || this.coluna1 != coluna1)if(this.linha1!=-1)matrizMapa[this.linha1][this.coluna1] = 0;
		if(this.linha2 != linha2 || this.coluna2 != coluna2)if(this.linha2!=-1)matrizMapa[this.linha2][this.coluna2] = 0;
		if(this.linha3 != linha3 || this.coluna3 != coluna3)if(this.linha3!=-1)matrizMapa[this.linha3][this.coluna3] = 0;
		if(this.linha4 != linha4 || this.coluna4 != coluna4)if(this.linha4!=-1)matrizMapa[this.linha4][this.coluna4] = 0;

		if((this.coluna2-this.coluna1)>0)
		{
			for (var i = 0; i <(this.coluna2-this.coluna1); i++) {
				matrizMapa[this.linha1][this.coluna1 +1] = 0;
				console.log(this.linha1 + "//" + (this.coluna1+1));
			};
		}

		if((this.coluna3-this.coluna4)>0)
		{
			for (var i = 0; i <(this.coluna3-this.coluna4); i++) {
				matrizMapa[this.linha3][this.coluna4 +1] = 0;
				console.log(this.linha3 + "//" + (this.coluna4+1));
			};
		}

		if((this.linha4-this.linha1)>0)
		{
			for (var i = 0; i <(this.linha4-this.linha1); i++) {
				matrizMapa[this.linha1 + 1][this.coluna1] = 0;
				console.log((this.linha1 +1 )+ "//" + this.coluna1);
			};
		}

		if((this.linha3-this.linha2)>0)
		{
			for (var i = 0; i <(this.linha3-this.linha2); i++) {
				matrizMapa[this.linha2 + 1][this.coluna2] = 0;
				console.log((this.linha2 +1 )+ "//" + this.coluna2);
			};
		}

		if(this.linha1 != linha1 || this.coluna1 != coluna1)
		{
			matrizMapa[linha1][coluna1] = this.id;
			this.linha1 = linha1;
			this.coluna1 = coluna1;
		}
		console.log("oi 1 ")
		if(this.linha2 != linha2 || this.coluna2 != coluna2)
		{
			matrizMapa[linha2][coluna2] = this.id;
			this.linha2 = linha2;
			this.coluna2 = coluna2;
		}
		console.log("oi 2 ")
		if(this.linha3 != linha3 || this.coluna3 != coluna3)
		{
			matrizMapa[linha3][coluna3] = this.id;
			this.linha3 = linha3;
			this.coluna3 = coluna3;
		}
		console.log("oi 3 ")
		if(this.linha4 != linha4 || this.coluna4 != coluna4)
		{
			matrizMapa[linha4][coluna4] = this.id;
			this.linha4 = linha4;
			this.coluna4 = coluna4;
		}

		if((coluna2-coluna1)>0)
		{
			for (var i = 0; i <(coluna2-coluna1); i++) {
				matrizMapa[linha1][coluna1 +1] = this.id;
				console.log(linha1 + "//" + (coluna1+1));
			};
		}

		if((coluna3-coluna4)>0)
		{
			for (var i = 0; i <(coluna3-coluna4); i++) {
				matrizMapa[linha3][coluna4 +1] = this.id;
				console.log(linha3 + "//" + (coluna4+1));
			};
		}

		if((linha4-linha1)>0)
		{
			for (var i = 0; i <(linha4-linha1); i++) {
				matrizMapa[linha1 + 1][coluna1] = this.id;
				console.log((linha1 +1 )+ "//" + coluna1);
			};
		}

		if((linha3-linha2)>0)
		{
			for (var i = 0; i <(linha3-linha2); i++) {
				matrizMapa[linha2 + 1][coluna2] = this.id;
				console.log((linha2 +1 )+ "//" + coluna2);
			};
		}

		console.log("oi 4 ")
	}

	function desenhar()
	{
		game.context.fillStyle = "black";
    	game.context.fillRect(this.x - mapa.mapaPosicaoX,this.y - mapa.mapaPosicaoY,this.width,this.height);
	}
}
var item1;

var itensMoveis =
{
	init: function()
	{
		item1 = new itemMovel(32,32,160,128,"i1");
		item1.atualizaMatriz();
	}

}

///////////////////////////////////////////////////////////////TIRO///////////////////////////////////////////////////////////
function tiroObjeto(d, posX, posY, id)
{

	this.direcao = d;
	this.width = 4;
	this.height = 4;
	this.x = posX;
	this.y = posY;
	this.raio = (Math.sqrt(2) * 4)/2; // se o tiro for quadrado
	this.id = id;
	this.velocidade =5;
	this.interval;
	this.forca = 25;
	var self = this;


	self.movimentar = function()
	{
		if(self.direcao == "cima")
		{
			self.y -=this.velocidade;
			if(self.y<0)
			{
				self.finalizaTiro();
			}
		} else if(self.direcao == "baixo")
		{
			self.y +=this.velocidade;
			if(self.y>game.canvas.height)
			{
				self.finalizaTiro();
			}
		} else if(self.direcao == "direita")
		{
			self.x+=this.velocidade;
			if(self.x>game.canvas.width)
			{
				self.finalizaTiro();
			}
			
		} else if(self.direcao == "esquerda")
		{
			self.x -=this.velocidade;
			if(self.x<0)
			{
				self.finalizaTiro();
			}
		} 

	}

	self.init = function()
	{
		self.interval = setInterval( function(){self.movimentar()}.bind(this), 50)
		
	}

	self.desenhar = function()
	{
		game.context.fillStyle = "red";
    	game.context.fillRect(self.x,self.y,self.width,self.height);
    	self.atingiuInimigo(game.listaAlvos);
    	self.atingiuConstrucao();


	}

	self.getId = function()
	{
		return self.id;
	}

	self.atingiuInimigo = function(listaAlvos)
	{
		for (var i = 0; i < game.listaAlvos.length; i++) 
		{
		 	var xs = 0;
		  	var ys = 0;
		 	xs = (game.listaAlvos[i].x + game.listaAlvos[i].width/2)- (self.x +self.width/2);
		 	xs = xs * xs;
		 
		  	ys = (game.listaAlvos[i].y +game.listaAlvos[i].height/2)- (self.y +self.height/2);
		  	ys = ys * ys;

		 	var distancia = Math.sqrt( xs + ys );

		 	if(distancia <= (self.raio + game.listaAlvos[i].raio))
		 	{
		 		game.listaAlvos[i].hit(self.forca);
		 		self.finalizaTiro();
		  	}
		};  
	}

	self.atingiuConstrucao = function()
	{
		var linha = Math.floor((self.y + self.raio)/game.unidadeMinimaH);
		var coluna = Math.floor((self.x + self.raio)/game.unidadeMinimaW);

		if(matrizMapa[linha][coluna] !=0)
		{
			self.finalizaTiro();
		}
	}

	self.finalizaTiro = function()
	{
		var result = $.grep(game.listaTiros, function(e){ return e.id == self.id; });
		game.listaTiros.splice(result.length-1,1);
		clearInterval(self.interval);
	}
}

///////////////////////////////////////////////////////////////inimigos///////////////////////////////////////////////////////////
function inimigo(x,y,w,h,id)
{
	var self= this;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height	= h;
	this.id = id;
	this.raio =  (Math.sqrt(2) * this.height)/2; // se o tiro for quadrado
	this.areaAlcance = 100; // valor do raio de ataque do inimigo
	this.vida = 100;
	this.forca = 5;
	this.velocidade = 2;
	this.raioDeVisao = 200;
	this.viuHeroi = false;

	self.hit = function	(valor)
	{
		self.vida -= valor;
		if(self.vida <= 0)
		{
			var result = $.grep(game.listaAlvos, function(e){ return e.id == self.id; });
			game.listaAlvos.splice(result.length-1,1);
		}
	}

	self.desenhar = function()
	{
		game.context.fillStyle = "green";
    	game.context.fillRect(self.x - mapa.mapaPosicaoX,self.y - mapa.mapaPosicaoY,self.width,self.height);

    	game.context.fillStyle = "gray";
    	game.context.fillRect(self.x - mapa.mapaPosicaoX,self.y - mapa.mapaPosicaoY -8,self.width,4);

    	game.context.fillStyle = "red";
    	game.context.fillRect(self.x - mapa.mapaPosicaoX,self.y - mapa.mapaPosicaoY -8,self.width * self.vida/100,4);

    	self.alcancouPersonagem();
	}

	self.alcancouPersonagem = function()
	{
		var xs = 0;
		var ys = 0;
		xs = (personagem.personagemPosicaoX- mapa.mapaPosicaoX	+ personagem.personagemWidth/2)- (self.x - mapa.mapaPosicaoX +self.width/2);
		xs = xs * xs;
		 
		 ys = (personagem.personagemPosicaoY - mapa.mapaPosicaoY +personagem.personagemHeight/2)- (self.y - mapa.mapaPosicaoY +self.height/2);
		 ys = ys * ys;

		 	var distancia = Math.sqrt( xs + ys );

		 	if(distancia <= (self.raio + personagem.raio))
		 	{
		 		personagem.hit(self.forca);
		  	}

		  	if((distancia)<= (self.raio + personagem.raio + self.raioDeVisao))
		 	{
		 		self.viuHeroi = true;
		 		self.velocidade = 4;
		  	}
		  	else
		  	{
		  		self.velocidade = 2;
		  		self.viuHeroi = false;
		  	}
	}

	self.posicaoMatriz = function(acao)
	{
		var valor = posicaoMatrizParaHumanoides(acao,self.x - mapa.mapaPosicaoX,self.y- mapa.mapaPosicaoY,self.width,self.height);
		return valor;
	}

	self.andar = function()
	{
		if(self.viuHeroi)
		{
			var vetorDirecao = ["y","x"];
			var direcao = vetorDirecao[Math.floor(Math.random() * 2)];
			var valor;

			if(direcao == "x" && self.x >= personagem.personagemPosicaoX)
			{
				direcao = "esquerda";
				valor = self.posicaoMatriz("esquerda");
			}
			else if(direcao == "x" && self.x < personagem.personagemPosicaoX)
			{
				console.log("2")
				direcao = "direita";
				valor = self.posicaoMatriz("direita");
			}
			else if(direcao == "y" && self.y >= personagem.personagemPosicaoY)
			{
				direcao = "cima";
				valor = self.posicaoMatriz("cima");
			}
			else if(direcao == "y" && self.y < personagem.personagemPosicaoY)
			{
				direcao = "baixo";
				valor = self.posicaoMatriz("baixo");
			}
			
		}
		else
		{
			var vetorDirecao = ["cima", "baixo","direita","esquerda"];
			var direcao = vetorDirecao[Math.floor(Math.random() * 4)];
			var valor = self.posicaoMatriz(direcao);
		}

		if(valor==0)
		{
			switch (direcao)
			{
				case "direita":
				self.x+=self.velocidade;
				break;
				case "esquerda":
				self.x-=self.velocidade;
				break;
				case "baixo":
				self.y+=self.velocidade;
				break;
				case "cima":
				self.y-=self.velocidade;
				break;
			}
		}
		
	}


}

var monstro1 = new inimigo(200,320,32,32,1);
var monstro2 = new inimigo(250,320,32,32,2);
var monstro3 = new inimigo(300,320,32,32,3);

game.listaAlvos.push(monstro1);
game.listaAlvos.push(monstro2);
game.listaAlvos.push(monstro3);

///////////////////////////////////////////////////////////////PERSONAGENS SECUNDÁRIOS///////////////////////////////////////////////////////////

function personagemSecundario(x,y,w,h,id,fala)
{
	var self= this;
	this.x = x;
	this.y = y;
	this.width = w;
	this.height	= h;
	this.id = id;
	this.linha1 = -1;
	this.coluna1 =-1;
	this.linha2 = -1;
	this.coluna2 =-1;
	this.linha3 = -1;
	this.coluna3 =-1;
	this.linha4 = -1;
	this.coluna4 =-1;
	this.fala = fala;
	this.contadorDeConversa = 0;

	self.falar = function	()
	{
		
		console.log(self.contadorDeConversa + " // " + self.fala.length + " // " +  self.contadorDeConversa)
		if(self.contadorDeConversa == self.fala.length && self.contadorDeConversa!=0)
		{
			self.finalizaFalar();
		}
		else if(self.contadorDeConversa==0)
		{
			caixaTexto.fadeIn();
			personagensSecundarios.atual = self.id;
			caixaTexto.escrever(self.fala[self.contadorDeConversa])
			self.contadorDeConversa++;
		}
		else
		{
			caixaTexto.escrever(self.fala[self.contadorDeConversa])
			self.contadorDeConversa++;
		}

	}

	self.finalizaFalar = function	()
	{
		caixaTexto.fadeOut();
		self.contadorDeConversa = 0;
	}

	self.atualizaMatriz = function()
	{
		var coluna1 = Math.floor((this.x + mapa.mapaPosicaoX)/game.unidadeMinimaW);
		var linha1 = Math.floor((this.y + mapa.mapaPosicaoY)/game.unidadeMinimaH);

		var coluna2 = Math.floor((this.x + mapa.mapaPosicaoX  + this.width -1)/game.unidadeMinimaW);
		var linha2 = Math.floor((this.y + mapa.mapaPosicaoY)/game.unidadeMinimaH);

		var coluna3 = Math.floor((this.x + mapa.mapaPosicaoX + this.width -1)/game.unidadeMinimaW);
		var linha3 = Math.floor((this.y + mapa.mapaPosicaoY + this.height -1)/game.unidadeMinimaH);

		var coluna4 = Math.floor((this.x + mapa.mapaPosicaoX)/game.unidadeMinimaW);
		var linha4 = Math.floor((this.y + mapa.mapaPosicaoY -1 + this.height)/game.unidadeMinimaH);

		console.log(linha1 + "//" + coluna1)
		console.log(linha2 + "//" + coluna2)
		console.log(linha3 + "//" + coluna3)
		console.log(linha4 + "//" + coluna4)

		if(this.linha1 != linha1 || this.coluna1 != coluna1)if(this.linha1!=-1)matrizMapa[this.linha1][this.coluna1] = 0;
		if(this.linha2 != linha2 || this.coluna2 != coluna2)if(this.linha2!=-1)matrizMapa[this.linha2][this.coluna2] = 0;
		if(this.linha3 != linha3 || this.coluna3 != coluna3)if(this.linha3!=-1)matrizMapa[this.linha3][this.coluna3] = 0;
		if(this.linha4 != linha4 || this.coluna4 != coluna4)if(this.linha4!=-1)matrizMapa[this.linha4][this.coluna4] = 0;

		if((this.coluna2-this.coluna1)>0)
		{
			for (var i = 0; i <(this.coluna2-this.coluna1); i++) {
				matrizMapa[this.linha1][this.coluna1 +1] = 0;
				console.log(this.linha1 + "//" + (this.coluna1+1));
			};
		}

		if((this.coluna3-this.coluna4)>0)
		{
			for (var i = 0; i <(this.coluna3-this.coluna4); i++) {
				matrizMapa[this.linha3][this.coluna4 +1] = 0;
				console.log(this.linha3 + "//" + (this.coluna4+1));
			};
		}

		if((this.linha4-this.linha1)>0)
		{
			for (var i = 0; i <(this.linha4-this.linha1); i++) {
				matrizMapa[this.linha1 + 1][this.coluna1] = 0;
				console.log((this.linha1 +1 )+ "//" + this.coluna1);
			};
		}

		if((this.linha3-this.linha2)>0)
		{
			for (var i = 0; i <(this.linha3-this.linha2); i++) {
				matrizMapa[this.linha2 + 1][this.coluna2] = 0;
				console.log((this.linha2 +1 )+ "//" + this.coluna2);
			};
		}

		if(this.linha1 != linha1 || this.coluna1 != coluna1)
		{
			matrizMapa[linha1][coluna1] = this.id;
			this.linha1 = linha1;
			this.coluna1 = coluna1;
		}
		console.log("oi 1 ")
		if(this.linha2 != linha2 || this.coluna2 != coluna2)
		{
			matrizMapa[linha2][coluna2] = this.id;
			this.linha2 = linha2;
			this.coluna2 = coluna2;
		}
		console.log("oi 2 ")
		if(this.linha3 != linha3 || this.coluna3 != coluna3)
		{
			matrizMapa[linha3][coluna3] = this.id;
			this.linha3 = linha3;
			this.coluna3 = coluna3;
		}
		console.log("oi 3 ")
		if(this.linha4 != linha4 || this.coluna4 != coluna4)
		{
			matrizMapa[linha4][coluna4] = this.id;
			this.linha4 = linha4;
			this.coluna4 = coluna4;
		}

		if((coluna2-coluna1)>0)
		{
			for (var i = 0; i <(coluna2-coluna1); i++) {
				matrizMapa[linha1][coluna1 +1] = this.id;
				console.log(linha1 + "//" + (coluna1+1));
			};
		}

		if((coluna3-coluna4)>0)
		{
			for (var i = 0; i <(coluna3-coluna4); i++) {
				matrizMapa[linha3][coluna4 +1] = this.id;
				console.log(linha3 + "//" + (coluna4+1));
			};
		}

		if((linha4-linha1)>0)
		{
			for (var i = 0; i <(linha4-linha1); i++) {
				matrizMapa[linha1 + 1][coluna1] = this.id;
				console.log((linha1 +1 )+ "//" + coluna1);
			};
		}

		if((linha3-linha2)>0)
		{
			for (var i = 0; i <(linha3-linha2); i++) {
				matrizMapa[linha2 + 1][coluna2] = this.id;
				console.log((linha2 +1 )+ "//" + coluna2);
			};
		}

		console.log("oi 4 ")
	}

	self.desenhar = function()
	{
		game.context.fillStyle = "gray";
    	game.context.fillRect(this.x - mapa.mapaPosicaoX,this.y - mapa.mapaPosicaoY,this.width,this.height);
	}
}

var secundario1;
var personagensSecundarios =
{
	atual:"",

	init: function	()
	{
		
		secundario1 = new personagemSecundario(128, 160, 32, 32,"s1",["Oi! Tudo bem?", "Meu nome é Ana.", "Esta cidade é realmente estranha."]);
		secundario1.atualizaMatriz();
	}
}



///////////////////////////////////////////////////////////////BOX TEXTO///////////////////////////////////////////////////////////
var imgTextBox;
var caixaTexto =
{
	estaNaTela:false,
	counter:0,
	counterTexto:0,
	texto: "",
	estaNaAnimacao: false,
	init: function()
	{
		imgTextBox = new Image();
		imgTextBox.src = "img/interfaces/TextBox.png";
		imgTextBox.onload = function()
		{
			caixaTexto.width = imgTextBox.width;
			caixaTexto.height = imgTextBox.height;
			caixaTexto.posicaoX = (game.canvas.width - caixaTexto.width )/2;
			if(caixaTexto.posicaoX > 0)caixaTexto.posicaoX =0;
			caixaTexto.posicaoY = game.canvas.height - caixaTexto.height;
		}
	},

	desenhar: function()
	{
		if(caixaTexto.estaNaTela)
		{
			game.context.globalAlpha = 0.1 * caixaTexto.counter;
			game.context.drawImage(imgTextBox,caixaTexto.posicaoX, caixaTexto.posicaoY, caixaTexto.width, caixaTexto.height);
			game.context.globalAlpha = 0.1 * caixaTexto.counterTexto;
			game.context.fillStyle = "white";
			game.context.font = "16px courier"
			game.context.fillText(caixaTexto.texto,caixaTexto.posicaoX + 16, caixaTexto.posicaoY +32);
		}
	},

	fadeIn: function()
	{
		caixaTexto.estaNaAnimacao = true;
		caixaTexto.estaNaTela =  true;
		var atualizaFadeIn = setInterval(function(){
			caixaTexto.counter++; 
			if(caixaTexto.counter==10)clearInterval(atualizaFadeIn);
			caixaTexto.estaNaAnimacao = false;
		}, 50)
	},

	fadeOut: function()
	{
		caixaTexto.estaNaAnimacao = true;
		var atualizaFadeOut = setInterval(function(){
			console.log(caixaTexto.counter);
			caixaTexto.counter--; 
			if(caixaTexto.counter==0)
			{
				caixaTexto.estaNaTela =  false;
				caixaTexto.texto = "";
				clearInterval(atualizaFadeOut);
				caixaTexto.estaNaAnimacao = false;
			}
		}, 50)
	},

	escrever: function(texto)
	{
		if(caixaTexto.counterTexto == 0)
		{
			caixaTexto.texto = texto;
			caixaTexto.estaNaAnimacao = true;
			var atualizaFadeInTexto = setInterval(function(){
				caixaTexto.counterTexto++; 			
				if(caixaTexto.counterTexto==10)
					{
						clearInterval(atualizaFadeInTexto);
						caixaTexto.estaNaAnimacao = false;
					}
			}, 50)
		}
		else
		{
			caixaTexto.estaNaAnimacao = true;
			var atualizaFadeOutTexto = setInterval(function(){
				caixaTexto.counterTexto--; 			
				if(caixaTexto.counterTexto==0)
				{
					clearInterval(atualizaFadeOutTexto);
					caixaTexto.texto = texto;
					var atualizaFadeInTexto = setInterval(function(){
						caixaTexto.counterTexto++; 			
						if(caixaTexto.counterTexto==10)
						{
							clearInterval(atualizaFadeInTexto);
							caixaTexto.estaNaAnimacao = false;
						}
					}, 50)
				}
			}, 50)
		}
	}

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(window).load(function() 
{
	game.init();
	//window.addEventListener('load', game.resize, false);
	//window.addEventListener('resize', game.resize, false);
});

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame||
    window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	function( callback ){
		 window.setTimeout(callback,1);
	};
})();



