// const events = require("inquirer/lib/utils/events");

class Futbah {
  constructor() {
    this.urlListJogador = 'jogadroes/list_jogador.json';
    this.urlNoticia = 'jogadroes/list_noticia.json';
    this.paragrafo = document.getElementById("paragrafo");
    this.elencoJogadores = document.getElementById("elenco");
    this.banner = document.getElementById(".banner");
    this.btnNoticia = "";
  }

  async run() {
    await this.noticia();
    await this.elenco();
    await this.rankClassificacao();
    this.clicando();
    // this.btnNoticia = document.querySelectorAll('.btn_noticia')
  }

  // Procura no json de noticia, e informa os dados do jogo
  async noticia() {

    try {
      const response = await fetch(this.urlNoticia);
      const json = await response.json();

      var i = 1;
      json.jogo.map((noticia) => {
        let header = noticia.titulo;
        let paragrafo = noticia.noticia;
        this.data = noticia.data;

        var divNoticia = document.createElement("div");
        // var divTexto = document.createElement("div");
        var img = document.createElement("img");
        var pData = document.createElement("p");
        var pParagrafo = document.createElement("p");
        var h2 = document.createElement("h2");
        var a = document.createElement("a");

        img.textContent = `images/foto-${i}.jpg`;
        pData.textContent = this.data;
        h2.textContent = header;
        pParagrafo.textContent = paragrafo.substring(0, 250) + "...";
        a.textContent = `Saiba mais...`;

        // divNoticia.appendChild(divTexto);
        divNoticia.appendChild(img);
        divNoticia.appendChild(pData);
        divNoticia.appendChild(h2);
        divNoticia.appendChild(pParagrafo);
        divNoticia.appendChild(a);

        img.setAttribute("src", `images/foto-${i}.jpg`);
        divNoticia.classList.add("noticia");
        divNoticia.classList.add("w33");
        divNoticia.classList.add(this.data);
        a.classList.add("btn_noticia");
        // a.setAttribute("href", "noticia-single.html");
        this.paragrafo.appendChild(divNoticia)
        a.setAttribute("onclick", "futbah.clicando()");
        a.classList.add(this.data);
        i++
      })

    } catch (error) {
      // console.log(error)
    }
  }

  // Procura no Json de jogadores as informações do elenco
  async elenco() {

    try {
      const response = await fetch(this.urlListJogador);
      const json = await response.json();

      json.elenco.map((jogador) => {

        let texto = `
          <div class="jogador">
          <div class="btn-avancar-jogador">
            <!-- ${jogador.id} -->
            <img src="${jogador.img}" alt="Foto do ${jogador.nome}">
            <h3>${jogador.nome}</h3>
            <p>Posição: ${jogador.posicao}</p>
            <p>Número: ${jogador.numero}</p>`

        if (jogador.campeao.class == "campeao") {
          for (let i = 0; i < jogador.campeao.qtd; i++) {
            texto += `<img class="${jogador.campeao.class}"  src="images/estrela.png" alt="Foto do ${jogador.nome}" title="Campeão em ${jogador.campeao.ano}">`
          }
        }

        texto +=
          `</div></div>`
        this.elencoJogadores.innerHTML += texto;

      })
    } catch (err) {
      // console.error(err);
    }
  }

  // Procura no Json de jogadores as informações de classificação
  async rankClassificacao() {

    try {
      let classificacao = "";
      const response = await fetch(this.urlListJogador);
      const json = await response.json();

      // Ordena pela classificação
      json.elenco.sort((a, b) => {
        if (a.classificacao > b.classificacao) {
          return -1;
        }
        if (a.classificacao < b.classificacao) {
          return 1;
        }
        // console.log()
      });

      var i = 1;
      json.elenco.map((jogador) => {
        classificacao = `
          <tbody> `
        if (i < 5) {
          classificacao += `<tr class="promoted">`
        } else if (i > 17) {
          classificacao += `<tr class="relegated">`
        } else {
          classificacao += `<tr>`
        }

        classificacao += `
                  <td>${i}</td>
                  <td>${jogador.nome}</td>
                  <td>${jogador.classificacao}</td>
                  <td>${jogador.gol}</td>
                  <td>${jogador.assistencia}</td>
              </tr>
          <tbody>
          `
        document.getElementById("classificacao").innerHTML += classificacao;
        i++;

      })

    } catch (err) {
      // console.error(err);
    }
  }


  async clicando() {
    const response = await fetch(this.urlNoticia);
    const json = await response.json();

    this.btnNoticia = document.querySelectorAll('.noticia .w33')
    // console.log(noticias);

    NodeList.prototype.addEventListener = function (event, func) {
      this.forEach(function (content, item) {
        // console.log(item);
        content.addEventListener(event, func);
      });
    }

    this.btnNoticia.addEventListener("click", function (e) {
      // console.log(this, "  awas clicked");
      // console.log(json);

      for (let i = 0; i < json.jogo.length; i++) {
        if(e.target.classList[1] == json.jogo[i].data){
          // console.log(json.jogo[i]);
          debugger;
          localStorage.setItem('noticia', JSON.stringify(json.jogo[i]));

          window.location.href = "noticia-single.html";

          // futbah.enviaNoticia(noticia);
        }
      }
      
    });
  }

   // Procura no json de noticia, e informa os dados do jogo
  // async enviaNoticia(noticia) {

  //   try {
      
  //     noticiasSingle =
  //     `<h2>${noticia.titulo}</h2>`

  //     document.getElementById("noticia_single").innerHTML += noticiasSingle;
  //     connsole.log(noticia)
  //     // debugger

      

  //   } catch (error) {
  //     // console.log(error)
  //   }
  // }


}

let futbah = new Futbah();
futbah.run();


